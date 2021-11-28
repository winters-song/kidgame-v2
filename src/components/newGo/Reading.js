import {
  colors, codes, NO_MOVE, PASS_MOVE, 
} from './Constants'
import {dragon_status, MAX_CLOSE_WORMS, MAX_TACTICAL_POINTS, routine_id, REVERSE_RESULT} from "./Liberty";

/* Statistics. */
let reading_node_counter = 0
let nodes_when_called = 0

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
    else if (REVERSE_RESULT(code) > savecode) {				
      savemove = move_pos;						
      savecode = REVERSE_RESULT(code);					
    }		
  },

  CHECK_RESULT_UNREVERSED(savecode, savemove, code, move_pos,	move_ptr, trace_message) {
    return this.CHECK_RESULT(savecode, savemove, REVERSE_RESULT(code), move_pos, move_ptr, trace_message)
  },


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
    the_move[1] = 'attack'
    let liberties = b.countlib(str);

    nodes_when_called = reading_node_counter;
    /* Don't even spend time looking in the cache if there are more than
     * enough liberties. We need this before the persistent cache lookup
     * to avoid results inconsistent with find_defense().
     */
    // 3口气以上忽略
    if (liberties > 4)
      // || (liberties === 4 && b.stackp > fourlib_depth)
      // || (liberties === 3 && b.stackp > depth))
      return 0;

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

    if (liberties > 4){
      // || (liberties == 4 && b.stackp > fourlib_depth)
      // || (liberties == 3 && b.stackp > depth)) {
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
      if(result!==0 && move){
        move[0] = xpos[0]
      }
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
    let adjs = []

    reading_node_counter++;

    /* Pick up the position of the liberty. */
    b.findlib(str, 1, xpos);

    if (b.countstones(str) > 1) {
      return this.RETURN_RESULT(codes.WIN, xpos, move, "last liberty");
    }

    if (b.trymove(xpos[0], other, "attack1-A", str)) {
      /* Is the attacker in atari? If not the attack was successful. */
      if (b.countlib(xpos[0]) > 1) {
        b.popgo();
        return this.RETURN_RESULT(codes.WIN, xpos, move, "last liberty");
      }
  
      /* If the attacking string is also a single stone, a possible
       * recapture would be a ko violation, so the defender has to make
       * a ko threat first.
       */
      else if (b.countstones(xpos[0]) === 1) {
        if (b.get_komaster() !== other) {
          /* If the defender is allowed to take the ko the result is KO_A. */
          let res = this.CHECK_RESULT_UNREVERSED(savecode, savemove, codes.KO_A, xpos, move, "last liberty - ko");
          if(res === codes.WIN){
            return res
          }
        }
        else {
          /* But if the attacker is the attack was successful. */
          b.popgo();
          return this.RETURN_RESULT(codes.WIN, xpos, move, "last liberty");
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
          return this.RETURN_RESULT(codes.WIN, xpos, move, "last liberty");
        }
      }
      b.popgo();
    }
    else {
      /* Illegal ko capture. */
      if (b.get_komaster() !== color) {
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
    const libs = []
    const liberties = b.approxlib(xpos[0], color, 6, libs);
    let apos
    if (liberties <= 5){

      for (let k = 0; k < liberties; k++) {
        apos = libs[k];
        if (!b.is_self_atari(apos, other) && b.trymove(apos, other, "attack1-C", str)) {
          let dcode = this.do_find_defense(str, null);
          if (dcode !== codes.WIN && this.do_attack(str, null)) {
            if (dcode == 0) {
              b.popgo();
              return this.RETURN_RESULT(codes.WIN, apos, move, "backfilling");
            }
            this.UPDATE_SAVED_KO_RESULT(savecode, savemove, dcode, apos);
          }
          b.popgo();
        }
      }
    }

    let adj = b.chainlinks2(str, adjs, 1);
    for (let r = 0; r < adj; r++) {
      if (b.liberty_of_string(xpos[0], adjs[r])) {
        let adjs2 = [];
        let adj2 = b.chainlinks2(adjs[r], adjs2, 1);
        for (let k = 0; k < adj2; k++) {
          let ko_move;
          if (adjs2[k] == str){
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
                savecode = codes.KO_B;
              }
              b.popgo();
            }
          }
        }
      }
    }
    
    if (savecode === 0) {
      return this.RETURN_RESULT(0, 0, move, null);
    }
    
    return this.RETURN_RESULT(savecode, savemove, move, "saved move");

  }

}