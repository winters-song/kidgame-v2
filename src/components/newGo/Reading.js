import {
  codes, colors, NO_MOVE,
} from './Constants'
import {routine_id, REVERSE_RESULT} from "./Liberty";

/* Statistics. */
let reading_node_counter = 0
let nodes_when_called = 0

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
   *
   * 只有WIN时有返回值
   *  const result = this.CHECK_RESULT...
   *  if(result !== undefinded){
   *    return result
   *  }
   */
  CHECK_RESULT(savecode, savemove, code, move_pos, move_ptr, trace_message) {
    const b = this.board
    b.ASSERT1(typeof savemove === 'object', null)
    b.ASSERT1(typeof savecode === 'object', null)
    if (code === 0) {
      if (move_ptr) {
        move_ptr[0] = move_pos[0]
      }
      return codes.WIN;
    }									
    else if (REVERSE_RESULT(code) > savecode[0]) {
      // 得到结果比现在的好，则更新
      savemove[0] = move_pos[0];
      savecode[0] = REVERSE_RESULT(code);
    }		
  },

  /*
   *  只有WIN时有返回值
   *  const result = this.CHECK_RESULT_UNREVERSED...
   *  if(result !== undefinded){
   *    return result
   *  }
   * */
  CHECK_RESULT_UNREVERSED(savecode, savemove, code, move_pos,	move_ptr, trace_message) {
    // 反转code
    return this.CHECK_RESULT(savecode, savemove, REVERSE_RESULT(code), move_pos, move_ptr, trace_message)
  },

  // return this.RETURN_RESULT
  RETURN_RESULT(savecode, savemove, move_ptr, trace_message) {
    const b = this.board
    b.ASSERT1(typeof savemove === 'object', null)
    b.ASSERT1(typeof savecode === 'object', null)
    // 非失败，且有move值，更新move
    if (savecode[0]) {
      if (move_ptr) {
        move_ptr[0] = savemove[0] //保存结果
      }
    }
    return savecode[0];
  },


  /* Play a collected batch of moves and see if any of them works.  This
   * is a defense version.
   */
  /*
   *  attack_hint = [] (pointer)
   *
   *  const result = this.DEFEND_TRY_MOVES...
   *  if(result !== undefinded){
   *    return result
   *  }
   */
  DEFEND_TRY_MOVES(no_deep_branching, attack_hint, str, move, color, moves, savemove, savecode )	{
    const b = this.board
    b.ASSERT1(typeof attack_hint === 'object', null)

    for (let k = moves.num_tried; k < moves.num; k++) {
      let ko_move = [];
      let dpos = moves.pos[k];

      if (b.komaster_trymove(dpos, color, moves.message[k], str, ko_move, b.stackp <= this.ko_depth && savecode[0] === 0)) {
        const acode = this.do_attack(str, attack_hint);
        b.popgo();

        if (!ko_move[0]) {
          const result = this.CHECK_RESULT(savecode, savemove, acode, dpos, move, "defense effective");
          if(result !== undefined) {
            return result
          }
        }
        else {
          if (acode !== codes.WIN) {
            savemove[0] = dpos;
            savecode[0] = codes.KO_B;
          }
        }
      }

      if (no_deep_branching && b.stackp >= this.branch_depth){
        return this.RETURN_RESULT(savecode, savemove, move, "branching limit");
      }
    }

    moves.num_tried = moves.num;
  },

  // defense_hint=[] (pointer)
  ATTACK_TRY_MOVES (no_deep_branching, defense_hint, str, move, other, moves, savemove, savecode )	{
    const b = this.board
    b.ASSERT1(typeof defense_hint === 'object', null)

    for (let k = moves.num_tried; k < moves.num; k++) {
      let ko_move = [];
      let apos = moves.pos[k];

      if ((b.board_ko_pos !== NO_MOVE || !b.send_two_return_one(apos, other))
    && b.komaster_trymove(apos, other, moves.message[k], str, ko_move, b.stackp <= this.ko_depth && savecode === 0)) {
        let dcode = this.do_find_defense(str, defense_hint);

        if (REVERSE_RESULT(dcode) > savecode && this.do_attack(str, null)) {
          if (!ko_move[0]) {
            if (dcode === 0) {
              b.popgo();
              return this.RETURN_RESULT(codes.WIN, apos, move, "attack effective");
            }

            savemove[0] = apos;
            savecode[0] = REVERSE_RESULT(dcode);
          }
          else {
            savemove[0] = apos;
            savecode[0] = codes.KO_B;
          }
        }

        b.popgo();
      }

      if (no_deep_branching && b.stackp >= this.branch_depth)
        return this.RETURN_RESULT(savecode, savemove, move, "branching limit");
    }

    moves.num_tried = moves.num;
  },

  /* Attack version of the macro above.  This one is a bit more
   * complicated, because when defender fails to defend, attacker has to
   * prove that he can capture the string before claiming victory.
   */

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
  //int move, ReadingMoves: moves
  ADD_CANDIDATE_MOVE(move, this_score, moves, this_message)	{
    const b = this.board
    b.ASSERT1(typeof defense_hint === 'number', null)

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

  REMOVE_CANDIDATE_MOVE(move, moves) {
    for (let u = moves.num_tried; u < moves.num; u++) {
      if (moves.pos[u] === move) {
        moves.pos[u] = moves.pos[moves.num - 1];
        moves.score[u] = moves.score[moves.num - 1];
        moves.message[u] = moves.message[moves.num - 1];
        moves.num--;
        break;
      }
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
    let liberties = b.countlib(str);

    nodes_when_called = reading_node_counter;
    /* Don't even spend time looking in the cache if there are more than
     * enough liberties. We need this before the persistent cache lookup
     * to avoid results inconsistent with find_defense().
     */
    // 3口气以上忽略
    if (liberties > 4 || (liberties === 4 && b.stackp > this.fourlib_depth) || (liberties === 3 && b.stackp > this.depth)){
      return 0;
    }

    // 搜索缓存
    let origin = b.find_origin(str);
    if (this.search_persistent_reading_cache(routine_id.ATTACK, origin, result, the_move)) {
      if (move){
        move[0] = the_move;
      }
      return result;
    }

    b.shadow = []
    result = this.do_attack(str, the_move);
    const nodes = reading_node_counter - nodes_when_called;

    this.store_persistent_reading_cache(routine_id.ATTACK, origin, result, the_move, nodes);

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
    let result = []
    const the_move = [NO_MOVE];
    const liberties = b.countlib(str);

    nodes_when_called = reading_node_counter;
    /* Don't even spend time looking in the cache if there are more than
     * enough liberties.
     */
    if (liberties > 4 || (liberties === 4 && b.stackp > this.fourlib_depth)) {
      if (move){
        move[0] = NO_MOVE;
      }
      return codes.WIN;
    }

    const origin = b.find_origin(str);
    if (this.search_persistent_reading_cache(routine_id.FIND_DEFENSE, origin, result, the_move)) {
      if (move){
        move[0] = the_move[0];
      }
      return result;
    }

    b.shadow = []
    result = this.do_find_defense(str, the_move)
    const nodes = reading_node_counter - nodes_when_called;

    this.store_persistent_reading_cache(routine_id.FIND_DEFENSE, origin, result, the_move, nodes);

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
    reading_node_counter++;

    b.ASSERT1(b.IS_STONE(b.board[str]), str);
    b.ASSERT1(b.countlib(str) === 1, str);

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
    const result = this.DEFEND_TRY_MOVES(0, null, str, move, color, moves, savemove, savecode);
    if(result !== undefined){
      return result
    }
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
            const result = this.CHECK_RESULT(savecode, savemove, acode, apos, move, "backfilling");
            if(result !== undefined){
              return result
            }
          }
        }
      }
    }

    return this.RETURN_RESULT(savecode, savemove, move, "saved move");
  },

  /* If str points to a group with two liberties, defend2 determines
   * whether the group can be saved by extending, or by capturing part of
   * its surrounding chain. A group is considered safe if either part of
   * the surrounding chain may be captured, or if it can get 3
   * liberties. It is presumed that the opponent could kill if tenuki.
   * If both extensions work, it prefers the one which maximizes
   * liberties.
   *
   * *move returns the move to save the stones.
   */
  defend2(str, move) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);

    const xpos = [NO_MOVE];
    let liberties;
    const libs = [];
    let liberties2;
    const libs2 = [];
    const savemove = [0];
    const savecode = [0];
    const suggest_move = [NO_MOVE];
    let string_size;
    let be_aggressive;

    // SETUP_TRACE_INFO("defend2", str);
    reading_node_counter++;

    b.ASSERT1(b.IS_STONE(b.board[str]), str);
    b.ASSERT1(b.countlib(str) === 2, str);

    liberties = b.findlib(str, 2, libs);

    if (this.fast_defense(str, liberties, libs, xpos)){
      return this.RETURN_RESULT(codes.WIN, xpos, move, "fast defense");
    }

    /* Collect moves to try in the first batch.
     * 1. First order liberties.
     * 2. Chain breaking moves.
     * 3. Second order liberties moving up from first line to second.
     * 4. Edge clamps.
     */
    const moves = new ReadingMoves({
      num : 0,
      num_tried : 0
    })

    /* We don't want to play self-atari liberties, unless the string is a
     * single stone (in which case it might be a snapback move).  Sacrifices
     * might be good moves, but not in tactical reading.
     */
    string_size = b.countstones(str);
    if (string_size === 1 || !b.is_self_atari(libs[0], color))
      this.ADD_CANDIDATE_MOVE(libs[0], 0, moves, "liberty");
    if (string_size === 1 || !b.is_self_atari(libs[1], color))
      this.ADD_CANDIDATE_MOVE(libs[1], 0, moves, "liberty");

    this.break_chain_moves(str, moves);
    this.break_chain2_efficient_moves(str, moves);
    this.propose_edge_moves(str, libs, liberties, moves, color);
    this.edge_clamp_moves(str, moves);

    if (b.stackp <= this.depth) {
      for (let k = 0; k < liberties; k++){
        this.special_rescue_moves(str, libs[k], moves);
      }
      this.bamboo_rescue_moves(str, liberties, libs, moves);
    }

    if (b.stackp <= this.backfill_depth){
      this.special_rescue2_moves(str, libs, moves);
    }

    this.order_moves(str, moves, color, 'read_function_name', move);
    let result = this.DEFEND_TRY_MOVES(0, suggest_move);
    if(result !== undefined){
      return result
    }

    /* Look for backfilling moves. */
    for (let k = 0; k < liberties; k++) {
      if (b.is_self_atari(libs[k], other)) {
        liberties2 = b.approxlib(libs[k], color, 6, libs2);
        /* Note: liberties2 must be smaller than 5, otherwise libs[k] had been
         * a direct defense.
         */
        for (let r = 0; r < liberties2; r++) {
          xpos[0] = libs2[r];
          /* If the newly placed stone would be in atari, but not a single
           * stone, we don't even try.
           */
          if (!b.is_self_atari(xpos[0], color) && b.has_neighbor(xpos[0], color))
            this.ADD_CANDIDATE_MOVE(xpos[0], 0, moves, "backfill-A");
        }
      }

      liberties2 = b.approxlib(libs[k], other, 3, libs2);
      if (liberties2 <= 2) {
        for (let r = 0; r < liberties2; r++) {
          xpos[0] = libs2[r];
          if (!b.is_self_atari(xpos, color))
            this.ADD_CANDIDATE_MOVE(xpos[0], 0, moves, "backfill-B");
        }
      }
    }

    this.special_rescue4_moves(str, libs, moves);

    /* Only order and test the new set of moves. */
    this.order_moves(str, moves, color, 'read_function_name', move);
    result = this.DEFEND_TRY_MOVES(0, suggest_move, str, move, color, moves, savemove, savecode);
    if(result !== undefined){
      return result
    }
    /* If we haven't found any useful moves in first batches, be more
     * aggressive in break_chain[23]_moves().
     */
    be_aggressive = moves.num === 0;

    if (b.stackp <= this.superstring_depth){
      this.superstring_break_chain_moves(str, 4, moves);
    }

    /* If nothing else works, we try playing a liberty of the
     * super_string.
     */
    if (b.stackp <= this.superstring_depth) {
      this.superstring_moves(str, moves, 3, 0);
      this.squeeze_moves(str, moves);
    }

    this.break_chain2_defense_moves(str, moves, be_aggressive);

    if (b.stackp <= this.backfill_depth){
      this.special_rescue5_moves(str, libs, moves);
    }

    if (b.stackp <= this.break_chain_depth || (be_aggressive && b.stackp <= this.backfill_depth))
      this.break_chain3_moves(str, moves, be_aggressive);

    if (be_aggressive && b.stackp <= this.backfill_depth)
      this.break_chain4_moves(str, moves, be_aggressive);

    /* Only order and test the new set of moves. */
    this.order_moves(str, moves, color, 'read_function_name', move);
    result = this.DEFEND_TRY_MOVES(0, suggest_move, str, move, color, moves, savemove, savecode);
    if(result !== undefined){
      return result
    }

    return this.RETURN_RESULT(savecode, savemove, move, "saved move");
  },

  defend3(str, move) {
    const b = this.board
    const color = b.board[str];
    const xpos = [NO_MOVE];
    let liberties;
    let libs = [];
    const suggest_move = [NO_MOVE];

    // SETUP_TRACE_INFO("defend3", str);
    reading_node_counter++;

    b.ASSERT1(b.IS_STONE(b.board[str]), str);
    b.ASSERT1(b.countlib(str) === 3, str);

    liberties = b.findlib(str, 3, libs);

    if (this.fast_defense(str, liberties, libs, xpos)){
      return this.RETURN_RESULT([codes.WIN], xpos, move, "fast defense");
    }

    /* Collect moves to try in the first batch.
     * 1. First order liberties.
     * 2. Chain breaking moves.
     * 3. Second order liberties moving up from first line to second.
     * 4. Edge clamps.
     */
    const moves = new ReadingMoves({
      num : liberties,
      num_tried : 0
    })

    for (let k = 0; k < liberties; k++) {
      moves.pos[k] = libs[k];
      moves.score[k] = 0;
      moves.message[k] = "liberty";
    }

    this.break_chain_moves(str, moves);
    this.break_chain2_efficient_moves(str, moves);
    this.propose_edge_moves(str, libs, liberties, moves, color);
    this.edge_clamp_moves(str, moves);

    if (b.stackp <= this.backfill2_depth){
      this.hane_rescue_moves(str, libs, moves);
    }

    this.order_moves(str, moves, color, 'read_function_name', move);
    let result = this.DEFEND_TRY_MOVES(1, suggest_move);
    if(result !== undefined){
      return result
    }

    /* If nothing else works, try to defend with second order liberties. */
    if (b.stackp <= this.backfill_depth)
      this.special_rescue3_moves(str, libs, moves);

    if (b.stackp <= this.depth) {
      for (let k = 0; k < liberties; k++){
        this.special_rescue_moves(str, libs[k], moves);
      }
      this.bamboo_rescue_moves(str, liberties, libs, moves);
    }

    if (this.get_level() >= 8 && b.stackp <= this.backfill2_depth){
      this.superstring_break_chain_moves(str, 4, moves);
    }

    if (b.stackp <= this.break_chain_depth)
      this.break_chain2_defense_moves(str, moves, 0);

    if (b.stackp <= this.backfill_depth) {
      this.special_rescue5_moves(str, libs, moves);
      this.special_rescue6_moves(str, libs, moves);
    }

    /* Only order and test the new set of moves. */
    this.order_moves(str, moves, color, 'read_function_name', move);
    result = this.DEFEND_TRY_MOVES(1, suggest_move);
    if(result !== undefined){
      return
    }

    /* If nothing else works, we try playing a liberty of the
     * super_string.
     */
    if (this.get_level() >= 8 && b.stackp <= this.backfill2_depth) {
      this.superstring_moves(str, moves, 3, 0);
      this.squeeze_moves(str, moves);
    }

    if (b.stackp <= this.break_chain_depth){
      this.break_chain3_moves(str, moves, 0);
    }

    /* Only order and test the new set of moves. */
    this.order_moves(str, moves, color, 'read_function_name', move);
    result = this.DEFEND_TRY_MOVES(1, suggest_move);
    if(result !== undefined){
      return result
    }

    return this.RETURN_RESULT([0], [0], move, "saved move");
  },

  defend4(str, move) {
    const b = this.board
    const color = b.board[str];
    const xpos = [NO_MOVE];
    let liberties;
    let libs =[];
    const suggest_move = [NO_MOVE];

    // SETUP_TRACE_INFO("defend4", str);
    reading_node_counter++;

    b.ASSERT1(b.IS_STONE(b.board[str]), str);
    b.ASSERT1(b.countlib(str) === 4, str);

    liberties = b.findlib(str, 4, libs);

    if (this.fast_defense(str, liberties, libs, xpos)){
      return this.RETURN_RESULT(codes.WIN, xpos, move, "fast defense");
    }

    /* Collect moves to try in the first batch.
     * 1. First order liberties.
     * 2. Chain breaking moves.
     */
    const moves = new ReadingMoves({
      num : liberties,
      num_tried : 0
    })

    for (let k = 0; k < liberties; k++) {
      moves.pos[k] = libs[k];
      moves.score[k] = 0;
      moves.message[k] = "liberty";
    }

    this.break_chain_moves(str, moves);
    this.break_chain2_efficient_moves(str, moves);

    if (b.stackp <= this.backfill_depth) {
      this.break_chain2_defense_moves(str, moves, 0);
      this.break_chain3_moves(str, moves, 0);
      this.break_chain4_moves(str, moves, 0);

      if (b.stackp <= this.superstring_depth){
        this.superstring_moves(str, moves, 4, 0);
      }
      this.squeeze_moves(str, moves);
    }

    this.order_moves(str, moves, color, 'read_function_name', move);
    let result = this.DEFEND_TRY_MOVES(1, suggest_move);
    if(result !== undefined){
      return result
    }

    if (b.stackp <= this.depth) {
      for (let k = 0; k < liberties; k++){
        this.special_rescue_moves(str, libs[k], moves);
      }
      this.bamboo_rescue_moves(str, liberties, libs, moves);
    }

    this.order_moves(str, moves, color, 'read_function_name', move);
    result = this.DEFEND_TRY_MOVES(1, suggest_move);
    if(result !== undefined){
      return result
    }

    return this.RETURN_RESULT([0], [0], move, "saved move");
  },

  special_rescue_moves() {},

  bamboo_rescue_moves() {},

  /* In a situation like this:
   *
   *   OOXXXX     the following code can find the
   *   .OXOOX     defensive move at 'c'.
   *   .cO.OX
   *   .X.OOX
   *   ------
   *
   *   OOXXXX     It also can find more general moves like 'c' here.
   *   .OXOOX
   *   cXO.OX
   *   ...OOX
   *   ------
   */
  special_rescue2_moves(str, libs, moves) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    const newlibs = [];

    for (let r = 0; r < 2; r++) {
      /* Let alib be one of the liberties and require it to be suicide
       * for the opponent.
       */
      let alib = libs[r];
      if (!b.is_suicide(alib, other))
        continue;

      for (let k = 0; k < 4; k++) {
        let newstr = alib + b.delta[k];
        // 眼位相邻我方棋串不是本棋串
        if (b.board[newstr] === color && !b.same_string(newstr, str)) {
          let liberties = b.findlib(newstr, 4, newlibs);

          for (let s = 0; s < liberties && s < 4; s++) {
            if (!b.is_self_atari(newlibs[s], color)){
              this.ADD_CANDIDATE_MOVE(newlibs[s], 0, moves, "special_rescue2");
            }
          }
          this.break_chain_moves(newstr, moves);
          this.break_chain2_efficient_moves(newstr, moves);
          this.edge_clamp_moves(newstr, moves);
        }
      }
    }
  },

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
  // 倒扑或打劫救单口气棋串
  set_up_snapback_moves (str, lib, moves) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    const libs2 = [];

    b.ASSERT1(b.countlib(str) === 1, str);

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

  /* In positions like
   *
   * |.XXOO.
   * |XXOX..
   * |OOOX*.
   * |......
   * +------
   *
   * the O stones to the left are best defended by the move at *.
   *
   * This function tries to find an adjacent string (apos) with exactly
   * three liberties. One of the liberties (bpos) must be on the edge
   * (but not in the corner). Diagonal to this liberty must be one stone
   * of the attacked string (cpos) and another liberty (dpos) of the
   * adjacent string. The third liberty (epos) must be adjacent to
   * (dpos). Furthermore must an O stone at (dpos) get at least three
   * liberties and and X stone at (epos) must get at most three
   * liberties.
   *
   * |.XXOO.
   * |XXOXe.
   * |OOcad.
   * |...b..
   * +------
   *
   * The defense move at (dpos) is proposed if the above conditions
   * are satisfied.
   */
  edge_clamp_moves (str, moves) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    const adjs = []
    const libs = []

    /* Pick up neighbors with three liberties. */
    let adj = b.chainlinks2(str, adjs, 3);

    for (let r = 0; r < adj; r++) {
      const apos = adjs[r];
      /* Find a liberty at the edge. */
      let bpos = NO_MOVE;
      b.findlib(apos, 3, libs);
      for (let k = 0; k < 3; k++) {
        if (b.is_edge_vertex(libs[k])) {
          bpos = libs[k];
          break;
        }
      }
      if (bpos === NO_MOVE)
        continue;

      /* Edge liberty found. Establish up and right directions. */
      for (let k = 0; k < 4; k++) {
        let up = b.delta[k];
        if (b.ON_BOARD(bpos - up))
          continue;
        if (b.board[bpos + up] !== other)
          continue;

        for (let l = 0; l < 2; l++) {
          let right = b.delta[(k+1)%4];
          if (l === 1)
            right = -right;

          let cpos = bpos + up - right;
          let dpos = bpos + up + right;

          if (b.board[cpos] !== color || !b.same_string(cpos, str))
            continue;

          if (b.board[dpos] !== colors.EMPTY || !b.liberty_of_string(dpos, apos))
            continue;

          let epos = dpos + up;

          if (b.board[epos] !== colors.EMPTY || !b.liberty_of_string(epos, apos))
            continue;

          if (b.approxlib(dpos, color, 3, null) < 3)
            continue;

          if (b.approxlib(epos, other, 4, null) > 3)
            continue;

          /* (dpos) looks like a good move. Add it to the list with a
                 * substantial initial score.
           */
          this.ADD_CANDIDATE_MOVE(dpos, 10, moves, "edge_clamp");
        }
      }
    }

  },

  /*
   * This function handles some special cases on the edge.
   *
   * 1. If (str) points to a string and 'a' an edge liberty of it,
   *    there is no point of trying to defend the string by crawling
   *    along the edge if there is no hope of ever getting more liberties.
   *    This is of course if the blocking enemy group has enough liberties
   *    of its own.
   *
   *      XX       XX
   *      O.       Oa
   *      --       --
   *
   *    This function searches the edge towards the corner and sees if there
   *    is a friendly stone on one of the two first lines. If not, the move
   *    is removed from the  list of moves.
   *
   * 2. If (str) points to a string and 'a' an edge liberty of it,
   *    the drawing back/climbing up move 'b' is often correct attack or
   *    defense. Another good move to try is 'c' (but usually not for
   *    defense of a 2 liberty string).
   *
   *      X.?        Xbc
   *      O..        Oa.
   *      ---        ---
   *
   *    This function adds the points configured like 'b' and 'c' relative to
   *    (str) to the list of moves.
   *
   * color is the color to move.
   */
  // 是否可以爬的逻辑，边线攻防
  propose_edge_moves(str, libs, liberties, moves, to_move) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);

    for (let r = 0; r < liberties; r++) {
      let apos = libs[r];
      for (let k = 0; k < 4; k++) {
        let up = b.delta[k];
        //下方边界
        if (b.ON_BOARD(apos - up))
          continue;

        for (let l = 0; l < 2; l++) {
          let right = b.delta[(k+1)%4];
          if (l === 1)
            right = -right;

          // b=X, 大于4气，我方是O
          if (b.board[apos + up] === other	   /* other on top of liberty */
            && b.countlib(apos + up) > 4     /* blocking group must be secure */
            && color === to_move) {         /* only applicable as defense */

            /* Case 1: other above the liberty (crawl along the edge). */
            let xpos = apos;

            while (b.ON_BOARD(xpos)) {
              if (b.board[xpos] === color || b.board[xpos + up] === color){
                break;
              }
              xpos += right;
            }

            /* If no friendly stone found, then it is pointless and we
             * can just as well remove the move.
             */
            if (!b.ON_BOARD(xpos)) {
              this.REMOVE_CANDIDATE_MOVE(apos, moves);
            }
          }
          /*
          *      X . c
          *        a .
          *      -----
          * */
          else if (b.board[apos + up] === colors.EMPTY  /* empty above the liberty */
            && b.board[apos - right + up] === other
            && b.board[apos + right] === colors.EMPTY) { /* empty to the right */

            /* Case 2: Try to escape or contain. */

            /* Add b
             * If adjacent X stone in atari, boost the initial score of this
             * move.
             */
            // b是否可提子，不同得分
            if (b.countlib(apos + up - right) === 1)
              this.ADD_CANDIDATE_MOVE(apos + up, 10, moves, "propose_edge-A");
            else {
              this.ADD_CANDIDATE_MOVE(apos + up, 0, moves, "propose_edge-B");

              /* Add c if empty */
              // c为空, 我方X加分
              if (b.board[apos + right + up] === colors.EMPTY && (liberties !== 2 || color !== to_move)) {
                this.ADD_CANDIDATE_MOVE(apos + right + up, 0, moves, "propose_edge-C");
              }
            }
          }
        }
      }
    }
  },



  /* ================================================================ */
  /*                       Attacking functions                        */
  /* ================================================================ */
  /* Like attack. If the opponent is komaster reading functions will not try
   * to take ko.
   */
  // move: []
  do_attack(str, move){

    const b = this.board
    const color = b.board[str];
    let xpos = [NO_MOVE];

    let result = 0;

    // SETUP_TRACE_INFO("attack", str);
    b.ASSERT1(move === null || typeof move === 'object', str);
    b.ASSERT1(color !== 0, str);
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

    b.ASSERT1(move === null || typeof move === 'object', str);
    reading_node_counter++;

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
          const result = this.CHECK_RESULT_UNREVERSED(savecode, savemove, codes.KO_A, xpos, move, "last liberty - ko");
          if(result !== undefined){
            return result
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
        const result = this.CHECK_RESULT_UNREVERSED(savecode, savemove, codes.KO_B, xpos, move, "last liberty - ko");
        if(result !== undefined){
          return result
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
                const result = this.CHECK_RESULT(savecode, savemove, dcode, apos, move, "attack effective");
                if(result === codes.WIN){
                  return result
                }
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


  /* If str points to a group with exactly two liberties
   * attack2 determines whether it can be captured in ladder or net.
   * If yes, *move is the killing move. move may be null if caller
   * is only interested in whether it can be captured.
   *
   * Returns KO_A or KO_B if it can be killed conditioned on ko. Returns
   * KO_A if it can be killed provided (other) is willing to ignore any
   * ko threat. Returns KO_B if (other) wins provided he has a ko threat
   * which must be answered. Can give a return code KO_B yet *move=0 if
   * the winning move is an illegal ko capture. In this case, making a
   * ko threat and having it answered should transform the position to
   * one where the return code is KO_A.
   *
   * See the comment before defend1 about ladders and reading depth.
   */
  attack2(str, move) {

    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    const hpos = [];
    let xpos = [NO_MOVE];
    const libs = [];
    const libs2 = [];
    const adjs = []
    const savemove = [0];
    const savecode = [0];
    let atari_possible = 0;
    let adjacent_liberties = 0;
    let suggest_move = [NO_MOVE];

    const moves = new ReadingMoves({
      num : 0,
      num_tried : 0
    })
    b.ASSERT1(move === null || typeof move === 'object', str);

    // SETUP_TRACE_INFO("attack2", str);
    reading_node_counter++;

    str = b.find_origin(str);
    b.ASSERT1(b.IS_STONE(b.board[str]), str);
    b.ASSERT1(b.countlib(str) === 2, str);

    for (let pass = 0; pass < 4; pass++) {

      switch (pass) {
        case 0:
          /* The attack may fail if a boundary string is in atari and cannot
           * be defended.  First we must try defending such a string.
           *
           * We start by trying to defend the boundary string by looking for an
           * adjacent string which is in atari.
           */
          let adj = b.chainlinks2(str, adjs, 1);
          for (let r = 0; r < adj; r++) {
            /* If stackp > depth and any boundary chain is in atari, assume safe.
             * However, if the captured chain is only of size 1, there can still
             * be a working ladder, so continue if that is the case.
             * Also if the string in atari shares its liberty with the
             * attacked string, drawing it out may enable the ladder to
             * continue.
             */
            if (b.stackp > this.depth && b.countstones(adjs[r]) > 1 && !b.have_common_lib(str, adjs[r], null)) {
              return this.RETURN_RESULT([0], [0], move, "boundary in atari");
            }

            /* Pick up moves breaking the second order chain. */
            if (b.stackp <= this.depth)
              this.break_chain_moves(adjs[r], moves);

            b.findlib(adjs[r], 1, hpos);
            this.ADD_CANDIDATE_MOVE(hpos[0], 0, moves, "save_boundary");
          }

          /* Get the two liberties of (str). */
          let liberties = b.findlib(str, 2, libs);
          b.ASSERT1(liberties === 2, str);

          if (b.DIRECT_NEIGHBORS(libs[0], libs[1]))
            adjacent_liberties = 1;

          for (let k = 0; k < 2; k++) {
            let apos = libs[k];
            if (!b.is_self_atari(apos, other))
              atari_possible = 1;
            /* We only want to consider the move at (apos) if:
                   * stackp <= backfill_depth
                   * -or-  stackp <= depth and it is an isolated stone
                   * -or-  it is not in immediate atari
                   */
            if (b.stackp <= this.backfill_depth
              || ((b.stackp <= this.depth || adjacent_liberties) && !b.has_neighbor(apos, other))
              || !b.is_self_atari(apos, other))
              this.ADD_CANDIDATE_MOVE(apos, 0, moves, "liberty");

            /* Try backfilling if atari is impossible. */
            if (b.stackp <= this.backfill_depth
              && b.approxlib(apos, other, 2, libs2) === 1) {
              this.ADD_CANDIDATE_MOVE(libs2[0], 0, moves, "backfill");
              /* If there is a neighbor in atari, we also try back-capturing. */
              for (let r = 0; r < 4; r++) {
                let bpos = libs2[0] + b.delta[r];
                if (b.board[bpos] === other && b.chainlinks2(bpos, adjs, 1) > 0) {
                  /* FIXME: If there is more than one neighbor in atari, we
                         * currently just take one randomly. This is maybe not good
                         * enough. We might also want to check against snapback.
                   *
                   * FIXME: What is the purpose of this? It produces some
                   * completely irrelevant moves (e.g. if bpos is a huge string
                   * with many liberties and adjs[0] is somewhere else on the
                   * board).
                   */
                  b.findlib(adjs[0], 1, xpos);
                  this.ADD_CANDIDATE_MOVE(xpos[0], 0, moves, "back-capture");
                }
              }
            }
          }

          /* If we can't make a direct atari, look for edge blocking moves. */
          if (!atari_possible){
            for (let k = 0; k < 2; k++){
              this.edge_block_moves(str, libs[k], moves);
            }
          }

          /* If one of the surrounding chains have only two liberties, which
           * coincide with the liberties of the attacked string, we try to
           * backcapture.
           */

          adj = b.chainlinks2(str, adjs, 2);
          for (let r = 0; r < adj; r++) {
            let apos = adjs[r];
            if (b.liberty_of_string(libs[0], apos) && b.liberty_of_string(libs[1], apos)){
              this.break_chain_moves(apos, moves);
            }
          }

          this.propose_edge_moves(str, libs, liberties, moves, other);

          break;

        case 1:
          if (b.stackp <= this.backfill_depth) {
            this.special_attack2_moves(str, libs, moves);
            this.special_attack3_moves(str, libs, moves);
            this.special_attack4_moves(str, libs, moves);
          }
          break;

        case 2:
          this.find_cap_moves(str, moves);
          break;

        case 3:
          /* If it is not possible to make a direct atari, we try filling
           * a liberty of the superstring.
           */
          if (this.get_level() >= 8
            && b.stackp <= this.backfill_depth
            && (b.stackp <= this.superstring_depth || !atari_possible)) {
            let liberty_cap = 2;
            if (b.stackp <= this.backfill2_depth)
              liberty_cap = 3;
            this.superstring_moves(str, moves, liberty_cap, 1);
            this.squeeze_moves(str, moves);
          }
          break;

        default:
          throw new Error('abort')
      } /* switch (pass) */

      this.order_moves(str, moves, other, 'read_function_name', move);
      const result = this.ATTACK_TRY_MOVES(0, suggest_move, str, move, other, moves, savemove, savecode);
      if(result !== undefined){
        return result
      }
    }

    return this.RETURN_RESULT(savecode, savemove, move, "saved move");
  },

  attack3() {},

  /* attack4 tries to capture a string with 4 liberties. */
  attack4(str, move) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    const libs = [];
    const adjs = [];
    const savemove = [0];
    const savecode = [0];
    let suggest_move = NO_MOVE;

    const moves = new ReadingMoves({
      num : 0,
      num_tried : 0
    })

    // SETUP_TRACE_INFO("attack4", str);

    b.ASSERT1(b.IS_STONE(b.board[str]), str);
    reading_node_counter++;

    if (b.stackp > this.depth) {
      // SGFTRACE(0, 0, "stackp > depth");
      return 0;
    }

    for (let pass = 0; pass < 2; pass++) {

      switch (pass) {
        case 0:
          let adj = b.chainlinks2(str, adjs, 1);
          for (let r = 0; r < adj; r++) {
            const hpos = [];
            this.break_chain_moves(adjs[r], moves);

            b.findlib(adjs[r], 1, hpos);
            this.ADD_CANDIDATE_MOVE(hpos[0], 0, moves, "save_boundary");
          }

          /* Defend against double atari in the surrounding chain early. */
          this.double_atari_chain2_moves(str, moves, b.stackp <= this.superstring_depth);

          /* Give a score bonus to the chain preserving moves. */
          for (let k = 0; k < moves.num; k++)
            moves.score[k] += 5;

          /* Get the four liberties of (str). */
          let liberties = b.findlib(str, 4, libs);
          b.ASSERT1(liberties === 4, str);

          for (let k = 0; k < 4; k++) {
            let apos = libs[k];
            /* We only want to consider the move at (apos) if:
                   * stackp <= backfill_depth
                   * -or-  stackp <= depth and it is an isolated stone
                   * -or-  it is not in immediate atari
                   */
            if (b.stackp <= this.backfill_depth
              || (b.stackp <= this.depth
                && !b.has_neighbor(apos, other))
              || !b.is_self_atari(apos, other))
              this.ADD_CANDIDATE_MOVE(apos, 0, moves, "liberty");

            this.edge_closing_backfill_moves(str, apos, moves);

            /* Look for edge blocking moves. */
            this.edge_block_moves(str, apos, moves);
          }

          /* Pick up some edge moves. */
          this.propose_edge_moves(str, libs, liberties, moves, other);
          break;

        case 1:
          if (b.stackp <= this.backfill_depth)
            this.find_cap_moves(str, moves);
          break;

        default:
          throw new Error("abort")
      }

      this.order_moves(str, moves, other, 'read_function_name', move);
      const result = this.ATTACK_TRY_MOVES(1, suggest_move, str, move, other, moves, savemove, savecode);
      if(result !== undefined){
        return result
      }
    }

    return this.RETURN_RESULT(savecode, savemove, move, "saved move");
  },

  /* If (str) points to a string with 2 - 4 liberties,
   * find_cap_moves(str, &moves)
   * looks for a configuration of the following type:
   *
   *  Xa
   *  b*
   *
   * where X are elements of the string in question and a and b are
   * two of its liberties.
   *
   * For larger strings, this can find moves like
   *
   * XXXXX
   * XX.XX
   * X.*.X
   * XX.XX
   * XXXXX
   *
   * even though they are not capping moves.
   */
  find_cap_moves(str, moves) {
    const b = this.board
    const libs = []

    const numlibs = b.findlib(str, 4, libs);
    if (numlibs > 4 || numlibs < 2)
      return;

    for (let i = 0; i < numlibs - 1; i++) {
      for (let j = i + 1; j < numlibs; j++) {
        let alib = libs[i];
        let blib = libs[j];

        /* Check if the two liberties are located like the figure above. */
        // 2口气小尖位置
        if (!b.DIAGONAL_NEIGHBORS(alib, blib))
          continue;

        let ai = b.I(alib);
        let aj = b.J(alib);
        let bi = b.I(blib);
        let bj = b.J(blib);
        /* Which of the two corner points should we use? One of them is
         * always occupied by the string at (str), the other one is either
         * free or occupied by something else.
         */
        //找到*=.位置
        if (b.BOARD(bi, aj) === colors.EMPTY)
          this.ADD_CANDIDATE_MOVE(b.POS(bi, aj), 10, moves, "find_cap");
        else if (b.BOARD(ai, bj) === colors.EMPTY)
          this.ADD_CANDIDATE_MOVE(b.POS(ai, bj), 10, moves, "find_cap");
      }
    }
  },

  /* In a situation like this:
   *
   * -----        the code that
   * cO.OX        follows can find
   * XXOOX        the attacking move
   * XO.OX        at c.
   * XOOOX
   * XXXXX
   *
   * The name of the function corresponds to special_rescue2, which is
   * fairly similar to this situation.
   */
  special_attack2_moves(str, libs, moves) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    const newlibs = [];
    let xpos;

    for (let k = 0; k < 2; k++) {
      // X不入气，O两口气（c的右边）
      if (b.is_suicide(libs[k], other) && (b.approxlib(libs[k], color, 3, newlibs) === 2)) {
        // 找到c位
        if (b.newlibs[0] !== libs[1-k])
          xpos = newlibs[0];
        else
          xpos = newlibs[1];
        // X在c不是自打吃
        if (!b.is_self_atari(xpos, other)) {
          this.ADD_CANDIDATE_MOVE(xpos, 0, moves, "special_attack2");
        }
      }
    }
  },

  special_attack3_moves() {},
  special_attack4_moves() {},
  draw_back_moves() {},


  /* In the following position the reading is much simplifed if we start
   * with the edge closing backfilling move at *.
   *
   * |OO...
   * |.OOO.
   * |.X.O.
   * |XXXO.
   * |.X.*.
   * +-----
   *
   * This function identifies the situation
   *
   * ?XOb
   * Xatc
   * ----
   *
   * where a is a liberty of the attacked string, t is the proposed move,
   * and b and c do not contain more O stones than X stones.
   */
  // 边线立收气， b和c攻方不多于守方棋子
  edge_closing_backfill_moves(str, apos, moves) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);

    for (let k = 0; k < 4; k++) {
      let up = b.delta[k];
      let right = b.delta[(k+1)%4];
      //下方边界
      if (b.ON_BOARD(apos - up)){
        continue;
      }
      // 上方我方棋子X
      if (b.board[apos + up] !== color){
        return;
      }
      // 右方空，左方边界或我方
      if (b.board[apos + right] === colors.EMPTY && (!b.ON_BOARD(apos - right) || b.board[apos - right] === color)){
        /* Everything ok so far. */
      }
      else if (b.board[apos - right] === colors.EMPTY && (!b.ON_BOARD(apos + right) || b.board[apos + right] === color)) {
        /* Negate right direction. */
        right = -right;
      }
      else{
        return;
      }

      if (b.board[apos + up + right] !== other){
        return;
      }

      //b点必须在棋盘上
      let bpos = apos + up + 2 * right;
      if (!b.ON_BOARD(bpos))
        return;

      let cpos = apos + 2 * right;

      let number_x = 0;
      let number_o = 0;
      if (b.board[bpos] === color)
        number_x++;
      else if (b.board[bpos] === other)
        number_o++;

      if (b.board[cpos] === color)
        number_x++;
      else if (b.board[cpos] === other)
        number_o++;

      if (number_o > number_x)
        return;

      this.ADD_CANDIDATE_MOVE(apos + right, 0, moves, "edge_closing_backfill");
      return;
    }
  },

  /* In positions like
   *
   *   OOX..
   *   XXO*.
   *   x.X..
   *   -----
   *
   * where the X stones to the left are being attacked, it is usually
   * important to start by considering the move at *. Thus we propose
   * the move at * with a high initial score.
   *
   * Also, it is often needed to prevent "crawling" along first line
   * which can eventually give defender more liberties, like here:
   *
   *   O.OO..X
   *   OXXO..X
   *   ...X*..
   *   -------
   *
   * This function identifies the situation
   *
   *   XO.?   bdf?
   *   .X.o   aceg
   *   ----   ----
   *
   * where a is a liberty of the attacked string, b is a stone of the
   * attacked string, and e and f are the considered moves.
   */
  edge_block_moves(str, apos, moves) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);

    /* Search for the right orientation. */
    for (let k = 0; k < 4; k++) {
      let up = b.delta[k];
      // 下方边界
      if (b.ON_BOARD(apos - up)){
        continue;
      }
      // 位置b
      if (b.board[apos + up] !== color || !b.same_string(apos + up, str)){
        return;
      }

      for (let l = 0; l < 2; l++) {
        let  right = b.delta[(k+1)%4];
        if (l === 1){
          right = -right;
        }

        let cpos = apos + right;
        let dpos = apos + right + up;
        let epos = cpos + right;
        let fpos = dpos + right;

        // c=X, d=O, e=. , f=.
        if (b.board[cpos] === color && b.board[dpos] === other
          && b.board[epos] === colors.EMPTY && b.board[fpos] === colors.EMPTY) {

          if (b.countlib(dpos) === 1) {
            let gpos = epos + right;

            /* Check if we have the first situation. */
            // g不是X, O优先f
            if (b.board[gpos] !== color){
              this.ADD_CANDIDATE_MOVE(fpos, 30, moves, "edge_block-A");
            }
          }
          else {
            /* Look along board edge to see if the defender's string can
             * run away to a friend.
             */
            // d不是1口气，防止渡过
            for (let edge_scan = epos; ; edge_scan += right) {
              // g=X or ?=X
              if (b.board[edge_scan] === color || b.board[edge_scan + up] === color) {
                this.ADD_CANDIDATE_MOVE(epos, 10, moves, "edge_block-B");
                break;
              }
              // g或? 不为空
              if (b.board[edge_scan] !== colors.EMPTY || b.board[edge_scan + up] !== colors.EMPTY)
                break;
            }
          }
        }
      }
    }
  },


  /* ================================================================ */
  /*            Defending by attacking surrounding strings            */
  /* ================================================================ */

  /* Add the chainbreaking moves relative to the string (str) to the
   * (moves) struct.
   */
  // 相邻1口气对方棋串
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

  /*
   * Find moves which immediately capture chain links with 2
   * liberties, in the sense that the links cannot escape atari.
   *
   * The used heuristics are slightly sloppy, so useless moves may
   * appear occasionally. This should, however, only lead to slightly
   * worse performance but not to incorrect results.
   */
  break_chain2_efficient_moves(str, moves) {
    const adjs = [];
    /* Find links with 2 liberties. */
    const adj = this.board.chainlinks2(str, adjs, 2);

    for (let r = 0; r < adj; r++){
      this.do_find_break_chain2_efficient_moves(str, adjs[r], moves);
    }
  },

  do_find_break_chain2_efficient_moves(str, adj, moves) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);

    const adjs2 = []
    const libs = []
    b.ASSERT1(b.countlib(adj) === 2, adj);

    const adj2 = b.chainlinks2(adj, adjs2, 1);
    if (adj2 === 1 && b.countlib(str) > 2) {
      const apos = [];
      this.break_chain_moves(adjs2[0], moves);
      b.findlib(adjs2[0], 1, apos);
      if (!b.is_self_atari(apos, color))
        this.ADD_CANDIDATE_MOVE(apos, 0, moves, "break_chain2_efficient-A");
      return;
    }

    if (adj2 > 1)
      return;

    b.findlib(adj, 2, libs);
    for (let k = 0; k < 2; k++){
      if (b.approxlib(libs[k], other, 3, null) <= 2 && !b.is_self_atari(libs[1 - k], color)){
        this.ADD_CANDIDATE_MOVE(libs[1 - k], 0, moves, "break_chain2_efficient-B");
      }
    }

    /* A common special case is this kind of edge position
     *
     * ..XXX.
     * X.XOO.
     * XOOX*.
     * ......
     * ------
     *
     * where a move at * is most effective for saving the two stones
     * to the left.
     *
     * The code below tries to identify this case. We use the crude
     * heuristic that the two liberties of the X stone we want to
     * capture should be placed diagonally and that one liberty should
     * be on the edge. Then we propose to play the other liberty.
     * Notice that both moves may be proposed when attacking a stone
     * on 2-2.
     *
     * Update: This was too crude. Also require that the X stone is on
     * the second line and that the proposed move is not a self-atari.
     */
    if (!b.DIAGONAL_NEIGHBORS(libs[0], libs[1]))
      return;

    /* Since we know that the two liberties are diagonal, the following
     * construction gives the two vertices "between" the liberties.
     */
    const pos1 = b.NORTH(Math.max(libs[0], libs[1]));
    const pos2 = b.SOUTH(Math.min(libs[0], libs[1]));
    if ((b.board[pos1] !== other || !b.is_edge_vertex(pos2) || !b.same_string(pos1, adj))
      && (b.board[pos2] !== other || !b.is_edge_vertex(pos1) || !b.same_string(pos2, adj)))
      return;

    if (b.is_edge_vertex(libs[0]) && !b.is_self_atari(libs[1], color))
      this.ADD_CANDIDATE_MOVE(libs[1], 1, moves, "break_chain2_efficient-C");

    if (b.is_edge_vertex(libs[1]) && !b.is_self_atari(libs[0], color))
      this.ADD_CANDIDATE_MOVE(libs[0], 1, moves, "break_chain2_efficient-C");
  },

  break_chain2_moves() {},

  break_chain2_defense_moves() {},
  do_find_break_chain3_moves() {},
  break_chain3_moves() {},
  break_chain4_moves() {},

  superstring_break_chain_moves() {},

  /*
   * If `str' points to a group, double_atari_chain2_moves() adds all
   * moves which make a double atari on some strings in the surrounding
   * chain to the moves[] array.  In addition, if `generate_more_moves'
   * is set, it adds moves that make atari on a string in the
   * surrounding chain and are adjacent to another string with 3
   * liberties.
   */
  // 双打吃识别
  double_atari_chain2_moves(str, moves, generate_more_moves) {
    const b = this.board
    const adjs = []
    const libs = []
    const mw = []

    let adj = b.chainlinks2(str, adjs, 2);
    for (let r = 0; r < adj; r++) {
      b.findlib(adjs[r], 2, libs);
      for (let k = 0; k < 2; k++) {
        mw[libs[k]]++;
        // 找到双打吃点位
        if (mw[libs[k]] === 2) {
          /* Found a double atari, but don't play there unless the move
           * is safe for the defender.
           */
          if (!b.is_self_atari(libs[k], b.board[str])){
            this.ADD_CANDIDATE_MOVE(libs[k], 1, moves, "double_atari_chain2-A");
          }
        }
      }
    }

    if (generate_more_moves) {
      const adjs3 = []

      let adj3 = b.chainlinks2(str, adjs3, 3);
      for (let r = 0; r < adj3; r++) {
        b.findlib(adjs3[r], 3, libs);
        for (let k = 0; k < 3; k++) {
          if (mw[libs[k]] === 1) {
            mw[libs[k]] = 2;
            if (!b.is_self_atari(libs[k], b.board[str])){
              this.ADD_CANDIDATE_MOVE(libs[k], -3, moves, "double_atari_chain2-B");
            }
          }
        }
      }
    }
  },


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