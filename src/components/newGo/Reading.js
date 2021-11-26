import {
  colors, codes, NO_MOVE, PASS_MOVE
} from './Constants'
import {dragon_status, MAX_CLOSE_WORMS, MAX_TACTICAL_POINTS, routine_id} from "./Liberty";

/* Statistics. */
let reading_node_counter = 0
let nodes_when_called = 0

export const Reading = {

  RETURN_RESULT(savecode, savemove, move_ptr, trace_message) {
    if (savecode) {
      if (move_ptr) {
        move_ptr[0] = savemove[0] //保存结果
      }
    } else {
      // SGFTRACE(0, 0, NULL);
    }
    return savecode;
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
    if (liberties > 4)
      // || (liberties === 4 && this.stackp > fourlib_depth)
      // || (liberties === 3 && this.stackp > depth))
      return 0;

    // 搜索缓存
    let origin = b.find_origin(str);
    // if (this.search_persistent_reading_cache(ATTACK, origin, result, the_move)) {
    //   if (move){
    //     move = the_move;
    //   }
    //   return result;
    // }

    // memset(shadow, 0, sizeof(shadow));
    result = this.do_attack(str, the_move);
    let nodes = reading_node_counter - nodes_when_called;

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
    let result = 0;

    // SETUP_TRACE_INFO("attack", str);

    // ASSERT1(color != 0, str);
    /* if assertions are turned off, silently fails */
    if (color === 0){
      return 0;
    }

    str = b.find_origin(str);
    const liberties = b.countlib(str);

    if (liberties > 4){
      // || (liberties == 4 && stackp > fourlib_depth)
      // || (liberties == 3 && stackp > depth)) {
      /* No need to cache the result in these cases. */
      return 0;
    }

    /* Set "killer move" up.  This move (if set) was successful in
     * another variation, so it is reasonable to try it now.  However,
     * we only do this if the string has 4 liberties - otherwise the
     * situation changes too much from variation to variation.
     */
    // if (liberties > 3 && move){
    //   xpos = move;
    // }

    /* Note that if return value is 1 (too small depth), the move will
     * still be used for move ordering.
     */
    // if (stackp <= depth
    // && tt_get(&ttable, ATTACK, str, NO_MOVE, depth - stackp, NULL,
    //   &retval, NULL, &xpos) == 2) {
    //   TRACE_CACHED_RESULT(retval, xpos);
    //   SGFTRACE(xpos, retval, "cached");
    //   if (move)
    //     *move = xpos;
    //   return retval;
    // }

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
      // READ_RETURN(ATTACK, str, depth - stackp, move, xpos, result);
      return result
    }

    // READ_RETURN0(ATTACK, str, depth - stackp);
  },

  attack1(str, move) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    let savemove = 0;
    let savecode = 0;
    let xpos = []

    reading_node_counter++;

    /* Pick up the position of the liberty. */
    b.findlib(str, 1, xpos);

    if (b.countstones(str) > 1) {
      return this.RETURN_RESULT(codes.WIN, xpos, move, "last liberty");
    }

  }

}