import { PASS_MOVE, codes, colors } from "./Constants";
/* A persistent connection cache has been implemented, but currently
 * (3.3.15) it does not have much impact on performance. Possible
 * explanations for this include:
 * 1. The active area is too often unnecessarily large.
 * 2. Between the persistent caches of tactical reading and owl
 *    reading, there is not much to gain from also caching the
 *    connection results.
 * 3. There is some bug in the implementation.
 *
 * In order to simplify testing of code modifications, the caching
 * code has been made conditional. Setting
 * USE_PERSISTENT_CONNECTION_CACHE to 0, 1, or 2 has the following
 * effects.
 * 0 - Completely turned off.
 * 1 - Results are stored in the cache but retrieved results are only
 *     compared to the non-cached result. Deviations are reported.
 * 2 - Fully turned on.
 */
// const USE_PERSISTENT_CONNECTION_CACHE = 0
const ADD_CANDIDATE_MOVE = function(){

}

/* from Globals: use alternate connection reading algorithm */
const alternate_connections = 1;

let nodes_connect = 0;

export const ReadConnect = {

  moves_to_connect_in_three_moves(){

  },

  /* Not yet written.
  *
  * Find the complete set of possible moves that can prevent
  * a connection in 5 plies.
  */
  moves_to_prevent_connection_in_three_moves(moves, str1, str2){
    if (this.moves_to_connect_in_three_moves(moves, str1, str2, 0))
      return 1;
    return 0;
  },

  /* Externally callable frontend to recursive_disconnect().
  * Returns WIN if str1 and str2 can be disconnected. 
  */
  disconnect(str1, str2, move){
    const b = this.board
    let i;
    let res = codes.WIN;
    let Moves = [];
    let dummy_move;
    let save_verbose;
    
    if (move[0] == null){
      // move = &dummy_move;
    }
    
    nodes_connect = 0;
    move[0] = PASS_MOVE;
    
    if (alternate_connections) {
      let reading_nodes_when_called = this.get_reading_node_counter();
      // utils: depth相关
      let save_connection_node_limit = this.connection_node_limit;
      let start = 0;
      let tactical_nodes;
 
      if (b.board[str1] === colors.EMPTY || b.board[str2] === colors.EMPTY){
        return codes.WIN;
      }
      str1 = b.find_origin(str1);
      str2 = b.find_origin(str2);
      if (str1 > str2) {
        let tmp = str1;
        str1 = str2;
        str2 = tmp;
      }

  
      this.connection_node_limit *= Math.pow(1.5, -b.stackp + this.depth_modification);
      save_verbose = this.verbose;
      if (this.verbose > 0) {
        this.verbose--;
      }
      // start = gg_cputime();
      // memset(connection_shadow, 0, sizeof(connection_shadow));
      let result = this.recursive_disconnect2(str1, str2, move, 0);
      this.verbose = save_verbose;
      tactical_nodes = this.get_reading_node_counter() - reading_nodes_when_called;
      this.connection_node_limit = save_connection_node_limit;
  
      return result;
    }
  
    Moves[0] = 0;
    this.moves_to_prevent_connection_in_three_moves(Moves, str1, str2);
    if (Moves[0] > 0) {
      res = 0;
    }
    this.order_connection_moves(Moves, str1, str2, b.OTHER_COLOR(b.board[str1]), "disconnect");
    for (let i = 1; (i < Moves[0] + 1) && (res === 0); i++) {
      if (b.trymove(Moves[i], b.OTHER_COLOR(b.board[str1]), "disconnect", str1)) {
        if (!this.recursive_connect(str1, str2, move)) {
          move[0] = Moves[i];
          res = codes.WIN;
        }
        b.popgo();
      }
    }
    return res;
  },

  fast_disconnect() {},
  recursive_disconnect() {},
  quiescence_capture() {},
  prevent_capture_one_move() {},
  recursive_transitivity() {},
  non_transitivity() {},
  recursive_non_transitivity() {},
  order_connection_moves() {},
  reset_connection_node_counter() {},
  get_connection_node_counter() {},

  recursive_connect2() {},
  recursive_disconnect2() {},
  find_connection_moves() {},
  find_string_connection_moves() {},
  add_to_start_queue() {},
  init_connection_data() {},
  find_break_moves() {},
  recursive_break() {},
  recursive_block() {},
  break_in() {},
  block_off() {},
  push_connection_heap_entry() {},
  pop_connection_heap_entry() {},

  ENQUEUE() {},
  ENQUEUE_STONE() {},
  case_6_7_helper() {},
  case_9_10_helper() {},
  case_16_17_18_helper() {},
  spread_connection_distances() {},
  sort_connection_queue_tail() {},
  expand_connection_queue() {},
  clear_connection_data() {},
  compute_connection_distances() {},
  print_connection_distances() {},
  trivial_connection() {},
  does_secure_through_ladder() {},
  ladder_capture() {},
  ladder_capturable() {},
  no_escape_from_atari() {},
  no_escape_from_ladder() {},
  check_self_atari() {},
  common_vulnerabilities() {},
  common_vulnerability() {},
  
}