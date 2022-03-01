import {codes, colors, NO_MOVE} from "./Constants";
import {AFFINE_TRANSFORM, dragon_status, EyeValue, REVERSE_RESULT, routine_id} from "./Liberty";
import {ATT_O} from "./patterns/Patterns";
import {owl_attackpat_db} from "./patterns/owl_attackpat";

/*
 * The code in this file implements "Optics With Limit-negotiation (OWL)."
 *
 * The life and death code in optics.c, works reasonably well as long as the
 * position is in a *terminal position*, which we define to be one where there
 * are no moves left which can expand the eye space, or limit it. In
 * situations where the dragon is surrounded, yet has room to thrash around a
 * bit making eyes, a simple application of the graph-based analysis will not
 * work. Instead, a bit of reading is needed to reach a terminal position.
 * The defender tries to expand his eyespace, the attacker to limit it, and
 * when neither finds an effective move, the position is evaluated. We call
 * this type of life and death reading *Optics With Limit-negotiation* (OWL).
 *
 *                             (|__|)
 *                            (@)(@))
 *                            |:v:: |
 *                           (       )
 *                            \|   |/
 *                            =#===#=
 *                            /___/
 *
 *                The owl is noted for its keen vision
 *                       and (purported) wisdom.
 */

const MAX_MOVES = 3           /* maximum number of branches at each node */
const MAX_SEMEAI_MOVES = 6    /* semeai branch factor */
const MAX_SEMEAI_DEPTH = 100  /* Don't read below this depth */
const MAX_LUNCHES = 10
const MAX_GOAL_WORMS = 15  /* maximum number of worms in a dragon to be */
/*   cataloged.  NOTE: Must fit in value2 in hashnode! */
const MAX_ESCAPE = 3  /* After this many escape moves, owl_determine_life is */
/*    not called                                       */


class LocalOwlData {
  goal = [];
  boundary = [];
  /* Same as goal, except never anything is removed from it. */
  cumulative_goal = [];

  /* FIXME: neighbors[] and escape_values[] are never recomputed.
   *	    Consider moving these arrays from stack to a static or
   *	    dynamic variable so it is not copied around in
   *	    do_push_owl().  Be aware of semeai code though.
   */
  neighbors = [];

  escape_values = [];
  color;

  my_eye = []
  /* array of half-eye data for use during owl reading */
  half_eye = []

  lunch = [];
  lunch_attack_code = [];
  lunch_attack_point = [];
  lunch_defend_code = [];
  lunch_defense_point = [];
  inessential = [];

  lunches_are_current; /* If true, owl lunch data is current */

  safe_move_cache = [];

  /* This is used to organize the owl stack. */
  // struct local_owl_data *restore_from;
}

class OwlMoveData {}

class MatchedPatternData{}

class MatchedPatternsListData {
  initialized;
  counter; 		/* Number of patterns in the list. */
  used;		/* How many patterns have already been used?*/
  list_size;
  // struct matched_pattern_data *pattern_list;
  first_pattern_index = [];

  heap_num_patterns;
  // struct matched_pattern_data **pattern_heap;
}

let result_certain;

/* Statistics. */
let local_owl_node_counter;
/* Node limitation. */
let global_owl_node_counter = 0;

let current_owl_data = {};
let other_owl_data = {};

let goal_worms_computed = [0];
let owl_goal_worm = [];

// let dragon_goal_worms = []
const MAX_CUTS = 5


const  SAME_DRAGON_NOT_CONNECTED = 0
const  SAME_DRAGON_MAYBE_CONNECTED = 1
const  SAME_DRAGON_CONNECTED = 2
const  SAME_DRAGON_ALL_CONNECTED = 3

let include_semeai_worms_in_eyespace = 0


let owl_stack = []
let owl_stack_size = 0;
let owl_stack_pointer = 0;



const clear_cut_list = (cuts) => {
  cuts.fill(NO_MOVE);
}

export const Owl = {
  owl_analyze_semeai () {},
  owl_analyze_semeai_after_move () {},
  do_owl_analyze_semeai () {},
  semeai_trymove_and_recurse () {},
  semeai_add_sgf_comment () {},

  /* In semeai situations tactical attacks often cannot be trusted. This
   * in particular holds for strings with three or more liberties. Two
   * liberties can usually be trusted, but if neither liberty can be
   * played immediately, the need for backfilling moves gives an
   * effective liberty count of more than two, again making the attack
   * untrustworthy.
   *
   * This function decides whether an attack should be trusted. It does
   * not check whether there actually is an attack, though.
   */
  semeai_trust_tactical_attack (str) {
    const b = this.board
    const libs = []
    const other = b.OTHER_COLOR(b.board[str]);

    const liberties = b.findlib(str, 3, libs);
    if (liberties > 2){
      return 0;
    }

    if (liberties < 2){
      return 1;
    }

    if (!b.is_self_atari(libs[0], other) || !b.is_self_atari(libs[1], other)){
      return 1;
    }

    return 0;
  },
  semeai_is_riskless_move () {},
  semeai_review_owl_moves () {},
  semeai_propose_eyespace_filling_move () {},
  semeai_move_value () {},
  remove_eye_filling_moves () {},
  liberty_of_goal () {},
  second_liberty_of_goal () {},
  find_semeai_backfilling_move () {},

  reading_limit_reached (live_reason, this_variation_number) {
    if (this.board.stackp > this.owl_reading_depth) {
      // TRACE("%oVariation %d: ALIVE (maximum reading depth reached)\n", this_variation_number);
      live_reason[0] = "max reading depth reached";
      return 1;
    }
    /* If the owl node limit has been reached, assume the dragon has
     * managed to escape.
     */
    if (local_owl_node_counter >= this.owl_node_limit) {
      result_certain = 0;
      // TRACE("%oVariation %d: ALIVE (owl node limit reached)\n", this_variation_number);
      live_reason[0] = "owl node limit reached";
      return 1;
    }
    return 0;
  },

  clear_owl_move_data () {},
  set_single_owl_move () {},


  /* Returns true if a move can be found to attack the dragon
   * at (target), in which case (*attack_point) is the recommended move.
   * (attack_point) can be a null pointer if only the result is needed.
   *
   * The array goal marks the extent of the dragon. This must
   * be maintained during reading. Call this function only when
   * stackp==0; otherwise you can call do_owl_attack but you must
   * set up the goal and boundary arrays by hand first.
   *
   * Returns KO_A or KO_B if the position is ko:
   *
   * - Returns KO_A if the attack prevails provided attacker is willing to
   *   ignore any ko threat (the attacker makes the first ko capture).
   *
   * - Returns KO_B if attack succeeds provided attacker has a ko threat
   *   which must be answered (the defender makes the first ko capture).
   *
   * If GNU Go is compiled with `configure --enable-experimental-owl-ext'
   * then a return codes of GAIN is also possible.
   *
   * - Returns GAIN if the attack fails but another worm of the
   *   opponent's is captured in during the failed attack. The location
   *   of the killed worm is returned through the *kworm field.
   *
   * */
  owl_attack (target, attack_point, certain, kworm) {
    let result = [];
    let owl = new LocalOwlData()
    let reading_nodes_when_called = this.get_reading_node_counter();
    // let start = 0.0;
    let tactical_nodes;
    let move = [NO_MOVE];
    let wpos = [NO_MOVE];
    let wid = [MAX_GOAL_WORMS];

    result_certain = 1;
    if (this.worm[target].unconditional_status === dragon_status.DEAD) {
      if (attack_point){
        attack_point[0] = NO_MOVE;
      }
      if (kworm){
        kworm[0] = NO_MOVE;
      }
      if (certain){
        certain[0] = 1;
      }
      return 1;
    }

    if (this.search_persistent_owl_cache(routine_id.OWL_ATTACK, target, 0, 0, result, attack_point, kworm, certain)){
      return result;
    }

    // if (debug & DEBUG_OWL_PERFORMANCE)
    //   start = gg_cputime();

    // TRACE("owl_attack %1m\n", target);
    this.init_owl(owl, target, NO_MOVE, NO_MOVE, 1, null);
    this.owl_make_domains(owl, null);
    this.prepare_goal_list(target, owl, owl_goal_worm, goal_worms_computed, kworm, 1);
    result = this.do_owl_attack(target, move, wid, owl, 0);
    this.finish_goal_list(goal_worms_computed, wpos, owl_goal_worm, wid);
    tactical_nodes = this.get_reading_node_counter() - reading_nodes_when_called;

    // DEBUG(DEBUG_OWL_PERFORMANCE, "owl_attack %1m, result %d %1m (%d, %d nodes, %f seconds)\n",
    //   target, result, move, local_owl_node_counter, tactical_nodes, gg_cputime() - start);

    this.store_persistent_owl_cache(routine_id.OWL_ATTACK, target, 0, 0,
      result, move, wpos, result_certain, tactical_nodes, owl.goal, this.board.board[target]);

    if (attack_point){
      attack_point[0] = move;
    }
    if (kworm){
      kworm[0] = wpos;
    }
    if (certain){
      certain[0] = result_certain;
    }

    return result;
  },

  /* Static function containing the main recursive code for
   * owl_attack.
   */
  do_owl_attack (str, move, wormid, owl, escape) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);

    let vital_moves = []
    let shape_moves = []
    let moves
    let shape_patterns = new MatchedPatternsListData()
    let mw = [];
    let number_tried_moves = 0;
    let pass;
    let k;
    let savemove = 0;
    let saveworm = MAX_GOAL_WORMS;
    let savecode = 0;
    let eyemin = [-1];               /* Lower bound on the number of eyes. */
    let eyemax = [-1];               /* Upper bound on the number of eyes. */
    let probable_eyes = new EyeValue()
    let live_reason = [];
    let move_cutoff;
    let xpos = [];
    let value1 = [];
    let value2 = [];
    let this_variation_number = b.count_variations - 1;

    // SETUP_TRACE_INFO("owl_attack", str);

    shape_patterns.initialized = 0;

    str = b.find_origin(str);

    if (this.tt_get(this.ttable, routine_id.OWL_ATTACK, str, NO_MOVE, this.depth - b.stackp, null, value1, value2, xpos) === 2) {

      // TRACE_CACHED_RESULT(value1, xpos);
      if (move){
        move[0] = xpos;
      }

      if (value1[0] === codes.GAIN) {
        if (wormid) {
          if (goal_worms_computed){
            wormid[0] = value2;
          }
          else{
            wormid[0] = MAX_GOAL_WORMS;
          }
        }
      }

      // if (value1 === codes.WIN)
      //   TRACE("%oVariation %d: DEAD (cached)\n", this_variation_number);
      // else
      //   TRACE("%oVariation %d: ALIVE (cached)\n", this_variation_number);
      //
      // SGFTRACE(xpos, value1, "cached");

      return value1;
    }


    /* If reading goes to deep or we run out of nodes, we assume life. */
    if (this.reading_limit_reached(live_reason, this_variation_number)) {
      // SGFTRACE(0, 0, live_reason);
      this.READ_RETURN(routine_id.OWL_ATTACK, str, this.depth - b.stackp, move, 0, 0);
    }

    // memset(mw, 0, sizeof(mw));
    global_owl_node_counter++;
    local_owl_node_counter++;

    current_owl_data = owl;
    // memset(owl.safe_move_cache, 0, sizeof(owl.safe_move_cache));

    /* First see whether there is any chance to kill. */
    if (this.owl_estimate_life(owl, null, vital_moves, live_reason, 1, probable_eyes, eyemin, eyemax)) {
      /*
       * We need to check here if there's a worm under atari. If yes,
       * locate it and report a (gote) GAIN.
       */
      let acode = 0;
      let mpos = [NO_MOVE];
      if (this.experimental_owl_ext && goal_worms_computed) {
        let size = 0;
        saveworm = MAX_GOAL_WORMS;
        for (k = 0; k < MAX_GOAL_WORMS; k++) {
          if (owl_goal_worm[k] === NO_MOVE)
            break;
          if (b.board[owl_goal_worm[k]] === colors.EMPTY
            || b.countlib(owl_goal_worm[k]) > 1)
            continue;
          if (this.worm[owl_goal_worm[k]].size > size) {
            saveworm = k;
            size = this.worm[owl_goal_worm[k]].size;
          }
        }
        if (saveworm !== MAX_GOAL_WORMS && size >= 3) {
          acode = codes.GAIN;
          b.findlib(this.worm[owl_goal_worm[saveworm]].origin, 1, mpos);
          /* ASSERT1( ... */
        }
      }
      // SGFTRACE(0, acode, live_reason);
      // TRACE("%oVariation %d: ALIVE (%s)\n", this_variation_number, live_reason);
      if (acode === 0) {
        this.READ_RETURN(dragon_status.OWL_ATTACK, str, this.depth - b.stackp, move, 0, 0);
      }
      else {
        if (wormid){
          wormid[0] = saveworm;
        }
        this.READ_RETURN2(dragon_status.OWL_ATTACK, str, this.depth - b.stackp, move, mpos, acode, saveworm);
      }
    }

    /* We try moves in five passes.
     *                                stackp==0   stackp>0
     * 0. Vital moves in the interval  [70..]      [45..]
     * 1. Shape moves
     * 2. Vital moves in the interval  [..69]      [..44]
     * 3. Tactical attack moves (except certain kos)
     * 4. Moves found by the defender
     * 5. Tactical ko attack moves which were not tried in pass 3
     */
    for (pass = 0; pass < 6; pass++) {
      moves = null;
      move_cutoff = 1;

      current_owl_data = owl;
      /* Get the shape moves if we are in the right pass. */
      switch (pass) {
        case 1:
          if (b.stackp > this.owl_branch_depth && number_tried_moves > 0)
            continue;

          this.owl_shapes(shape_patterns, shape_moves, other, owl, owl_attackpat_db);
          moves = shape_moves;
          break;

        case 0:
        case 2:
          if (b.stackp > this.owl_branch_depth && number_tried_moves > 0)
            continue;

          moves = vital_moves;
          if (pass === 0 || b.stackp > this.owl_distrust_depth) {
            if (b.stackp === 0){
              move_cutoff = 70;
            }
            else{
              move_cutoff = 45;
            }
          }
          if (eyemax < 2 && b.stackp > 2){
            move_cutoff = 99; /* Effectively disable vital moves. */
          }
          break;

        case 3:
        case 5:
          /* Look for a tactical attack. This is primarily intended for
           * the case where the whole dragon is a single string, therefore
           * we only look at the string at the "origin".
           *
           * We must be wary with attacks giving ko. Unless the dragon
           * otherwise looks alive, this may turn a dead dragon into one
           * which can live by ko. Such moves will be tried anyway in
           * pass 5. Notice though that we can only reach there if an owl
           * defense was found in pass 4.
           */
          let apos = [];
          let result;
          // SGFTree *save_sgf_dumptree = sgf_dumptree;
          let save_count_variations = b.count_variations;

          // sgf_dumptree = NULL;
          b.count_variations = 0;
          result = this.attack(str, apos);
          if (result === codes.WIN || (result !== 0 && (this.min_eyes(probable_eyes) >= 2 || pass === 5))) {
            this.set_single_owl_move(shape_moves, apos, "tactical attack");
            moves = shape_moves;
          }
          // sgf_dumptree = save_sgf_dumptree;
          b.count_variations = save_count_variations;
          break;

        /* If we found no move in the first four passes we ask the defender
         * for a move suggestion.
         */
        case 4:
          if (number_tried_moves === 0) {
            let dpos = [];
            let dcode = this.do_owl_defend(str, dpos, null, owl, escape);
            /* No defense, we won. */
            if (dcode === 0) {
              // TRACE("%oVariation %d: DEAD (no defense)\n", this_variation_number);
              // SGFTRACE(0, WIN, "no defense");
              this.close_pattern_list(other, shape_patterns);
              this.READ_RETURN(routine_id.OWL_ATTACK, str, this.depth - b.stackp, move, 0, codes.WIN);
            }
            else if (dpos !== NO_MOVE) {
              /* The dragon could be defended by one more move. Try to
               * attack with this move.
               *
               * If the move is suicide for us, try to find a backfilling
               * move to play instead. Do this also if the move is a
               * send-two-return-one sacrifice.
               */
              let name = ["defense move"];
              // SGFTree *save_sgf_dumptree = sgf_dumptree;
              // let save_count_variations = count_variations;

              // sgf_dumptree = NULL;
              b.count_variations = 0;

              if (b.is_suicide(dpos[0], other) || b.send_two_return_one(dpos[0], other)) {
                let dpos2 = [];
                for (k = 0; k < 4; k++) {
                  if (b.board[dpos + b.delta[k]] === other && this.find_defense(dpos + b.delta[k], dpos2)) {
                    dpos = dpos2;
                    name[0] = "defense move (backfill)";
                    break;
                  }
                }
              }

              // sgf_dumptree = save_sgf_dumptree;
              b.count_variations = save_count_variations;

              if (dpos !== NO_MOVE) {
                this.set_single_owl_move(shape_moves, dpos, name);
                moves = shape_moves;
              }
            }
          }
          break;
      } /* switch (pass) */


      if (!moves){
        continue;
      }

      /* For the up to MAX_MOVES best moves with value equal to
       * move_cutoff or higher, try to attack the dragon and see if it
       * can then be defended.
       */
      for (k = 0; k < MAX_MOVES; k++) {
        let mpos;
        let ko_move = -1;
        let origin = NO_MOVE;
        let captured;
        let wid = MAX_GOAL_WORMS;
        let dcode;

        /* Consider only the highest scoring move if we're deeper than
         * owl_branch_depth.
         *
         * FIXME: To behave as intended, k should be replaced by
         *        number_tried_moves.
         */
        if (b.stackp > this.owl_branch_depth && k > 0){
          break;
        }

        current_owl_data = owl;

        /* Shape moves are selected on demand. */
        if (pass === 1) {
          if (!this.get_next_move_from_list(shape_patterns, other, shape_moves, move_cutoff, owl)){
            break;
          }
        }
        else{
          if (moves[k].value < move_cutoff){
            break;
          }
        }

        mpos = moves[k].pos;
        b.ASSERT_ON_BOARD1(mpos);

        /* Have we already tested this move? */
        if (mw[mpos]){
          continue;
        }

        captured = (color === colors.WHITE ? b.white_captured : b.black_captured);

        /* Try to make the move. */
        if (!b.komaster_trymove(mpos, other, moves[k].name, str, ko_move, savecode === 0)){
          continue;
        }

        captured = (color === colors.WHITE ? b.white_captured : b.black_captured) - captured;

        // TRACE("Trying %C %1m. Escape = %d. Current stack: ",
        //   other, mpos, escape);
        // if (verbose)
        //   dump_stack();

        /* We have now made a move. Analyze the new position. */
        this.push_owl(owl);
        mw[mpos] = 1;
        number_tried_moves++;
        this.owl_update_boundary_marks(mpos, owl);

        /* If the origin of the dragon has been captured, we look
         * for another string which was part of the original dragon,
         * marked when stackp==0, which has not been captured. If no
         * such string is found, owl_attack declares victory.
         */
        if (b.IS_STONE(b.board[str])){
          origin = str;
        }
        else{
          origin = this.select_new_goal_origin(NO_MOVE, owl);
        }

        /* Test whether the move cut the goal dragon apart. */
        if (moves[k].cuts[0] !== NO_MOVE && origin !== NO_MOVE) {
          this.owl_test_cuts(owl.goal, owl.color, moves[k].cuts);
          if (!owl.goal[origin]){
            origin = this.select_new_goal_origin(origin, owl);
          }
        }
        this.mark_goal_in_sgf(owl.goal);

        if (origin === NO_MOVE){
          dcode = 0;
        }
        else{
          dcode = this.do_owl_defend(origin, null, wid, owl, escape);
        }

        if (!ko_move) {
          if (dcode === 0) {
            this.pop_owl(owl);
            b.popgo();
            // if (sgf_dumptree) {
            //   const char *wintxt;
            //   char winstr[192];
            //   if (origin == NO_MOVE)
            //     wintxt = "all original stones captured";
            //   else
            //     wintxt = "attack effective";
            //   sprintf(winstr, "%s)\n  (%d variations", wintxt,
            //     count_variations - this_variation_number);
            //   SGFTRACE(mpos, WIN, winstr);
            // }
            this.close_pattern_list(other, shape_patterns);
            this.READ_RETURN(dragon_status.OWL_ATTACK, str, this.depth - b.stackp, move, mpos, codes.WIN);
          }
          else if (this.experimental_owl_ext && dcode === dragon_status.LOSS) {
            if (saveworm === MAX_GOAL_WORMS || this.worm[owl_goal_worm[wid]].size > this.worm[owl_goal_worm[saveworm]].size){
              saveworm = wid;
            }
          }
          /* The conditions here are set so that this code doesn't get
           * triggered when the capture is immediate (the tactical
           * reading code should take care of these).
           */
          else if (this.experimental_owl_ext && goal_worms_computed && captured >= 3) {
            let w = MAX_GOAL_WORMS;
            let size = 0;
            let l;
            /* locate the biggest captured worm */
            for (l = 0; l < MAX_GOAL_WORMS; l++) {
              if (owl_goal_worm[l] === NO_MOVE)
                break;
              if (b.board[owl_goal_worm[l]] === colors.EMPTY)
                if (size === 0 || this.worm[owl_goal_worm[l]].size > size) {
                  w = l;
                  size = this.worm[owl_goal_worm[l]].size;
                }
            }
            if (w !== MAX_GOAL_WORMS) {
              if (codes.GAIN > savecode) {
                /* if new result better, just update */
                dcode = dragon_status.LOSS;
                saveworm = w;
              }
              else if (codes.GAIN === savecode) {
                /* bigger ? */
                let wpos = owl_goal_worm[saveworm];
                if (size > this.worm[wpos].size){
                  saveworm = w;
                }
              }
            }
          }
          this.UPDATE_SAVED_KO_RESULT(savecode, savemove, dcode, mpos);
        }
        else { /* ko_move */
          if (dcode !== codes.WIN) {
            // if (mpos === 0) {
            //   SGFTRACE(mpos, KO_B, "all original stones captured with ko");
            // }
            // else {
            //   SGFTRACE(mpos, KO_B, "attack effective - ko");
            // }
            /* We already know the savecode was previously 0. */
            savemove = mpos;
            savecode = codes.KO_B;

            /* It's possible that the defender has no defense even if we
                   * give up the ko. In order to force a test of this,
                   * assuming this was our only move, we decrease the number
                   * of tried moves counter, disregarding this move.
             */
            number_tried_moves--;
          }
        }

        this.pop_owl(owl);
        b.popgo();
      }
    }

    this.close_pattern_list(other, shape_patterns);

    if (savecode) {
      if (savecode === codes.GAIN) {
        // SGFTRACE(savemove, savecode, "attack effective (gain) - E");
        if (wormid){
          wormid[0] = saveworm;
        }
        this.READ_RETURN2(dragon_status.OWL_ATTACK, str, this.depth - b.stackp, move, savemove, savecode, saveworm);
      }
      else {
        // SGFTRACE(savemove, savecode, "attack effective (ko) - E");
        this.READ_RETURN(dragon_status.OWL_ATTACK, str, this.depth - b.stackp, move, savemove, savecode);
      }
    }

    // if (sgf_dumptree) {
    //   char winstr[128];
    //   sprintf(winstr, "attack failed)\n  (%d variations",
    //     count_variations - this_variation_number);
    //   SGFTRACE(0, 0, winstr);
    // }

    this.READ_RETURN0(dragon_status.OWL_ATTACK, str, this.depth - b.stackp);
  },

  owl_threaten_attack () {},


  /* Returns true if a move can be found to defend the dragon
   * at (target), in which case (*defense_point) is the recommended move.
   * (defense_point) can be a null pointer if the result is not needed.
   *
   * The array goal marks the extent of the dragon. This must
   * be maintained during reading. Call this function only when
   * stackp==0; otherwise you can call do_owl_attack but you must
   * set up the goal and boundary arrays by hand first.
   *
   * Returns KO_A or KO_B if the position is ko:
   *
   * - Returns KO_A if the defendse succeeds provided the defender is willing to
   *   ignore any ko threat (the defender makes the first ko capture).
   * - Returns KO_B if the defense succeeds provided the defender has a ko threat
   *   which must be answered (the attacker makes the first ko capture).
   *
   * If GNU Go is compiled with `configure --enable-experimental-owl-ext'
   * then a return codes of GAIN is also possible.
   *
   * - Returns LOSS if the defense succeeds but another worm of the
   *   defender's is captured in during the defense. The location
   *   of the killed worm is returned through the *kworm field.
   *
   * The array goal marks the extent of the dragon. This must
   * be maintained during reading.
   */
  owl_defend (target, defense_point, certain, kworm) {
    const b = this.board
    let result = [];
    let owl = new LocalOwlData()
    let reading_nodes_when_called = this.get_reading_node_counter();
    let start = 0.0;
    let tactical_nodes;
    let move = [NO_MOVE];
    let wpos = [NO_MOVE];
    let wid = [MAX_GOAL_WORMS];

    result_certain = 1;
    if (this.worm[target].unconditional_status === dragon_status.DEAD){
      return 0;
    }

    if (this.search_persistent_owl_cache(routine_id.OWL_DEFEND, target, 0, 0, result, defense_point, kworm, certain)){
      return result;
    }

    // if (debug & DEBUG_OWL_PERFORMANCE)
    //   start = gg_cputime();

    // TRACE("owl_defend %1m\n", target);
    this.init_owl(owl, target, NO_MOVE, NO_MOVE, 1, null);
    this.owl_make_domains(owl, null);
    this.prepare_goal_list(target, owl, owl_goal_worm, goal_worms_computed, kworm, 1);
    result = this.do_owl_defend(target, move, wid, owl, 0);
    this.finish_goal_list(goal_worms_computed, wpos, owl_goal_worm, wid);
    tactical_nodes = this.get_reading_node_counter() - reading_nodes_when_called;

    // DEBUG(DEBUG_OWL_PERFORMANCE,
    //   "owl_defend %1m, result %d %1m (%d, %d nodes, %f seconds)\n",
    //   target, result, move, local_owl_node_counter,
    //   tactical_nodes, gg_cputime() - start);

    this.store_persistent_owl_cache(routine_id.OWL_DEFEND, target, 0, 0, result, move, wpos,
      result_certain, tactical_nodes, owl.goal, b.board[target]);

    if (defense_point){
      defense_point[0] = move;
    }
    if (kworm){
      kworm[0] = wpos;
    }
    if (certain){
      certain[0] = result_certain;
    }

    return result;
  },

  /* Static function containing the main recursive code for owl_defend. */
  do_owl_defend (str, move, wormid, owl, escape) {

  },
  owl_threaten_defense () {},
  owl_estimate_life () {},
  owl_determine_life () {},
  owl_find_relevant_eyespaces () {},
  modify_stupid_eye_vital_point () {},
  modify_eyefilling_move () {},
  owl_shapes () {},
  check_pattern_hard () {},
  init_pattern_list () {},
  close_pattern_list () {},
  dump_pattern_list () {},
  collect_owl_shapes_callbacks () {},
  valuate_combinable_pattern_chain () {},
  bdist () {},
  BETTER_PATTERN () {},
  pattern_list_prepare () {},
  pattern_list_build_heap () {},
  pattern_list_pop_heap_once () {},
  pattern_list_sink_heap_top_element () {},
  generate_cut_list () {},
  get_next_move_from_list () {},
  owl_shapes_callback () {},
  owl_add_move () {},

  /* Marks the dragons at apos and bpos. If only one dragon
   * needs marking, bpos should be passed as NO_MOVE.
   */
  owl_mark_dragon (apos, bpos, owl, new_dragons) {
    const color = b.board[apos];
    const b = this.board
    b.ASSERT1(bpos === NO_MOVE || b.board[bpos] === color, bpos);
    let pos;

    if (new_dragons === null) {
      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++)
        if (b.ON_BOARD(pos)) {
          if (this.is_same_dragon(pos, apos) || this.is_same_dragon(pos, bpos)){
            owl.goal[pos] = 1;
          }
          else {
            owl.goal[pos] = 0;
          }
        }
    }
    else {
      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
        if (b.ON_BOARD(pos)) {
          if (b.IS_STONE(b.board[pos])
            && (new_dragons[pos] === new_dragons[apos] || new_dragons[pos] === new_dragons[bpos])) {
            owl.goal[pos] = 1;
          }
          else{
            owl.goal[pos] = 0;
          }
        }
      }
    }

    owl.cumulative_goal = owl.goal.slice()
    owl.color = color;
    this.owl_mark_boundary(owl);
  },

  owl_mark_worm () {},

  /* Mark the boundary strings of the dragon. A boundary string is marked 2
   * if it adjoins a friendly live dragon, 1 otherwise.
   */
  owl_mark_boundary (owl) {
    const b= this.board
    const color = owl.color;
    const other = b.OTHER_COLOR(color);
    let k;
    let pos;

    owl.boundary.splice(0, owl.boundary.length)
    owl.neighbors.splice(0, owl.neighbors.length)

    /* Find all friendly neighbors of the dragon in goal. */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] === color && owl.goal[pos]) {
        for (k = 0; k < 4; k++) {
          if (b.board[pos + b.delta[k]] === colors.EMPTY
            && b.board[pos + 2 * b.delta[k]] === color
            && !owl.neighbors[pos + 2 * b.delta[k]]) {
            b.mark_string(pos + 2 * b.delta[k], owl.neighbors, 1);
          }
        }

        for (; k < 8; k++) {
          let pos2 = pos + b.delta[k];

          if (b.board[pos2] === color && !owl.neighbors[pos2]
          && (b.board[b.SOUTH(Math.min(pos, pos2))] === colors.EMPTY
            || b.board[b.NORTH(Math.max(pos, pos2))] === colors.EMPTY)) {
            b.mark_string(pos2, owl.neighbors, 1);
          }
        }
      }
    }

    /* First find all boundary strings (including those adjacent not to
     * the goal dragon, but one of its neighbors).
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] === other && !owl.boundary[pos]) {
        for (k = 0; k < 8; k++) {
          if (b.ON_BOARD(pos + b.delta[k]) && (owl.goal[pos + b.delta[k]] || owl.neighbors[pos + b.delta[k]])) {
            b.mark_string(pos, owl.boundary, 1);
            break;
          }
        }
      }
    }

    /* Upgrade the mark of a boundary string if it adjoins a safe
     * friendly dragon.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (owl.boundary[pos] === 1) {
        for (k = 0; k < 8; k++) {
          let pos2 = pos + b.delta[k];
          if (b.board[pos2] === color && !owl.goal[pos2]
          && !owl.neighbors[pos2]
          && ((this.dragon[pos2].crude_status !== dragon_status.DEAD && b.countstones(pos2) > 2)
            || this.dragon[pos2].crude_status === dragon_status.ALIVE)) {
            b.mark_string(pos, owl.boundary, 2);
            break;
          }
        }
      }
    }

    /* During the owl reading, stones farther away may become parts of
     * the boundary. We mark those strings neighboring some other
     * friendly dragon with boundary value 2 right away, since we have
     * no mechanism for detecting this later.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++)
      if (b.board[pos] === other && owl.boundary[pos] === 0) {
      /* If a lunch has been amalgamated into a larger dragon, we
       * have to back out now.
       *
       * Notice that we assume that no stone of the attacking color
       * has been placed on the board with trymove() when this
       * function is called. Thus we can (mostly) trust the worm data for
       * stones of this color.
       */
      if (this.worm[pos].attack_codes[0] !== 0 && this.worm[pos].size !== this.dragon[pos].size){
        continue;
      }

      /* This can happen if called when stackp > 0 */
      if (this.dragon[pos].id === -1){
        continue;
      }

      for (k = 0; k < this.DRAGON2(pos).neighbors; k++) {
        let d = this.DRAGON2(pos).adjacent[k];
        let apos = this.dragon2[d].origin;

        if (b.board[apos] === color && !owl.goal[apos]) {
          owl.boundary[pos] = 2;
          break;
        }
      }
    }
  },

  /* Add the stone just played to the goal dragon if same_dragon is
   * SAME_DRAGON_CONNECTED. We also add all stones belonging to the same
   * generalized string to the goal. If same_dragon is
   * SAME_DRAGON_MAYBE_CONNECTED, we only add the stones if at least one
   * stone of the generalized string already was part of the goal. If
   * same_dragon is SAME_DRAGON_NOT_CONNECTED, we don't add any stones
   * at all.
   *
   * The SAME_DRAGON_ALL_CONNECTED case is like SAME_DRAGON_CONNECTED
   * but additionally all other own stones in the pattern suggesting the
   * move are also added to the goal.
   */
  owl_update_goal (pos, same_dragon, lunch, owl, semeai_call, pattern_data) {
    let stones = []
    let num_stones = [];
    let k;
    let do_add = 1;
    let save_count_variations = b.count_variations;
    const b = this.board

    /* Turn off sgf output during find_superstring(). */
    b.count_variations = 0;

    if (same_dragon === SAME_DRAGON_NOT_CONNECTED){
      num_stones = [b.findstones(pos, b.MAX_BOARD * b.MAX_BOARD, stones)]
    }
    else if (semeai_call){
      this.find_superstring_conservative(pos, num_stones, stones);
    }
    else{
      this.find_superstring(pos, num_stones, stones);
    }
    num_stones = num_stones[0]

    /* Turn sgf output back on. */
    // sgf_dumptree = save_sgf_dumptree;
    b.count_variations = save_count_variations;

    /* If same_dragon field is 1, only add if the played stone
     * clearly is in contact with the goal dragon.
     */
    if (same_dragon <= SAME_DRAGON_MAYBE_CONNECTED) {
      do_add = 0;
      for (k = 0; k < num_stones; k++){
        if (owl.goal[stones[k]] !== 0) {
          do_add = 1;
          break;
        }
      }
    }

    if (do_add){
      for (k = 0; k < num_stones; k++) {
        if (owl.goal[stones[k]] === 0) {
          owl.goal[stones[k]] = 2;
          owl.cumulative_goal[stones[k]] = 1;
        }
      }
    }

    /* If this move captures a lunch, we add all it's direct neighbours to the
     * goal.
     */
    if (!semeai_call && lunch !== NO_MOVE && b.board[lunch] !== colors.EMPTY) {
      let adj, adjs = []
      let k;
      adj = b.chainlinks(lunch, adjs);
      for (k = 0; k < adj; k++){
        if (!owl.goal[adjs[k]]) {
          b.mark_string(adjs[k], owl.goal, 2);
          b.mark_string(adjs[k], owl.cumulative_goal, 2);
        }
      }
    }

    /* Now we handle the SAME_DRAGON_ALL_CONNECTED case. The move has
     * already been added to the goal above, so it remains to find all
     * other friendly stones in the pattern and add them too. We do that
     * by a recursive call to this function in SAME_DRAGON_CONNECTED mode.
     * This is maybe not the most elegant technique, however.
     */
    if (same_dragon === SAME_DRAGON_ALL_CONNECTED) {
      b.ASSERT1(pattern_data !== null);
      for (k = 0; k < pattern_data.pattern.patlen; k++) {
        /* all the following stuff (currently) applies only at occupied cells */
        if (pattern_data.pattern.patn[k][1] !== ATT_O) {
          continue;
        }

        /* transform pattern real coordinate */
        let pos2 = AFFINE_TRANSFORM(pattern_data.pattern.patn[k][0], pattern_data.ll, pattern_data.anchor);

        if (!owl.goal[pos2]){
          this.owl_update_goal(pos2, SAME_DRAGON_CONNECTED, NO_MOVE, owl, semeai_call, pattern_data);
        }
      }
    }

    // if (1 && verbose)
    //   goaldump(owl.goal);
  },
  connected_components () {},
  owl_test_cuts () {},
  owl_update_boundary_marks () {},
  goaldump () {},
  componentdump () {},
  test_owl_attack_move () {},

  /* Add owl move reasons. This function should be called once during
   * genmove. It has to be called after semeai_move_reasons().
   */
  owl_reasons (color) {
    const b = this.board

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.IS_STONE(b.board[pos]) || this.dragon[pos].origin !== pos){
        continue;
      }

      if (this.dragon[pos].status === dragon_status.CRITICAL && this.DRAGON2(pos).owl_attack_point !== NO_MOVE) {
        if (b.board[pos] === color) {
          if (this.DRAGON2(pos).owl_defense_point !== NO_MOVE) {
            if (this.DRAGON2(pos).owl_defense_code === dragon_status.LOSS) {
              this.add_loss_move(this.DRAGON2(pos).owl_defense_point, pos, this.DRAGON2(pos).owl_defense_kworm);
              // DEBUG(DEBUG_OWL, "owl: %1m defends %1m with loss at move %d\n", this.DRAGON2(pos).owl_defense_point, pos, movenum+1);
            }
            else {
              this.add_owl_defense_move(this.DRAGON2(pos).owl_defense_point, pos, this.DRAGON2(pos).owl_defense_code);
              // DEBUG(DEBUG_OWL, "owl: %1m defends %1m at move %d\n", this.DRAGON2(pos).owl_defense_point, pos, movenum+1);
            }
          }
        }
        else { /* opponent's dragon */
          /* We don't want to add this move reason if the attacker
           * dies because the victim only formed a nakade shape.
           *
           * FIXME: This code overlaps heavily with some code in
           *	  examine_move_safety() in move_reasons.c. The caching
           *	  scheme should minimize the performance hit, but of course
           *	  it's unfortunate to have the code duplication.
           */
          let move = this.DRAGON2(pos).owl_attack_point;

          /* No worries if we catch something big. */
          if (this.dragon[pos].effective_size < 8) {
            /* Look through the neighbors of the victim for dragons of
             * our color. If we find at least one being thought alive
             * everything is ok. Otherwise we keep track of the
             * largest one for further examination.
             */
            let largest = 0;
            let k;
            let bpos = NO_MOVE;
            let kworm = [NO_MOVE];
            let safe = 0;
            for (k = 0; k < this.DRAGON2(pos).neighbors; k++) {
              let d = this.DRAGON2(pos).adjacent[k];
              if (this.DRAGON(d).color === color) {
                if (this.DRAGON(d).status === dragon_status.ALIVE) {
                  safe = 1;
                  break;
                }
                if (this.DRAGON(d).size > largest) {
                  bpos = this.dragon2[d].origin;
                  largest = this.DRAGON(d).size;
                }
              }
            }

            /* It may occasionally happen that no neighbor of our
             * color was found. Assume safe in that case.
             */
            if (bpos === NO_MOVE){
              safe = 1;
            }

            /* If not yet thought safe, ask the owl code whether the
             * owl attack defends the (largest) attacker.
             */
            if (!safe && this.owl_does_defend(move, bpos, kworm) !== codes.WIN) {
              // DEBUG(DEBUG_OWL, "owl: %1m attacks %1m at move %d, but the attacker dies.\n", move, pos, movenum+1);
              this.DRAGON2(pos).safety = dragon_status.INESSENTIAL;
              continue;
            }
          }

          /* If we've reached this far, it only remains to check the move
           * against semeai complications. */
          this.test_owl_attack_move(move, pos, this.DRAGON2(pos).owl_attack_kworm, this.DRAGON2(pos).owl_attack_code);
        }
      }
      else if (this.DRAGON2(pos).owl_status === dragon_status.DEAD
        && this.DRAGON2(pos).owl_threat_status === dragon_status.CAN_THREATEN_DEFENSE) {
        if (b.board[pos] === color && this.DRAGON2(pos).owl_defense_point !== NO_MOVE) {
          this.add_owl_defense_threat_move(this.DRAGON2(pos).owl_defense_point, pos, codes.WIN);
          // DEBUG(DEBUG_OWL, "owl: %1m threatens to defend %1m at move %d\n", this.DRAGON2(pos).owl_defense_point, pos, movenum+1);
        }
        if (b.board[pos] === color && this.DRAGON2(pos).owl_second_defense_point !== NO_MOVE
          && b.is_legal(this.DRAGON2(pos).owl_second_defense_point, color)) {
          this.add_owl_defense_threat_move(this.DRAGON2(pos).owl_second_defense_point, pos, codes.WIN);
          // DEBUG(DEBUG_OWL, "owl: %1m threatens to defend %1m at move %d\n", this.DRAGON2(pos).owl_second_defense_point, pos, movenum+1);
        }

        /* If the opponent can threaten to live, an attacking
         * move gets a small value to make sure it's really dead.
         */
        if (b.board[pos] === b.OTHER_COLOR(color)
          && this.DRAGON2(pos).owl_threat_status === dragon_status.CAN_THREATEN_DEFENSE
          && this.DRAGON2(pos).owl_attack_point !== NO_MOVE) {
          this.add_owl_prevent_threat_move(this.DRAGON2(pos).owl_attack_point, pos);
          // DEBUG(DEBUG_OWL, "owl: %1m prevents a threat against %1m at move %d\n", this.DRAGON2(pos).owl_attack_point, pos, movenum+1);
        }
      }
      else if (this.DRAGON2(pos).owl_status === dragon_status.ALIVE) {
        if (b.board[pos] === b.OTHER_COLOR(color)
          && this.DRAGON2(pos).owl_threat_status === dragon_status.CAN_THREATEN_ATTACK) {
          if (this.DRAGON2(pos).owl_attack_point !== NO_MOVE) {
            this.add_owl_attack_threat_move(this.DRAGON2(pos).owl_attack_point, pos, codes.WIN);
            // DEBUG(DEBUG_OWL, "owl: %1m threatens %1m at move %d\n", this.DRAGON2(pos).owl_attack_point, pos, movenum+1);
          }
          if (this.DRAGON2(pos).owl_second_attack_point !== NO_MOVE
            && b.is_legal(this.DRAGON2(pos).owl_second_attack_point, color)) {
            this.add_owl_attack_threat_move(this.DRAGON2(pos).owl_second_attack_point, pos, codes.WIN);
            // DEBUG(DEBUG_OWL, "owl: %1m threatens %1m at move %d\n", this.DRAGON2(pos).owl_second_attack_point, pos, movenum+1);
          }
        }
        else if (b.board[pos] === b.OTHER_COLOR(color)
          && this.DRAGON2(pos).owl_attack_point !== NO_MOVE
          && this.DRAGON2(pos).owl_attack_code === codes.GAIN) {
          this.add_owl_attack_move(this.DRAGON2(pos).owl_attack_point, pos, this.DRAGON2(pos).owl_attack_kworm, codes.GAIN);
          // DEBUG(DEBUG_OWL, "owl: %1m attacks %1m with gain at move %d\n", this.DRAGON2(pos).owl_attack_point, pos, movenum+1);
        }
        else if (b.board[pos] === color
          && this.DRAGON2(pos).owl_defense_point !== NO_MOVE
          && this.DRAGON2(pos).owl_defense_code === dragon_status.LOSS) {
          this.add_loss_move(this.DRAGON2(pos).owl_defense_point, pos, this.DRAGON2(pos).owl_defense_kworm);
          // DEBUG(DEBUG_OWL, "owl: %1m defends %1m with loss at move %d\n", this.DRAGON2(pos).owl_defense_point, pos, movenum+1);
        }
        else if (b.board[pos] === color
          && this.DRAGON2(pos).owl_attack_point !== NO_MOVE
          && this.DRAGON2(pos).owl_attack_code === codes.GAIN
          && this.DRAGON2(pos).owl_defense_code === codes.WIN
          && this.DRAGON2(pos).owl_defense_point !== NO_MOVE) {
          this.add_owl_defense_move(this.DRAGON2(pos).owl_defense_point, pos, this.DRAGON2(pos).owl_defense_code);
          // DEBUG(DEBUG_OWL, "owl: %1m defends %1m against possible loss at move %d\n", this.DRAGON2(pos).owl_defense_point, pos, movenum+1);
        }

        /* The owl code found the friendly dragon alive, but was uncertain,
         * and an extra point of defense was found, so this might
         * be a good place to play.
         */
        else if (b.board[pos] === color
          && !this.DRAGON2(pos).owl_attack_certain
          && this.DRAGON2(pos).owl_defense_certain
          && b.ON_BOARD(this.DRAGON2(pos).owl_defense_point)) {
          this.add_owl_uncertain_defense_move(this.DRAGON2(pos).owl_defense_point, pos);
          // DEBUG(DEBUG_OWL, "owl: %1m defends the uncertain dragon at %1m at move %d\n", this.DRAGON2(pos).owl_defense_point, pos, movenum+1);
        }
      }

      /* The owl code found the dragon dead, but was uncertain,
       * and an extra point of attack was found, so this might
       * be a good place to play.
       */
      else if (this.DRAGON2(pos).owl_status === dragon_status.DEAD
        && b.board[pos] === b.OTHER_COLOR(color)
        && !this.DRAGON2(pos).owl_attack_certain
        && b.ON_BOARD(this.DRAGON2(pos).owl_attack_point)) {
        this.add_owl_uncertain_defense_move(this.DRAGON2(pos).owl_attack_point, pos);
        // DEBUG(DEBUG_OWL, "owl: %1m might defend the uncertain dragon at %1m at move %d\n", DRAGON2(pos).owl_attack_point, pos, movenum+1);
      }
    }
  },

  /* Use the owl code to determine whether the move at (move) makes
   * the dragon at (target) owl safe. This is used to test whether
   * tactical defenses are strategically viable and whether a vital eye
   * point does kill an owl critical dragon.
   *
   * Should be called only when stackp==0.
   */
  owl_does_defend (move, target, kworm) {
    const b = this.board
    let color = b.board[target];
    let result = [0];
    let owl = new LocalOwlData()

    let reading_nodes_when_called = this.get_reading_node_counter();
    let tactical_nodes;
    let wpos = [NO_MOVE];
    let wid = [MAX_GOAL_WORMS];
    let start = 0.0;

    // if (debug & DEBUG_OWL_PERFORMANCE)
    //   start = gg_cputime();

    if (this.worm[target].unconditional_status === dragon_status.DEAD){
      return 0;
    }

    let origin = this.dragon[target].origin;
    // TRACE("owl_does_defend %1m %1m(%1m)\n", move, target, origin);

    if (this.search_persistent_owl_cache(routine_id.OWL_DOES_DEFEND, move, target, 0, result, kworm, null, null)){
      return result;
    }

    if (b.trymove(move, color, "owl_does_defend", target)) {
      /* Check if a compatible owl_attack() is cached. */
      if (this.search_persistent_owl_cache(routine_id.OWL_ATTACK, origin, 0, 0, result, null, kworm, null)) {
        b.popgo();
        return REVERSE_RESULT(result);
      }

      /*
       * FIXME: (move) will be added to the goal dragon although we
       * do not know whether it is really connected.
       */
      this.init_owl(owl, target, NO_MOVE, move, 1, null);
      this.prepare_goal_list(target, owl, owl_goal_worm, goal_worms_computed, kworm, 0);
      let acode = this.do_owl_attack(target, null, wid, owl, 0);
      this.finish_goal_list(goal_worms_computed, wpos, owl_goal_worm, wid);
      result = REVERSE_RESULT(acode);
      b.popgo();
    }
    else{
      return 0;  /* Don't cache anything in this case. */
    }

    tactical_nodes = this.get_reading_node_counter() - reading_nodes_when_called;

    // DEBUG(DEBUG_OWL_PERFORMANCE, "owl_does_defend %1m %1m(%1m), result %d (%d, %d nodes, %f seconds)\n",
    //   move, target, origin, result, local_owl_node_counter, tactical_nodes, gg_cputime() - start);

    this.store_persistent_owl_cache(routine_id.OWL_DOES_DEFEND, move, target, 0, result, wpos, 0, 0, tactical_nodes, owl.goal, b.board[target]);

    if (kworm){
      kworm[0] = wpos;
    }
    return result;
  },

  owl_confirm_safety () {},
  owl_does_attack () {},
  owl_connection_defends () {},


  /* This function attempts to make a list of dead strings
   * which may be relevant to the life of the goal dragon.
   * Such strings are called owl lunches. They are ignored
   * (treated as invisible) during the running of make_domains.
   *
   * In certain cases we also need to identify tactically safe strings
   * which should be included in the eyespace, e.g. in this position:
   *
   * -------
   * OXXOOXO
   * OX.O.XO
   * OXX.XXO
   * OOXXXOO
   * .OOOOO.
   *
   * The three O stones cannot be captured, but they can't live
   * independently without capturing the surrounding stones. We call
   * such stones INESSENTIAL and identify them by the condition that for
   * each liberty of the corresponding superstring, the following must
   * hold:
   *
   * 1. At least one neighbor of the liberty is the goal dragon.
   * 2. No neighbor of the liberty is the same color as the tested string,
   *    unless part of the same superstring.
   * 3. No neighbor of the liberty of the same color as the goal dragon
   *    does not belong to the goal dragon.
   * 4. No neighbor of the liberty belonging to the goal dragon can be
   *    tactically captured.
   *
   * There is a weakness with this characterization though, which can be
   * seen in this position:
   *
   * --------
   * OX..OOX.
   * OX.X.XOO
   * OX.XX.O.
   * O.XXOOO.
   * .OOOO...
   *
   * The two O stones intruding in X's eyespace cannot be tactically
   * captured and their liberties satisfy the requirements above. Still
   * it doesn't make any sense to count those stones as
   * inessential. Therefore we add another requirement on the stones
   * themself:
   *
   * 5. No neighbor of the stones does not belong to the goal or can be
   *    tactically captured.
   *
   * A second weakness can be noticed in this position:
   *
   * |OOOO.
   * |XXXO.
   * |O.XOO
   * |OXXXO
   * |.O.XO
   * +-----
   *
   * The white stones in the corner should qualify as inessential but
   * the corner liberty doesn't satisfy requirement 1. Therefore we add
   * an alternative requirement:
   *
   * 1b. The liberty is a topologically false eye with respect to the
   *     goal dragon.
   *
   * This is not quite good enough though, as shown in this position:
   *
   * ----------
   * OX.X.OO...
   * OXX.OOX.O.
   * O.XXXXX.O.
   * OOOOOOOOO.
   *
   * The four O stones are regarded as inessential after inclusion of
   * rule 1b, which is clearly inappropriate. To solve this problem we
   * modify the rule:
   *
   * 1b'. The liberty is a topologically false eye with respect to the
   *      goal dragon and is adjacent to no empty vertex.
   */
  owl_find_lunches (owl) {
    const b = this.board
    const color = owl.color;
    const other = b.OTHER_COLOR(color);

    let k;
    let pos;
    let lunches = 0;
    let prevlunch;
    let lunch;
    let acode = [];
    let apos = [];
    let dcode = [];
    let dpos = [];
    let already_checked = []

    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    let save_count_variations = b.count_variations;

    // sgf_dumptree = null;
    b.count_variations = 0;

    for (prevlunch = 0; prevlunch < MAX_LUNCHES; prevlunch++){
      owl.lunch[prevlunch] = NO_MOVE;
    }
    // memset(owl.inessential, 0, sizeof(owl.inessential));
    // memset(already_checked, 0, sizeof(already_checked));
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] == color && owl.goal[pos]) {
        /* Loop over the eight neighbors. */
        for (k = 0; k < 8; k++) {
          let pos2 = pos + b.delta[k];

          /* If the immediate neighbor is empty, we look two steps away. */
          if (k < 4 && b.board[pos2] === colors.EMPTY){
            pos2 += b.delta[k];
          }

          if (b.board[pos2] !== other){
            continue;
          }

          lunch = b.find_origin(pos2);
          if (already_checked[lunch]){
            continue;
          }
          already_checked[lunch] = 1;

          this.attack_and_defend(lunch, acode, apos, dcode, dpos);
          if (acode[0] !== 0) {
            owl.lunch[lunches] = lunch;
            owl.lunch_attack_code[lunches]  = acode[0];
            owl.lunch_attack_point[lunches] = apos[0];
            owl.lunch_defend_code[lunches]  = dcode[0];
            b.ASSERT1(b.board[apos] === colors.EMPTY, lunch);
            if (dcode !== 0) {
              owl.lunch_defense_point[lunches] = dpos[0];
              b.ASSERT1(b.board[dpos] === colors.EMPTY, lunch);
            }
            else{
              owl.lunch_defense_point[lunches] = NO_MOVE;
            }
            lunches++;
            if (lunches === MAX_LUNCHES) {
              // sgf_dumptree = save_sgf_dumptree;
              // count_variations = save_count_variations;
              owl.lunches_are_current = 1;
              return;
            }
          }
          else if (!owl.inessential[lunch]) {
            /* Test for inessentiality. */
            let adjs = []
            let num_stones = [];
            let stones = []
            let liberties = [];
            let libs = []
            let r;
            let essential = 0;
            let superstring = []

            /* First check the neighbors of the string. */
            let adj = b.chainlinks(lunch, adjs);
            for (r = 0; r < adj; r++) {
              if (!owl.goal[adjs[r]] || this.attack(adjs[r], null) !== 0) {
                essential = 1;
                break;
              }
            }

            if (essential){
              continue;
            }

            this.find_superstring_stones_and_liberties(lunch, num_stones, stones, liberties, libs, 0);

            // memset(superstring, 0, sizeof(superstring));
            for (r = 0; r < num_stones[0]; r++){
              superstring[stones[r]] = 1;
            }

            for (r = 0; r < liberties[0]; r++) {
              let bpos = libs[r];
              let goal_found = 0;
              let s;

              for (s = 0; s < 4; s++) {
                let cpos = bpos + this.delta[s];

                if (!this.ON_BOARD(cpos))
                  continue;
                if (this.board[cpos] === color) {
                  if (this.attack(cpos, null) !== 0) {
                    essential = 1;
                    break;
                  }
                  else if (owl.goal[cpos])
                    goal_found = 1;
                  else {
                    essential = 1;
                    break;
                  }
                }
                else if (this.board[cpos] === other && !superstring[cpos]) {
                  essential = 1;
                  break;
                }
              }
              if (!goal_found) {
                /* Requirement 1 not satisfied. Test requirement 1b.
                 * N.B. This is a simplified topological eye test.
                 * The simplification may be good, bad, or neutral.
                 */
                let off_board = 0;
                let diagonal_goal = 0;
                for (s = 4; s < 8; s++) {
                  if (!b.ON_BOARD(bpos + b.delta[s])){
                    off_board++;
                  }
                  else if (owl.goal[bpos + b.delta[s]]){
                    diagonal_goal++;
                  }
                }
                if (diagonal_goal + (off_board >= 2) < 2){
                  essential = 1;
                }
                else {
                  /* Check that the liberty is adjacent to no empty
                   * vertex, as required by 1b'.
                   */
                  for (s = 0; s < 4; s++) {
                    if (b.board[bpos + b.delta[s]] === colors.EMPTY) {
                      essential = 1;
                      break;
                    }
                  }
                }
              }

              if (essential){
                break;
              }
            }

            if (!essential) {
              // TRACE("Inessential string found at %1m.\n", lunch);
              for (r = 0; r < num_stones; r++){
                owl.inessential[stones[r]] = 1;
              }
            }
          }
        }
      }
    }

    owl.lunches_are_current = 1;
    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;
  },
  improve_lunch_attack () {},
  improve_lunch_defense () {},


  /* Wrapper for make domains. The second set of owl data is optional.
   * Use a null pointer if it is not needed. Otherwise, make_domains
   * is run separately for the two owl data, but information about
   * tactically dead lunches is used from *both* sources through
   * the owl_lively() calls.
   */
  owl_make_domains (owla, owlb) {
    /* We need to set this so that owl_lively() can be used. */
    let black_eye = null;
    let white_eye = null;

    current_owl_data = owla;
    other_owl_data = owlb;

    if (!owla.lunches_are_current){
      this.owl_find_lunches(owla);
    }
    if (owla.color === colors.BLACK){
      black_eye = owla.my_eye;
    }
    else{
      white_eye = owla.my_eye;
    }

    if (owlb) {
      this.board.ASSERT1(owla.color === this.board.OTHER_COLOR(owlb.color));
      if (!owlb.lunches_are_current){
        this.owl_find_lunches(owlb);
      }
      if (owlb.color === colors.BLACK){
        black_eye = owlb.my_eye;
      }
      else {
        white_eye = owlb.my_eye;
      }
    }
    this.make_domains(black_eye, white_eye, 1);
  },


  /* True unless (pos) is EMPTY or occupied by a lunch for the goal dragon.
   * Used during make_domains (see optics.c: lively macro). A ``lively''
   * worm is one that might be alive, hence cannot be ignored in
   * determining eye spaces.
   */
  owl_lively(pos){
    const b = this.board
    let lunch;
    b.ASSERT_ON_BOARD1(pos);

    if (b.board[pos] === colors.EMPTY){
      return 0;
    }
    let origin = b.find_origin(pos);

    /* When reading a semeai there is a second set of owl data to consider.
     * Strings of the second owl are considered lively no matter what,
     * since declaring such a string dead prematurely can prevent the
     * semeai code from finishing its job.
     *
     * On the other hand a friendly string which is a lunch of the
     * other dragon and can't be saved is not lively.
     */
    if (other_owl_data) {

      if (include_semeai_worms_in_eyespace && other_owl_data.goal[pos]){
        return 0;
      }

      if (other_owl_data.goal[pos] && !this.semeai_trust_tactical_attack(pos)){
        return 1;
      }
      /* FIXME: Shouldn't we check other_owl_data.inessential[origin] here? */
      for (lunch = 0; lunch < MAX_LUNCHES; lunch++){
        if (other_owl_data.lunch[lunch] === origin
          && other_owl_data.lunch_defense_point[lunch] === NO_MOVE){
          return 0;
        }
      }
    }

    /* Inessential stones are not lively. */
    if (current_owl_data.inessential[origin]){
      return 0;
    }

    /* Lunches that can't be saved are dead, so don't report them as lively. */
    for (lunch = 0; lunch < MAX_LUNCHES; lunch++) {
      if (current_owl_data.lunch[lunch] === origin
        && current_owl_data.lunch_defense_point[lunch] === NO_MOVE) {
        return 0;
      }
    }

    return 1;
  },

  owl_safe_move () {},
  owl_substantial () {},
  one_two_point () {},
  sniff_lunch () {},
  estimate_lunch_half_eye_bonus () {},
  estimate_lunch_eye_value () {},
  eat_lunch_escape_bonus () {},
  select_new_goal_origin () {},
  owl_topological_eye () {},
  vital_chain () {},
  compute_owl_escape_values () {},
  owl_escape_value () {},
  owl_goal_dragon () {},
  owl_eyespace () {},
  owl_big_eyespace () {},
  owl_mineye () {},
  owl_maxeye () {},
  owl_proper_eye () {},
  owl_eye_size () {},
  owl_lunch () {},
  owl_strong_dragon () {},
  owl_escape_route () {},

  /* This is a temporary solution. We want to be able to use the full
   * init_owl() also in owl_substantial.
   */
  reduced_init_owl (owl, at_bottom_of_stack) {
    if (at_bottom_of_stack){
      owl_stack_pointer = 0;
    } else {
      owl_stack_pointer++;
    }

    this.check_owl_stack_size();
    owl_stack[owl_stack_pointer] = owl
  },

  /* Initialize owl data. Set at_bottom_of_stack to 1 the first time you
   * call init_owl() and to 0 any following time (only relevant if you
   * need more than one set of owl data).
   */
  init_owl (owl, target1, target2, move, at_bottom_of_stack, new_dragons) {
    this.reduced_init_owl(owl, at_bottom_of_stack);

    local_owl_node_counter = 0;
    owl.lunches_are_current = 0;
    this.owl_mark_dragon(target1, target2, owl, new_dragons);
    if (move !== NO_MOVE){
      this.owl_update_goal(move, SAME_DRAGON_MAYBE_CONNECTED, NO_MOVE, owl, 0, null);
    }
    this.compute_owl_escape_values(owl);
  },

  check_owl_stack_size () {
    while (owl_stack_size <= owl_stack_pointer) {
      owl_stack_size++;
    }
  },

  do_push_owl () {},
  push_owl () {},
  pop_owl () {},

  /*
   * List worms in order to track captures during owl reading
   * (GAIN/LOSS codes)
   */
  list_goal_worms (owl, goal_worm) {
    const b = this.board
    let pos, k;
    let w = 0;

    for (k = 0; k < MAX_GOAL_WORMS; k++){
      goal_worm[k] = NO_MOVE;
    }

    for (pos = b.BOARDMIN; pos < b.BOARDMAX && w < MAX_GOAL_WORMS; pos++) {
      if (b.ON_BOARD(pos) && b.board[pos] && owl.goal[pos] === 1) {
        let origin = b.find_origin(pos);
        for (k = 0; k < w; k++){
          if (goal_worm[k] === origin){
            break;
          }
        }
        if (k === w){
          goal_worm[w++] = pos;
        }
      }
    }

    /* experimental: let's try to fill up the array with other neighboring
     * opponent worms
     */
    if (1 && (w > 0) && (w < MAX_GOAL_WORMS)) {
      pos = goal_worm[0];
      for (k = 0; k < this.DRAGON2(pos).neighbors && w < MAX_GOAL_WORMS; k++) {
        let ii;
        let d = this.DRAGON2(pos).adjacent[k];
        if (this.DRAGON(d).color !== owl.color){
          continue;
        }

        for (ii = b.BOARDMIN; ii < b.BOARDMAX && w < MAX_GOAL_WORMS; ii++){
          if (b.ON_BOARD(ii) && b.board[ii] && this.worm[ii].origin === ii && this.worm[ii].size >= 3 && this.dragon[ii].id === d){
            goal_worm[w++] = ii;
          }
        }
      }
    }

    return w;
  },

  prepare_goal_list (str, owl, list, flag, kworm, do_list) {
    this.gg_assert(flag !== null);

    if (kworm) {
      if (do_list){
        this.list_goal_worms(owl, list);
      }
      /* N.B. We cannot use sizeof(list) below because a formal array
       * parameter implicitly is converted to a pointer and sizeof(list)
       * thus equals sizeof(int *), which is not what we want.
       */
      // dragon_goal_worms[dragon[str].id], list, sizeof(dragon_goal_worms[dragon[str].id]));
      flag[0] = 1;
    }
    else{
      flag[0] = 0;
    }
  },

  finish_goal_list (flag, wpos, list, index) {
    this.gg_assert(!!flag);
    this.gg_assert(!!wpos);

    flag[0] = 0;
    if (index === MAX_GOAL_WORMS){
      wpos[0] = NO_MOVE;
    } else{
      wpos[0] = list[index];
    }
  },

  reset_owl_node_counter () {
    global_owl_node_counter = 0;
  },
  get_owl_node_counter () {
    return global_owl_node_counter
  }
}