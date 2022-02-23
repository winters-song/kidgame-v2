import {
  colors,codes,
  NO_MOVE, OWL_NODE_LIMIT, PASS_MOVE, SEMEAI_NODE_LIMIT
} from './Constants'
import {dragon_status} from "./Liberty";



const NUMBER_OF_TIMERS = 4
const timers = [];

/* Tactical reading using C functions */
const DEPTH               = 16
const BRANCH_DEPTH        = 13
const BACKFILL_DEPTH      = 12
const BACKFILL2_DEPTH     =  5
const BREAK_CHAIN_DEPTH   =  7
const SUPERSTRING_DEPTH   =  7
const FOURLIB_DEPTH       =  7
const KO_DEPTH            =  8

const AA_DEPTH              = 6

/* Pattern based reading */
const OWL_DISTRUST_DEPTH    = 6
const OWL_BRANCH_DEPTH      = 8
const OWL_READING_DEPTH    = 20
const SEMEAI_BRANCH_DEPTH  = 12
const SEMEAI_BRANCH_DEPTH2  = 6

/* Connecton reading */
const CONNECT_NODE_LIMIT = 2000
const CONNECT_DEPTH        = 64
const CONNECT_DEPTH2       = 20

const BREAKIN_NODE_LIMIT  = 400
const BREAKIN_DEPTH	     = 14


export const Utils = {

  change_dragon_status() {},
  defend_against(){},

  /*
   * Returns true if color can cut at (pos), or if connection through (pos)
   * is inhibited. This information is collected by find_cuts(), using the B
   * patterns in the connections database.
   */
  cut_possible(pos, color){
    return (this.cutting_points[pos] & this.board.OTHER_COLOR(color)) !== 0;
  },

  does_attack() {},

  /*
  * does_defend(move, str) returns true if the move at (move)
  * defends (str). This means that it defends the string, and that
  * (str) can be captured if no defense is made.
  *
  * FIXME: Make does_defend() ko aware like does_attack().
  */
  does_defend(move, str) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    let result = 0;
    const spos = [NO_MOVE];

    if (!this.attack(str, spos)){
      return 0;
    }

    // gg_assert(spos != NO_MOVE);
    
    if (b.trymove(move, color, "does_defend-A", str)) {
      if (!this.attack(str, null)) {
        result = 1;
        this.increase_depth_values();
        if (b.trymove(spos, other, "does_defend-B", str)) {
          if (!b.board[str] || !this.find_defense(str, null)){
            result = 0;
          }
          b.popgo();
        }
        this.decrease_depth_values();
      }
      b.popgo();
    }

    return result;
  },

  /* 
  * Example: somewhere(WHITE, 2, apos, bpos, cpos).
  * 
  * Returns true if one of the vertices listed
  * satisfies board[pos]==color. Here num_moves is the
  * number of moves. If check_alive is true, the dragon is not allowed
  * to be dead. This check is only valid if stackp==0.
  */
  //  va_list 可变参数， 这里用单个数组代替
  somewhere(color, check_alive, num_moves, list) {
    // gg_assert(stackp == 0 || !check_alive);
    for (let k = 0; k < num_moves; k++) {
      const pos = list[k]

      if (this.board.board[pos] === color && 
        (!check_alive || this.dragon[pos].status !== dragon_status.DEAD)) {
        return 1;
      }
    }

    return 0;
  },

  visible_along_edge() {},

  /* Is the board symmetric (or rather antisymmetric) with respect to
   * mirroring in tengen after a specific move has been played? If the
   * move is PASS_MOVE, check the current board.
   *
   * If strict is set we require that each stone is matched by a stone
   * of the opposite color at the mirrored vertex. Otherwise we only
   * require that each stone is matched by a stone of either color.
   */
  test_symmetry_after_move(move, color, strict) {
    const b = this.board
    let result = 1;

    if (move !== PASS_MOVE) {
      if (b.board[move] !== colors.EMPTY)
        return 0;
      if (!b.trymove(move, color, "find_mirror_move", NO_MOVE))
        return 0;
    }

    for (let pos = b.BOARDMIN; pos < b.MIRROR_MOVE(pos); pos++) {
      let sum;
      if (!b.ON_BOARD(pos))
        continue;

      sum = b.board[pos] + b.board[b.MIRROR_MOVE(pos)];
      if (sum !== colors.EMPTY + colors.EMPTY && sum !== colors.BLACK + colors.WHITE) {
        if (strict || sum === colors.EMPTY + colors.WHITE || sum === colors.EMPTY + colors.BLACK) {
          result = 0;
          break;
        }
      }
    }

    if (move !== PASS_MOVE)
      b.popgo();

    return result;
  },


  /* The function play_break_through_n() plays a sequence of moves,
  * alternating between the players and starting with color. After
  * having played through the sequence, the three last coordinate pairs
  * gives a position to be analyzed by break_through(), to see whether
  * either color has managed to enclose some stones and/or connected
  * his own stones. If any of the three last positions is empty, it's
  * assumed that the enclosure has failed, as well as the attempt to
  * connect.
  *
  * If one or more of the moves to play turns out to be illegal for
  * some reason, the rest of the sequence is played anyway, and
  * break_through() is called as if nothing special happened.
  *
  * Like break_through(), this function returns 1 if the attempt to
  * break through was succesful and 2 if it only managed to cut
  * through.
  */
  // 按照list顺序交替落子num_moves步
  play_break_through_n(color, num_moves, list) {
    let mcolor = color;
    let success = 0;
    let i;
    let played_moves = 0;
    let apos;
    let xpos = list[num_moves];
    let ypos = list[num_moves+1];
    let zpos = list[num_moves+2];
    const b = this.board
    

    /* Do all the moves with alternating colors. */
    for (i = 0; i < num_moves; i++) {
      apos = list[i]

      if (apos !== NO_MOVE
        && (b.trymove(apos, mcolor, "play_break_through_n", NO_MOVE) || b.tryko(apos, mcolor, "play_break_through_n"))) {
        played_moves++;
      }
      mcolor = b.OTHER_COLOR(mcolor);
    }
      
    // /* Temporarily increase the depth values with the number of explicitly
    // * placed stones.
    // */
    
    if (b.board[xpos] === colors.EMPTY || b.board[ypos] === colors.EMPTY || b.board[zpos] === colors.EMPTY) {
      success = 1;
    }
    else {
      success = this.break_through(xpos, ypos, zpos);
    }

    
    /* Pop all the moves we could successfully play. */
    for (i = 0; i < played_moves; i++){
      b.popgo();
    }

    return success;
  },

  /* The function play_attack_defend_n() plays a sequence of moves,
  * alternating between the players and starting with color. After
  * having played through the sequence, the last coordinate pair gives
  * a target to attack or defend, depending on the value of do_attack.
  * If there is no stone present to attack or defend, it is assumed
  * that it has already been captured. If one or more of the moves to
  * play turns out to be illegal for some reason, the rest of the
  * sequence is played anyway, and attack/defense is tested as if
  * nothing special happened.
  *
  * A typical use for these functions is to set up a ladder in an
  * autohelper and see whether it works or not.
  * 
  * 一系列交替落子
  */
  play_attack_defend_n(color, do_attack, num_moves, list){
    const b = this.board
    let mcolor = color;
    let success = 0;
    let i;
    let played_moves = 0;
    let apos;
  
    /* Do all the moves with alternating colors. */
    for (i = 0; i < num_moves; i++) {
      apos = list[i]

      if (apos !== NO_MOVE
        && (b.trymove(apos, mcolor, "play_attack_defend_n", NO_MOVE)
        || b.tryko(apos, mcolor, "play_attack_defend_n"))){
          played_moves++;
        }
      mcolor = b.OTHER_COLOR(mcolor);
    }

    /* Now do the real work. */
    let zpos = list[num_moves]

    /* Temporarily increase the depth values with the number of explicitly
    * placed stones.
    *
    * This improves the reading of pattern constraints but
    * unfortunately tends to be too expensive. For the time being it is
    * disabled.
    */
    
    if (do_attack) {
      if (b.board[zpos] === colors.EMPTY){
        success = codes.WIN;
      }
      else {
        success = this.attack(zpos, null);
      }
    }
    else {
      if (b.board[zpos] === colors.EMPTY) {
        success = 0;
      }
      else {
        let dcode = this.find_defense(zpos, null);
        if (dcode === 0 && !this.attack(zpos, null))
          success = codes.WIN;
        else{
          success = dcode;
        }
      }
    }

    
    /* Pop all the moves we could successfully play. */
    for (i = 0; i < played_moves; i++){
      b.popgo();
    }

    return success;
  }, 

  /* The function play_attack_defend2_n() plays a sequence of moves,
  * alternating between the players and starting with color. After
  * having played through the sequence, the two last coordinate pairs
  * give two targets to simultaneously attack or defend, depending on
  * the value of do_attack. If there is no stone present to attack or
  * defend, it is assumed that it has already been captured. If one or
  * more of the moves to play turns out to be illegal for some reason,
  * the rest of the sequence is played anyway, and attack/defense is
  * tested as if nothing special happened.
  *
  * A typical use for these functions is to set up a crosscut in an
  * autohelper and see whether at least one cutting stone can be
  * captured.
  */
  play_attack_defend2_n(color, do_attack, num_moves, list) {
    const b = this.board
    let mcolor = color;
    let success = 0;
    let i;
    let played_moves = 0;
    let apos;
    let ypos;
    let zpos;

    /* Do all the moves with alternating colors. */
    for (i = 0; i < num_moves; i++) {
      apos = list[i]

      if (apos !== NO_MOVE
        && (b.trymove(apos, mcolor, "play_attack_defend_n", NO_MOVE)
        || b.tryko(apos, mcolor, "play_attack_defend_n"))){
          played_moves++;
        }
      mcolor = b.OTHER_COLOR(mcolor);
    }

    /* Now do the real work. */
    ypos = list[num_moves]
    zpos = list[num_moves+1]
    
    /* FIXED: tm - returns ko results correctly (3.1.22) */
    if (do_attack) {
      if (b.board[ypos] === colors.EMPTY || b.board[zpos] === colors.EMPTY){
        success = codes.WIN;
      }
      else{
        success = this.attack_either(ypos, zpos);
      }
    }
    else {
      if (b.board[ypos] === colors.EMPTY || b.board[zpos] === colors.EMPTY) {
        success = 0;
      }
      else {
        success = this.defend_both(ypos, zpos);
      }
    }
    
    /* Pop all the moves we could successfully play. */
    for (i = 0; i < played_moves; i++){
      b.popgo();
    }

    return success;
  },

  /* The function play_connect_n() plays a sequence of moves,
   * alternating between the players and starting with color. After
   * having played through the sequence, the two last coordinates
   * give two targets that should be connected or disconnected, depending on
   * the value of do_connect. If there is no stone present to connect or
   * disconnect, it is assumed that the connection has failed. If one or
   * more of the moves to play turns out to be illegal for some reason,
   * the rest of the sequence is played anyway, and connection/disconnection
   * is tested as if nothing special happened.
   */

  play_connect_n(color, do_connect, num_moves, list) {
    const b = this.board
    let mcolor = color;
    let success = 0;
    let i;
    let played_moves = 0;
    let ypos = list[num_moves];
    let zpos = list[num_moves+1];

    /* Do all the moves with alternating colors. */
    for (i = 0; i < num_moves; i++) {
      let apos = list[i];

      if (apos !== NO_MOVE
        && (b.trymove(apos, mcolor, "play_connect_n", NO_MOVE)
          || b.tryko(apos, mcolor, "play_connect_n"))){
        played_moves++;
      }
      mcolor = b.OTHER_COLOR(mcolor);
    }

    /* See if ypos and zpos can be connected (or disconnected). */
    if (do_connect) {
      if (b.board[ypos] === colors.EMPTY || b.board[zpos] === colors.EMPTY) {
        success = 0;
      }
      else {
        success = this.string_connect(ypos, zpos, null);
      }
    }
    else {
      if (b.board[ypos] === colors.EMPTY || b.board[zpos] === colors.EMPTY) {
        success = codes.WIN;
      }
      else {
        success = this.disconnect(ypos, zpos, null);
      }
    }

    /* Pop all the moves we could successfully play. */
    for (i = 0; i < played_moves; i++){
      b.popgo();
    }

    return success;
  },

  play_lib_n() {},
  /* Set the various reading depth parameters. If mandated_depth_value
   * is not -1 that value is used; otherwise the depth values are
   * set as a function of level. The parameter mandated_depth_value
   * can be set at the command line to force a particular value of
   * depth; normally it is -1.
   */
  // 设置全局变量： depth...
  set_depth_values(level, report_levels) {
    const node_limits = [500, 500, 450, 400, 400, 325, 275, 200, 150, 100, 75, 50]
    let depth_level;

    /*
     * Other policies depending on level:
     * owl.c:         >=  9: use vital attack pattern database
     *                >=  8: increase depth values in owl_substantial
     *                >=  8: don't turn off owl_phase in semeai reading
     * reading.c:     >=  8: Use superstrings and do more backfilling.
     * value_moves.c: >=  6: try to find more owl attacks/defenses
     * breakin.c:     >= 10: try to find break-ins. (*)
     * worm.c:        >= 10: detect unconditionally meaningless moves
     *
     * The break-in code (*) is particularly expensive.
     *
     * Speedups between levels 9 and 10 and between levels 7 and 8
     * are obtained by turning off services, and between these
     * levels no changes are made in the depths. The parameter
     * depth_level is the correction compared to the default settings at level
     * 10 for most reading depths.
     */
    if (level >= 10){
      depth_level = level - 10;
    }
    else if (level === 9){
      depth_level = 0;
    }
    else if (level === 8){
      depth_level = -1;
    }
    else{
      depth_level = level - 8;
    }

    this.depth                = Math.max(6, DEPTH 	    + depth_level);
    this.branch_depth         = Math.max(3, BRANCH_DEPTH	    + depth_level);
    this.backfill_depth       = Math.max(2, BACKFILL_DEPTH    + depth_level);
    this.backfill2_depth      = Math.max(1, BACKFILL2_DEPTH   + depth_level);
    this.break_chain_depth    = Math.max(2, BREAK_CHAIN_DEPTH + depth_level);
    if (level >= 8)
      this.owl_distrust_depth = Math.max(1, (2 * OWL_DISTRUST_DEPTH + depth_level) / 2);
    else
      this.owl_distrust_depth = Math.max(1, (2 * OWL_DISTRUST_DEPTH - 1 + depth_level) / 2);
    this.owl_branch_depth     = Math.max(2, (2 * OWL_BRANCH_DEPTH   + depth_level) / 2);
    this.owl_reading_depth    = Math.max(5, (2 * OWL_READING_DEPTH  + depth_level) / 2);

    /* Atari-atari depth levels are unchanged only between levels 7/8, 9/10: */
    if (level >= 10)
      this.aa_depth = Math.max(0, AA_DEPTH + (level - 10));
    else if (level === 9)
      this.aa_depth = Math.max(0, AA_DEPTH);
    else if (level >= 7)
      this.aa_depth = Math.max(0, AA_DEPTH - 1);
    else
      this.aa_depth = Math.max(0, AA_DEPTH - (8 - level));

    /* Exceptions:
     * fourlib_depth: This is constant from levels 7 to 10.
     * superstring_depth: set to 0 below level 8.
     */
    if (level >= 10)
      this.ko_depth          = Math.max(1, KO_DEPTH + (level - 10));
    else if (level === 9)
      this.ko_depth          = Math.max(1, KO_DEPTH);
    else if (level >= 7)
      this.ko_depth          = Math.max(1, KO_DEPTH - 1);
    else
      this.ko_depth          = Math.max(1, KO_DEPTH + (level - 8));

    if (level >= 10)
      this.fourlib_depth     = Math.max(1, FOURLIB_DEPTH + (level - 10));
    else if (level >= 7)
      this.fourlib_depth     = Math.max(1, FOURLIB_DEPTH);
    else
      this.fourlib_depth     = Math.max(1, FOURLIB_DEPTH + (level - 7));

    if (level >= 8)
      this.superstring_depth = Math.max(1, SUPERSTRING_DEPTH);
    else
      this.superstring_depth = 0;

    if (level >= 10)
      this.owl_node_limit    = OWL_NODE_LIMIT * Math.pow(1.5, depth_level);
    else {
      this.owl_node_limit    = (OWL_NODE_LIMIT * node_limits[10 - level] / node_limits[0]);
      this.owl_node_limit    = Math.max(20, this.owl_node_limit);
    }

    this.semeai_branch_depth  = Math.max(2, (2*SEMEAI_BRANCH_DEPTH  + depth_level) / 2);
    this.semeai_branch_depth2 = Math.max(2, (2*SEMEAI_BRANCH_DEPTH2 + depth_level) / 2);
    this.semeai_node_limit    = SEMEAI_NODE_LIMIT * Math.pow(1.5, depth_level);
    this.connect_depth         = Math.max(2, CONNECT_DEPTH  + 2 * depth_level);
    this.connect_depth2        = Math.max(2, CONNECT_DEPTH2 + 2 * depth_level);
    this.connection_node_limit = CONNECT_NODE_LIMIT * Math.pow(1.45, depth_level);
    this.breakin_depth 	      = Math.max(2, BREAKIN_DEPTH + 2 * depth_level);
    this.breakin_node_limit 	= BREAKIN_NODE_LIMIT * Math.pow(1.5, depth_level);

    if (this.mandated_depth !== -1)
      this.depth = this.mandated_depth;
    if (this.mandated_backfill_depth !== -1)
      this.backfill_depth = this.mandated_backfill_depth;
    if (this.mandated_backfill2_depth !== -1)
      this.backfill2_depth = this.mandated_backfill2_depth;
    if (this.mandated_break_chain_depth !== -1)
      this.break_chain_depth = this.mandated_break_chain_depth;
    if (this.mandated_superstring_depth !== -1)
      this.superstring_depth = this.mandated_superstring_depth;
    if (this.mandated_branch_depth !== -1)
      this.branch_depth = this.mandated_branch_depth;
    if (this.mandated_fourlib_depth !== -1)
      this.fourlib_depth = this.mandated_fourlib_depth;
    if (this.mandated_ko_depth !== -1)
      this.ko_depth = this.mandated_ko_depth;
    if (this.mandated_aa_depth !== -1)
      this.aa_depth = this.mandated_aa_depth;
    if (this.mandated_owl_distrust_depth !== -1)
      this.owl_distrust_depth = this.mandated_owl_distrust_depth;
    if (this.mandated_owl_branch_depth !== -1)
      this.owl_branch_depth = this.mandated_owl_branch_depth;
    if (this.mandated_owl_reading_depth !== -1)
      this.owl_reading_depth = this.mandated_owl_reading_depth;
    if (this.mandated_owl_node_limit !== -1)
      this.owl_node_limit = this.mandated_owl_node_limit;
    if (this.mandated_semeai_node_limit !== -1)
      this.semeai_node_limit = this.mandated_semeai_node_limit;

    this.depth_offset = 0;

    if (report_levels) {
      // print depth
    }
  },


  /*
   * Modify the various tactical reading depth parameters. This is
   * typically used to avoid horizon effects. By temporarily increasing
   * the depth values when trying some move, one can avoid that an
   * irrelevant move seems effective just because the reading hits a
   * depth limit earlier than it did when reading only on relevant
   * moves.
   */

  modify_depth_values(n) {
    this.depth              += n;
    this.backfill_depth     += n;
    this.backfill2_depth    += n;
    this.break_chain_depth  += n;
    this.superstring_depth  += n;
    this.branch_depth       += n;
    this.fourlib_depth      += n;
    this.ko_depth           += n;
    this.breakin_depth	     += n;
    this.depth_offset       += n;
    this.depth_modification += n;
  },


  increase_depth_values () {
    this.modify_depth_values(1);
  },

  decrease_depth_values () {
    this.modify_depth_values(-1);
  },

  get_depth_modification() {
    return this.depth_modification;
  },

  confirm_safety() {},
  blunder_size() {},
  detect_owl_blunder() {},
  detect_tactical_blunder() {},
  double_atari() {},
  playing_into_snapback() {},

  /* Add a new string to a superstring. Record stones, liberties, and
   * adjacent strings as asked for.
   */
  superstring_add_string(str, num_my_stones, my_stones,
    num_stones, stones, num_libs, libs, maxlibs,num_adj, adjs, liberty_cap, mx, ml, ma, do_add) {
    const b = this.board

    b.ASSERT1(mx[str] === 0, str);

    /* Pick up the stones of the new string. */
    let new_stones = b.findstones(str, b.board_size * b.board_size, my_stones);

    b.mark_string(str, mx, 1);
    if (stones) {
      // gg_assert(num_stones);
      for (let k = 0; k < new_stones; k++) {
        if (do_add) {
          stones[num_stones[0]] = my_stones[num_my_stones[0] + k];
          num_stones[0]++;
        }
      }
    }
    num_my_stones[0] += new_stones;

    /* Pick up the liberties of the new string. */
    if (libs) {
      // gg_assert(num_libs);
      /* Get the liberties of the string. */
      let my_libs = [];
      let num_my_libs = b.findlib(str, b.MAXLIBS, my_libs);

      /* Remove this string from the superstring if it has too many
       * liberties.
       */
      if (liberty_cap > 0 && num_my_libs > liberty_cap){
        num_my_stones[0] -= new_stones;
      }

      for (let k = 0; k < num_my_libs; k++) {
        if (ml[my_libs[k]]){
          continue;
        }
        ml[my_libs[k]] = 1;
        if (do_add && (liberty_cap === 0 || num_my_libs <= liberty_cap)) {
          libs[num_libs[0]] = my_libs[k];
          num_libs[0]++;
          if (num_libs[0] === maxlibs){
            break;
          }
        }
      }
    }

    /* Pick up adjacent strings to the new string. */
    if (adjs) {
      // gg_assert(num_adj);
      let my_adjs = [];
      let num_my_adj = b.chainlinks(str, my_adjs);
      for (let k = 0; k < num_my_adj; k++) {
        if (liberty_cap > 0 && b.countlib(my_adjs[k]) > liberty_cap){
          continue;
        }
        if (ma[my_adjs[k]]){
          continue;
        }
        ma[my_adjs[k]] = 1;
        if (do_add) {
          adjs[num_adj[0]] = my_adjs[k];
          num_adj[0]++;
        }
      }
    }
  },

  find_superstring(str, num_stones, stones) {
    this.do_find_superstring(str, num_stones, stones, null, null, 0, null, null, 0, 0, 1);
  },
  /* This is the same as find_superstring, except that connections of
   * type 5 are omitted. This is used in semeai analysis.
   */
  find_superstring_conservative(str, num_stones, stones) {
    this.do_find_superstring(str, num_stones, stones, null, null, 0, null, null, 0, 0, 0);
  },

  /* This function computes the superstring at (str) as described above,
   * but omitting connections of type 5. Then it constructs a list of
   * liberties of the superstring which are not already liberties of
   * (str).
   *
   * If liberty_cap is nonzero, only liberties of substrings of the
   * superstring which have fewer than liberty_cap liberties are
   * generated.
   */
  // 找到强联络的大龙
  // liberty_cap： 子串气数限制
  find_superstring_liberties(str, num_libs, libs, liberty_cap) {
    this.do_find_superstring(str, null, null, num_libs, libs, this.board.MAX_LIBERTIES, null, null, liberty_cap, 0, 0);
  },
  find_proper_superstring_liberties(){},
  find_superstring_stones_and_liberties() {},
  superstring_chainlinks() {},

  /* analogous to chainlinks, this function finds boundary chains of the
   * superstring at (str), omitting those which are boundary chains of
   * (str) itself. If liberty_cap != 0, only those boundary chains with
   * <= liberty_cap liberties are reported.
   */
  proper_superstring_chainlinks(str, num_adj, adjs, liberty_cap) {
    this.do_find_superstring(str, null, null, null, null, 0, num_adj, adjs, liberty_cap, 1, 2);
  },

  /* Find the stones of an extended string, where the extensions are
   * through the following kinds of connections:
   *
   * 1. Solid connections (just like ordinary string).
   *
   *    OO
   *
   * 2. Diagonal connection or one space jump through an intersection
   *    where an opponent move would be suicide or self-atari.
   *
   *    ...
   *    O.O
   *    XOX
   *    X.X
   *
   * 3. Bamboo joint.
   *
   *    OO
   *    ..
   *    OO
   *
   * 4. Diagonal connection where both adjacent intersections are empty.
   *
   *    .O
   *    O.
   *
   * 5. Connection through adjacent or diagonal tactically captured stones.
   *    Connections of this type are omitted when the superstring code is
   *    called from reading.c, but included when the superstring code is
   *    called from owl.c
   */
  // 超级串：强连接的多个棋串集（虎口、双、小尖）
  do_find_superstring(str, num_stones, stones, num_libs, libs, maxlibs, num_adj, adjs, liberty_cap, proper, type) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);

    let num_my_stones = [0];
    let my_stones = [];

    let mx = new Array(b.BOARDMAX).fill(0); /* stones */
    let ml = new Array(b.BOARDMAX).fill(0); /* liberties */
    let ma = new Array(b.BOARDMAX).fill(0); /* adjacent strings */

    if (num_stones){
      num_stones[0] = 0;
    }
    if (num_libs){
      num_libs[0] = 0;
    }
    if (num_adj){
      num_adj[0] = 0;
    }

    /* Include the string itself in the superstring. Only record stones,
     * liberties, and/or adjacent strings if proper==0.
     */
    this.superstring_add_string(str, num_my_stones, my_stones,
      num_stones, stones, num_libs, libs, maxlibs, num_adj, adjs, liberty_cap, mx, ml, ma, !proper);

    /* Loop over all found stones, looking for more strings to include
     * in the superstring. The loop is automatically extended over later
     * found stones as well.
     */
    for (let r = 0; r < num_my_stones[0]; r++) {
      let pos = my_stones[r];

      for (let k = 0; k < 4; k++) {
        /* List of relative coordinates. (pos) is marked by *.
         *
         *  ef.
         *  gb.
         *  *ac
         *  .d.
         *
         */
        let right = b.delta[k];
        let up = b.delta[(k+1)%4];

        let apos = pos + right;
        let bpos = pos + right + up;
        let cpos = pos + 2*right;
        let dpos = pos + right - up;
        let epos = pos + 2*up;
        let fpos = pos + right + 2*up;
        let gpos = pos + up;
        let unsafe_move;

        if (!b.ON_BOARD(apos)){
          continue;
        }

        /* Case 1. Nothing to do since stones are added string by string. */

        /* Case 2. */
        if (b.board[apos] === colors.EMPTY) {
          if (type === 2){
            unsafe_move = b.approxlib(apos, other, 2, null) < 2;
          }
          else {
            unsafe_move = b.is_self_atari(apos, other);
          }

          if (unsafe_move && type === 1 && b.is_ko(apos, other, null)){
            unsafe_move = 0;
          }

          if (unsafe_move) {
            if (b.board[bpos] === color && !mx[bpos]){
              this.superstring_add_string(bpos, num_my_stones, my_stones,
                num_stones, stones, num_libs, libs, maxlibs, num_adj, adjs, liberty_cap, mx, ml, ma, 1);
            }
            if (b.board[cpos] === color && !mx[cpos]) {
              this.superstring_add_string(cpos, num_my_stones, my_stones,
                num_stones, stones, num_libs, libs, maxlibs, num_adj, adjs, liberty_cap, mx, ml, ma, 1);
            }
            if (b.board[dpos] === color && !mx[dpos]) {
              this.superstring_add_string(dpos, num_my_stones, my_stones,
                num_stones, stones, num_libs, libs, maxlibs, num_adj, adjs, liberty_cap, mx, ml, ma, 1);
            }
          }
        }

        /* Case 3. */
        /* Notice that the order of these tests is significant. We must
         * check bpos before fpos and epos to avoid accessing memory
         * outside the board array. (Notice that fpos is two steps away
         * from pos, which we know is on the board.)
         */
        if (b.board[apos] === color && b.board[bpos] === colors.EMPTY
          && b.board[fpos] === color && b.board[epos] === color && !mx[epos]
          && b.board[gpos] === colors.EMPTY)
          this.superstring_add_string(epos, num_my_stones, my_stones,
            num_stones, stones, num_libs, libs, maxlibs, num_adj, adjs, liberty_cap, mx, ml, ma, 1);
        /* Don't bother with f, it is part of the string just added. */

        /* Case 4. */
        if (b.board[bpos] === color && !mx[bpos]
          && b.board[apos] === colors.EMPTY && b.board[gpos] === colors.EMPTY)
          this.superstring_add_string(bpos, num_my_stones, my_stones,
            num_stones, stones, num_libs, libs, maxlibs, num_adj, adjs, liberty_cap, mx, ml, ma, 1);

        /* Case 5. */
        if (type === 1) {
          for (let l = 0; l < 2; l++) {
            let upos;

            if (l === 0) {
              /* adjacent lunch */
              upos = apos;
            }
            else {
              /* diagonal lunch */
              upos = bpos;
            }

            if (b.board[upos] !== other)
              continue;

            upos = b.find_origin(upos);

            /* Only do the reading once. */
            if (mx[upos] === 1)
              continue;

            mx[upos] = 1;

            if (this.attack(upos, null) && !this.find_defense(upos, null)) {
              let lunch_stones = [];
              let num_lunch_stones = b.findstones(upos, b.MAX_BOARD*b.MAX_BOARD, lunch_stones);
              for (let m = 0; m < num_lunch_stones; m++) {
                for (let n = 0; n < 8; n++) {
                  let vpos = lunch_stones[m] + b.delta[n];
                  if (b.board[vpos] === color && !mx[vpos]){
                    this.superstring_add_string(vpos, num_my_stones, my_stones,
                      num_stones, stones, num_libs, libs, maxlibs, num_adj, adjs, liberty_cap, mx, ml, ma, 1);
                  }
                }
              }
            }
          }
        }

        if (num_libs && maxlibs > 0 && num_libs[0] >= maxlibs){
          return;
        }
      }
    }
  },

  start_timer(n) {
    if(n >= 0 && n < NUMBER_OF_TIMERS){
      if (!this.showtime)
        return;

      timers[n] = Date.now();
    }
  },

  time_report(n, occupation, move, minTime){
    if(n >= 0 && n < NUMBER_OF_TIMERS) {
      if (!this.showtime) {
        return 0.0;
      }

      const now = Date.now();
      const dt = now - timers[n];
      if (dt > minTime) {
        console.log(`${occupation}${move !== NO_MOVE?move: ''}: ${dt} ms`)
      }
      timers[n] = now;
      return dt;
    }
  },
}