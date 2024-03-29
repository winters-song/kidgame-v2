import {
  colors,NO_MOVE
} from './Constants'
import {HashData} from "./Hash";


const HIGH_LIBERTY_BIT  = 4
const HIGH_LIBERTY_BIT2 = 8

const MAX_READING_CACHE_DEPTH = 5
const MAX_READING_CACHE_SIZE = 100


const MAX_OWL_CACHE_DEPTH = 0
const MAX_OWL_CACHE_SIZE = 150

const MAX_CONNECTION_CACHE_DEPTH = 5
const MAX_CONNECTION_CACHE_SIZE = 100

const MAX_BREAKIN_CACHE_DEPTH = 1
const MAX_BREAKIN_CACHE_SIZE = 150

const MAX_SEMEAI_CACHE_DEPTH = 0
const MAX_SEMEAI_CACHE_SIZE = 150

const MAX_CACHE_DEPTH = 	5


class PersistentCacheEntry {
  constructor(cfg) {
    Object.assign(this, cfg, {
      board: [],
      stack: [],
      move_color: []
    })
  }
  // int boardsize;
  // int movenum;
  // Intersection board[BOARDMAX];
  // int stack[MAX_CACHE_DEPTH];
  // int move_color[MAX_CACHE_DEPTH];
// enum routine_id routine;
  // int apos; /* first input coordinate */
  // int bpos; /* second input coordinate */
  // int cpos; /* third input coordinate */
  // int color; /* Move at (cpos) by (color) in analyze_semeai_after_move() */
  // Hash_data goal_hash; /* hash of the goals in break-in and semeai reading */
  // int result;
  // int result2;
  // int result_certain;
  // int remaining_depth;
  // int node_limit; 
  // int move; /* first result coordinate */
  // int move2;/* second result coordinate */
  // int cost; /* Usually no. of tactical nodes spent on this reading result. */
  // int score; /* Heuristic guess of the worth of the cache entry. */
}

class PersistentCache {
  max_size; /* Size of above array. */
  max_stackp; /* Don't store positions with stackp > max_stackp. */
  age_factor; /* Reduce value of old entries with this factor. */
  name; /* For debugging purposes. */
  compute_active_area;
  table; /* Array of actual results. */
  current_size; /* Current number of entries. */
  last_purge_position_number;

  constructor(arr) {
    this.max_size = arr[0]
    this.max_stackp = arr[1]
    this.age_factor = arr[2]
    this.name = arr[3]
    this.compute_active_area = arr[4]
    this.table = arr[5]
    this.current_size = arr[6]

    this.last_purge_position_number = arr[7]
  }
};

export const Persistent = {

  persistent_cache_init() {
    this.reading_cache = new PersistentCache([
      MAX_READING_CACHE_SIZE, MAX_READING_CACHE_DEPTH, 1.0,
      "reading cache", this.compute_active_reading_area, [], 0, -1 ])

    this.connection_cache = new PersistentCache([
      MAX_CONNECTION_CACHE_SIZE, MAX_CONNECTION_CACHE_DEPTH, 1.0,
        "connection cache", this.compute_active_connection_area, [], 0, -1 ]);

    this.breakin_cache = new PersistentCache([
      MAX_BREAKIN_CACHE_SIZE, MAX_BREAKIN_CACHE_DEPTH, 0.75,
      "breakin cache", this.compute_active_breakin_area, [], 0, -1 ]);

    this.owl_cache = new PersistentCache([
      MAX_OWL_CACHE_SIZE, MAX_OWL_CACHE_DEPTH, 1.0,
      "owl cache", this.compute_active_owl_area, [], 0, -1 ]);

    this.semeai_cache = new PersistentCache([
      MAX_SEMEAI_CACHE_SIZE, MAX_SEMEAI_CACHE_DEPTH, 0.75,
      "semeai cache", this.compute_active_semeai_area, [], 0, -1 ])
  },


  /* Returns 1 if the stored board is compatible with the current board,
   * 0 otherwise.
   */
  verify_stored_board(p) {
    const b = this.board
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos))
        continue;
      else if (p[pos] === colors.GRAY)
        continue;
      else if ((p[pos] & 3) !== b.board[pos])
        return 0;
      else if (!(p[pos] & (HIGH_LIBERTY_BIT | HIGH_LIBERTY_BIT2)))
        continue;
      else if (((p[pos] & HIGH_LIBERTY_BIT) && b.countlib(pos) <= 4)
        || (p[pos] & HIGH_LIBERTY_BIT2 && b.countlib(pos) <= 3))
        return 0;
    }

    return 1;
  },

  clear_persistent_caches() {},

  purge_persistent_caches() {},

  find_persistent_cache_entry(cache, routine, apos, bpos, cpos, color, goal_hash, node_limit) {
    for (let k = 0; k < cache.current_size; k++) {
      let entry = cache.table[k];
      if (entry.routine === routine && entry.apos === apos && entry.bpos === bpos && entry.cpos === cpos
        && entry.color === color && this.depth - this.board.stackp <= entry.remaining_depth
        && (entry.node_limit >= node_limit || entry.result_certain)
        && (goal_hash === null || HashData.is_equal(entry.goal_hash, goal_hash))
        && this.verify_stored_board(entry.board)){
          return entry;
      }
    }
  },

  // result: []
  search_persistent_cache(cache, routine, apos, bpos, cpos,
    color, goal_hash, node_limit, result, result2, move, move2, certain) {
    let entry = this.find_persistent_cache_entry(cache, routine, apos, bpos, cpos, color, goal_hash, node_limit);
    if (!entry){
      return 0;
    }

    /* Set return values. */
    result[0] = entry.result;
    if (result2){
      result2[0] = entry.result2;
    }
    if (move){
      move[0] = entry.move;
    }
    if (move2){
      move2[0] = entry.move2;
    }
    if (certain){
      certain[0] = entry.result_certain;
    }


    /* Increase score for entry. */
    entry.score += entry.cost;

    // if (debug & DEBUG_PERSISTENT_CACHE) {
    //   gprintf("%oRetrieved position from %s:\n", cache->name);
    //   print_persistent_cache_entry(entry);
    // }
    return 1;
  },

  /* Generic function that tries to store a cache entry. If the cache
  * is full, we delete the lowest scoring entry.
  *
  * Unused parameters have to be normalized to NO_MOVE by the calling
  * function.
  */
  store_persistent_cache(cache, routine, apos, bpos, cpos,
    color, goal_hash, result, result2, move, move2, certain, node_limit, cost, goal, goal_color) {
    const b = this.board

    if (b.stackp > cache.max_stackp){
      return;
    }

    /* If cache is still full, consider kicking out an old entry. */
    // 找到最低score位置，将最后一个entry替换该位置，腾出空间
    if (cache.current_size === cache.max_size) {
      let worst_entry = -1;
      let worst_score = cost;

      for (let k = 0; k < cache.current_size; k++) {
        if (cache.table[k].score < worst_score) {
          worst_score = cache.table[k].score;
          worst_entry = k;
        }
      }

      if (worst_entry !== -1) {
        /* Move the last entry in the cache here to make space.
         */
        if (worst_entry < cache.current_size - 1) {
          cache.table[worst_entry] = cache.table[cache.current_size - 1];
        }
        cache.current_size--;
      }
      // 当前数据score最低，忽略
      else{
        return;
      }
    }

    const entry = new PersistentCacheEntry({
      board_size: b.board_size, routine, apos, bpos, cpos, color,
      result, result2, move, move2,
      node_limit, cost, goal_hash,
      score: cost,
      result_certain: certain,
      movenum: b.movenum,
      remaining_depth: this.depth - b.stackp
    })
    cache.table[cache.current_size] = entry


    for (let r = 0; r < MAX_CACHE_DEPTH; r++) {
      if (r < b.stackp){
        entry.stack[r] = b.stack[r]
        entry.move_color[r] = b.move_color[r]
      }
      else {
        entry.stack[r] = 0;
        entry.move_color[r] = colors.EMPTY;
      }
    }

    /* Remains to set the board. */
    cache.compute_active_area.call(this, cache.table[cache.current_size], goal, goal_color);
    cache.current_size++;

    // if (debug & DEBUG_PERSISTENT_CACHE) {
    //   gprintf("%oEntered position in %s:\n", cache.name);
    //   print_persistent_cache_entry(entry);
    //   gprintf("%oCurrent size: %d\n", cache.current_size);
    // }
  },

  /* ================================================================ */
  /*                  Tactical reading functions                      */
  /* ================================================================ */

  /* Look for a valid read result in the persistent cache.
   * Return 1 if found, 0 otherwise.
   */
  search_persistent_reading_cache(routine, str, result, move) {
    return this.search_persistent_cache(this.reading_cache,
      routine, str, NO_MOVE, NO_MOVE, colors.EMPTY, null,
      -1, result, null, move, null, null);
  },

  /* Store a new read result in the persistent cache. */
  // int move
  store_persistent_reading_cache(routine, str, result, move, nodes) {
    this.store_persistent_cache(this.reading_cache, routine,
      str, NO_MOVE, NO_MOVE, colors.EMPTY, null,
      result, NO_MOVE, move, NO_MOVE, -1, -1,
      nodes, this.board.shadow, colors.EMPTY);
  },

  compute_active_reading_area(entry, goal, dummy){
    const b = this.board
    const active = [];
    /* Remains to set the board. We let the active area be the contested
    * string and reading shadow + adjacent empty and strings +
    * neighbors of active area so far + one more expansion from empty
    * to empty.
    */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      active[pos] = goal[pos];
    }

    b.mark_string(entry.apos, active, 1);

    /* To be safe, also add the successful move. */
    if (entry.result !== 0 && entry.move !== 0){
      active[entry.move] = 1;
    }

    /* Add adjacent strings and empty. */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }
      if (active[pos] !== 0) {
        continue;
      }
      if ((b.ON_BOARD(b.SOUTH(pos)) && active[b.SOUTH(pos)] === 1)
      || (b.ON_BOARD(b.WEST(pos)) && active[b.WEST(pos)] === 1)
      || (b.ON_BOARD(b.NORTH(pos)) && active[b.NORTH(pos)] === 1)
      || (b.ON_BOARD(b.EAST(pos)) && active[b.EAST(pos)] === 1)) {
        if (b.IS_STONE(b.board[pos])){
          b.mark_string(pos, active, 2);
        }
        else{
          active[pos] = 2;
        }
      }
    }

    /* Remove invincible strings. No point adding their liberties and
    * neighbors.
    */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }
      if (b.IS_STONE(b.board[pos]) && this.worm[pos].invincible){
        active[pos] = 0;
      }
    }

    /* Expand empty to empty. */
    for (let pos = b.BOARDMIN; b.pos < b.BOARDMAX; pos++) {
      if (b.IS_STONE(b.board[pos]) || active[pos] !== 0) {
        continue;
      } 
      if ((b.board[b.SOUTH(pos)] === colors.EMPTY && active[b.SOUTH(pos)] === 2)
      || (b.board[b.WEST(pos)] === colors.EMPTY && active[b.WEST(pos)] === 2)
      || (b.board[b.NORTH(pos)] === colors.EMPTY && active[b.NORTH(pos)] === 2)
      || (b.board[b.EAST(pos)] === colors.EMPTY && active[b.EAST(pos)] === 2))
        active[pos] = 3;
    }

    /* Add neighbors of active area so far. */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }
      if (active[pos] !== 0) {
        continue;
      }
      if ((b.ON_BOARD(b.SOUTH(pos)) && active[b.SOUTH(pos)] > 0 && active[b.SOUTH(pos)] < 4)
      || (b.ON_BOARD(b.WEST(pos)) && active[b.WEST(pos)] > 0 && active[b.WEST(pos)] < 4)
      || (b.ON_BOARD(b.NORTH(pos)) && active[b.NORTH(pos)] > 0 && active[b.NORTH(pos)] < 4)
      || (b.ON_BOARD(b.EAST(pos)) && active[b.EAST(pos)] > 0 && active[b.EAST(pos)] < 4))
        active[pos] = 4;
    }

    /* Also add the previously played stones to the active area. */
    for (let r = 0; r < b.stackp; r++){
      active[entry.stack[r]] = 5;
    }

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }
      entry.board[pos] =  active[pos] !== 0 ? b.board[pos] : colors.GRAY;
    }
  },

  mark_string_hotspot_values() {},

  reading_hotspots() {},


  /* ================================================================ */
  /*                  Connection reading functions                    */
  /* ================================================================ */

  /* Look for a valid read result in the persistent connection cache.
   * Return 1 if found, 0 otherwise.
   */
  search_persistent_connection_cache() {},
  store_persistent_connection_cache() {},
  compute_active_connection_area() {},


  /* ================================================================ */
  /*                   Break-in reading functions                     */
  /* ================================================================ */
  search_persistent_breakin_cache() {},
  store_persistent_breakin_cache() {},
  compute_active_breakin_area() {},

  /* ================================================================ */
  /*                    Owl reading functions                         */
  /* ================================================================ */
  search_persistent_owl_cache(routine, apos, bpos, cpos, result, move, move2, certain) {
    return this.search_persistent_cache(this.owl_cache,
      routine, apos, bpos, cpos, colors.EMPTY, null,
      this.owl_node_limit, result, null, move, move2, certain);
  },
  store_persistent_owl_cache(routine, apos, bpos, cpos, result, move, move2, certain, tactical_nodes, goal, goal_color) {
    this.store_persistent_cache(this.owl_cache, routine, apos, bpos, cpos, colors.EMPTY, null,
      result, NO_MOVE, move, move2, certain, this.owl_node_limit,
      tactical_nodes, goal, goal_color);
  },

  compute_active_owl_type_area(goal, goal_color, active) {
    const b = this.board
    const other = b.OTHER_COLOR(goal_color);
    let k, r;
    let pos;

    /* We let the active area be the goal +
     * distance four expansion through empty intersections and own stones +
     * adjacent opponent strings +
     * liberties and neighbors of adjacent opponent strings with less than
     * five liberties +
     * liberties and neighbors of low liberty neighbors of adjacent opponent
     * strings with less than five liberties.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos) && goal[pos]){
        active[pos] = 1;
      }
    }

    /* Distance four expansion through empty intersections and own stones. */
    for (k = 1; k < 5; k++) {
      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (!b.ON_BOARD(pos) || b.board[pos] === other || active[pos] > 0)
          continue;
        if ((b.ON_BOARD(b.SOUTH(pos)) && active[b.SOUTH(pos)] === k)
          || (b.ON_BOARD(b.WEST(pos)) && active[b.WEST(pos)] === k)
          || (b.ON_BOARD(b.NORTH(pos)) && active[b.NORTH(pos)] === k)
          || (b.ON_BOARD(b.EAST(pos)) && active[b.EAST(pos)] === k)) {
          if (b.board[pos] === colors.EMPTY){
            active[pos] = k + 1;
          }
          else{
            b.mark_string(pos, active, (k + 1));
          }
        }
      }
    }

    /* Adjacent opponent strings. */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] !== other || active[pos] !== 0){
        continue;
      }
      for (r = 0; r < 4; r++) {
        let pos2 = pos + b.delta[r];
        if (b.ON_BOARD(pos2) && b.board[pos2] !== other && active[pos2] !== 0) {
          b.mark_string(pos, active, 1);
          break;
        }
      }
    }

    /* Liberties of adjacent opponent strings with less than five liberties +
     * liberties of low liberty neighbors of adjacent opponent strings
     * with less than five liberties.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] === other && active[pos] > 0 && b.countlib(pos) < 5) {
        let libs = [];
        let liberties = b.findlib(pos, 4, libs);
        let adjs = [];
        for (r = 0; r < liberties; r++){
          active[libs[r]] = 1;
        }

        /* Also add liberties of neighbor strings if these are three
         * or less.
         */
        let adj = b.chainlinks(pos, adjs);
        for (r = 0; r < adj; r++) {
          b.mark_string(adjs[r], active, -1);
          if (b.countlib(adjs[r]) <= 3) {
            let s;
            let adjs2 = [];
            liberties = b.findlib(adjs[r], 3, libs);
            for (s = 0; s < liberties; s++)
              active[libs[s]] = 1;
            let adj2 = b.chainlinks(pos, adjs2);
            for (s = 0; s < adj2; s++){
              b.mark_string(adjs2[s], active, -1);
            }
          }
        }
      }
    }
  },

  compute_active_owl_area(entry, goal, goal_color) {
    const b = this.board
    let pos;
    let active = [];
    // memset(active, 0, BOARDMAX);

    /* Add critical moves to the active area. */
    if (b.ON_BOARD1(entry.move)){
      active[entry.move] = 1;
    }

    if (b.ON_BOARD1(entry.move2)){
      active[entry.move2] = 1;
    }

    this.compute_active_owl_type_area(goal, goal_color, active);

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      let value = b.board[pos];
      if (!b.ON_BOARD(pos)){
        continue;
      }
      if (!active[pos]){
        value = colors.GRAY;
      }
      else if (b.IS_STONE(b.board[pos]) && b.countlib(pos) > 4 && active[pos] > 0){
        value |= HIGH_LIBERTY_BIT;
      }

      entry.board[pos] = value;
    }
  },


  /* ================================================================ */
  /*                    Semeai reading functions                      */
  /* ================================================================ */
  search_persistent_semeai_cache() {},
  store_persistent_semeai_cache() {},
  compute_active_semeai_area() {},

  mark_dragon_hotspot_values() {},
  owl_hotspots() {},

}