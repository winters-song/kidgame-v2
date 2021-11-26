import {
  colors, NO_MOVE,
} from './Constants'

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

class PersistentCache {
  constructor(cfg) {
    Object.assign(this, cfg)
  }
  // const int max_size; /* Size of above array. */
  // const int max_stackp; /* Don't store positions with stackp > max_stackp. */
  // const float age_factor; /* Reduce value of old entries with this factor. */
  // const char *name; /* For debugging purposes. */
  // const compute_active_area_fn compute_active_area;
  // struct persistent_cache_entry *table; /* Array of actual results. */
  // int current_size; /* Current number of entries. */
  // int last_purge_position_number;
};

const reading_cache = new PersistentCache({
  max_size: MAX_READING_CACHE_SIZE,
  max_stackp : MAX_READING_CACHE_DEPTH,
  age_factor: 1.0,
  name: "reading cache",
  compute_active_area_fn: compute_active_reading_area,
  table : null,
  current_size: 0,
  last_purge_position_number: -1
})


export const Persistent = {
  /* Store a new read result in the persistent cache. */
  store_persistent_reading_cache(routine, str, result, move, nodes) {
    this.store_persistent_cache(reading_cache, routine,
      str, NO_MOVE, NO_MOVE, colors.EMPTY, null,
      result, NO_MOVE, move, NO_MOVE, -1, -1,
      nodes, shadow, colors.EMPTY);
  },

  /* Generic function that tries to store a cache entry. If the cache
 * is full, we delete the lowest scoring entry.
 *
 * Unused parameters have to be normalized to NO_MOVE by the calling
 * function.
 */
  store_persistent_cache(cache, routine,
    apos, bpos, cpos, color, goal_hash,
    result, result2, move, move2, certain, node_limit,
    cost, goal, goal_color) {
    let entry;
    if (stackp > cache.max_stackp){
      return;
    }

    /* If cache is still full, consider kicking out an old entry. */
    if (cache.current_size == cache.max_size) {
      let worst_entry = -1;
      let worst_score = cost;
      let k;

      for (k = 0; k < cache.current_size; k++) {
        if (cache.table[k].score < worst_score) {
          worst_score = cache.table[k].score;
          worst_entry = k;
        }
      }

      if (worst_entry != -1) {
        /* Move the last entry in the cache here to make space.
         */
        if (worst_entry < cache.current_size - 1)
        cache.table[worst_entry] = cache.table[cache.current_size - 1];
        cache.current_size--;
      }
      else
        return;
    }

    entry = cache.table[cache.current_size];
    entry.boardsize  	 = board_size;
    entry.routine    	 = routine;
    entry.apos	     	 = apos;
    entry.bpos	     	 = bpos;
    entry.cpos	     	 = cpos;
    entry.color	     	 = color;
    if (goal_hash){
      entry.goal_hash	 = goal_hash;
    }
    entry.result     	 = result;
    entry.result2     	 = result2;
    entry.result_certain  = certain;
    entry.node_limit      = node_limit;
    entry.remaining_depth = depth - stackp;
    entry.move	         = move;
    entry.move2	         = move2;
    entry.score 		 = cost;
    entry.cost 		 = cost;
    entry.movenum 	 = movenum;

    for (let r = 0; r < MAX_CACHE_DEPTH; r++) {
      if (r < stackp)
        get_move_from_stack(r, entry.stack[r], entry.move_color[r]);
      else {
        entry.stack[r] = 0;
        entry.move_color[r] = EMPTY;
      }
    }

    /* Remains to set the board. */
    cache.compute_active_area(cache.table[cache.current_size], goal, goal_color);
    cache.current_size++;

    // if (debug & DEBUG_PERSISTENT_CACHE) {
    //   gprintf("%oEntered position in %s:\n", cache.name);
    //   print_persistent_cache_entry(entry);
    //   gprintf("%oCurrent size: %d\n", cache.current_size);
    // }
  }
}