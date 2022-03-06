/* Hashnode: a node stored in the transposition table.
 *
 * In addition to the position, the hash lock encodes the following data,
 * all hashed:
 *   komaster
 *   kom_pos
 *   routine
 *   str1
 *   str2
 *   extra hashvalue, optional (e.g. encoding a goal array)
 *
 * The data field packs into 32 bits the following
 * fields:
 *
 *   RESERVED       :  5 bits
 *   value1         :  4 bits
 *   value2         :  4 bits
 *   move           : 10 bits
 *   cost           :  4 bits
 *   remaining_depth:  5 bits (depth - stackp)  NOTE: HN_MAX_REMAINING_DEPTH
 *
 *   The last 9 bits together give an index for the total costs.
 */

import {NO_MOVE} from "./Constants";
import {Hash, HashData} from "./Hash";
import {ROUTINE_COSTS, routine_id} from "./Liberty";

//entity
class HashNode {
  // 32 bits
  data = 0
  key = {
    hashval: 0
  }
}

class HashEntry {
  deepest = new HashNode()
  newest = new HashNode()
}

class TranspositionTable{
  num_entries = 0
  is_clean = 0
  entries = []
}

const HN_MAX_REMAINING_DEPTH = 31
const DEFAULT_NUMBER_OF_CACHE_ENTRIES = 350000


/* Hn is for hash node. */
const hn_get_value1 = hn=>           (hn >> 23) & 0x0f
const hn_get_value2 = hn=>           (hn >> 19) & 0x0f
const hn_get_move = hn=>             (hn >>  9) & 0x3ff
// const hn_get_cost = hn=>             (hn >>  5) & 0x0f
const hn_get_remaining_depth = hn=>  (hn >>  0) & 0x1f
const hn_get_total_cost = hn=>       (hn >>  0) & 0x1ff

// 0x0f : 低4位
// << 23: 左移23位
const hn_create_data = (remaining_depth, value1, value2, move, cost) =>
(((value1)         & 0x0f)  << 23)
|(((value2)         & 0x0f)  << 19)
|(((move)           & 0x3ff) <<  9)
|(((cost)           & 0x0f)  <<  5)
|(((remaining_depth & 0x1f)  <<  0))


export const ttable = new TranspositionTable()

export const Cache = {

  /*
 * These macros should be used in all the places where we want to
 * return a result from a reading function and where we want to
 * store the result in the hash table at the same time.
 */
  /**
   * 调用后，在调用位置return 0
   */
  READ_RETURN0(routine, str, remaining_depth) {
    //table, routine, target1, target2, remaining_depth, extra_hash, value1, value2, move
    this.tt_update(ttable, routine, str, NO_MOVE, remaining_depth, null, 0, 0, NO_MOVE)
  //  return 0;
  },

  /**
   * 调用后，在调用位置return value
   */
  READ_RETURN(routine, str, remaining_depth, point, move, value) {
    this.tt_update(ttable, routine, str, NO_MOVE, remaining_depth, null,  value, 0, move);
    if (value !== 0 && point) {
      point[0] = move[0];
    }
    // return (value);
  },

  READ_RETURN_SEMEAI () {},

  READ_RETURN_CONN (routine, str1, str2, remaining_depth, point, move, value) {
    this.tt_update(ttable, routine, str1, str2, remaining_depth, null, value, 0, move);
    if (value !== 0 && point) {
      point[0] = move[0];
    };
    return value;
  },
  READ_RETURN_HASH () {},
  READ_RETURN2 () {},

  calculate_hashval_for_tt(hashdata, routine, target1, target2, extra_hash){
    const b = this.board
    hashdata.hashval = b.board_hash.hashval;                /* from globals.c */
    HashData.xor(hashdata, this.routine_hash[routine]);
    HashData.xor(hashdata, this.target1_hash[target1]);
    if (target2 !== NO_MOVE){
      HashData.xor(hashdata, this.target2_hash[target2]);
    }
    if (extra_hash){
      HashData.xor(hashdata, extra_hash);
    }
  },

  tt_init(table) {
    let num_entries;

    /* Make sure the hash system is initialized. */
    // this.hash_init();
    this.keyhash_init();

    num_entries = DEFAULT_NUMBER_OF_CACHE_ENTRIES;

    table.num_entries = num_entries;
    table.entries     = [];

    table.is_clean = 0;
    this.tt_clear(table);
  },

  keyhash_init() {
    const b = this.board
    this.target1_hash = Hash.INIT_ZOBRIST_ARRAY(b.BOARDMAX);
    this.target2_hash = Hash.INIT_ZOBRIST_ARRAY(b.BOARDMAX);
    this.routine_hash = Hash.INIT_ZOBRIST_ARRAY(routine_id.NUM_CACHE_ROUTINES);
  },

  tt_clear(table) {
    if (!table.is_clean) {
      table.entries = []
      table.is_clean = 1;
    }
  },

  /* Get result and move. Return value:
 *   0 if not found
 *   1 if found, but depth too small to be trusted.  In this case the move
 *     can be used for move ordering.
 *   2 if found and depth is enough so that the result can be trusted.
 */
  tt_get(table, routine, target1, target2, remaining_depth, extra_hash, value1, value2, move) {
    const hashData = {
      hashval: 0
    };
    let node;

    /* Sanity check. */
    if (remaining_depth < 0 || remaining_depth > HN_MAX_REMAINING_DEPTH){
      return 0;
    }

    /* Get the combined hash value. */
    this.calculate_hashval_for_tt(hashData, routine, target1, target2, extra_hash);

    /* Get the correct entry and node. */
    let entry = table.entries[HashData.remainder(hashData, table.num_entries)];
    if(!entry){
      return 0
    }

    if (HashData.is_equal(hashData, entry.deepest.key)){
      node = entry.deepest;
    }
    else if (HashData.is_equal(hashData, entry.newest.key)){
      node = entry.newest;
    }
    else{
      return 0;
    }

    // stats.read_result_hits++;

    /* Return data.  Only set the result if remaining depth in the table
     * is big enough to be trusted.  The move can always be used for move
     * ordering if nothing else.
     */
    if (move){
      move[0] = hn_get_move(node.data);
    }
    if (remaining_depth <= hn_get_remaining_depth(node.data)) {
      if (value1){
        value1[0] = hn_get_value1(node.data);
      }
      if (value2){
        value2[0] = hn_get_value2(node.data);
      }
      // stats.trusted_read_result_hits++;
      return 2;
    }

    return 1;
  },

  tt_update(table, routine, target1, target2, remaining_depth, extra_hash, value1, value2, move) {
    const hashData = {
      hashval: 0
    };
    /* Get routine costs definitions from liberty.h. */
    const routine_costs = ROUTINE_COSTS
    // gg_assert(routine_costs[NUM_CACHE_ROUTINES] == -1);

    /* Sanity check. */
    if (remaining_depth < 0 || remaining_depth > HN_MAX_REMAINING_DEPTH){
      return;
    }

    /* Get the combined hash value. */
    this.calculate_hashval_for_tt(hashData, routine, target1, target2, extra_hash);

    // 生成32位hash key
    let data = hn_create_data(remaining_depth, value1, value2, move, routine_costs[routine]);

    /* Get the entry and nodes. */
    const index = HashData.remainder(hashData, table.num_entries)
    let entry = table.entries[index];
    if(!entry){
      entry = new HashEntry()
      table.entries[index] = entry
    }
    let deepest = entry.deepest;
    let newest  = entry.newest;

    /* See if we found an already existing node. */
    if (HashData.is_equal(hashData, deepest.key) && remaining_depth >=  hn_get_remaining_depth(deepest.data)) {
      /* Found deepest */
      deepest.data = data;
    }
    else if (HashData.is_equal(hashData, newest.key) && remaining_depth >= hn_get_remaining_depth(newest.data)) {
      /* Found newest */
      newest.data = data;

      /* If newest has become deeper than deepest, then switch them. */
      if (hn_get_remaining_depth(newest.data) > hn_get_remaining_depth(deepest.data)) {
        let temp = deepest;
        deepest = newest;
        newest = temp;
      }

    }
    else if (hn_get_total_cost(data) > hn_get_total_cost(deepest.data)) {
      if (hn_get_total_cost(newest.data) < hn_get_total_cost(deepest.data)){
        newest = deepest;
      }
      deepest.key  = hashData;
      deepest.data = data;
    }
    else {
      /* Replace newest. */
      newest.key  = hashData;
      newest.data = data;
    }

    // stats.read_result_entered++;
    table.is_clean = 0;
  },


  /* Initialize the cache for read results, using at most the given
 * number of bytes of memory. If the memory isn't sufficient to
 * allocate a single node or if the allocation fails, the caching is
 * disabled.
 */
  reading_cache_init(){
    this.ttable = ttable
    this.tt_init(ttable);
  },


/* Clear the cache for read results. */
  reading_cache_clear() {
    this.tt_clear(ttable);
  },

}