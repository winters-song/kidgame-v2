import {matchpat, codes, NO_MOVE} from "./Constants";
import {AFFINE_TRANSFORM} from "./Liberty";

import {conn_db} from "./patterns/conn"


import {
  ATT_not,
  ATT_O, ATT_X,
  CLASS_B,
  CLASS_C,
  CLASS_s,
  HAVE_ACTION,
  HAVE_CONSTRAINT
} from "./patterns/Patterns";

export const Connections = {


  /* Test whether apos and bpos can be cut. If yes, return 1 and
  * store it in the cut list of dragons.c.
  */
  disconnect_helper(apos, bpos) {
    const b = this.board
    let color = b.board[apos];
    let move = [];
    b.ASSERT1(color === b.board[bpos] && b.IS_STONE(color), apos);

    if (this.disconnect(apos, bpos, move)) {
      this.add_cut(apos, bpos, move);
      return 1;
    }
    return 0;
  },

  /* Try to match all (permutations of) connection patterns at (m,n).
  * For each match, if it is a B pattern, set cutting point in
  * cutting_points array. If it is a C pattern, amalgamate the dragons
  * in the pattern.
  */
  cut_connect_callback(anchor, color, pattern, ll, data) {
    const b = this.board
    let k;
    let first_dragon  = NO_MOVE;
    let second_dragon = NO_MOVE;

    const other = b.OTHER_COLOR(color);

    let move = AFFINE_TRANSFORM(pattern.move_offset, ll, anchor);
    
    // safe_move(Reading)
    if ((pattern.class & CLASS_B) && !this.safe_move(move, other))
      return;

    if (pattern.class & CLASS_C) {
      /* If C pattern, test if there are more than one dragon in this
      * pattern so that there is something to connect, before doing any
      * expensive reading.
      */

      for (k = 0; k < pattern.patlen; ++k) { /* match each point */
        /* transform pattern real coordinate */
        let pos = AFFINE_TRANSFORM(pattern.patn[k][0], ll, anchor);
        
        /* Look for distinct dragons. */
        if (pattern.patn[k][1] === ATT_O) {
          if (first_dragon === NO_MOVE){
            first_dragon = this.dragon[pos].origin;
          }
          else if (second_dragon === NO_MOVE && this.dragon[pos].origin !== first_dragon) {
            second_dragon = this.dragon[pos].origin;
            /* A second dragon found, no need to continue looping. */
            break;
          }
        }
      }
      if (second_dragon === NO_MOVE){
        return; /* Nothing to amalgamate. */
      }
    }
      
    /* If the pattern has a constraint, call the autohelper to see
    * if the pattern must be rejected.
    */
    if (pattern.autohelper_flag & HAVE_CONSTRAINT) {
      if (!pattern.autohelper.call(this, ll, move, color, 0)) {
        return;
      }
    }

    /* If the pattern has a helper, call it to see if the pattern must
    * be rejected.
    */
    if (pattern.helper) {
      if (!pattern.helper.call(this, pattern, ll, move, color)) {
        return;
      }
    }

    if ((pattern.class & CLASS_B) && !(pattern.class & CLASS_s)) {
      /* Require that the X stones in the pattern are tactically safe. */
      for (k = 0; k < pattern.patlen; ++k) { /* match each point */
        if (pattern.patn[k][1] === ATT_X) {
          /* transform pattern real coordinate */
          let pos = AFFINE_TRANSFORM(pattern.patn[k][0], ll, anchor);

          if (this.attack(pos, null) === codes.WIN && (move === NO_MOVE || !this.does_defend(move, pos))){
            return; /* Match failed */
          }
        }
      }
    }

    /* Get here => Pattern matches. */
    if (pattern.class & CLASS_B) {
      // DEBUG(DEBUG_DRAGONS, "Cutting pattern %s+%d found at %1m\n", pattern.name, ll, anchor);
      // DEBUG(DEBUG_DRAGONS, "cutting point %1m\n", move);
    }
    else if (pattern.class & CLASS_C){
      // DEBUG(DEBUG_DRAGONS, "Connecting pattern %s+%d found at %1m\n", pattern.name, ll, anchor);
    }

    /* does the pattern have an action? */
    if (pattern.autohelper_flag & HAVE_ACTION) {
      pattern.autohelper(ll, move, color, 1);
    }

    /* If it is a B pattern, set cutting point. */
    
    if (pattern.class & CLASS_B) {
      this.cutting_points[move] |= color;
    }
    else if (!(pattern.class & CLASS_C)) {
      /* Nothing more to do, up to the helper or autohelper to amalgamate dragons or modify eye space. */
      return; 
    }

    /* If it is a C pattern, find the dragons to connect.
    * If it is a B pattern, find eye space points to inhibit connection
    * through.
    */
    first_dragon  = NO_MOVE;
    second_dragon = NO_MOVE;
    for (k = 0; k < pattern.patlen; ++k) { /* match each point */
      /* transform pattern real coordinate */
      let pos = AFFINE_TRANSFORM(pattern.patn[k][0], ll, anchor);

      /* Look for dragons to amalgamate. Never amalgamate stones which
      * can be attacked.
      */
      if ((pattern.class & CLASS_C) && b.board[pos] === color && pattern.patn[k][1] === ATT_O
          && ((pattern.class & CLASS_s) || this.attack(pos, null) === 0)) {
        if (first_dragon === NO_MOVE) {
          first_dragon = this.dragon[pos].origin;
        }
        else if (second_dragon === NO_MOVE && this.dragon[pos].origin !== first_dragon) {
          second_dragon = this.dragon[pos].origin;
          /* A second dragon found, we amalgamate them at once. */
          /* Want this output if verbose or DEBUG_DRAGONS is on. */
          // if (verbose || (debug & DEBUG_DRAGONS))
          //   gprintf("Pattern %s joins %C dragons %1m, %1m\n", pattern.name, color, first_dragon, second_dragon);
          this.join_dragons(second_dragon, first_dragon);
          /* Now look for another second dragon. */
          second_dragon = NO_MOVE;
          first_dragon = this.dragon[pos].origin;
        }
      }
      
      /* Inhibit connections */
      if (pattern.class & CLASS_B) {
        if (pattern.patn[k][1] !== ATT_not)
          break; /* The inhibition points are guaranteed to come first. */
        this.cutting_points[pos] |= color;
        // DEBUG(DEBUG_DRAGONS, "inhibiting connection at %1m\n", pos);
      }
    } /* loop over elements */
  },



  /* Only consider B patterns. */
  cut_callback( anchor, color, pattern, ll, data){
    if (pattern.class & CLASS_B){
      this.cut_connect_callback.call(this, anchor, color, pattern, ll, data);
    }
  },

  /* Consider C patterns and those without classification. */
  conn_callback(anchor, color, pattern, ll, data) {
    if (!(pattern.class & CLASS_B)) {
      this.cut_connect_callback.call(this, anchor, color, pattern, ll, data);
    }
  },
    
  /* Find cutting points which should inhibit amalgamations and sever
  * the adjacent eye space.
  */
  find_cuts(){
    this.matchpat(this.cut_callback, matchpat.ANCHOR_COLOR, conn_db, null, null);
  },

  /* Find explicit connection patterns and amalgamate the involved dragons. */
  find_connections(){
    this.matchpat(this.conn_callback, matchpat.ANCHOR_COLOR, conn_db, null, null);
  }

}