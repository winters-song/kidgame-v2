import {PASS_MOVE, codes, colors, NO_MOVE} from "./Constants";
import {routine_id} from "./Liberty";
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


const FIXED_POINT_BASIS = 10000
const FP = (x) => Math.floor(0.5 + FIXED_POINT_BASIS * x)
const FIXED_TO_FLOAT = (x) => (x / FIXED_POINT_BASIS)

const HUGE_CONNECTION_DISTANCE = FP(100.0)


const MAX_MOVES =362


class Zone {
  array = [0];
  bits = [];
  i;
}

class ConnectionData {
  distances = [];
  deltas = [];
  coming_from = [];
  vulnerable1 = [];
  vulnerable2 = [];
  queue = [];
  queue_start;
  queue_end;

  heap_data_size;
  heap_size;
  heap_data = []
  heap = []

  target;
  cutoff_distance;
  speculative;
};


// const USE_PERSISTENT_CONNECTION_CACHE = 0
const ADD_CANDIDATE_MOVE = function(){

}

/* from Globals: use alternate connection reading algorithm */
const alternate_connections = 1;

let nodes_connect = 0;

let global_connection_node_counter = 0;





export const ReadConnect = {

  add_zone () {},

  /* Adds an integer to an array of integers if it is not already there.
   * The number of elements of the array is in array[0].
   */
  add_array (array, elt) {
    for (let r = 1; r < array[0] + 1; r++){
      if (array[r] === elt){
        return 0;
      }
    }

    array[0]++;
    array[array[0]] = elt;
    return 1;
  },

  /* test if an element is part of an array */
  element_array (array, elt) {
    for (let r = 1; r < array[0] + 1; r++){
      if (array[r] === elt) {
        return 1;
      }
    }
    return 0;
  },

  /* only keep the elements of array1 which are also in array2 */
  intersection_array (array1, array2) {
    for (let r = 1; r < array1[0] + 1; r++) {
      if (!this.element_array(array2, array1[r])) {
        for (let s = r; s < array1[0]; s++){
          array1[s] = array1[s+1];
        }
        array1[0]--;
        r--;
      }
    }
  },

  /* verifies that capturing the stone at str is not a snapback */
  snapback (str) {
    const b = this.board
    let stones, liberties, lib = [];
    // SGFTree *save_sgf_dumptree = sgf_dumptree;

    /* if more than one stone captured, not a snapback */
    stones = b.countstones(str);
    if (stones > 1)
      return 0;

    /* if more than one liberty, not a snapback */
    liberties = b.findlib(str, 1, lib);
    if (liberties > 1){
      return 0;
    }

    /* turn off the sgf traces
     */
    // sgf_dumptree = NULL;

    /* if only one liberty after capture */
    if (b.trymove(lib[0], b.OTHER_COLOR(b.board[str]), "snapback", str)) {
      liberties = 0;
      if (b.IS_STONE(b.board[lib[0]])){
        liberties = b.countlib(lib[0]);
      }
      b.popgo();
      // sgf_dumptree = save_sgf_dumptree;
      if (liberties > 1){
        return 0;
      }
      return codes.WIN;
    }

    /* Turn the sgf traces back on. */
    // sgf_dumptree = save_sgf_dumptree;

    return 0;
  },
  ponnuki_connect () {},
  /* Verifies that the strings str1 and str2 can be connected
   * directly by playing one move, either by playing a common liberty
   * of the two strings, or by capturing a common adjacent string.
   *
   * This is the gi1 game function.
   */
  connection_one_move (str1, str2) {
    let moves = [];
    let zn = new Zone();
    moves[0] = 0;
    return this.moves_connection_one_move(moves, str1, str2, zn);
  },

  /* If the two strings str1 and str2 can be connected sends back WIN fill the
   * array moves with the only move that can prevent a connection in one move
   * (common liberties, liberties of common adjacent strings in atari).
   *
   * This is the ip1 game function. */
  prevent_connection_one_move (moves, str1, str2) {
    const b = this.board
    let r, s;
    let libs = [];
    let adj, adjs = [];
    let adjadj, adjadjs = [];

    /* Common liberties. */
    if (b.have_common_lib(str1, str2, libs)) {
      this.add_array(moves, libs[0]);
      return codes.WIN;
    }

    /* Save a common adjacent string in atari, more than one stone, no snapback.
     */
    adj = b.chainlinks2(str1, adjs, 1);
    for (r = 0; r < adj; r++){
      if (b.adjacent_strings(adjs[r], str2)
        && !this.snapback(adjs[r])) {
        b.findlib(adjs[r], b.MAXLIBS, libs);
        this.add_array(moves, libs[0]);
        adjadj = b.chainlinks2(adjs[r], adjadjs, 1);
        for (s = 0; s < adjadj; s++) {
          b.findlib(adjadjs[s], b.MAXLIBS, libs);
          this.add_array(moves, libs[0]);
        }
        return codes.WIN;
      }
    }

    return 0;
  },
  connected_one_move () {},

  /* Find the moves that might be able to connect in less than three plies.
   * That is moves that can connect the strings if another move of the same
   * color is played just after:
   * - common liberties of the two strings;
   * - moves on the liberties of an opponent string with less than two
   *   liberties adjacent to both strings, or adjacent to one string and
   *   that has a common liberty with the second string;
   * - liberties of one string that are second order liberties of the
   *   other string.
   *
   * Returns WIN if a direct connection has been found. Returns 0
   * otherwise.
   */
  moves_to_connect_in_two_moves (moves, str1, str2) {
    const b = this.board
    let r, s, common_adj_liberty;
    let liberties, libs = [];
    let adj, adjs = [];
    let adjadj, adjadjs = [];
    let k;
    const color = b.board[str1];
    let move = [];

    /* Common liberties. */
    if (b.have_common_lib(str1, str2, libs)) {
      this.add_array(moves, libs[0]);
      return 1;
    }

    /* Capture a common adjacent string or an adjacent liberty of str1
     * that has a common liberty with str2...
     */
    adj = b.chainlinks3(str1, adjs, 2);
    for (r = 0; r < adj; r++) {
      liberties = b.findlib(adjs[r], b.MAXLIBS, libs);
      common_adj_liberty = 0;
      for (s = 0; s < liberties; s++){
        if (b.liberty_of_string(libs[s], str2)){
          common_adj_liberty = 1;
        }
      }
      if (common_adj_liberty || b.adjacent_strings(adjs[r], str2)) {
        for (s = 0; s < liberties; s++){
          this.add_array(moves, libs[s]);
        }
        adjadj = b.chainlinks2(adjs[r], adjadjs, 1);
        for (s = 0; s < adjadj; s++) {
          b.findlib(adjadjs[s], b.MAXLIBS, libs);
          this.add_array(moves, libs[0]);
        }
      }
    }

    /* ...and vice versa. */
    adj = b.chainlinks3(str2, adjs, 2);
    for (r = 0; r < adj; r++) {
      liberties = b.findlib(adjs[r], b.MAXLIBS, libs);
      common_adj_liberty = 0;
      for (s = 0; s < liberties; s++){
        if (b.liberty_of_string(libs[s], str1)){
          common_adj_liberty = 1;
        }
      }
      if (common_adj_liberty || b.adjacent_strings(adjs[r], str1)) {
        for (s = 0; s < liberties; s++){
          this.add_array(moves, libs[s]);
        }
        adjadj = b.chainlinks2(adjs[r], adjadjs, 1);
        for (s = 0; s < adjadj; s++) {
          b.findlib(adjadjs[s], b.MAXLIBS, libs);
          this.add_array(moves, libs[0]);
        }
      }
    }

    /* Liberties of str1 that are second order liberties of str2 and
     * vice versa.
     */
    liberties = b.findlib(str1, b.MAXLIBS, libs);
    for (r = 0; r < liberties; r++) {
      if (b.board[b.SOUTH(libs[r])] === colors.EMPTY) {
        if (b.liberty_of_string(b.SOUTH(libs[r]), str2)) {
          this.add_array(moves, libs[r]);
          this.add_array(moves, b.SOUTH(libs[r]));
        }
      }

      if (b.board[b.WEST(libs[r])] === colors.EMPTY) {
        if (b.liberty_of_string(b.WEST(libs[r]), str2)) {
          this.add_array(moves, libs[r]);
          this.add_array(moves, b.WEST(libs[r]));
        }
      }

      if (b.board[b.NORTH(libs[r])] === colors.EMPTY) {
        if (b.liberty_of_string(b.NORTH(libs[r]), str2)) {
          this.add_array(moves, libs[r]);
          this.add_array(moves, b.NORTH(libs[r]));
        }
      }

      if (b.board[b.EAST(libs[r])] === colors.EMPTY) {
        if (b.liberty_of_string(b.EAST(libs[r]), str2)) {
          this.add_array(moves, libs[r]);
          this.add_array(moves, b.EAST(libs[r]));
        }
      }
    }

    /* Liberties of str1 which are adjacent to a friendly string with
     * common liberty with str2.
     */
    liberties = b.findlib(str1, b.MAXLIBS, libs);
    for (r = 0; r < liberties; r++) {
      for (k = 0; k < 4; k++) {
        let pos = libs[r] + b.delta[k];
        if (b.board[pos] === color
          && !b.same_string(pos, str1)
          && this.quiescence_connect(pos, str2, move)) {
          this.add_array(moves, libs[r]);
          this.add_array(moves, move[0]);
        }
      }
    }

    /* And vice versa. */
    liberties = b.findlib(str2, b.MAXLIBS, libs);
    for (r = 0; r < liberties; r++) {
      for (k = 0; k < 4; k++) {
        let pos = libs[r] + b.delta[k];
        if (b.board[pos] === color
          && !b.same_string(pos, str2)
          && this.quiescence_connect(pos, str1, move)) {
          this.add_array(moves, libs[r]);
          this.add_array(moves, move[0]);
        }
      }
    }

    return 0;
  },

  /* Tests if the strings can be connected in three plies starts
   * with finding the possible moves that can connect.  If two
   * moves in a row are played, then try them and stops at the
   * first working move.  The strings are connected in two moves
   * if the function connected_one_move is verified after a move.
   *
   * This is the gi2 game function.
   */
  connection_two_moves (str1, str2) {
    const b = this.board
    let r, res = 0, moves = [];
    // SGFTree *save_sgf_dumptree = sgf_dumptree;

    /* If one string is missing we have already failed. */
    if (b.board[str1] === colors.EMPTY || b.board[str2] === colors.EMPTY){
      return 0;
    }

    moves[0] = 0;
    if (this.moves_to_connect_in_two_moves(moves, str1, str2)){
      return codes.WIN;
    }
    this.order_connection_moves(moves, str1, str2, b.board[str1], "connection_two_moves");

    /* turn off the sgf traces
     */
    // sgf_dumptree = NULL;

    for (r = 1; ((r < moves[0] + 1) && !res); r++) {
      if (b.trymove(moves[r], b.board[str1], "connection_two_moves", str1)) {
        if (this.connected_one_move(str1, str2)){
          res = codes.WIN;
        }
        b.popgo();
      }
    }

    // sgf_dumptree = save_sgf_dumptree;

    return res;
  },

  /* Find the complete set of possible moves that can prevent
   * a connection in three plies.
   *
   * The function is not yet written, but moves_to_connect_in_two_moves does
   * a similar job, so it is called temporarly.
   */
  moves_to_prevent_connection_in_two_moves (moves, str1, str2) {
    if (this.moves_to_connect_in_two_moves(moves, str1, str2)){
      return 1;
    }
    return 0;
  },

  /* Find all the moves that prevent to connect in a three plies
   * deep search and put them in the moves array.  Returns 0 if
   * there is no three plies connection, or else it tries all the
   * possible preventing moves.  If after a possible preventing
   * moves, there no connection in one move and no connection in
   * two moves, then the moves prevents a three plies deep
   * connection, and it is added to the moves array.
   *
   * this is the ip2 game function */
  prevent_connection_two_moves (moves, str1, str2) {
    const b = this.board
    let r, res = 0;
    let possible_moves = [];
    // SGFTree *save_sgf_dumptree = sgf_dumptree;

    /* turn off the sgf traces
     */
    // sgf_dumptree = NULL;

    if (this.connection_two_moves(str1, str2)) {
      res = codes.WIN;
      possible_moves[0] = 0;
      this.moves_to_prevent_connection_in_two_moves(possible_moves, str1, str2);
      this.order_connection_moves(possible_moves, str1, str2, b.OTHER_COLOR(b.board[str1]), "prevent_connection_two_moves");
      for (r = 1; r < possible_moves[0] + 1; r++) {
        if (b.trymove(possible_moves[r], b.OTHER_COLOR(b.board[str1]), "prevent_connection_two_moves", str1)) {
          if (!this.connection_one_move(str1, str2)){
            if (!this.connection_two_moves(str1, str2)){
              this.add_array(moves, possible_moves[r]);
            }
          }
          b.popgo();
        }
      }
    }

    // sgf_dumptree = save_sgf_dumptree;

    return res;
  },

  /* Only partially written.
   *
   * Find all the moves than can connect if two subsequent
   * moves of the same color are played after
   * - common liberties;
   * - liberties of common adjacent strings with 3 liberties or less;
   * - liberties of adjacent strings with 2 liberties or less that have
   *   liberties that are second order liberties of the other string;
   * - liberties of one string that are second order liberties of the
   *   other string;
   * - second order liberties of the first string that are second order
   *   liberties of the other string;
   *
   * A function that computes the second order liberties of a string is
   * needed as well as a function that checks efficiently if an
   * intersection is a second order liberty of a given string.
   *
   * If does_connect is 1, generate moves to connect, otherwise generate
   * moves to disconnect.
   */
  moves_to_connect_in_three_moves(moves, str1, str2, does_connect){
    const b = this.board
    let r, s;
    let liberties, libs = [];
    let liberties2, libs2 = [];
    let adj, adjs = [];
    let adjadj, adjadjs = [];
    let move = [];
    let k;
    let pos;
    let secondlib1 = [];
    let secondlib2 = [];

    if (this.moves_to_connect_in_two_moves(moves, str1, str2)){
      return 1;
    }

    /* Find second order liberties of str1. */
    // memset(secondlib1, 0, sizeof(secondlib1));
    liberties = b.findlib(str1, b.MAXLIBS, libs);
    for (r = 0; r < liberties; r++)
      for (k = 0; k < 4; k++) {
        pos = libs[r] + b.delta[k];
        if (b.board[pos] === colors.EMPTY) {
          secondlib1[pos] = 1;
        }
        else if (b.board[pos] === b.board[str1]) {
          liberties2 = b.findlib(pos, b.MAXLIBS, libs2);
          for (s = 0; s < liberties2; s++){
            secondlib1[libs2[s]] = 1;
          }
        }
      }

    /* Find second order liberties of str2.
     */
    // memset(secondlib2, 0, sizeof(secondlib2));
    liberties = b.findlib(str2, b.MAXLIBS, libs);
    for (r = 0; r < liberties; r++)
      for (k = 0; k < 4; k++) {
        pos = libs[r] + b.delta[k];
        if (b.board[pos] === colors.EMPTY){
          secondlib2[pos] = 1;
        }
        else if (b.board[pos] === b.board[str2]) {
          liberties2 = b.findlib(pos, b.MAXLIBS, libs2);
          for (s = 0; s < liberties2; s++){
            secondlib2[libs2[s]] = 1;
          }
        }
      }

    /* Second order liberties of str1 that are second order liberties
     * of str2 and vice versa.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (secondlib1[pos] && secondlib2[pos]){
        this.add_array(moves, pos);
      }
    }

    /* Capture a neighbor of str1 which is in atari. The captured string
     * must in turn have a neighbor which can connect to str2 easily.
     */
    adj = b.chainlinks2(str1, adjs, 1);
    for (r = 0; r < adj; r++) {
      adjadj = b.chainlinks(adjs[r], adjadjs);
      for (s = 0; s < adjadj; s++) {
        if (!b.same_string(adjadjs[s], str1)
          && this.quiescence_connect(adjadjs[s], str2, move)) {
          b.findlib(adjs[r], 1, libs);
          this.add_array(moves, libs[0]);
          this.add_array(moves, move[0]);
        }
      }
    }

    /* And vice versa. */
    adj = b.chainlinks2(str2, adjs, 1);
    for (r = 0; r < adj; r++) {
      adjadj = b.chainlinks(adjs[r], adjadjs);
      for (s = 0; s < adjadj; s++) {
        if (!b.same_string(adjadjs[s], str2)
          && this.quiescence_connect(adjadjs[s], str1, move)) {
          b.findlib(adjs[r], 1, libs);
          this.add_array(moves, libs[0]);
          this.add_array(moves, move[0]);
        }
      }
    }

    /* Liberties of neighbor of str1 with at most two liberties, which
     * are second order liberties of str2.
     */
    adj = b.chainlinks3(str1, adjs, 2);
    for (r = 0; r < adj; r++) {
      liberties = b.findlib(adjs[r], 2, libs);
      for (s = 0; s < liberties; s++){
        if (b.second_order_liberty_of_string(libs[s], str2)){
          this.add_array(moves, libs[s]);
        }
      }
    }

    /* And vice versa. */
    adj = b.chainlinks3(str2, adjs, 2);
    for (r = 0; r < adj; r++) {
      liberties = b.findlib(adjs[r], 2, libs);
      for (s = 0; s < liberties; s++){
        if (b.second_order_liberty_of_string(libs[s], str1)){
          this.add_array(moves, libs[s]);
        }
      }
    }

    /* Move in on a three liberty opponent string which is adjacent to
     * str1 and has a liberty in common with str2.
     */
    adj = b.chainlinks2(str1, adjs, 3);
    for (r = 0; r < adj; r++) {
      if (b.have_common_lib(adjs[r], str2, null)) {
        liberties = b.findlib(adjs[r], 3, libs);
        for (s = 0; s < liberties; s++) {
          /* If generating a connecting move, require the liberty to be
                 * no further than diagonal to a second order liberty of one
                 * of the strings.
           */
          for (k = 0; k < 8; k++) {
            if (!does_connect || (b.ON_BOARD(libs[s] + b.delta[k])
                && (secondlib1[libs[s] + b.delta[k]] || secondlib2[libs[s] + b.delta[k]]))) {
              this.add_array(moves, libs[s]);
              break;
            }
          }
        }
      }
    }

    /* And vice versa. */
    adj = b.chainlinks2(str2, adjs, 3);
    for (r = 0; r < adj; r++) {
      if (b.have_common_lib(adjs[r], str1, null)) {
        liberties = b.findlib(adjs[r], 3, libs);
        for (s = 0; s < liberties; s++) {
          /* If generating a connecting move, require the liberty to be
                 * no further than diagonal to a second order liberty of one
                 * of the strings.
           */
          for (k = 0; k < 8; k++) {
            if (!does_connect  || (b.ON_BOARD(libs[s] + b.delta[k])
                && (secondlib1[libs[s] + b.delta[k]] || secondlib2[libs[s] + b.delta[k]]))) {
              this.add_array(moves, libs[s]);
              break;
            }
          }
        }
      }
    }

    return 0;
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

  simply_connected_two_moves () {},
  simple_connection_three_moves () {},

  /* Find the forced moves that prevent a simple depth 5 connection.
   * Fills the array moves with the forced moves.
   *
   * This is the ip311 game function.
   *
   * It finds moves in very important situations such as:
   *
   * + + + O + +
   * + @ @ O + +
   * + @ O @ @ +
   * + @ O + + +
   * + + + + + +
   * - - - - - -
   *
   * and enables recursive_disconnect to prove the two black
   * strings are connected in these situations.
   */
  prevent_simple_connection_three_moves (moves, str1, str2) {
    const b = this.board
    let r, res = 0;
    let possible_moves = [];
    // SGFTree *save_sgf_dumptree = sgf_dumptree;

    /* turn off the sgf traces
     */
    // sgf_dumptree = NULL;


    if (this.simple_connection_three_moves(str1, str2)) {
      res = codes.WIN;
      possible_moves[0] = 0;
      this.moves_to_prevent_connection_in_three_moves(possible_moves, str1, str2);
      this.order_connection_moves(moves, str1, str2, b.OTHER_COLOR(b.board[str1]), "prevent_simple_connection_three_moves");
      for (r = 1; r < possible_moves[0] + 1; r++) {
        if (b.trymove(possible_moves[r], b.OTHER_COLOR(b.board[str1]), "prevent_simple_connection_three_moves", str1)) {
          if (!this.connection_one_move(str1, str2)) {
            if (!this.connection_two_moves(str1, str2)) {
              if (!this.simple_connection_three_moves(str1, str2)) {
                this.add_array(moves, possible_moves[r]);
              }
            }
          }
          b.popgo();
        }
      }
    }

    // sgf_dumptree = save_sgf_dumptree;

    return res;
  },

  /* Find simple connections by looking at common liberties
   * or directly capturing a common adjacent string without a snapback
   * or looking at a ladder for a common adjacent string.
   */
  quiescence_connect (str1, str2, move) {
    const b = this.board
    let r;
    let lib = [];
    let adj, adjs = [];

    /* Common liberties. */
    if (b.have_common_lib(str1, str2, lib)) {
      move[0] = lib[0];
      return codes.WIN;
    }

    /* Common adjacent string in atari, more than one stone, no snapback. */
    adj = b.chainlinks2(str1, adjs, 1);
    for (r = 0; r < adj; r++){
      if (b.adjacent_strings(adjs[r], str2) && !this.snapback(adjs[r])) {
        b.findlib(adjs[r], 1, move);
        return codes.WIN;
      }
    }

    /* Common adjacent string two liberties, read ladder. */
    adj = b.chainlinks2(str1, adjs, 2);
    for (r = 0; r < adj; r++){
      if (b.adjacent_strings(adjs[r], str2)){
        if (this.quiescence_capture(adjs[r], move)){
          return codes.WIN;
        }
      }
    }

    return 0;
  },

  /* Externally callable frontend to recursive_connect().
   * Returns WIN if str1 and str2 can be connected.
   */
  string_connect (str1, str2, move) {
    const b = this.board
    let dummy_move = [];
    let save_verbose;
    let result;

    if (move[0] === null){
      move[0] = dummy_move;
    }

    nodes_connect = 0;
    move[0] = PASS_MOVE;

    if (alternate_connections) {
      // let reading_nodes_when_called = this.get_reading_node_counter();
      let save_connection_node_limit = this.connection_node_limit;

      if (b.board[str1] === colors.EMPTY || b.board[str2] === colors.EMPTY){
        return 0;
      }
      str1 = b.find_origin(str1);
      str2 = b.find_origin(str2);
      if (str1 > str2) {
        let tmp = str1;
        str1 = str2;
        str2 = tmp;
      }

      this.connection_node_limit *= Math.pow(1.45, - b.stackp + this.get_depth_modification());
      save_verbose = this.verbose;
      if (this.verbose > 0) {
        this.verbose--;
      }
      // start = gg_cputime();
      result = this.recursive_connect2(str1, str2, move, 0);
      this.verbose = save_verbose;
      this.connection_node_limit = save_connection_node_limit;

      return result;
    }

    return this.recursive_connect(str1, str2, move);
  },

  /* returns WIN if str1 and str2 can be connected. */
  recursive_connect (str1, str2, move) {
    const b = this.board
    let i, res = 0, Moves = [], ForcedMoves = [];
    // SETUP_TRACE_INFO2("recursive_connect", str1, str2);

    if (b.board[str1] === colors.EMPTY || b.board[str2] === colors.EMPTY) {
      // SGFTRACE2(PASS_MOVE, 0, "one string already captured");
      return 0;
    }

    if (b.same_string(str1, str2)) {
      // SGFTRACE2(PASS_MOVE, WIN, "already connected");
      return codes.WIN;
    }

    if (nodes_connect > this.connection_node_limit) {
      // SGFTRACE2(PASS_MOVE, 0, "connection node limit reached");
      return 0;
    }

    if (b.stackp === this.connect_depth) {
      // SGFTRACE2(PASS_MOVE, 0, "connection depth limit reached");
      return 0;
    }

    nodes_connect++;
    global_connection_node_counter++;

    if (this.quiescence_connect (str1, str2, move)) {
      // SGFTRACE2(*move, WIN, "quiescence_connect");
      return codes.WIN;
    }

    ForcedMoves[0] = 0;
    Moves[0] = 0;
    /* if one of the strings to connect can be captured
     * and there are forced moves to prevent the capture
     * then the only moves to try are the moves that
     * defend the string: all the other moves will
     * lead to the capture of the string
     */
    if (!this.prevent_capture_one_move(ForcedMoves, str1)){
      this.prevent_capture_one_move(ForcedMoves, str2);
    }

    /* We are at a max node, so any move we can find
     * is ok. Try moves that can connect in three moves
     * because the function that prevent connection in one
     * and two moves are called at AND nodes.
     */
    this.moves_to_connect_in_three_moves(Moves, str1, str2, 1);

    /* if there are some forced moves to prevent the capture
     * of one of the two strings, then we only look at
     * the moves that prevent capture and that might also
     * connect
     */
    if (ForcedMoves[0] !== 0 && Moves[0] !== 0){
      this.intersection_array(Moves, ForcedMoves);
    }

    this.order_connection_moves(Moves, str1, str2, b.board[str1], "recursive_connect");
    for (i = 1; ((i < Moves[0] + 1) && (res == 0)); i++) {
      if (b.trymove(Moves[i], b.board[str1], "recursive_connect", str1)) {
        if (!this.recursive_disconnect(str1, str2, move)) {
          move[0] = Moves[i];
          res = codes.WIN;
        }
        b.popgo();
      }
    }

    // if (res == codes.WIN) {
    //   SGFTRACE2(*move, WIN, "success");
    // }
    // else {
    //   SGFTRACE2(PASS_MOVE, 0, "failure");
    // }

    return res;
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

  /* Returns WIN if str1 and str2 can be disconnected. */
  recursive_disconnect(str1, str2, move) {
    const b = this.board;
    let i, res = codes.WIN, Moves = [];

    // SETUP_TRACE_INFO2("recursive_disconnect", str1, str2);

    if (b.board[str1] === colors.EMPTY || b.board[str2] === colors.EMPTY) {
      // SGFTRACE2(PASS_MOVE, WIN, "one string already captured");
      return codes.WIN;
    }

    if (this.quiescence_capture(str1, move)) {
      // SGFTRACE2(*move, codes.WIN, "first string capturable");
      return codes.WIN;
    }
    if (this.quiescence_capture(str2, move)) {
      // SGFTRACE2(*move, codes.WIN, "second string capturable");
      return codes.WIN;
    }

    if (b.same_string(str1, str2)) {
      // SGFTRACE2(PASS_MOVE, 0, "already connected");
      return 0;
    }

    if (nodes_connect > this.connection_node_limit) {
      // SGFTRACE2(PASS_MOVE, codes.WIN, "connection node limit reached");
      return codes.WIN;
    }

    if (b.stackp === this.connect_depth) {
      // SGFTRACE2(PASS_MOVE, codes.WIN, "connection depth limit reached");
      return codes.WIN;
    }

    nodes_connect++;
    global_connection_node_counter++;

    /* we are at an and node
     * only look at forced moves here,
     * it ensures that the result of recursive_disconnect
     * is proved if it returns 0 (that is connections are proved)
     */
    Moves[0] = 0;

    if (this.prevent_connection_one_move(Moves, str1, str2)){
      res = 0;
    }
    else if (this.prevent_connection_two_moves(Moves, str1, str2)){
      res = 0;
    }
    else if (this.prevent_simple_connection_three_moves(Moves, str1, str2)){
      res = 0;
    }

    if (res === 0){
      this.order_connection_moves(Moves, str1, str2, b.OTHER_COLOR(b.board[str1]), "recursive_disconnect");
    }
    for (i = 1; ((i < Moves[0] + 1) && (res === 0)); i++)
      if (b.trymove(Moves[i], b.OTHER_COLOR(b.board[str1]), "recursive_disconnect", str1)) {
        if (!this.recursive_connect(str1, str2, move)) {
          move[0] = Moves[i];
          res = codes.WIN;
        }
        b.popgo();
      }

    // if (res == codes.WIN) {
    //   SGFTRACE2(*move, codes.WIN, "success");
    // }
    // else {
    //   SGFTRACE2(PASS_MOVE, 0, "failure");
    // }

    return res;
  },

  /* Reads simple ladders.*/
  quiescence_capture(str, move) {
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // let save_count_variations = count_variations;
    let result = 0;
    const b = this.board

    /* We turn off the sgf traces here to avoid cluttering them up with
     * naive_ladder moves.
     */
    // sgf_dumptree = NULL;
    // count_variations = 0;

    if (b.countlib(str) === 1) {
      b.findlib(str, 1, move);
      result = codes.WIN;
    }
    else if (b.countlib(str) === 2) {
      result = this.simple_ladder(str, move);
    }

    /* Turn the sgf traces back on. */
    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;

    return result;
  },

  /* Find all the possible moves that can prevent the capture
   * of a string in atari.
   *
   * The ip1 game function.
   */
  prevent_capture_one_move(moves, str1) {
    const b = this.board
    let r, res = 0;
    let libs = [];
    let adj, adjs = [];

    let liberties = b.findlib(str1, b.MAXLIBS, libs);
    if (liberties === 1) {
      this.add_array(moves, libs[0]);
      res = codes.WIN;
      adj = b.chainlinks2(str1, adjs, 1);
      for (r = 0; r < adj; r++) {
        b.findlib(adjs[r], 1, libs);
        this.add_array(moves, libs[0]);
      }
    }
    return res;
  },

  recursive_transitivity() {},
  non_transitivity() {},
  recursive_non_transitivity() {},

  /* Order the moves so that we try the ones likely to succeed early. */
  order_connection_moves(moves, str1, str2, color_to_move, funcname) {
    const b = this.board
    let scores = [];
    let r;
    let i, j;

    for (r = 1; r <= moves[0]; r++) {
      let move = moves[r];

      /* Look at the neighbors of this move and count the things we
       * find. Friendly and opponent stones are related to color, i.e.
       * the player to move, not to the color of the string.
       *
       * We don't use all these values. They are only here so we can
       * reuse incremental_order_moves() which was developed for the
       * tactical reading.
       */
      let number_edges       = [0]; /* outside board */
      let number_same_string = [0]; /* the string being attacked */
      let number_own         = [0]; /* friendly stone */
      let number_opponent    = [0]; /* opponent stone */
      let captured_stones    = [0]; /* number of stones captured by this move */
      let threatened_stones  = [0]; /* number of stones threatened by this move */
      let saved_stones       = [0]; /* number of stones in atari saved */
      let number_open        = [0]; /* empty intersection */
      let libs;

      /* We let the incremental board code do the heavy work. */
      this.incremental_order_moves(move, color_to_move, str1, number_edges,
        number_same_string, number_own, number_opponent, captured_stones,
        threatened_stones, saved_stones, number_open);

      scores[r] = 0;
      libs = b.approxlib(move, color_to_move, 10, null);

      /* Avoid self atari. */
      if (libs === 1 && captured_stones === 0){
        scores[r] -= 10;
      }

      /* Good to get many liberties. */
      if (libs < 4){
        scores[r] += libs;
      }
      else{
        scores[r] += 4;
      }

      /* Very good to capture opponent stones. */
      if (captured_stones[0] > 0){
        scores[r] += 5 + captured_stones[0];
      }

      /* Good to threaten opponent stones. */
      if (threatened_stones[0] > 0){
        scores[r] += 3;
      }

      /* Extremely good to save own stones. */
      if (saved_stones[0] > 0)
        scores[r] += 10 + saved_stones[0];
    }

    /* Now sort the moves.  We use selection sort since this array will
     * probably never be more than 10 moves long.  In this case, the
     * overhead imposed by quicksort will probably overshadow the gains
     * given by the O(n*log(n)) behaviour over the O(n^2) behaviour of
     * selection sort.
     */
    for (i = 1; i <= moves[0]; i++) {
      /* Find the move with the biggest score. */
      let maxscore = scores[i];
      let max_at = i;
      for (j = i+1; j <= moves[0]; j++) {
        if (scores[j] > maxscore) {
          maxscore = scores[j];
          max_at = j;
        }
      }

      /* Now exchange the move at i with the move at max_at.
       * Don't forget to exchange the scores as well.
       */
      if (max_at !== i) {
        let temp = moves[i];
        let tempmax = scores[i];

        moves[i] = moves[max_at];
        scores[i] = scores[max_at];

        moves[max_at] = temp;
        scores[max_at] = tempmax;
      }
    }
  },
  reset_connection_node_counter() {},
  get_connection_node_counter() {},


  /* Try to connect two strings. This function is called in a mutual
   * recursion with recursive_disconnect2(). Return codes is identical to
   * the tactical reading functions. For the has_passed parameter, see the
   * documentation of recursive_disconnect2().
   *
   * The algorithm is
   * 1. Check if the strings are trivially connected or disconnected or
   *    the result is already cached.
   * 2. Find connection moves.
   * 3. Try one move at a time and call recursive_disconnect2() to see
   *    whether we were successful.
   * 4. If no move was found we assume success if the connection
   *    distance was small and failure otherwise.
   */
  recursive_connect2(str1, str2, move, has_passed) {
    const b = this.board
    let color = b.board[str1];
    let moves = [];
    let num_moves;
    let distance = FP(0.0);
    let k;
    let xpos = [];
    let savemove = NO_MOVE;
    let savecode = 0;
    let tried_moves = 0;
    let value = [];

    // SETUP_TRACE_INFO2("recursive_connect2", str1, str2);

    if (move){
      move[0] = NO_MOVE;
    }

    nodes_connect++;
    global_connection_node_counter++;

    if (b.board[str1] === colors.EMPTY || b.board[str2] === colors.EMPTY) {
      // SGFTRACE2(PASS_MOVE, 0, "one string already captured");
      return 0;
    }

    if (b.same_string(str1, str2)) {
      // SGFTRACE2(PASS_MOVE, WIN, "already connected");
      return codes.WIN;
    }

    if (nodes_connect > this.connection_node_limit) {
      // SGFTRACE2(PASS_MOVE, 0, "connection node limit reached");
      return 0;
    }

    if (b.stackp > this.connect_depth2) {
      // SGFTRACE2(PASS_MOVE, 0, "connection depth limit reached");
      return 0;
    }

    str1 = b.find_origin(str1);
    str2 = b.find_origin(str2);

    if (b.stackp <= this.depth && !has_passed
    && this.tt_get(this.ttable, routine_id.CONNECT, str1, str2, this.depth - b.stackp, null, value, null, xpos) === 2) {
      // TRACE_CACHED_RESULT2(value, value, xpos);
      if (value[0] !== 0){
        if (move){
          move[0] = xpos[0];
        }
      }

      // SGFTRACE2(xpos, value, "cached");
      return value;
    }

    if (this.trivial_connection(str1, str2, xpos[0]) === codes.WIN) {
      // SGFTRACE2(xpos, WIN, "trivial connection");
      this.READ_RETURN_CONN(routine_id.CONNECT, str1, str2, this.depth - b.stackp, move, xpos, codes.WIN);
    }

    num_moves = this.find_string_connection_moves(str1, str2, color, moves, distance);

    for (k = 0; k < num_moves; k++) {
      let ko_move = [];
      xpos[0] = moves[k];

      if (b.komaster_trymove(xpos[0], color, "recursive_connect2", str1, ko_move, b.stackp <= this.ko_depth && savecode === 0)) {
        tried_moves++;
        if (!ko_move[0]) {
          let acode = this.recursive_disconnect2(str1, str2, null, has_passed);
          b.popgo();
          if (acode === 0) {
            // SGFTRACE2(xpos, WIN, "connection effective");
            this.READ_RETURN_CONN(routine_id.CONNECT, str1, str2, this.depth - b.stackp, move, xpos, codes.WIN);
          }
          /* if the move works with ko we save it, then look for something
           * better.
           */
          this.UPDATE_SAVED_KO_RESULT(savecode, savemove, acode, xpos[0]);
        }
        else {
          if (this.recursive_disconnect2(str1, str2, null, has_passed) !== codes.WIN) {
            savemove = xpos[0];
            savecode = codes.KO_B;
          }
          b.popgo();
        }
      }
    }

    if (tried_moves === 0 && distance < FP(1.0)) {
      // SGFTRACE2(NO_MOVE, WIN, "no move, probably connected");
      this.READ_RETURN_CONN(routine_id.CONNECT, str1, str2, this.depth - b.stackp, move, NO_MOVE, codes.WIN);
    }

    if (savecode !== 0) {
      // SGFTRACE2(savemove, savecode, "saved move");
      this.READ_RETURN_CONN(routine_id.CONNECT, str1, str2, this.depth - b.stackp, move, savemove, savecode);
    }

    // SGFTRACE2(0, 0, NULL);
    this.READ_RETURN_CONN(routine_id.CONNECT, str1, str2, this.depth - b.stackp, move, NO_MOVE, 0);
  },


  /* Try to disconnect two strings. This function is called in a mutual
   * recursion with recursive_connect2(). Return codes is identical to
   * the tactical reading functions.
   *
   * The algorithm is
   * 1. Check if the strings are trivially connected or disconnected or
   *    the result is already cached.
   * 2. Find disconnection moves.
   * 3. Try one move at a time and call recursive_connect2() to see
   *    whether we were successful.
   * 4. If no move was found we assume failure if the connection
   *    distance was small. Otherwise we pass and let
   *    recursive_connect2() try to connect. However, if we already have
   *    passed once we just declare success. Whether a pass already has
   *    been made is indicated by the has_passed parameter.
   */
  recursive_disconnect2(str1, str2, move, has_passed) {
    const b = this.board
    const color = b.board[str1];
    const other = b.OTHER_COLOR(color);
    let moves = []
    let num_moves;
    let distance = [FP(0.0)];
    let k;
    let xpos= [];
    let savemove = NO_MOVE;
    let savecode = 0;
    let tried_moves = 0;
    let attack_code1;
    let attack_pos1 = [];
    let attack_code2;
    let attack_pos2 = [];
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // let save_count_variations = count_variations;
    let value = [];

    // SETUP_TRACE_INFO2("recursive_disconnect2", str1, str2);

    nodes_connect++;
    global_connection_node_counter++;

    if (move){
      move[0] = NO_MOVE;
    }

    if (b.board[str1] === colors.EMPTY || b.board[str2] === colors.EMPTY) {
      // SGFTRACE2(PASS_MOVE, WIN, "one string already captured");
      return codes.WIN;
    }

    if (b.same_string(str1, str2)) {
      // SGFTRACE2(PASS_MOVE, 0, "already connected");
      return 0;
    }

    if (nodes_connect > this.connection_node_limit) {
      // SGFTRACE2(PASS_MOVE, codes.WIN, "connection node limit reached");
      return codes.WIN;
    }

    if (b.stackp > this.connect_depth2) {
      // SGFTRACE2(PASS_MOVE, codes.WIN, "connection depth limit reached");
      return codes.WIN;
    }

    // sgf_dumptree = NULL;
    // count_variations = 0;

    str1 = b.find_origin(str1);
    str2 = b.find_origin(str2);

    attack_code1 = this.attack(str1, attack_pos1);
    if (attack_code1 === codes.WIN) {
      // sgf_dumptree = save_sgf_dumptree;
      // count_variations = save_count_variations;

      // SGFTRACE2(attack_pos1, codes.WIN, "one string is capturable");
      if (move){
        move[0] = attack_pos1[0];
      }

      return codes.WIN;
    }

    attack_code2 = this.attack(str2, attack_pos2);
    if (attack_code2 === codes.WIN) {
      // sgf_dumptree = save_sgf_dumptree;
      // count_variations = save_count_variations;

      // SGFTRACE2(attack_pos2, codes.WIN, "one string is capturable");
      if (move){
        move[0] = attack_pos2[0];
      }

      return codes.WIN;
    }

    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;

    if (b.stackp <= this.depth
    && this.tt_get(this.ttable, routine_id.DISCONNECT, str1, str2, this.depth - b.stackp, null, value, null, xpos) === 2) {
      // TRACE_CACHED_RESULT2(value, value, xpos);
      if (value[0] !== 0){
        if (move){
          move[0] = xpos;
        }
      }

      // SGFTRACE2(xpos, value, "cached");
      return value;
    }

    if (this.ladder_capture(str1, xpos) === codes.WIN) {
      // SGFTRACE2(xpos, codes.WIN, "first string capturable");
      this.READ_RETURN_CONN(routine_id.DISCONNECT, str1, str2, this.depth - b.stackp, move, xpos, codes.WIN);
    }

    if (this.ladder_capture(str2, xpos) === codes.WIN) {
      // SGFTRACE2(xpos, codes.WIN, "second string capturable");
      this.READ_RETURN_CONN(routine_id.DISCONNECT, str1, str2, this.depth - b.stackp, move, xpos, codes.WIN);
    }

    num_moves = this.find_string_connection_moves(str1, str2, other, moves, distance);

    if (attack_code1 !== 0 && num_moves < MAX_MOVES) {
      for (k = 0; k < num_moves; k++) {
        if (moves[k] === attack_pos1[0]){
          break;
        }
      }

      if (k === num_moves){
        moves[num_moves++] = attack_pos1[0];
      }
    }

    if (attack_code2 !== 0 && num_moves < MAX_MOVES) {
      for (k = 0; k < num_moves; k++) {
        if (moves[k] === attack_pos2[0]){
          break;
        }
      }

      if (k === num_moves){
        moves[num_moves++] = attack_pos2[0];
      }
    }

    for (k = 0; k < num_moves; k++) {
      let ko_move = [];
      xpos[0] = moves[k];

      if (b.komaster_trymove(xpos, other, "recursive_disconnect2", str1, ko_move, b.stackp <= this.ko_depth && savecode === 0)) {
        tried_moves++;
        if (!ko_move[0]) {
          let dcode = this.recursive_connect2(str1, str2, null, has_passed);
          b.popgo();
          if (dcode === 0) {
            // SGFTRACE2(xpos, codes.WIN, "disconnection effective");
            this.READ_RETURN_CONN(routine_id.DISCONNECT, str1, str2, this.depth - b.stackp, move, xpos, codes.WIN);
          }
          /* if the move works with ko we save it, then look for something
           * better.
           */
          this.UPDATE_SAVED_KO_RESULT(savecode, savemove, dcode, xpos);
        }
        else {
          if (this.recursive_connect2(str1, str2, null, has_passed) !== codes.WIN) {
            savemove = xpos[0];
            savecode = codes.KO_B;
          }
          b.popgo();
        }
      }
    }

    if (tried_moves === 0 && distance[0] >= FP(1.0)
      && (has_passed || !this.recursive_connect2(str1, str2, null, 1))) {
      // SGFTRACE2(NO_MOVE, WIN, "no move, probably disconnected");
      this.READ_RETURN_CONN(routine_id.DISCONNECT, str1, str2, this.depth - b.stackp, move, NO_MOVE, codes.WIN);
    }

    if (savecode !== 0) {
      // SGFTRACE2(savemove, savecode, "saved move");
      this.READ_RETURN_CONN(routine_id.DISCONNECT, str1, str2, this.depth - b.stackp, move, savemove, savecode);
    }

    // SGFTRACE2(0, 0, null);
    this.READ_RETURN_CONN(routine_id.DISCONNECT, str1, str2, this.depth - b.stackp, move, NO_MOVE, 0);
  },

  /* Find moves to connect or disconnect the two strings str1 and str2.
   * If color_to_move equals the color of the strings we search for
   * connecting moves and otherwise disconnecting moves. The moves are
   * returned in the moves[] array and the number of moves is the return
   * value of the function. The parameter *total_distance is set to the
   * approximated connection distance between the two strings. This is
   * most useful when no moves are found. If *total_distance is small
   * they are probably already effectively connected and if it is huge
   * they are probably disconnected.
   *
   * The algorithm is to compute connection distances around each string
   * and find points where the sum of the distances is small, or more
   * exactly where the sum of the distances after the move would be
   * small. This can be done with help of delta values returned together
   * with distance values from the function
   * compute_connection_distances(). This "distance after move" measure
   * is modified with various bonuses and then used to order the found
   * moves.
   */
  find_connection_moves(str1, str2, color_to_move, conn1, conn2,
    max_dist1, max_dist2, moves, total_distance, cutoff) {
    const b = this.board
    const color = b.board[str1];
    const other = b.OTHER_COLOR(color);
    let connect_move = (color_to_move === color);
    let r;
    let distances = [];
    let num_moves = 0;
    let acode = 0;
    let attack_move = NO_MOVE;
    let dcode = 0;
    let defense_move = NO_MOVE;
    let k;
    let i, j;

    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // let save_count_variations = count_variations;
    let distance_limit;

    /* We turn off the sgf traces here to avoid cluttering them up with
     * tactical reading moves.
     */
    // sgf_dumptree = NULL;
    // count_variations = 0;

    /* Loop through the points with smallish distance from str1 and look
     * for ones also having a small distance to str2.
     */
    for (r = 0; r < conn1.queue_end; r++) {
      let pos = conn1.queue[r];
      let dist1 = conn1.distances[pos];
      let deltadist1 = conn1.deltas[pos];
      let dist2 = conn2.distances[pos];
      let deltadist2 = conn2.deltas[pos];
      let d1;
      let d2;
      let distance;

      if (dist1 - deltadist1 + dist2 - deltadist2 > FP(2.5)
        || dist1 > max_dist1 + FP(0.2)
        || dist2 > max_dist2 + FP(0.2)){
        continue;
      }

      // if (verbose > 0)
      //   gprintf("%oMove %1m, (%f, %f, %f, %f)\n", pos,
      //     FIXED_TO_FLOAT(dist1), FIXED_TO_FLOAT(deltadist1),
      //     FIXED_TO_FLOAT(dist2), FIXED_TO_FLOAT(deltadist2));

      /* The basic quality of the move is the sum of the distances to
       * each string minus the two delta values. This distance value
       * will subsequently be modified to take other factors into
       * account.
       */
      d1 = dist1 - deltadist1;
      d2 = dist2 - deltadist2;
      distance = d1 + d2;
      // if (verbose > 0)
      //   gprintf("%o  %f, primary distance\n", FIXED_TO_FLOAT(distance));

      /* Bonus if d1 and d2 are well balanced. */
      if ((3 * d1) / 2 > d2 && (3 * d2) / 2 > d1) {
        distance -= FP(0.1);
        // if (verbose > 0)
        //   gprintf("%o  -0.1, well balanced\n");
      }

      /* Check whether the move is "between" the two strings. */
      if (conn1.coming_from[pos] !== NO_MOVE
        && conn1.coming_from[pos] === conn2.coming_from[pos]) {
        // if (verbose > 0)
        //   gprintf("%o  discarded, not between strings\n");
        continue;
      }

      if (b.board[pos] === colors.EMPTY) {
        if (this.check_self_atari(pos, color_to_move)) {
          this.ADD_CANDIDATE_MOVE(pos, distance, moves, distances, num_moves);
        }
        else {
          // if (verbose > 0)
          //   gprintf("%o  discarded, self atari\n");
        }
      }
      else if (b.board[pos] === other) {
        this.attack_and_defend(pos, acode, attack_move, dcode, defense_move);
        // if (verbose > 0)
        //   gprintf("%o  attack with code %d at %1m, defense with code %d at %1m\n", acode, attack_move, dcode, defense_move);

        if (connect_move && acode[0] !== 0) {
          if (dcode[0] === 0) {
            distance += FP(0.5);
            // if (verbose > 0)
            //   gprintf("%o  +0.5, no defense\n");
          }
          else {
            if (conn1.distances[attack_move[0]] + conn2.distances[attack_move[0]] > dist1 + dist2) {
              distance += FP(0.5);
              // if (verbose > 0)
              //   gprintf("%o  +0.5, attack point not on shortest path\n");
            }
          }
          this.ADD_CANDIDATE_MOVE(attack_move[0], distance - FP(0.15), moves, distances, num_moves);
          // if (verbose > 0)
          //   gprintf("%o  -0.15 at %1m, capturing a string\n", attack_move);
        }
        else if (!connect_move && acode[0] !== 0 && dcode[0] !== 0) {
          this.ADD_CANDIDATE_MOVE(defense_move[0], distance - FP(0.5), moves, distances, num_moves);
          // if (verbose > 0)
          //   gprintf("%o  -0.5 at %1m, defending a string\n", defense_move);
        }
      }
      else if (b.board[pos] === color) {
        /* Check whether there are common vulnerable points. */
        for (k = 0; k < 4; k++) {
          let apos, bpos;
          if (k & 1){
            apos = conn1.vulnerable1[pos];
          }
          else{
            apos = conn1.vulnerable2[pos];
          }

          if (k & 2){
            bpos = conn2.vulnerable1[pos];
          }
          else{
            bpos = conn2.vulnerable2[pos];
          }

          if (this.common_vulnerability(apos, bpos, color)) {
            if (this.check_self_atari(apos, color_to_move)) {
              this.ADD_CANDIDATE_MOVE(apos, distance, moves, distances, num_moves);
              // if (verbose > 0)
              //   gprintf("%o  +0.0 at %1m, vulnerability\n", apos);
            }

            if (bpos !== apos
              && this.check_self_atari(bpos, color_to_move)) {
              this.ADD_CANDIDATE_MOVE(bpos, distance, moves, distances, num_moves);
              // if (verbose > 0)
              //   gprintf("%o  +0.0 at %1m, vulnerability\n", bpos);
            }
          }
        }
      }
    }

    /* Modify the distance values for the moves with various bonuses. */
    for (r = 0; r < num_moves; r++) {
      let move = moves[r];
      let adjacent_to_attacker = 0;
      let bonus_given = 0;

      for (k = 0; k < 4; k++) {
        let pos = move + b.delta[k];
        if (b.board[pos] === other) {
          adjacent_to_attacker = 1;
          distances[r] -= FP(0.15);
          // if (verbose > 0)
          //   gprintf("%o%1M -0.15, adjacent to attacker string\n", move);
          if (b.countlib(pos) <= 2) {
            distances[r] -= FP(0.2);
            // if (verbose > 0)
            //   gprintf("%o%1M -0.2, adjacent to attacker string with at most two liberties\n", move);
            if ((connect_move || !bonus_given)
              && (conn1.distances[move] - conn1.deltas[move] <= FP(0.5) || conn1.distances[pos] - conn1.deltas[pos] <= FP(0.5))
              && (conn2.distances[move] - conn2.deltas[move] <= FP(0.5) || conn2.distances[pos] - conn2.deltas[pos] <= FP(0.5))
              && conn1.distances[pos] < total_distance && conn2.distances[pos] < total_distance) {
              bonus_given = 1;
              distances[r] -= FP(0.7);
              // if (verbose > 0)
              //   gprintf("%o%1M -0.7, capture or atari of immediately connecting string\n", move);
            }
          }
        }
        else if (b.board[pos] === color) {
          if (b.countlib(pos) <= 2) {
            distances[r] -= FP(0.2);
            // if (verbose > 0)
            //   gprintf("%o%1M -0.2, adjacent to defender string with at most two liberties\n", move);
          }
          /* The code above (in the 'board[pos] == other' branch) makes
           * perfect sense for the defender, but has a tendency to
           * overestimate solid connection defenses when the attacker's
           * stones happen to be in atari, specially when capturing some
           * defender stones instead would help just as well, if not better.
           * The following code compensates in such kind of situations.
           * See connection:111 and gunnar:53 for example.
           */
          if (!connect_move && b.countlib(pos) === 1
            /* let's avoid ko and snapbacks */
            && b.accuratelib(move, other, 2, null) > 1) {
            let adjs = [];
            let bonus;
            bonus = FP(0.1) * b.chainlinks2(pos, adjs, 2);
            bonus += FP(0.5) * b.chainlinks2(pos, adjs, 1);
            distances[r] -= bonus;
            // if (verbose > 0)
            //   gprintf("%o%1M -%f, capture of defender string\n", move, FIXED_TO_FLOAT(bonus));
          }
        }
      }
      if (adjacent_to_attacker && !connect_move && b.is_edge_vertex(move)) {
        distances[r] -= FP(0.1);
        // if (verbose > 0)
        //   gprintf("%o%1M -0.1, disconnect move on edge\n", move);
      }

      if (this.ladder_capturable(move, color_to_move)) {
        distances[r] += FP(0.3);
        // if (verbose > 0)
        //   gprintf("%o%1M +0.3, can be captured in a ladder\n", move);
      }

      /* Bonus for moves adjacent to endpoint strings with 3 liberties.
       * Neighbor strings with less than 3 liberties have already
       * generated a bonus above.
       */
      if ((b.liberty_of_string(move, str1) && b.countlib(str1) === 3)
        || (b.ON_BOARD(str2) && b.liberty_of_string(move, str2) && b.countlib(str2) === 3)) {
        distances[r] -= FP(0.1);
        // if (verbose > 0)
        //   gprintf("%o%1M -0.1, liberty of endpoint string with 3 libs\n", move);
      }
    }

    /* Turn the sgf traces back on. */
    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;

    /* Now sort the moves.  We use selection sort since this array will
     * probably never be more than 10 moves long.  In this case, the
     * overhead imposed by quicksort will probably overshadow the gains
     * given by the O(n*log(n)) behaviour over the O(n^2) behaviour of
     * selection sort.
     */
    for (i = 0; i < num_moves; i++) {
      /* Find the move with the smallest distance. */
      let mindistance = distances[i];
      let min_at = i;
      for (j = i + 1; j < num_moves; j++) {
        if (distances[j] < mindistance) {
          mindistance = distances[j];
          min_at = j;
        }
      }

      /* Now exchange the move at i with the move at min_at.
       * Don't forget to exchange the distances as well.
       */
      if (min_at !== i) {
        let temp = moves[i];
        let tempmin = distances[i];

        moves[i] = moves[min_at];
        distances[i] = distances[min_at];

        moves[min_at] = temp;
        distances[min_at] = tempmin;
      }
    }

    // if (verbose > 0) {
    //   gprintf("%oSorted moves:\n");
    //   for (i = 0; i < num_moves; i++)
    //     gprintf("%o%1M %f\n", moves[i], FIXED_TO_FLOAT(distances[i]));
    // }

    // if (sgf_dumptree) {
    //   char buf[500];
    //   char *pos;
    //   int chars;
    //   sprintf(buf, "Move order for %sconnect: %n",
    //     connect_move ? "" : "dis", &chars);
    //   pos = buf + chars;
    //   for (i = 0; i < num_moves; i++) {
    //     sprintf(pos, "%c%d (%4.2f) %n", J(moves[i]) + 'A' + (J(moves[i]) >= 8),
    //       board_size - I(moves[i]), FIXED_TO_FLOAT(distances[i]),
    //     &chars);
    //     pos += chars;
    //   }
    //   if (cutoff < HUGE_CONNECTION_DISTANCE) {
    //     sprintf(pos, "(cutoff %f)%n", FIXED_TO_FLOAT(cutoff), &chars);
    //     pos += chars;
    //   }
    //   sgftreeAddComment(sgf_dumptree, buf);
    // }

    if (num_moves === 0){
      return num_moves;
    }

    /* Filter out moves with distance at least 1.5 more than the best
     * move, or with distance higher than the cutoff specified.
     *
     * In order to further reduce the branching factor, a decreasing
     * cutoff is applied between candidates. For instance, in this case
     *   1. d    2. d+0.5   3. d+1.0   4. d+1.5
     * the 4th candidate will be tested, while in following one
     *   1. d    2. d+0.1   3. d+0.2   4. d+1.5
     * it will be discarded.
     */
    if (num_moves <= 1 || !b.is_ko(moves[0], color_to_move, null)){
      distance_limit = distances[0] + FP(1.5);
    }
    else{
      distance_limit = distances[1] + FP(1.5);
    }

    /* Special case: If the second best move has a distance less than 1,
     * include it if even if the best move has a very low distance.
     */
    if (num_moves > 1
      && distances[1] < FP(1.0)
      && distances[1] > distance_limit){
      distance_limit = distances[1];
    }

    for (r = 0; r < num_moves; r++) {
      if (r > 1
        && distances[r] > distances[r-1]
        && distances[r] - distances[r-1] > (8 - r) * FP(0.2)){
        break;
      }
      if (distances[r] > distance_limit || distances[r] > cutoff) {
        break;
      }
    }
    num_moves = r;

    return num_moves;
  },

  find_string_connection_moves(str1, str2, color_to_move, moves, total_distance) {
    let conn1 = new ConnectionData()
    let conn2 = new ConnectionData()
    const b = this.board
    let num_moves;
    let lib = [];
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // let save_count_variations = count_variations;

    /* We turn off the sgf traces here to avoid cluttering them up with
     * tactical reading moves.
     */
    // sgf_dumptree = NULL;
    // count_variations = 0;

    this.compute_connection_distances(str1, str2, FP(3.051), conn1, 1);
    this.compute_connection_distances(str2, str1, FP(3.051), conn2, 1);

    if (b.findlib(str1, 1, lib) === 1) {
      conn1.distances[lib[0]] = 0;
      conn1.coming_from[lib[0]] = NO_MOVE;
      conn2.distances[lib[0]] = conn2.distances[str1];
      conn2.coming_from[lib[0]] = conn1.coming_from[str1];
    }

    if (b.findlib(str2, 1, lib) === 1) {
      conn2.distances[lib[0]] = 0;
      conn1.distances[lib[0]] = conn1.distances[str2];
    }

    let max_dist1 = conn1.distances[str2];
    let max_dist2 = conn2.distances[str1];

    total_distance[0] = Math.min(max_dist1, max_dist2);

    // if (verbose > 0) {
    //   gprintf("%oVariation %d\n", save_count_variations);
    //   dump_stack();
    //   showboard(0);
    //   print_connection_distances(&conn1);
    //   print_connection_distances(&conn2);
    // }

    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;

    num_moves = this.find_connection_moves(str1, str2, color_to_move, conn1, conn2, max_dist1, max_dist2,
      moves, total_distance, HUGE_CONNECTION_DISTANCE);
    return num_moves;
  },
  add_to_start_queue(pos, dist, conn) {
    conn.queue[conn.queue_end++] = pos;
    conn.distances[pos] = dist;
    conn.deltas[pos] = dist;
    conn.coming_from[pos] = NO_MOVE;
    conn.vulnerable1[pos] = NO_MOVE;
    conn.vulnerable2[pos] = NO_MOVE;
  },
  init_connection_data() {},
  find_break_moves() {},
  recursive_break() {},
  recursive_block() {},
  break_in() {},
  block_off() {},
  push_connection_heap_entry() {},
  pop_connection_heap_entry() {},


  ENQUEUE (conn, from, pos, dist, delta, v1, v2) {
    if (dist < conn.distances[pos]) {
      if (conn.distances[pos] === HUGE_CONNECTION_DISTANCE)	{
        conn.queue[conn.queue_end++] = pos;
      }
      conn.distances[pos]   = dist;
      conn.deltas[pos]      = delta;
      conn.coming_from[pos] = from;
      conn.vulnerable1[pos] = v1;
      conn.vulnerable2[pos] = v2;
    }
  },

  ENQUEUE_STONE (conn, from, pos, dist, delta, v1, v2)  {
    let origin = this.board.find_origin(pos);
    if (dist < conn.distances[origin]) {
      if (conn.distances[origin] === HUGE_CONNECTION_DISTANCE){
        conn.queue[conn.queue_end++] = origin;
      }
      conn.distances[origin]	= dist;
      conn.deltas[origin]	= delta;
      conn.coming_from[origin] = from;
      conn.vulnerable1[origin] = v1;
      conn.vulnerable2[origin] = v2;
      if (origin === conn.target && dist < conn.cutoff_distance){
        conn.cutoff_distance = dist - FP(0.0001);
      }
    }
  },
  case_6_7_helper() {},
  case_9_10_helper() {},
  case_16_17_18_helper() {},


  /* Do the real work of computing connection distances.
   * This is a rough approximation of the number of moves required to secure
   * a connection. We also compute delta values which are intended to tell how
   * big difference a particular move locally has on the connection
   * distance. However, remember that this is only a heuristic with the
   * sole purpose of helping to find relevant moves for connection
   * problems.
   *
   * The algorithm is to propagate connection values outwards using a
   * breadth-first searching strategy, implemented through an implicitly
   * sorted queue. The propagation to new vertices depends on
   * geometrical features with significance for connections. E.g. a
   * bamboo joint is recognized and the distance added when passing
   * through it is small. New points are added to the queue through the
   * ENQUEUE macro above. This checks whether the point has already been
   * entered on the queue and updates the distance and delta values if
   * the previous ones were worse. When a stone is entered, all stones
   * of the string are added to the queue simultaneously.
   *
   * (target) is the other string when called from find_connection_moves().
   * (It can be set to NO_MOVE otherwise.)
   *
   * The propagation is inhibited when the distance becomes too large,
   * or larger than the shortest path found to the target so far.
   *
   *
   * The purpose of the fields called vulnerable is to keep track of
   * points where the attacker can threaten an individual
   * connection. For example the diagonal formation
   *
   * .O
   * O.
   *
   * is considered a small distance link but both the empty vertices are
   * marked as vulnerable. Thus if we are computing connection distance
   * from the lower left O in this diagram,
   *
   * XXX     XXX
   * .O.     .O.
   * O.O     OaO
   * .X.     .X.
   *
   * the distance to the middle O is small but the second diagonal link
   * to the lower right O stone is not given a small distance since a
   * had already been marked as vulnerable.
   *
   * It should also be pointed out that this reasoning is not relevant
   * in this position where X has no cutting potential,
   *
   * XXX     XXX
   * .O.     .O.
   * O.O     OaO
   * ...     ...
   *
   * That is because there is a pattern directly recognizing the safe
   * link between the two lower stones, without taking the longer road
   * over the two diagonal links.
   *
   * (color) is the color for which we are computing connection distances,
   * (target) the position we want to reach (can be set to NO_MOVE),
   * (*conn) has to have the queue initialized with the positions
   * from which we want to know the distances,
   * (cutoff_distance) is the highest distance before we give up,
   * (speculative) controls some special cases in the propagation rules
   * below.
   *
   * As an optimization, new points are either added directly via the ENQUEUE
   * macro if the necessary test is an immediate (usually purely geometric)
   * check, or if the decision is more expensive (usually depending on a
   * ladder), it gets postponed and stored via push_connection_heap_entry()
   * for later evaluation.
   */
  spread_connection_distances(color, conn) {
    const b = this.board
    const other = b.OTHER_COLOR(color);
    let stones = [];
    let num_stones = 0;
    let stone = 0;

    /* Loop until we reach the end of the queue. */
    while (conn.queue_start < conn.queue_end || conn.heap_size > 0) {
      let k;
      let pos;
      let distance;

      /* Delete heap entries for positions that have already been reached
       * with smaller distance.
       */
      while (conn.heap_size > 0 && conn.heap[0].distance >= conn.distances[conn.heap[0].target]){
        this.pop_connection_heap_entry(conn);
      }

      if (stone === num_stones) {
        let best_index = -1;
        let smallest_dist = HUGE_CONNECTION_DISTANCE;

        if (conn.queue_start === conn.queue_end) {
          if (conn.heap_size > 0) {
            conn.heap[0].helper(conn, color);
            this.pop_connection_heap_entry(conn);
          }

          continue;
        }

        b.ASSERT1(conn.queue_end <= b.MAX_BOARD * b.MAX_BOARD);

        /* Find the smallest distance among the queued points. */
        for (k = conn.queue_start; k < conn.queue_end; k++) {
          if (conn.distances[conn.queue[k]] < smallest_dist) {
            smallest_dist = conn.distances[conn.queue[k]];
            best_index = k;
          }
        }

        /* Exchange the best point with the first element in the queue. */
        if (best_index !== conn.queue_start) {
          let temp = conn.queue[conn.queue_start];
          conn.queue[conn.queue_start] = conn.queue[best_index];
          conn.queue[best_index] = temp;
        }

        /* If the first element in heap has smaller distance than the
         * smallest we have found so far, call the relevant helper function
         * now, and delete the heap entry.
         */
        if (conn.heap_size > 0 && conn.heap[0].distance < smallest_dist) {
          conn.heap[0].helper(conn, color);
          this.pop_connection_heap_entry(conn);
          continue;
        }

        /* Now we are ready to pick the first element in the queue and
         * process it.
         */
        pos = conn.queue[conn.queue_start++];
        if (b.board[pos] !== colors.EMPTY) {
          num_stones = b.findstones(pos, b.MAX_BOARD * b.MAX_BOARD, stones);
          pos = stones[0];
          stone = 1;
        }
      }
      else {
        pos = stones[stone++];
        conn.distances[pos]   = conn.distances[stones[0]];
        conn.deltas[pos]      = conn.deltas[stones[0]];
        conn.coming_from[pos] = conn.coming_from[stones[0]];
        conn.vulnerable1[pos] = conn.vulnerable1[stones[0]];
        conn.vulnerable2[pos] = conn.vulnerable2[stones[0]];
      }

      /* No further propagation if the distance is too large. */
      distance = conn.distances[pos];
      if (distance > conn.cutoff_distance){
        break;
      }

      /* Search for new vertices to propagate to. */
      if (b.board[pos] === color) {
        for (k = 0; k < 4; k++) {
          /* List of relative coordinates. (pos) is marked by *.
           *
           *  jef.
           *  igb.
           * kh*ac
           *  ....
           *
           */
          let right = b.delta[k];
          let up = b.delta[(k+1)%4];

          /* FIXME: Compactify this list. */
          let apos = pos + right;
          let bpos = pos + right + up;
          let cpos = pos + 2 * right;
          let epos = pos + 2*up;
          let fpos = pos + right + 2*up;
          let gpos = pos + up;
          let hpos = pos - right;
          let ipos = pos - right + up;
          let jpos = pos - right + 2 * up;
          let kpos = pos - 2 * right;

          /* Case 1. "a" is empty and would be suicide for the opponent. */
          if (b.board[apos] === colors.EMPTY && b.is_suicide(apos, other)){
            this.ENQUEUE(conn, pos, apos, distance, FP(0.0), apos, NO_MOVE);
          }

          /* Case 2. "a" is empty and would be self atari for the opponent. */
          if (b.board[apos] === colors.EMPTY && conn.distances[apos] > distance + FP(0.1)
          && b.is_self_atari(apos, other)) {
            let lib = [];
            let vulnerable1 = NO_MOVE;
            let vulnerable2 = NO_MOVE;
            if (b.approxlib(apos, other, 1, lib) >= 1) {
              if (b.approxlib(lib[0], other, 2, null) > 2){
                vulnerable1 = lib[0];
              }
              if (b.countlib(pos) === 2) {
                for (let i = 0; i < 4; i++) {
                  if (b.board[lib + b.delta[i]] === colors.EMPTY
                    && lib[0] + b.delta[i] != apos
                    && b.trymove(lib[0] + b.delta[i], other, "compute_connection_distances", pos)) {
                    if (this.ladder_capture(pos, null)) {
                      vulnerable2 = lib[0] + b.delta[i];
                      b.popgo();
                      break;
                    }
                    b.popgo();
                  }
                }
              }
            }

            if (!this.common_vulnerabilities(conn.vulnerable1[pos], conn.vulnerable2[pos], vulnerable1, vulnerable2, color)) {
              this.ENQUEUE(conn, pos, apos, distance + FP(0.1), FP(0.1), vulnerable1, vulnerable2);
            }
          }

          /* Case 3. Bamboo joint of "*" + "a" to "e" + "f" through "b" and "g".
           * Notice that the order of these tests is significant. We must
           * check bpos before fpos and epos to avoid accessing memory
           * outside the board array. (Notice that fpos is two steps away
           * from pos, which we know is on the board.)
           */
          if (b.board[apos] === color && b.board[bpos] === colors.EMPTY
            && b.board[fpos] === color && b.board[epos] === color && b.board[gpos] === colors.EMPTY) {
            this.ENQUEUE(conn, pos, bpos, distance + FP(0.1), FP(0.1), NO_MOVE, NO_MOVE);
            this.ENQUEUE(conn, pos, gpos, distance + FP(0.1), FP(0.1), NO_MOVE, NO_MOVE);
          }

          /* Case 4. Diagonal connection to another stone "b" through
           * empty vertices "a" and "g".
           */
          if (b.board[bpos] === color && b.board[apos] === colors.EMPTY && b.board[gpos] === colors.EMPTY
            && !this.common_vulnerabilities(conn.vulnerable1[pos], conn.vulnerable2[pos], apos, gpos, color)
            && conn.distances[bpos] > distance + FP(0.1)) {
            this.ENQUEUE_STONE(conn, pos, bpos, distance + FP(0.1), FP(0.1), apos, gpos);
          }

          /* Case 5. Almost bamboo joint.
           *
           */
          if (b.board[gpos] === colors.EMPTY && b.board[epos] === color
            && conn.distances[epos] > distance + FP(0.2)
            && b.approxlib(gpos, other, 3, null) <= 2) {
            if (b.board[bpos] === colors.EMPTY
              && b.approxlib(bpos, color, 3, null) >= 3
              && (b.board[apos] === color || (b.board[apos] === colors.EMPTY
                  && b.countlib(pos) > 2
                  && !this.common_vulnerabilities(conn.vulnerable1[pos], conn.vulnerable2[pos], apos, gpos, color)
                  && b.approxlib(apos, other, 3, null) <= 2))
              && (b.board[fpos] === color || (b.board[fpos] === colors.EMPTY
                  && b.countlib(epos) > 2
                  && !this.common_vulnerabilities(conn.vulnerable1[pos], conn.vulnerable2[pos], fpos, gpos, color)
                  && b.approxlib(fpos, other, 3, null) <= 2))) {
              if (b.board[apos] === colors.EMPTY && b.board[fpos] === colors.EMPTY) {
                this.ENQUEUE_STONE(conn, pos, epos, distance + FP(0.2), FP(0.2), apos, fpos);
              }
              else if (b.board[apos] === colors.EMPTY && b.board[fpos] !== colors.EMPTY) {
                this.ENQUEUE_STONE(conn, pos, epos, distance + FP(0.2), FP(0.2), apos, NO_MOVE);
              }
              else if (b.board[apos] !== colors.EMPTY && b.board[fpos] === colors.EMPTY) {
                this.ENQUEUE_STONE(conn, pos, epos, distance + FP(0.2), FP(0.2), fpos, NO_MOVE);
              }
              else if (b.board[apos] !== colors.EMPTY && b.board[fpos] !== colors.EMPTY) {
                this.ENQUEUE_STONE(conn, pos, epos, distance + FP(0.2), FP(0.2), NO_MOVE, NO_MOVE);
              }
            }

            if (b.board[ipos] === colors.EMPTY
              && b.approxlib(ipos, color, 3, null) >= 3
              && (b.board[hpos] === color
                || (b.board[hpos] === colors.EMPTY
                  && b.countlib(pos) > 2
                  && !this.common_vulnerabilities(conn.vulnerable1[pos],
                    conn.vulnerable2[pos],
                    hpos, gpos, color)
                  && b.approxlib(hpos, other, 3, null) <= 2))
              && (b.board[jpos] === color
                || (b.board[jpos] === colors.EMPTY
                  && b.countlib(epos) > 2
                  && !this.common_vulnerabilities(conn.vulnerable1[pos],
                    conn.vulnerable2[pos],
                    jpos, gpos, color)
                  && b.approxlib(jpos, other, 3, null) <= 2))) {
              if (b.board[hpos] === colors.EMPTY && b.board[jpos] === colors.EMPTY) {
                this.ENQUEUE_STONE(conn, pos, epos, distance + FP(0.2), FP(0.2), hpos, jpos);
              }
              else if (b.board[hpos] === colors.EMPTY && b.board[jpos] !== colors.EMPTY) {
                this.ENQUEUE_STONE(conn, pos, epos, distance + FP(0.2), FP(0.2), hpos, NO_MOVE);
              }
              else if (b.board[hpos] !== colors.EMPTY && b.board[jpos] === colors.EMPTY) {
                this.ENQUEUE_STONE(conn, pos, epos, distance + FP(0.2), FP(0.2), jpos, NO_MOVE);
              }
              else if (b.board[hpos] !== colors.EMPTY && b.board[jpos] !== colors.EMPTY) {
                this.ENQUEUE_STONE(conn, pos, epos, distance + FP(0.2), FP(0.2), NO_MOVE, NO_MOVE);
              }
            }
          }

          /* Case 6. "a" is empty and an opponent move can be captured
           * in a ladder.
           *
           * Case 7. "a" is empty.
           */
          if (b.board[apos] === colors.EMPTY && conn.distances[apos] > distance + FP(0.6)) {
            this.push_connection_heap_entry(conn, distance + FP(0.6), pos, apos, this.case_6_7_helper);
          }

          /* Case 8. Adjacent opponent stone at "a" which can't avoid atari.
           */
          if (b.board[apos] === other && conn.distances[apos] > distance + FP(0.1)
          && this.no_escape_from_atari(apos)) {
            this.ENQUEUE_STONE(conn, pos, apos, distance + FP(0.1), FP(0.1), NO_MOVE, NO_MOVE);
          }

          /* Case 9. Adjacent opponent stone at "a" which can't avoid
           * ladder capture.
           *
           * Case 10. "a" is occupied by opponent.
           */
          if (b.board[apos] === other && conn.distances[apos] > distance + FP(0.3)) {
            this.push_connection_heap_entry(conn, distance + FP(0.3), pos, apos, this.case_9_10_helper);
          }

          /* Case 11. Diagonal connection to empty vertex "b" through
           * empty vertex "a" or "g", which makes "a" or "g" self-atari
           * for opponent.
           */
          if (b.board[bpos] === colors.EMPTY
            && b.board[apos] === colors.EMPTY
            && conn.distances[bpos] > distance + FP(1.1)
          && this.does_secure(color, bpos, apos)) {
            this.ENQUEUE(conn, pos, bpos, distance + FP(1.1), FP(1.0), apos, NO_MOVE);
          }

          if (b.board[bpos] === colors.EMPTY
            && b.board[gpos] === colors.EMPTY
            && conn.distances[bpos] > distance + FP(1.1)
          && this.does_secure(color, bpos, gpos)) {
            this.ENQUEUE(conn, pos, bpos, distance + FP(1.1), FP(1.0), gpos, NO_MOVE);
          }

          /* Case 12. One-space jump to empty vertex "e" through empty
           * vertex "g", which makes "g" self-atari for opponent.
           */
          if (b.board[gpos] === colors.EMPTY
            && b.board[epos] === colors.EMPTY
            && conn.distances[epos] > distance + FP(1.1)
          && this.does_secure(color, epos, gpos)) {
            this.ENQUEUE(conn, pos, epos, distance + FP(1.1), FP(1.0), gpos, NO_MOVE);
          }

          /* Case 13. One-space jump to empty vertex "e" through empty
           * vertex "g", making a bamboo joint.
           */
          if (b.board[gpos] === colors.EMPTY
            && b.board[epos] === colors.EMPTY
            && conn.distances[epos] > distance + FP(1.1)
          && ((b.board[apos] === color && b.board[fpos] === color
            && b.board[bpos] === colors.EMPTY)
            || (b.board[hpos] === color && b.board[jpos] === color
              && b.board[ipos] === colors.EMPTY))) {
            this.ENQUEUE(conn, pos, epos, distance + FP(1.1), FP(1.0), gpos, NO_MOVE);
          }

          /* Case 14. Diagonal connection to empty vertex "b" through
           * empty vertices "a" and "g".
           */
          if (b.board[bpos] === colors.EMPTY
            && b.board[apos] === colors.EMPTY && b.board[gpos] === colors.EMPTY
            && conn.distances[bpos] > distance + FP(1.3)) {
            this.ENQUEUE(conn, pos, bpos, distance + FP(1.3), FP(1.0), apos, gpos);
          }

          /* Case 15. Keima to "f" or "j" on edge. and one space jump on
           * first or second line.
           */
          if (b.board[apos] === colors.EMPTY
            && b.board[bpos] === colors.EMPTY
            && b.board[gpos] === colors.EMPTY
            && b.board[epos] === colors.EMPTY
            && b.board[fpos] === colors.EMPTY
            && (conn.distances[fpos] > distance + FP(1.3) || conn.distances[epos] > distance + FP(1.3))
            && b.countlib(pos) >= 3 && (!b.ON_BOARD(cpos) || !b.ON_BOARD(hpos))) {
            this.ENQUEUE(conn, pos, fpos, distance + FP(1.3), FP(1.0), NO_MOVE, NO_MOVE);
            this.ENQUEUE(conn, pos, epos, distance + FP(1.3), FP(1.0), NO_MOVE, NO_MOVE);
          }

          if (b.board[hpos] === colors.EMPTY
            && b.board[ipos] === colors.EMPTY
            && b.board[gpos] === colors.EMPTY
            && b.board[epos] === colors.EMPTY
            && b.board[jpos] === colors.EMPTY
            && (conn.distances[jpos] > distance + FP(1.3) || conn.distances[epos] > distance + FP(1.3))
            && b.countlib(pos) >= 3  && (!b.ON_BOARD(apos) || !b.ON_BOARD(kpos))) {
            this.ENQUEUE(conn, pos, jpos, distance + FP(1.3), FP(1.0), NO_MOVE, NO_MOVE);
            this.ENQUEUE(conn, pos, epos, distance + FP(1.3), FP(1.0), NO_MOVE, NO_MOVE);
          }

          /* Case 16. Diagonal connection to empty vertex "b" through
           * empty vertex "a" or "g", which allows opponent move at "a"
           * or "g" to be captured in a ladder.
           *
           * Case 17. Diagonal connection to empty vertex "b" through
           * one empty and one opponent vertex "a" and "g", where
           * the opponent stone is short of liberties.
           *
           * Case 18. Diagonal connection to empty vertex "b" through
           * empty vertex "a" or "g", with no particular properties.
           */
          if (b.board[bpos] === colors.EMPTY
            && (b.board[apos] === colors.EMPTY || b.board[gpos] === colors.EMPTY)
            && conn.distances[bpos] > distance + FP(1.2)) {
            this.push_connection_heap_entry(conn, distance + FP(1.2), pos, bpos, this.case_16_17_18_helper);
          }

          /* Case 19. Clamp at "e" of single stone at "g". */
          if (b.board[gpos] === other
            && b.board[epos] === colors.EMPTY
            && conn.distances[epos] > distance + FP(2.0)
          && b.countstones(gpos) === 1) {
            this.ENQUEUE(conn, pos, epos, distance + FP(2.0), FP(1.0), NO_MOVE, NO_MOVE);
          }

          /* Case 20. Diagonal connection to empty vertex "b" through
           * opponent stones "a" or "g" with few liberties.
           */
          if (b.board[bpos] === colors.EMPTY
            && b.board[apos] === other
            && b.board[gpos] === other
            && conn.distances[bpos] > distance + FP(2.0)
          && (b.countlib(apos) + b.countlib(gpos) <= 6)) {
            this.ENQUEUE(conn, pos, bpos, distance + FP(2.0), FP(1.0), NO_MOVE, NO_MOVE);
          }

          /* Case 21. Diagonal connection to own stone "b" through
           * opponent stones "a" or "g" with few liberties.
           */
          if (b.board[bpos] === color
            && b.board[apos] === other
            && b.board[gpos] === other
            && conn.distances[bpos] > distance + FP(2.0)
          && (b.countlib(apos) + b.countlib(gpos) <= 5)) {
            this.ENQUEUE_STONE(conn, pos, bpos, distance + FP(2.0), FP(1.0), NO_MOVE, NO_MOVE);
          }
        }
      }
      else if (b.board[pos] === colors.EMPTY
        || (b.board[pos] === other && b.countlib(pos) <= 2 && this.no_escape_from_ladder(pos))) {
        for (k = 0; k < 4; k++) {
          /* List of relative coordinates. (pos) is marked by *.
           *
           *  jef.
           *  igb.
           * kh*ac
           *   .d.
           *
           */
          let right = b.delta[k];
          let up = b.delta[(k+1)%4];

          /* FIXME: Compactify this list. */
          let apos = pos + right;
          let bpos = pos + right + up;
          let gpos = pos + up;


          if (b.board[apos] === color) {
            this.ENQUEUE_STONE(conn, pos, apos, distance, FP(0.0),
              conn.vulnerable1[pos], conn.vulnerable2[pos]);
          }
          else if (b.board[apos] === colors.EMPTY) {
            let this_delta = FP(0.8) + FP(0.05) * Math.min(b.approxlib(apos, other, 6, null), 6);
            this.ENQUEUE(conn, pos, apos, distance + this_delta, this_delta, NO_MOVE, NO_MOVE);
          }
          else if (b.board[apos] === other) {
            this.ENQUEUE_STONE(conn, pos, apos, distance + FP(1.0), FP(1.0), NO_MOVE, NO_MOVE);
          }

          /* Case 1. Diagonal connection to empty vertex "b" through
           * empty vertices "a" and "g".
           */
          if (b.board[bpos] === colors.EMPTY
            && b.board[apos] === colors.EMPTY
            && b.board[gpos] === colors.EMPTY
            && conn.distances[bpos] > distance + FP(1.5)) {
            this.ENQUEUE(conn, pos, bpos, distance + FP(1.5), FP(1.0), NO_MOVE, NO_MOVE);
          }

          /* Case 2. Diagonal connection to friendly stone at "b" through
           * empty vertices "a" and "g".
           */
          if (b.board[bpos] === color
            && b.board[apos] === colors.EMPTY
            && b.board[gpos] === colors.EMPTY
            && conn.distances[bpos] > distance + FP(1.3)) {
            this.ENQUEUE_STONE(conn, pos, bpos, distance + FP(1.3), FP(1.0), NO_MOVE, NO_MOVE);
          }
        }
      }
    }
  },
  sort_connection_queue_tail() {},
  expand_connection_queue() {},
  clear_connection_data() {},

  /* Compute the connection distances from string (str) to nearby
   * vertices, until we reach target or the distance gets too high.
   */
  compute_connection_distances(str, target, cutoff, conn, speculative) {
    const b = this.board
    const color = b.board[str];

    this.clear_connection_data(conn);

    /* Add the origin of the initial string to the queue. */
    this.add_to_start_queue(b.find_origin(str), FP(0.0), conn);

    conn.target = target;
    conn.cutoff_distance = cutoff;
    conn.speculative = speculative;

    this.spread_connection_distances(color, conn);
  },

  print_connection_distances() {},

  /* Test whether there is a trivial connection between str1 and str2
   * and if so return the connecting move in *move. By trivial
   * connection we mean that they either have a common liberty or a
   * common neighbor which can be tactically attacked.
   */
  trivial_connection(str1, str2, move) {
    const b = this.board
    // let save_count_variations = count_variations;
    let adj, adjs = [];
    let r;
    let result = 0;

    if (b.have_common_lib(str1, str2, move))
      return codes.WIN;

    adj = b.chainlinks(str1, adjs);

    /* We turn off the sgf traces here to avoid cluttering them up with
     * tactical reading moves.
     */
    // sgf_dumptree = null;
    // count_variations = 0;

    for (r = 0; r < adj; r++){
      if (b.adjacent_strings(adjs[r], str2) && this.attack(adjs[r], move) === codes.WIN) {
        result = codes.WIN;
        break;
      }
    }

    /* Turn the sgf traces back on. */
    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;

    return result;
  },
  does_secure_through_ladder() {},

  /* Test whether the string str can be immediately taken off the board
   * or captured in a ladder. If so the capturing move is returned in
   * *move.
   */
  ladder_capture(str, move) {
    const b = this.board
    let result;
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // let save_count_variations = count_variations;
    let liberties = b.countlib(str);

    /* We turn off the sgf traces here to avoid cluttering them up with
     * tactical reading moves.
     */
    // sgf_dumptree = null;
    // count_variations = 0;

    if (liberties === 1){
      result = this.attack(str, move);
    }
    else if (liberties === 2){
      result = this.simple_ladder(str, move);
    }
    else{
      result = 0;
    }

    /* Turn the sgf traces back on. */
    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;

    return result;
  },
  ladder_capturable() {},
  no_escape_from_atari() {},
  no_escape_from_ladder() {},
  check_self_atari() {},
  common_vulnerabilities() {},
  common_vulnerability() {},
  
}