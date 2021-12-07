import {
  codes, NO_MOVE,
} from './Constants'
import {routine_id, REVERSE_RESULT} from "./Liberty";

/* Statistics. */
// let reading_node_counter = 0
// let nodes_when_called = 0

class ReadingMoves {
  constructor(cfg) {
    Object.assign(this, cfg)
    this.pos = []
    this.score = []
    this.message = []
  }
};

const MAX_MOVES = 50



/* Parameters used in the ordering of moves to try in the tactical
 * reading.
 */
/*                                              0   1   2   3   4  >4  */
const defend_lib_score              = [-5, -4,  0,  3,  5, 50];
const defend_not_adjacent_lib_score = [ 0,  0,  2,  3,  5];
const defend_capture_score          = [ 0,  6,  9, 13, 18, 24];
const defend_atari_score            = [ 0,  2,  4,  6,  7, 8];
const defend_save_score             = [ 0,  3,  6,  8, 10, 12];
const defend_open_score             = [ 0,  1,  2,  3,  4];
const attack_own_lib_score          = [10, -4,  2,  3,  4];
const attack_string_lib_score       = [-5,  2,  3,  7, 10, 19];
const attack_capture_score          = [-4,  4, 10, 15, 20, 25];
const attack_save_score             = [ 0, 10, 13, 18, 21, 24];
const attack_open_score             = [ 0,  0,  2,  4,  4];
const defend_not_edge_score         = 5;
const attack_not_edge_score         = 1;
const attack_ko_score               = -15;
const cannot_defend_penalty         = -20;
const safe_atari_score              = 8;


export const Reading = {


  /* This macro checks whether the reported result is a loss, so we have won
 * and can exit, or else if it is the best result so far.
 * Note that SGFTRACE must have been setup.
 */
  CHECK_RESULT(savecode, savemove, code, move_pos, move_ptr, trace_message) {
    if (code === 0) {
      if (move_ptr) {
        move_ptr[0] = move_pos[0]
      }
      // SGFTRACE(move_pos, WIN, trace_message);				
      return codes.WIN;							
    }									
    else if (REVERSE_RESULT(code) > savecode[0]) {
      // 得到结果比现在的好，则更新
      savemove[0] = move_pos[0];
      savecode[0] = REVERSE_RESULT(code);
    }		
  },

  CHECK_RESULT_UNREVERSED(savecode, savemove, code, move_pos,	move_ptr, trace_message) {
    // 反转code
    return this.CHECK_RESULT(savecode, savemove, REVERSE_RESULT(code), move_pos, move_ptr, trace_message)
  },


  RETURN_RESULT(savecode, savemove, move_ptr, trace_message) {
    // 非失败，且有move值，更新move
    if (savecode[0]) {
      if (move_ptr) {
        move_ptr[0] = savemove[0] //保存结果
      }
    } else {
      // SGFTRACE(0, 0, NULL);
    }
    return savecode[0];
  },


  /* Play a collected batch of moves and see if any of them works.  This
   * is a defense version.
   */
  DEFEND_TRY_MOVES(no_deep_branching, attack_hint, str, move, color, moves, savecode, savemove )	{
    const b = this.board
    for (let k = moves.num_tried; k < moves.num; k++) {
      let ko_move = [];
      let dpos = moves.pos[k];

      if (b.komaster_trymove(dpos, color, moves.message[k], str, ko_move, b.stackp <= this.ko_depth && savecode[0] === 0)) {
        const acode = this.do_attack(str, attack_hint);
        b.popgo();

        if (!ko_move[0]) {
          this.CHECK_RESULT(savecode, savemove, acode, dpos, move, "defense effective");
        }
        else {
          if (acode !== codes.WIN) {
            savemove[0] = dpos;
            savecode[0] = codes.KO_B;
          }
        }
      }

      if (no_deep_branching && b.stackp >= this.branch_depth){
        this.RETURN_RESULT(savecode, savemove, move, "branching limit");
      }
    }

    moves.num_tried = moves.num;
  },


  UPDATE_SAVED_KO_RESULT(savecode, save, code, move) {
    if (code !== 0 && REVERSE_RESULT(code) > savecode[0]) {
      save[0] = move[0];
      savecode[0] = REVERSE_RESULT(code);
    }
  },


  /* Please notice that message had better be a fixed string. Only the
   * pointer to it is saved and there is no attempt to free up any
   * storage.
   */
  ADD_CANDIDATE_MOVE(move, this_score, moves, this_message)	{
    let u
    for (u = 0; u < moves.num; u++){
      if (moves.pos[u] === move) {
        moves.score[u] += this_score;
        break;
      }
    }
    if (u === moves.num && moves.num < MAX_MOVES) {
      moves.pos[moves.num] = move;
      moves.score[moves.num] = this_score;
      moves.message[moves.num] = this_message;
      moves.num++;
    }
  },

  /* attack(str, *move) determines if the string at (str) can be
   * captured, and if so, (*move) returns the attacking move, unless
   * (move) is a null pointer. Use a null pointer if you are interested
   * in the result of the attack but not the attacking move itself.
   *
   * Return WIN if the attack succeeds unconditionally, 0 if it doesn't.
   * Returns KO_A or KO_B if the result depends on ko:
   *   - Returns KO_A if the attack succeeds provided attacker is willing to
   *     ignore any ko threat (the attacker makes the first ko capture).
   *   - Returns KO_B if attack succeeds provided attacker has a ko threat
   *     which must be answered (the defender makes the first ko capture).
   */
  attack(str, move) {
    const b = this.board
    let result = [] //pointer
    let the_move = [NO_MOVE];
    the_move[1] = 'attack'
    let liberties = b.countlib(str);

    // nodes_when_called = reading_node_counter;
    /* Don't even spend time looking in the cache if there are more than
     * enough liberties. We need this before the persistent cache lookup
     * to avoid results inconsistent with find_defense().
     */
    // 3口气以上忽略
    if (liberties > 4 || (liberties === 4 && b.stackp > this.fourlib_depth) || (liberties === 3 && b.stackp > this.depth)){
      return 0;
    }

    // 搜索缓存
    // let origin = b.find_origin(str);
    // if (this.search_persistent_reading_cache(ATTACK, origin, result, the_move)) {
    //   if (move){
    //     move = the_move;
    //   }
    //   return result;
    // }

    // memset(shadow, 0, sizeof(shadow));
    result = this.do_attack(str, the_move);
    // let nodes = reading_node_counter - nodes_when_called;

    // if (debug & DEBUG_READING_PERFORMANCE) {
    //   if (reading_node_counter - nodes_when_called
    //     >= MIN_READING_NODES_TO_REPORT) {
    //     if (result != 0)
    //       gprintf("%oattack %1m(%1m) = %d %1M, %d nodes ", str, origin, result,
    //         the_move, nodes);
    //     else
    //       gprintf("%oattack %1m(%1m) = %d, %d nodes ", str, origin, result,
    //         nodes);
    //     dump_stack();
    //   }
    // }

    // this.store_persistent_reading_cache(routine_id.ATTACK, origin, result, the_move, nodes);

    if (move){
      move[0] = the_move[0];
    }

    return result;
  },


  /* find_defense(str, *move) attempts to find a move that will save
   * the string at (str). It returns WIN if such a move is found, with
   * (*move) the location of the saving move, unless (move) is a
   * null pointer. It is not checked that tenuki defends, so this may
   * give an erroneous answer if !attack(str).
   *
   * Returns KO_A or KO_B if the result depends on ko. Returns KO_A if the
   * string can be defended provided the defender is willing to ignore
   * any ko threat. Returns KO_B if the defender wins by having a ko threat
   * which must be answered.
   */
  find_defense(str, move) {
    const b = this.board
    const the_move = [NO_MOVE];
    const liberties = b.countlib(str);

    // nodes_when_called = reading_node_counter;
    /* Don't even spend time looking in the cache if there are more than
     * enough liberties.
     */
    if (liberties > 4 || (liberties === 4 && b.stackp > this.fourlib_depth)) {
      if (move){
        move[0] = NO_MOVE;
      }
      return codes.WIN;
    }

    // const origin = b.find_origin(str);
    // if (search_persistent_reading_cache(FIND_DEFENSE, origin, &result, &the_move)) {
    //   if (move)
    //     *move = the_move;
    //   return result;
    // }

    // memset(shadow, 0, sizeof(shadow));
    let result = this.do_find_defense(str, the_move)
    // nodes = reading_node_counter - nodes_when_called;

    // if (debug & DEBUG_READING_PERFORMANCE) {
    //   if (reading_node_counter - nodes_when_called
    //     >= MIN_READING_NODES_TO_REPORT) {
    //     if (result != 0)
    //       gprintf("%odefend %1m(%1m) = %d %1M, %d nodes ", str, origin, result,
    //         the_move, nodes);
    //     else
    //       gprintf("%odefend %1m(%1m) = %d, %d nodes ", str, origin, result,
    //         nodes);
    //     dump_stack();
    //   }
    // }
    // store_persistent_reading_cache(FIND_DEFENSE, origin, result, the_move, nodes);

    if (move){
      move[0] = the_move[0];
    }

    return result;
  },

  attack_and_defend() {},
  attack_either() {},
  defend_both() {},

  break_through() {},
  break_through_helper() {},
  attack_threats() {},

  /* ================================================================ */
  /*                       Defensive functions                        */
  /* ================================================================ */
  /* Like find_defense, but takes the komaster argument. If the
   * opponent is reading functions will not try
   * to take ko.
   */
  do_find_defense(str, move) {
    const b = this.board
    const xpos = [NO_MOVE];
    let dcode = 0;
    let retval;

    // SETUP_TRACE_INFO("find_defense", str);

    /* We first check if the number of liberties is larger than four. In
     * that case we don't cache the result and to avoid needlessly
     * storing the position in the hash table, we must do this test
     * before we look for cached results.
     */
    str = b.find_origin(str);
    const liberties = b.countlib(str);

    if (liberties > 4
      || (liberties === 4 && b.stackp > this.fourlib_depth)
      || (liberties === 3 && b.stackp > this.depth)) {
      /* No need to cache the result in these cases. */
      // SGFTRACE(0, WIN, "too many liberties or stackp > depth");
      if (move){
        move[0] = 0
      }
      return codes.WIN;
    }

    /* Set "killer move" up.  This move (if set) was successful in
     * another variation, so it is reasonable to try it now.  However,
     * we only do this if the string has at least 3 liberties -
     * otherwise the situation changes too much from variation to
     * variation.
     */
    if (liberties > 2 && move){
      xpos[0] = move[0];
    }

    if (b.stackp <= this.depth
      && this.tt_get(this.ttable, routine_id.FIND_DEFENSE, str, NO_MOVE, this.depth - b.stackp, null, retval, null, xpos) === 2) {
      /* Note that if return value is 1 (too small depth), the move will
       * still be used for move ordering.
       */
      // TRACE_CACHED_RESULT(retval, xpos);
      // SGFTRACE(xpos, retval, "cached");
      if (move){
        move[0] = xpos[0];
      }
      return retval;
    }

    if (liberties === 1){
      dcode = this.defend1(str, xpos);
    }
    // else if (liberties === 2){
    //   dcode = this.defend2(str, xpos);
    // }
    // else if (liberties === 3){
    //   dcode = this.defend3(str, xpos);
    // }
    // else if (liberties === 4){
    //   dcode = this.defend4(str, xpos);
    // }

    if (dcode) {
      this.READ_RETURN(routine_id.FIND_DEFENSE, str, this.depth - b.stackp, move, xpos, dcode);
      return dcode
    }

    this.READ_RETURN0(routine_id.FIND_DEFENSE, str, this.depth - b.stackp);
    return 0
  },


  /* Determine if a `move' by `color' allows under-the-stones tesuji
   * a.k.a. "big snapback".  Here is an example:
   *
   *     |XXXX...
   *     |XXOOXXX
   *     |OOOXOOX
   *     |..O*OOX
   *     +-------
   *
   * Even though the move at '*' allows black to capture four white
   * stones, white can later recapture black stones and create a second
   * eye.  This is very similar to a snapback.
   *
   * This function returns true if a move creates a string of with two
   * liberties, which can, however, be instantly recaptured by opponent.
   * It is actually not required that the move captures something.  If
   * the caller needs captures, it should check for them itself.
   */
  allows_under_the_stones_tesuji(move, color) {
    const b = this.board
    let result = 0;

    if (b.accuratelib(move, color, 3, null) !== 2){
      return 0;
    }

    if (b.trymove(move, color, "allows_under_the_stones_tesuji", NO_MOVE)) {
      const libs =[];

      b.findlib(move, 2, libs);
      if ((!b.is_self_atari(libs[0], color)
        && b.accuratelib(libs[1], b.OTHER_COLOR(color), 3, null) <= 2)
        || (!b.is_self_atari(libs[1], color)
          && b.accuratelib(libs[0], b.OTHER_COLOR(color), 3, null) <= 2)){
        result = 1;
      }

      b.popgo();
    }

    return result;
  },

  /* Called by the defendN functions.  Don't think too much if there's
   * an easy way to get enough liberties.
   */
  fast_defense(str, liberties, libs, move) {
    const b = this.board
    const color = b.board[str];
    let goal_liberties = b.stackp < this.fourlib_depth ? 5 : 4;

    /* We would like to initialize liberty_mark to -1, but some
     * compilers warn, quite correctly, that -1 is not an unsigned
     * number.
     */
    // static unsigned liberty_mark = ~0U;
    // static unsigned lm[BOARDMAX];
    let liberty_mark = -1
    let lm = []
    // ASSERT1(libs != NULL, str);
    // ASSERT1(move != NULL, str);

    for (let k = 0; k < liberties; k++) {
      /* accuratelib() seems to be more efficient than fastlib() here,
       * probably because it catches more cases.
       */
      // 防守后气数满足要求，防守成功
      if (b.accuratelib(libs[k], color, goal_liberties, null) >= goal_liberties) {
        move[0] = libs[k];
        return 1;
      }
    }

    /* Check the cases where an opponent neighbor string is in
     * atari.
     */
    // 找到相邻对方能提掉棋串
    let adjs = []
    let adj = b.chainlinks2(str, adjs, 1);
    const lib = [];
    const missing = goal_liberties - liberties;

    //遍历所有能提棋串
    for (let j = 0; j < adj; j++) {
      let total = 0;

      b.findlib(adjs[j], 1, lib);
      /* We aren't interested in ko (at this stage). And playing
       * our own last liberty to capture is prone to snapbacks,
       * so better let the 'normal' reading routines do the job.
       */
      // 忽略防守提子2子及以下、打劫
      if ((liberties === 1 && lib === libs[0] && b.countstones(adjs[j]) <= 2) || b.is_ko(lib[0], color, null)){
        continue;
      }

      /* Would the capture already gain enough liberties ?
       * No need to test the case if the move is one of our liberties,
       * it has already been done in the first loop of this function.
       */
      const num_adjacent_stones = b.count_adjacent_stones(adjs[j], str, missing);
      // 对方剩余的1口气不是当前防守棋串公气
      if (!b.liberty_of_string(lib[0], str) && num_adjacent_stones >= missing) {
        move[0] = lib[0];
        return 1;
      }
      // ASSERT1(num_adjacent_stones >= 1, str);

      /* What is the total number of liberties of the friendly strings around
       * the lunch?
       */
      if (++liberty_mark === 0) {
        lm = []
        liberty_mark++;
      }
      /* Loop over all neighbors of the lunch. */
      let adjs2 = []
      let adj2 = b.chainlinks(adjs[j], adjs2);
      for (let k = 0; k < adj2; k++) {
        /* Loop over all liberties of the neighbor. */
        const alibs = []
        const alib = b.findlib(adjs2[k], b.MAXLIBS, alibs);
        for (let l = 0; l < alib; l++) {
          if (lm[alibs[l]] !== liberty_mark) {
            lm[alibs[l]] = liberty_mark;
            total++;
          }
        }
      }

      /* The captured string is treated as common liberties, and
       * some adjustements are made :
       * - we're adding a stone for capturing the lunch (-1)
       * - opponent might be able to remove a liberty (-1)
       * - and possibly force us to connect (-1)
       * - reduce us by one more liberty with a throw-in; this
       *   is only possible if there is only one adjacent stone in the
       *   lunch to the string (-1)
       * Probably there are more damezumari-type cases, but as a heuristic,
       * it seems good enough.
       */
      total += b.countstones(adjs[j]) - 2;
      if (lm[lib] === liberty_mark)
        total--;
      if (num_adjacent_stones === 1)
        total--;

      if (total >= goal_liberties) {
        /* One case when this code can give a false defense is an
         * under-the-stones tesuji or "big snapback."  See reading:199
         * for an example.  While this position is probably very rare,
         * it is nice to make GNU Go understand "neat" tesujis.
         */
        if (liberties === 1 && lib === libs[0] && this.allows_under_the_stones_tesuji(lib, color)) {
          /* This is a bad "fast defense". */
          continue;
        }

        move[0] = lib;
        return 1;
      }
    }

    return 0;
  },


  /* If str points to a string with exactly one liberty, defend1
   * determines whether it can be saved by extending or capturing
   * a boundary chain having one liberty. The function returns WIN if the string
   * can be saved, otherwise 0. It returns KO_A or KO_B if it can be saved,
   * conditioned on ko. Returns KO_A if it can be saved provided (color) is
   * willing to ignore any ko threat. Returns KO_B if it can be saved if (color)
   * has a ko threat which must be answered.
   *
   * The pair defend1-attack2 call each other recursively to
   * read situations such as ladders. They read all ladders to the end.
   * If the reading ply (stackp) is deeper than the deep-reading cutoff
   * parameter depth, whose default value DEPTH is defined in gnugo.h, then a
   * string is assumed alive if it can get 3 liberties. When
   * fourlib_depth < stackp < depth, a string is considered alive if it can get
   * four liberties. When stackp < fourlib_depth, it is considered alive
   * if it can get 5 liberties.
   * */
  defend1 (str, move) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    const lib = [];
    const xpos = [0];
    let savemove = [0];
    let savecode = [0];

    // SETUP_TRACE_INFO("defend1", str);
    // reading_node_counter++;

    // ASSERT1(IS_STONE(board[str]), str);
    // ASSERT1(countlib(str) == 1, str);

    /* lib will be the liberty of the string. */

    let liberties = b.findlib(str, 1, lib);
    // ASSERT1(liberties == 1, str);

    if (this.fast_defense(str, liberties, lib, xpos)){
      return this.RETURN_RESULT([codes.WIN], xpos, move, "fast defense");
    }

    /* Collect moves to try in the first batch.
     * 1. First order liberty.
     * 2. Chain breaking moves.
     * 3. Moves to set up a snapback.
     */
    const moves = new ReadingMoves({
      num : 1,
      num_tried : 0
    })
    moves.pos[0] = lib[0];
    moves.score[0] = 0;
    moves.message[0] = "liberty";

    this.break_chain_moves(str, moves);
    this.set_up_snapback_moves(str, lib, moves);

    this.order_moves(str, moves, color, "read_function_name", move[0]);
    this.DEFEND_TRY_MOVES(0, null, str, move, color, moves, savemove, savecode);

    /* If the string is a single stone and a capture would give a ko,
     * try to defend it with ko by backfilling.
     *
     * FIXME: What is an example of this? Is it correct that the
     *           return value is WIN and not KO_A or KO_B?
     */
    const libs2 = [];
    const apos = []
    if (b.stackp <= this.backfill_depth && b.countstones(str) === 1 && b.is_ko(lib[0], other, null)) {
      liberties = b.approxlib(lib, color, 6, libs2);
      if (liberties <= 5) {
        for (let k = 0; k < liberties; k++) {
          apos[0] = libs2[k];
          if ((liberties === 1 || !b.is_self_atari(apos[0], other)) && b.trymove(apos[0], color, "defend1-C", str)) {
            let acode = this.do_attack(str, null);
            b.popgo();
            this.CHECK_RESULT(savecode, savemove, acode, apos, move, "backfilling");
          }
        }
      }
    }

    return this.RETURN_RESULT(savecode, savemove, move, "saved move");
  },

  defend2() {},

  defend3() {},

  defend4() {},

  special_rescue_moves() {},

  bamboo_rescue_moves() {},

  special_rescue2_moves() {},

  special_rescue3_moves() {},

  special_rescue4_moves() {},

  hane_rescue_moves() {},

  special_rescue5_moves() {},

  special_rescue6_moves() {},

  /*
   * set_up_snapback_moves() is called with (str) a string having a
   * single liberty at (lib).
   *
   * This adds moves which may defend a string in atari by capturing a
   * neighbor in a snapback. One example is this position:
   *
   * OOOOO
   * OXXXO
   * OX.OX
   * OXOXX
   * OX*..
   * -----
   *
   * This code also finds the move * to defend the lone O stone with ko
   * in this position:
   *
   * |XXXXX
   * |XOOOX
   * |OX.OO
   * |.*...
   * +-----
   *
   */
  set_up_snapback_moves (str, lib, moves) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    const libs2 = [];

    // ASSERT1(countlib(str) == 1, str);

    /* This can only work if our string is a single stone and the
     * opponent is short of liberties.
     */
    if (b.stackp <= this.backfill_depth
      && b.countstones(str) === 1
      && b.approxlib(lib, other, 2, libs2) === 1
      && (!b.is_self_atari(libs2[0], color) || b.is_ko(libs2[0], color, null))){

      this.ADD_CANDIDATE_MOVE(libs2[0], 0, moves, "set_up_snapback");
    }
  },

  superstring_moves() {},
  squeeze_moves () {},
  edge_clamp_moves () {},
  propose_edge_moves() {},



  /* ================================================================ */
  /*                       Attacking functions                        */
  /* ================================================================ */
  /* Like attack. If the opponent is komaster reading functions will not try
   * to take ko.
   */

  do_attack(str, move){
    const b = this.board
    const color = b.board[str];
    let xpos = [NO_MOVE];
    xpos[1] = 'do_attack'

    let result = 0;

    // SETUP_TRACE_INFO("attack", str);

    // ASSERT1(color != 0, str);
    /* if assertions are turned off, silently fails */
    if (color === 0){
      return 0;
    }

    str = b.find_origin(str);
    const liberties = b.countlib(str);

    /* No need to cache the result in these cases. */
    if (liberties > 4 || (liberties === 4 && b.stackp > this.fourlib_depth) || (liberties === 3 && b.stackp > this.depth)) {
      return 0;
    }

    /* Set "killer move" up.  This move (if set) was successful in
     * another variation, so it is reasonable to try it now.  However,
     * we only do this if the string has 4 liberties - otherwise the
     * situation changes too much from variation to variation.
     */
    if (liberties > 3 && move){
      xpos[0] = move[0];
    }

    /* Note that if return value is 1 (too small depth), the move will
     * still be used for move ordering.
     */
    let retval = []
    if (b.stackp <= this.depth
      && this.tt_get(this.ttable, routine_id.ATTACK, str, NO_MOVE, this.depth - b.stackp, null,
        retval, null, xpos) === 2) {
      // TRACE_CACHED_RESULT(retval, xpos);
      // SGFTRACE(xpos, retval, "cached");
      if (move){
        move[0] = xpos[0];
      }
      return retval;
    }

    /* Treat the attack differently depending on how many liberties the
       string at (str) has. */
    if (liberties === 1) {
      result = this.attack1(str, xpos);
    }
    // else if (liberties === 2) {
    //   if (stackp > depth + 10) {
    //     result = simple_ladder(str, xpos);
    //   } else {
    //     result = attack2(str, xpos);
    //   }
    // }
    // else if (liberties === 3){
    //   result = attack3(str, xpos);
    // }
    // else if (liberties === 4) {
    //   result = attack4(str, xpos);
    // }

    // ASSERT1(result >= 0 && result <= WIN, str);

    if (result) {
      this.READ_RETURN(routine_id.ATTACK, str, this.depth - b.stackp, move, xpos, result);
      return result
    }

    this.READ_RETURN0(routine_id.ATTACK, str, this.depth - b.stackp);
    return 0
  },

  attack1(str, move) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    let savemove = [0];
    let savecode = [0];
    let xpos = []
    let adjs = []

    // reading_node_counter++;

    /* Pick up the position of the liberty. */
    b.findlib(str, 1, xpos);

    // 棋串多于1子，打吃必定成功（考虑1子会有打劫情况）
    if (b.countstones(str) > 1) {
      return this.RETURN_RESULT([codes.WIN], xpos, move, "last liberty");
    }
    // 以下是color棋串1气且1子的情况
    // 尝试提劫，成功
    if (b.trymove(xpos[0], other, "attack1-A", str)) {
      /* Is the attacker in atari? If not the attack was successful. */
      // 提完多于1口气，不是打劫
      if (b.countlib(xpos[0]) > 1) {
        b.popgo();
        return this.RETURN_RESULT([codes.WIN], xpos, move, "last liberty");
      }

      /* If the attacking string is also a single stone, a possible
       * recapture would be a ko violation, so the defender has to make
       * a ko threat first.
       */
      else if (b.countstones(xpos[0]) === 1) {
        if (b.komaster !== other) {
          /* If the defender is allowed to take the ko the result is KO_A. */
          let res = this.CHECK_RESULT_UNREVERSED(savecode, savemove, codes.KO_A, xpos, move, "last liberty - ko");
          if(res === codes.WIN){
            return res
          }
        }
        else {
          /* But if the attacker is the attack was successful. */
          b.popgo();
          return this.RETURN_RESULT([codes.WIN], xpos, move, "last liberty");
        }
      }

      /* Otherwise, do recapture. Notice that the liberty must be
       * at (str) since we have already established that this string
       * was a single stone.
       */
      else if (b.trymove(str, color, "attack1-B", str)) {
        /* If this was a proper snapback, (str) will now have more
         * than one liberty.
         */
        if (b.countlib(str) > 1) {
          /* Proper snapback, attack fails. */
          b.popgo();
        }
        else {
          b.popgo();
          b.popgo();
          return this.RETURN_RESULT([codes.WIN], xpos, move, "last liberty");
        }
      }
      b.popgo();
    }
    else {
      /* Illegal ko capture. */
      if (b.komaster !== color) {
        let res = this.CHECK_RESULT_UNREVERSED(savecode, savemove, codes.KO_B, xpos, move, "last liberty - ko");
        if(res === codes.WIN){
          return res
        }
      }
    }

    /* If not yet successful, try backfilling and back-capturing.
    * An example of back-capturing can be found in reading:234.
    * Backfilling is maybe only meaningful in positions involving ko.
    */
    // 只适用于打劫, 攻方先尝试在其他位置收气，守方回填，气数>5防守成功
    const libs = []
    const apos = []
    const liberties = b.approxlib(xpos[0], color, 6, libs);
    if (liberties <= 5){

      for (let k = 0; k < liberties; k++) {
        apos[0] = libs[k];
        if (!b.is_self_atari(apos[0], other) && b.trymove(apos[0], other, "attack1-C")) {
          console.info("attack1-C")
          b.print_board()
          // 防守时回填
          let dcode = this.do_find_defense(str, null);
          if (dcode !== codes.WIN && this.do_attack(str, null)) {
            // 防守失败
            if (dcode === 0) {
              b.popgo();
              return this.RETURN_RESULT([codes.WIN], apos, move, "backfilling");
            }
            this.UPDATE_SAVED_KO_RESULT(savecode, savemove, dcode, apos);
          }
          b.popgo();
        }
      }
    }

    // 相邻1口气的（敌方）棋串
    let adj = b.chainlinks2(str, adjs, 1);
    for (let r = 0; r < adj; r++) {
      // 1口气正好是我们要提子位置
      if (b.liberty_of_string(xpos[0], adjs[r])) {
        let adjs2 = [];
        let adj2 = b.chainlinks2(adjs[r], adjs2, 1);
        // 相邻的相邻1口气（我方）棋串， 且不是要被提子的棋串
        for (let k = 0; k < adj2; k++) {
          let ko_move;
          if (adjs2[k] === str){
            continue;
          }
          b.findlib(adjs2[k], 1, apos);
          if (b.komaster_trymove(apos, other, "attack1-D", str, ko_move, b.stackp <= this.ko_depth && savecode === 0)) {
            if (!ko_move) {
              let dcode = this.do_find_defense(str, null);
              if (dcode !== codes.WIN && this.do_attack(str, null)) {
                b.popgo();
                this.CHECK_RESULT(savecode, savemove, dcode, apos, move, "attack effective");
              } else {
                b.popgo();
              }
            }
            else {
              if (this.do_find_defense(str, null) !== codes.WIN && this.do_attack(str, null) !== 0) {
                savemove = apos;
                savecode = [codes.KO_B];
              }
              b.popgo();
            }
          }
        }
      }
    }

    if (savecode[0] === 0) {
      return this.RETURN_RESULT([0], [0], move, null);
    }

    return this.RETURN_RESULT(savecode, savemove, move, "saved move");

  },

  attack2() {},
  attack3() {},
  attack4() {},

  find_cap_moves() {},
  special_attack2_moves() {},
  special_attack3_moves() {},
  special_attack4_moves() {},
  draw_back_moves() {},

  edge_closing_backfill_moves() {},
  edge_block_moves() {},


  /* ================================================================ */
  /*            Defending by attacking surrounding strings            */
  /* ================================================================ */

  /* Add the chainbreaking moves relative to the string (str) to the
   * (moves) struct.
   */
  break_chain_moves(str, moves){
    const b = this.board
    const xpos = []
    const adjs = []

    /* Find links in atari. */
    const adj = b.chainlinks2(str, adjs, 1);

    for (let r = 0; r < adj; r++) {
      b.findlib(adjs[r], 1, xpos);
      this.ADD_CANDIDATE_MOVE(xpos[0], 1, moves, "break_chain");
    }
  },

  defend_secondary_chain1_moves() {},
  defend_secondary_chain2_moves() {},
  break_chain2_efficient_moves() {},
  do_find_break_chain2_efficient_moves() {},
  break_chain2_moves() {},

  break_chain2_defense_moves() {},
  do_find_break_chain3_moves() {},
  break_chain3_moves() {},
  break_chain4_moves() {},

  superstring_break_chain_moves() {},
  double_atari_chain2_moves() {},


  /* ================================================================ */
  /*                Restricted Attack and Defense                     */
  /* ================================================================ */

  restricted_defend1() {},
  restricted_attack2() {},
  in_list() {},

  /* The string at (str) is under attack. The moves.num moves in
   * (moves) for color have been deemed interesting in
   * the attack or defense of the group. Most of these moves will be
   * immediate liberties of the group.
   *
   * This function orders the moves in the order where the move most
   * likely to succeed to attack or defend the string will be first and
   * so on.
   *
   * Currently, this is defined as:
   * 1) Moves which let the defending string get more liberties are more
   *    interesting.
   * 2) Moves adjacent to the most open liberties are more
   *    interesting than those with fewer open liberties.
   * 3) Moves on the edge are less interesting.
   *
   * Moves below first_move are ignored and assumed to be sorted already.
   */
  order_moves(str, moves, color, funcname, killer) {
    const b = this.board
    let string_color = b.board[str];
    let string_libs = b.countlib(str);

    /* Don't bother sorting if only one move, or none at all. */
    if (moves.num - moves.num_tried < 2) {
      /* But let's still have a single candidate in the sgf output */
      // if (sgf_dumptree && moves.num > moves.num_tried)
      //   sgf_dumpmoves(moves, funcname);
      return;
    }

    /* Assign a score to each move. */
    for (let r = moves.num_tried; r < moves.num; r++) {
      const move = moves.pos[r];

      /* Look at the neighbors of this move and count the things we
       * find. Friendly and opponent stones are related to color, i.e.
       * the player to move, not to the color of the string.
       */
      let number_edges       = [0]; /* outside board */
      let number_same_string = [0]; /* the string being attacked */
      let number_own         = [0]; /* friendly stone */
      let number_opponent    = [0]; /* opponent stone */
      let captured_stones    = [0]; /* number of stones captured by this move */
      let threatened_stones  = [0]; /* number of stones threatened by this move */
      let saved_stones       = [0]; /* number of stones in atari saved */
      let number_open        = [0]; /* empty intersection */

      /* We let the incremental_board code do the heavy work. */
      b.incremental_order_moves(move, color, str,
        number_edges, number_same_string, number_own,
        number_opponent, captured_stones, threatened_stones,
        saved_stones, number_open);

      /* Different score strategies depending on whether the move is
       * attacking or defending the string.
       */
      if (color === string_color) {
        /* Defense move.
         *
         * 1) Add twice the number of liberties the group receives by
         *    extending to the intersection of the move, if more than one.
         *    Only applicable if the move is adjacent to the group.
         */

        let libs = b.approxlib(move, color, 10, null);
        if (number_same_string > 0) {
          if (libs > 5 || (libs === 4 && b.stackp > this.fourlib_depth))
            moves.score[r] += defend_lib_score[5] + (libs - 4);
          else
            moves.score[r] += defend_lib_score[libs];
        }
        else {
          /* Add points for the number of liberties the played stone
                 * obtains when not adjacent to the attacked string.
           */
          if (libs > 4)
            moves.score[r] += defend_not_adjacent_lib_score[4];
          else
            moves.score[r] += defend_not_adjacent_lib_score[libs];
        }

        /* 2) Add the number of open liberties near the move to its score. */
        // gg_assert(number_open <= 4);
        moves.score[r] += defend_open_score[number_open];

        /* 3) Add a bonus if the move is not on the edge.
         */
        if (number_edges === 0 || captured_stones > 0)
          moves.score[r] += defend_not_edge_score;

        /* 4) Add thrice the number of captured stones. */
        if (captured_stones <= 5)
          moves.score[r] += defend_capture_score[captured_stones];
        else
          moves.score[r] += defend_capture_score[5] + captured_stones;

        /* 5) Add points for stones put into atari, unless this is a
         *    self atari.
         */
        if (libs + captured_stones > 1) {
          if (threatened_stones <= 5)
            moves.score[r] += defend_atari_score[threatened_stones];
          else
            moves.score[r] += defend_atari_score[5] + threatened_stones;
        }

        /* 6) Add a bonus for saved stones. */
        if (saved_stones <= 5)
          moves.score[r] += defend_save_score[saved_stones];
        else
          moves.score[r] += defend_save_score[5];
      }
      else {
        /* Attack move.
         *
         * 1) Add the number of liberties the attacker gets when playing
         *    there, but never more than four.
         */
        let libs = b.approxlib(move, color, 4, null);
        if (libs > 4){
          libs = 4;
        }
        moves.score[r] += attack_own_lib_score[libs];

        if (libs === 0 && captured_stones === 1){
          moves.score[r] += attack_ko_score;
        }

        /* 2) If the move is not a self atari and adjacent to the
         *    string, add the number of liberties the opponent would
         *    gain by playing there. If the string has two liberties,
         *    self-ataris are also ok since they may be snapbacks, but
         *    only if a single stone is sacrificed.
         */
        if ((libs + captured_stones > 1 || (string_libs <= 2 && number_own === 0))
          && number_same_string > 0) {
          let safe_atari;
          let liberties = b.approxlib(move, string_color, 5, null);
          if (liberties > 5 || (liberties === 4 && b.stackp > this.fourlib_depth)){
            liberties = 5;
          }
          moves.score[r] += attack_string_lib_score[liberties];

          safe_atari = (string_libs <= 2 && libs + captured_stones > 1);
          /* The defender can't play here without getting into atari, so
                 * we probably souldn't either.
           */
          if (liberties === 1 && saved_stones === 0 && !safe_atari){
            moves.score[r] += cannot_defend_penalty;
          }

          /* Bonus if we put the attacked string into atari without
                 * ourselves getting into atari.
           */
          if (safe_atari){
            moves.score[r] += safe_atari_score;
          }
        }

        /* 3) Add the number of open liberties near the move to its score. */
        // gg_assert(number_open <= 4);
        moves.score[r] += attack_open_score[number_open];

        /* 4) Add a bonus if the move is not on the edge. */
        if (number_edges === 0)
          moves.score[r] += attack_not_edge_score;

        /* 5) Add twice the number of captured stones. */
        if (captured_stones <= 5)
          moves.score[r] += attack_capture_score[captured_stones];
        else
          moves.score[r] += attack_capture_score[5];

        /* 6) Add a bonus for saved stones. */
        if (saved_stones <= 5)
          moves.score[r] += attack_save_score[saved_stones];
        else
          moves.score[r] += attack_save_score[5];
      }
      if (moves.pos[r] === killer)
        moves.score[r] += 50;
    }

    /* Now sort the moves.  We use selection sort since this array will
     * probably never be more than 10 moves long.  In this case, the
     * overhead imposed by quicksort will probably overshadow the gains
     * given by the O(n*log(n)) behaviour over the O(n^2) behaviour of
     * selection sort.
     */
    for (let i = moves.num_tried; i < moves.num-1; i++) {
      let maxscore = moves.score[i];
      let max_at = 0; /* This is slightly faster than max_at = i. */

      /* Find the move with the biggest score. */
      for (let j = i + 1; j < moves.num; j++) {
        if (moves.score[j] > maxscore) {
          maxscore = moves.score[j];
          max_at = j;
        }
      }

      /* Now exchange the move at i with the move at max_at.
       * Don't forget to exchange the scores as well.
       */
      if (max_at !== 0) {
        let temp = moves.pos[max_at];
        const temp_message = moves.message[max_at];

        moves.pos[max_at] = moves.pos[i];
        moves.score[max_at] = moves.score[i];
        moves.message[max_at] = moves.message[i];

        moves.pos[i] = temp;
        moves.score[i] = maxscore;
        moves.message[i] = temp_message;
      }
    }
  },

  tune_move_ordering() {},

  clear_safe_move_cache() {},
  safe_move() {},
  does_secure() {},
  reset_reading_node_counter() {},
  get_reading_node_counter() {},
  draw_reading_shadow() {},
  simple_ladder() {},
  simple_ladder_defend() {},


}