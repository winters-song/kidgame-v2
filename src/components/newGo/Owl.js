import {codes, colors, NO_MOVE, PASS_MOVE} from "./Constants";
import {
  AFFINE_TRANSFORM,
  dragon_status,
  EyeData,
  EyeValue,
  HALF_EYE,
  HalfEyeData,
  REVERSE_RESULT,
  routine_id
} from "./Liberty";
import {
  ATT_not,
  ATT_O,
  attributeType,
  CLASS_a,
  CLASS_b,
  CLASS_B,
  CLASS_C,
  CLASS_c,
  CLASS_E, CLASS_n,
  CLASS_s, HAVE_CONSTRAINT
} from "./patterns/Patterns";
import {owl_attackpat_db} from "./patterns/owl_attackpat";
import {owl_defendpat_db} from "./patterns/owl_defendpat";
import {owl_vital_apat_db} from "./patterns/owl_vital_apat";
import {FP, HUGE_CONNECTION_DISTANCE} from "./ReadConnect";
import {HashData} from "./Hash";
import {gg_normalize_float2int} from "./GgUtils";

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

  my_eye = [] // EyeData
  /* array of half-eye data for use during owl reading */
  half_eye = [] // HalfEyeData

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

class OwlMoveData {

  pos = NO_MOVE;          /* move coordinate */
  value = -1;        /* value */
  name = null; /* name of the pattern suggesting the move */
  /* whether the move extends the dragon or not */
  same_dragon = SAME_DRAGON_CONNECTED;
  lunch = NO_MOVE;	    /* Position of a lunch, if applicable.*/
  escape = 0;       /* true if an escape pattern is matched */
  defense_pos;  /* defense coordinate for vital owl attack patterns. */
  cuts = new Array(MAX_CUTS).fill(NO_MOVE); /* strings of the goal that might get cut off */
  /* pointer to pattern data, used for SAME_DRAGON_ALL_CONNECTED */
  pattern_data = null;

  constructor(param) {
    Object.assign(this, param)
  }
}

const USE_BDIST = 1

class MatchedPatternData{
  move;
  value;
  ll;
  anchor;
  bdist;
  pattern;
  /* To link combinable patterns in chains. */
  next_pattern_index;
}

let matches_found
let found_matches = []

class MatchedPatternsListData {
  initialized;
  counter; 		/* Number of patterns in the list. */
  used;		/* How many patterns have already been used?*/
  list_size;
  pattern_list = []
  first_pattern_index = [];

  heap_num_patterns;
  pattern_heap;
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


/* Semeai worms are worms whose capture wins the semeai. */

const MAX_SEMEAI_WORMS = 20
let s_worms = 0;
let semeai_worms = [];
let important_semeai_worms = [];

/* Whether one color prefers to get a ko over a seki. */
let prefer_ko

const MAX_STORED_REASONS = 4
const MAX_SUBSTANTIAL_LIBS = 10


const clear_cut_list = (cuts) => {
  for (let i = 0; i < MAX_CUTS; i++){
    cuts[i] = NO_MOVE;
  }
}

export const Owl = {
  owl_analyze_semeai () {},

  /* Same as the function above with the addition that an arbitrary move
   * may be made before the analysis is performed.

      pointers: resulta, resultb, semeai_move, semeai_result_certain
   */
  owl_analyze_semeai_after_move (move, color, apos, bpos, resulta, resultb, semeai_move, owl,
                                 semeai_result_certain, recompute_dragons) {
    const b= this.board
    let ms = [];
    let w1, w2;
    let str;
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // let save_verbose = verbose;
    let dummy_resulta = [];
    let dummy_resultb = [];
    let dummy_semeai_move = [];
    // double start = 0.0;
    let reading_nodes_when_called = this.get_reading_node_counter();
    let nodes_used;
    let new_dragons = [];

    let owla = [new LocalOwlData()]
    let owlb = [new LocalOwlData()]
    let goal_hash;

    if (!resulta){
      resulta = dummy_resulta;
    }
    if (!resultb){
      resultb = dummy_resultb;
    }
    if (!semeai_move){
      semeai_move = dummy_semeai_move;
    }

    // if (debug & DEBUG_OWL_PERFORMANCE)
    //   start = gg_cputime();

    if (recompute_dragons) {
      if (b.tryko(move, color, "Recompute dragons for semeai.")) {
        this.compute_new_dragons(new_dragons);
        b.popgo();
      }
      else{
        recompute_dragons = 0;
      }
    }


    /* Look for owl substantial worms of either dragon adjoining
     * the other dragon. Capturing such a worm wins the semeai.
     * These are the semeai_worms. This code must come before
     * the owl_init() calls because the owl_substantial
     *
     * FIXME: The sentence above is unfinished.
     */
    s_worms = 0;
    // memset(ms, 0, sizeof(ms));
    for (w1 = this.first_worm_in_dragon(apos); w1 !== NO_MOVE; w1 = this.next_worm_in_dragon(w1)) {
      for (w2 = this.first_worm_in_dragon(bpos); w2 !== NO_MOVE; w2 = this.next_worm_in_dragon(w2)) {
        if (b.adjacent_strings(w1, w2) || b.have_common_lib(w1, w2, null)) {
          b.mark_string(w1, ms, 1);
          b.mark_string(w2, ms, 1);
        }
      }
    }

    // sgf_dumptree = null;
    // if (verbose > 0)
    //   verbose--;
    for (str = b.BOARDMIN; str < b.BOARDMAX; str++){

      if (b.ON_BOARD(str) && ms[str] && this.worm[str].origin === str) {
        let adj;
        let adjs = [];
        let k;
        let adjacent_to_outside = 0;

        /* Is the string adjacent to a living dragon outside the semeai?
         * In that case it's important to attack/defend it for the life
         * of the opponent.
         *
         * FIXME: Checking crude_status here isn't quite appropriate but
         * owl_status is not always computed and status itself is unsafe
         * since it might change before later calls to this code, e.g.
         * when checking for blunders.
         *
         * Not checking for aliveness at all gives problems in e.g.
         * ld_owl:302 where S19 is a separate dragon and R19 should not
         * be considered critically important. What we really would like
         * to determine is whether it's outside the semeai, however.
         */
        adj = b.chainlinks(str, adjs);
        for (k = 0; k < adj; k++) {
          if (!this.is_same_dragon(adjs[k], apos)
            && !this.is_same_dragon(adjs[k], bpos)
            && this.dragon[adjs[k]].crude_status === dragon_status.ALIVE){
            adjacent_to_outside = 1;
          }
        }

        if ((adjacent_to_outside || b.countstones(str) > 6) && s_worms < MAX_SEMEAI_WORMS) {
          important_semeai_worms[s_worms] = 1;
          semeai_worms[s_worms++] = str;
          // DEBUG(DEBUG_SEMEAI, "important semeai worm: %1m\n", str);
        }
        else if (this.owl_substantial(str) && s_worms < MAX_SEMEAI_WORMS) {
          important_semeai_worms[s_worms] = 0;
          semeai_worms[s_worms++] = str;
          // DEBUG(DEBUG_SEMEAI, "semeai worm: %1m\n", str);
        }
      }
    }
    // verbose = save_verbose;
    // sgf_dumptree = save_sgf_dumptree;

    b.ASSERT1(b.board[apos] === b.OTHER_COLOR(b.board[bpos]), apos);
    // count_variations = 1;
    // if (move === PASS_MOVE){
    //   DEBUG(DEBUG_SEMEAI, "owl_analyze_semeai: %1m vs. %1m\n", apos, bpos);
    // }
    // else{
    //   DEBUG(DEBUG_SEMEAI, "owl_analyze_semeai_after_move %C %1m: %1m vs. %1m\n",color, move, apos, bpos);
    // }


    if (owl) {
      if (recompute_dragons) {
        this.init_owl(owla[0], apos, NO_MOVE, NO_MOVE, 1, new_dragons);
        this.init_owl(owlb[0], bpos, NO_MOVE, NO_MOVE, 0, new_dragons);
      }
      else {
        this.init_owl(owla[0], apos, NO_MOVE, NO_MOVE, 1, null);
        this.init_owl(owlb[0], bpos, NO_MOVE, NO_MOVE, 0, null);
      }
      this.owl_make_domains(owla[0], owlb[0]);
    }
    else {
      this.reduced_init_owl(owla[0], 1);
      this.reduced_init_owl(owlb[0], 0);
      local_owl_node_counter = 0;
      this.owl_mark_worm(apos, NO_MOVE, owla);
      this.owl_mark_worm(bpos, NO_MOVE, owlb);
    }

    result_certain = 1;

    let temp = b.hash.goal_to_hashvalue(owla.goal);
    goal_hash = b.hash.goal_to_hashvalue(owlb.goal);
    HashData.xor(goal_hash, temp);

    if (owl && this.search_persistent_semeai_cache(routine_id.ANALYZE_SEMEAI,
      apos, bpos, move, color, goal_hash, resulta, resultb, semeai_move, semeai_result_certain)) {
      // if (move === PASS_MOVE) {
      //   DEBUG(DEBUG_OWL_PERFORMANCE,
      //     "analyze_semeai %1m vs. %1m, result %d %d %1m (cached)\n",
      //     apos, bpos, *resulta, *resultb, *semeai_move);
      // }
      // else {
      //   DEBUG(DEBUG_OWL_PERFORMANCE,
      //     "analyze_semeai_after_move %C %1m: %1m vs. %1m, result %d %d %1m (cached)\n",
      //     color, move, apos, bpos, *resulta, *resultb, *semeai_move);
      // }
      return;
    }

    /* In some semeai situations one or both players have the option to
     * choose between seki and ko for the life and death of both. In
     * general this choice depends on the ko threat situation, the
     * overall score, and the strategical effects on surrounding
     * dragons, but we don't try to correctly estimate this. Instead we
     * make the reasonable assumption that if one dragon is
     * substantially smaller than the other dragon, ko is to be
     * preferred for the smaller dragon and seki for the larger dragon.
     *
     * prefer_ko can be either WHITE, BLACK, or colors.EMPTY and tells which
     * color, if any, prefers to get ko.
     */
    if (this.dragon[apos].size <= 5 && this.dragon[bpos].size > 3 * this.dragon[apos].size){
      prefer_ko = b.board[apos];
    }
    else if (this.dragon[bpos].size <= 5 && this.dragon[apos].size > 3 * this.dragon[bpos].size){
      prefer_ko = b.board[bpos];
    }
    else{
      prefer_ko = colors.EMPTY;
    }

    if (move === PASS_MOVE){
      this.do_owl_analyze_semeai(apos, bpos, owla, owlb, resulta, resultb, semeai_move, 0, owl);
    }
    else {
      this.semeai_trymove_and_recurse(bpos, apos, owlb, owla, owl,
        move, color, 1, 0, "mandatory move",
        SAME_DRAGON_MAYBE_CONNECTED, null, NO_MOVE, semeai_move, resultb, resulta);
      resulta[0] = REVERSE_RESULT(resulta[0]);
      resultb[0] = REVERSE_RESULT(resultb[0]);
    }

    nodes_used = this.get_reading_node_counter() - reading_nodes_when_called;
    // if (move === PASS_MOVE) {
    //   DEBUG(DEBUG_OWL_PERFORMANCE,
    //     "analyze_semeai %1m vs. %1m, result %d %d %1m (%d, %d nodes, %f seconds)\n",
    //     apos, bpos, *resulta, *resultb, *semeai_move, local_owl_node_counter,
    //     nodes_used, gg_cputime() - start);
    // }
    // else {
    //   DEBUG(DEBUG_OWL_PERFORMANCE,
    //     "analyze_semeai_after_move %C %1m: %1m vs. %1m, result %d %d %1m (%d, %d nodes, %f seconds)\n",
    //     color, move, apos, bpos, *resulta, *resultb, *semeai_move,
    //     local_owl_node_counter,
    //     nodes_used, gg_cputime() - start);
    // }

    if (semeai_result_certain){
      semeai_result_certain[0] = result_certain;
    }

    if (owl){
      this.store_persistent_semeai_cache(routine_id.ANALYZE_SEMEAI, apos, bpos, move, color,
      goal_hash, resulta[0], resultb[0], semeai_move[0], result_certain, nodes_used, owla.goal, owlb.goal);
    }
  },

  /* It is assumed that the 'a' player moves first, and
   * determines the best result for both players. The
   * parameter "pass" is 1 if the opponent's last move is
   * pass. In this case, if no move is found but the genus
   * is less than 2, then the position is declared seki.
   *
   * If a move is needed to get this result, then (*move) is
   * the location, otherwise this field returns PASS.
   */
/*  pointers: resulta, resultb, move */
  do_owl_analyze_semeai (apos, bpos, owla, owlb, resulta, resultb, move, pass, owl_phase) {
    const b = this.board
    const color = b.board[apos];
    const other = b.OTHER_COLOR(color);

    let vital_defensive_moves = [];
    let vital_offensive_moves = [];
    let shape_defensive_moves = [];
    let shape_offensive_moves = [];

    let shape_offensive_patterns = new MatchedPatternsListData()
    let shape_defensive_patterns = new MatchedPatternsListData()
    let moves = [];

    let outside_liberty = new OwlMoveData();
    let common_liberty = new OwlMoveData();
    let backfill_outside_liberty = new OwlMoveData();
    let backfill_common_liberty = new OwlMoveData();

    let safe_outside_liberty_found = 0;
    let safe_common_liberty_found = 0;
    let riskless_move_found = 0;
    let mw = [];
    let k;
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    let save_count_variations = b.count_variations;
    let move_value;
    let best_resulta = 0;
    let best_resultb = 0;
    let best_move = 0;
    let best_move_name
    let this_resulta = -1;
    let this_resultb = -1;
    let xpos = [];
    let value1 = [];
    let value2 = [];
    // let this_variation_number = b.count_variations - 1;
    let you_look_alive = 0;
    let I_look_alive = 0;
    let dummy_move = [];
    let tested_moves;
    let critical_semeai_worms = [];
    let sworm;
    let we_might_be_inessential;
    let probable_eyes_a = new EyeValue()
    let probable_eyes_b = new EyeValue()
    let dummy_eyes = new EyeValue()
    let I_have_more_eyes;

    // SETUP_TRACE_INFO2("do_owl_analyze_semeai", apos, bpos);

    if (!move){
      move = dummy_move;
    }

    b.ASSERT1(b.board[apos] === owla.color, apos);
    b.ASSERT1(b.board[bpos] === owlb.color, bpos);

    apos = b.find_origin(apos);
    bpos = b.find_origin(bpos);

    if (b.stackp <= this.semeai_branch_depth && owl_phase
      && this.tt_get(this.ttable, routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, null,
      value1, value2, xpos) === 2) {
      // TRACE_CACHED_RESULT2(value1, value2, xpos);
      move[0] = xpos[0];

      resulta[0] = value1[0];
      resultb[0] = value2[0];

      // TRACE("%oVariation %d: %1m %1m %s %s %1m (cached) ",
      //   this_variation_number, apos, bpos, result_to_string(*resulta), result_to_string(*resultb), *move);
      // SGFTRACE_SEMEAI(xpos, *resulta, *resultb, "cached");
      return;
    }

    global_owl_node_counter++;
    local_owl_node_counter++;

    shape_offensive_patterns.initialized = 0;
    shape_defensive_patterns.initialized = 0;

    outside_liberty.pos = NO_MOVE;
    common_liberty.pos = NO_MOVE;
    backfill_outside_liberty.pos = NO_MOVE;
    backfill_common_liberty.pos = NO_MOVE;
    for (k = 0; k < MAX_SEMEAI_MOVES; k++) {
      moves[k] = new OwlMoveData()
    }
    b.ASSERT1(other === b.board[bpos], bpos);
    // memset(mw, 0, sizeof(mw));

    /* Turn off the sgf file and variation counting. */
    // sgf_dumptree = null;
    // count_variations = 0;

    /* Look for a tactical attack. We seek a semeai worm of owlb which
     * can be attacked. If such exists and is considered critical, we
     * declare victory. If it's not considered critical we add the
     * attacking move as a high priority move to try.
     */

    let upos = [];

    for (sworm = 0; sworm < s_worms; sworm++) {
      critical_semeai_worms[sworm] = 0;
      if (b.board[semeai_worms[sworm]] === other) {
        let acode = this.attack(semeai_worms[sworm], upos);
        if (acode === codes.WIN
          && this.semeai_trust_tactical_attack(semeai_worms[sworm]) && important_semeai_worms[sworm]) {
          resulta[0] = codes.WIN;
          resultb[0] = codes.WIN;
          move[0] = upos[0];
          // sgf_dumptree = save_sgf_dumptree;
          // count_variations = save_count_variations;
          // SGFTRACE_SEMEAI(upos, codes.WIN, codes.WIN, "tactical win found");
          this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp,
            move, upos, codes.WIN, codes.WIN);
        }
        else if (acode !== 0 && this.find_defense(semeai_worms[sworm], null)) {
          critical_semeai_worms[sworm] = 1;
          this.owl_add_move(moves, upos[0], 105, "attack semeai worm",
            SAME_DRAGON_MAYBE_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_SEMEAI_MOVES, null);
          // TRACE("Added %1m %d (-1)\n", upos, 105);
        }
        else if (acode === codes.WIN && important_semeai_worms[sworm]) {
          this.owl_add_move(moves, upos[0], 100, "attack semeai worm",
            SAME_DRAGON_MAYBE_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_SEMEAI_MOVES, null);
          // TRACE("Added %1m %d (-1)\n", upos, 100);
        }
      }
    }
    /* Look for a tactical rescue. If a semeai worm of owla is tactically
     * threatened, try to save it.
     */

    we_might_be_inessential = 1;
    for (sworm = 0; sworm < s_worms; sworm++)
      if (b.board[semeai_worms[sworm]] === color) {
        if (important_semeai_worms[sworm]){
          we_might_be_inessential = 0;
        }

        if (this.attack(semeai_worms[sworm], null) && this.find_defense(semeai_worms[sworm], upos)) {
          critical_semeai_worms[sworm] = 1;
          this.owl_add_move(moves, upos[0], 85, "defend semeai worm", SAME_DRAGON_MAYBE_CONNECTED,
            NO_MOVE, 0, NO_MOVE, MAX_SEMEAI_MOVES, null);
          // TRACE("Added %1m %d (0)\n", upos, 85);
        }
      }

    /* We generate the candidate moves. During the early stages of
     * the semeai, there may be moves to expand or shrink the
     * eyespaces of the two dragons. During the later stages, the
     * picture is simplified and reading the semeai is a matter 
     * of filling liberties until one of the dragons may be removed,
     * or a seki results. The first stage we call the owl phase.
     */
    if (!owl_phase) {
      probable_eyes_a.set([0,0,0,0])
      probable_eyes_b.set([0,0,0,0])
      I_have_more_eyes = 0;
    }
    else {
      /* First the vital moves. These include moves to attack or
       * defend the eyespace (e.g. nakade, or hane to reduce the
       * number of eyes) or moves to capture a lunch. 
       */
      let eyemin_a = [];
      let eyemin_b = [];
      let eyemax_a = [];
      let eyemax_b = [];
      let live_reasona = [];
      let live_reasonb = [];

      /* We do not wish for any string of the 'b' dragon to be 
       * counted as a lunch of the 'a' dragon since owl_determine_life 
       * can give a wrong result in the case of a semeai. So we eliminate 
       * such lunches.
       */

      this.owl_find_lunches(owla);
      this.owl_find_lunches(owlb);
      for (k = 0; k < MAX_LUNCHES; k++) {
        if (owla.lunch[k] !== NO_MOVE && owlb.goal[owla.lunch[k]]) {
          owla.lunch[k] = NO_MOVE;
        }
      }
      for (k = 0; k < MAX_LUNCHES; k++) {
        if (owlb.lunch[k] !== NO_MOVE && owla.goal[owlb.lunch[k]]) {
          owlb.lunch[k] = NO_MOVE;
        }
      }

      if (this.owl_estimate_life(owla, owlb, vital_defensive_moves,
        live_reasona, 0, probable_eyes_a, eyemin_a, eyemax_a)){
        I_look_alive = 1;
      }
      else if (b.stackp > 2 && this.owl_escape_route(owla) >= 5) {
        live_reasona[0] = "escaped";
        I_look_alive = 1;
      }

      if (this.owl_estimate_life(owlb, owla, vital_offensive_moves,
        live_reasonb, 1, probable_eyes_b, eyemin_b, eyemax_b)){
        you_look_alive = 1;
      }
      else if (b.stackp > 2 && this.owl_escape_route(owlb) >= 5) {
        live_reasonb[0] = "escaped";
        you_look_alive = 1;
      }

      // if (verbose) {
      //   gprintf("probable_eyes_a: %s eyemin: %d eyemax: %d", eyevalue_to_string(&probable_eyes_a), eyemin_a, eyemax_a);
      //   if (I_look_alive)
      //     gprintf("%o I look alive (%s)", live_reasona);
      //   gprintf("%o\n");
      //   gprintf("probable_eyes_b: %s eyemin: %d eyemax: %d", eyevalue_to_string(&probable_eyes_b), eyemin_b, eyemax_b);
      //   if (you_look_alive)
      //     gprintf("%o you look alive(%s)", live_reasonb);
      //   gprintf("%o\n");
      // }

      /* Stop here if both look certain to live. */
      if (I_look_alive && you_look_alive) {
        resulta[0] = codes.WIN;
        resultb[0] = 0;
        move[0] = PASS_MOVE;
        // sgf_dumptree = save_sgf_dumptree;
        // count_variations = save_count_variations;
        // TRACE("Both live\n");
        // SGFTRACE_SEMEAI(PASS_MOVE, WIN, 0, "Both live");
        this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, move, PASS_MOVE, codes.WIN, 0);
      }

      /* Next the shape moves. */
      if (!I_look_alive) {
        this.owl_shapes(shape_defensive_patterns, shape_defensive_moves, color, owla, owl_defendpat_db);
        for (k = 0; k < MAX_MOVES-1; k++){
          if (!this.get_next_move_from_list(shape_defensive_patterns, color, shape_defensive_moves, 1, owla)){
            break;
          }
        }
      }
      else{
        shape_defensive_moves[0].pos = NO_MOVE;
      }

      if (!you_look_alive) {
        this.owl_shapes(shape_offensive_patterns, shape_offensive_moves, color, owlb, owl_attackpat_db);
        for (k = 0; k < MAX_MOVES-1; k++){
          if (!this.get_next_move_from_list(shape_offensive_patterns, color, shape_offensive_moves, 1, owlb)){
            break;
          }
        }
      }
      else{
        shape_offensive_moves[0].pos = NO_MOVE;
      }

      /* Filter out moves, which fill our eye (and not split it). */
      if (eyemax_a > 0) {
        this.remove_eye_filling_moves(owla, vital_defensive_moves);
        this.remove_eye_filling_moves(owla, vital_offensive_moves);
        this.remove_eye_filling_moves(owla, shape_defensive_moves);
        this.remove_eye_filling_moves(owla, shape_offensive_moves);
      }

      /* Now we review the moves already considered, while collecting
       * them into a single list. 
       */

      if (!I_look_alive) {
        this.semeai_review_owl_moves(vital_defensive_moves, owla, owlb, color,
          safe_outside_liberty_found, safe_common_liberty_found, riskless_move_found,
          mw, moves, 0, 30, critical_semeai_worms);

        this.semeai_review_owl_moves(shape_defensive_moves, owla, owlb, color,
          safe_outside_liberty_found, safe_common_liberty_found, riskless_move_found,
          mw, moves, 0, 0, critical_semeai_worms);
      }

      if (!you_look_alive) {
        this.semeai_review_owl_moves(vital_offensive_moves, owla, owlb, color,
          safe_outside_liberty_found, safe_common_liberty_found, riskless_move_found,
          mw, moves, 1, 30, critical_semeai_worms);

        this.semeai_review_owl_moves(shape_offensive_moves, owla, owlb, color,
          safe_outside_liberty_found, safe_common_liberty_found, riskless_move_found,
          mw, moves, 1, 0, critical_semeai_worms);
      }

      /* If no moves were found so far, also check the eyespaces when
       * opponent semeai worms are allowed to be included for vital
       * moves.
       */
      if (moves[0].pos === NO_MOVE || we_might_be_inessential) {
        include_semeai_worms_in_eyespace = 1;
        if (!this.owl_estimate_life(owlb, owla, vital_offensive_moves,
          live_reasonb, 1, dummy_eyes, eyemin_b, eyemax_b)){

          this.semeai_review_owl_moves(vital_offensive_moves, owla, owlb, color,
            safe_outside_liberty_found, safe_common_liberty_found, riskless_move_found,
            mw, moves, 1, 30, critical_semeai_worms);
        }
        include_semeai_worms_in_eyespace = 0;
      }

      if (eyemin_a[0] === eyemax_a[0]){
        /* We have stable number of eyes, so we can try to reduce
         * opponent eyes.
         */
        I_have_more_eyes = (eyemin_a[0] > this.min_eyes(probable_eyes_b));
      }
      else {
        if (this.min_eyes(probable_eyes_a) === this.max_eyes(probable_eyes_a)){
          /* If we can't increase our number of eyes, we try to reduce
           * opponent eyes.
           */
          I_have_more_eyes = (this.max_eyes(probable_eyes_a) > this.min_eyes(probable_eyes_b));
        }
        else{
          /* If we can increase our number of eyes, we do it and let
           * opponent to increase his.
           */
          I_have_more_eyes = (this.max_eyes(probable_eyes_a) > this.max_eyes(probable_eyes_b));
        }
      }

      if (this.get_level() < 8) {
        /* If no owl moves were found on two consecutive moves,
         * turn off the owl phase.
         */
        if (moves[0].pos === NO_MOVE) {
          if (owl_phase === 1){
            owl_phase = 2;
          }
          else if (owl_phase === 2){
            owl_phase = 0;
          }
        }
        else{
          owl_phase = 1;
        }
      }
    }

    // if (1 && verbose) {
    //   showboard(0);
    //   goaldump(owla.goal);
    //   goaldump(owlb.goal);
    // }

    /* Now we look for a move to fill a liberty. This is only
     * interesting if the opponent doesn't already have two eyes.
     * If we have more eyes, always check for a backfilling move.
     */
    if (!you_look_alive && !safe_outside_liberty_found
      && (moves[0].value < 110 || I_have_more_eyes)) {
      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (!b.ON_BOARD(pos)){
          continue;
        }

        if (b.board[pos] === colors.EMPTY && !mw[pos]) {
          if (this.liberty_of_goal(pos, owlb)) {
            if (!this.liberty_of_goal(pos, owla)) {
              /* outside liberty */
              if (this.safe_move(pos, color) === codes.WIN) {
                safe_outside_liberty_found = 1;
                outside_liberty.pos = pos;
                break;
              }
              else if (backfill_outside_liberty.pos === NO_MOVE){
                backfill_outside_liberty.pos = this.find_semeai_backfilling_move(bpos, pos);
              }
            }
            else {
              /* common liberty */
              if (this.safe_move(pos, color) === codes.WIN) {
                safe_common_liberty_found = 1;
                common_liberty.pos = pos;
              }
              else if (backfill_common_liberty.pos === NO_MOVE){
                backfill_common_liberty.pos = this.find_semeai_backfilling_move(bpos, pos);
              }
            }
          }
        }
      }
    }

    /* Add the best liberty filling move available. We first want to
     * play outer liberties, second backfilling moves required before
     * filling an outer liberty. If no such moves are available we try
     * to fill a mutual liberty or play a corresponding backfilling
     * move.
     */
    if (!you_look_alive) {
      if (safe_outside_liberty_found && outside_liberty.pos !== NO_MOVE) {
        move_value = this.semeai_move_value(outside_liberty.pos, owla, owlb, 50, critical_semeai_worms);
        this.owl_add_move(moves, outside_liberty.pos, move_value,
          "safe outside liberty", SAME_DRAGON_NOT_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_SEMEAI_MOVES, null);
        riskless_move_found = 1;
        // TRACE("Added %1m %d (5)\n", outside_liberty.pos, move_value);
      }
      else if (backfill_outside_liberty.pos !== NO_MOVE) {
        move_value = this.semeai_move_value(backfill_outside_liberty.pos, owla, owlb, 50, critical_semeai_worms);
        this.owl_add_move(moves, backfill_outside_liberty.pos, move_value,
          "backfilling move", SAME_DRAGON_NOT_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_SEMEAI_MOVES, null);
        riskless_move_found = 1;
        // TRACE("Added %1m %d (6)\n", backfill_outside_liberty.pos, move_value);
      }
      else if (safe_common_liberty_found && common_liberty.pos !== NO_MOVE) {
        move_value = this.semeai_move_value(common_liberty.pos, owla, owlb, 10, critical_semeai_worms);
        this.owl_add_move(moves, common_liberty.pos, move_value,
          "safe common liberty", SAME_DRAGON_MAYBE_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_SEMEAI_MOVES, null);
        if (this.semeai_is_riskless_move(common_liberty.pos, owla)){
          riskless_move_found = 1;
        }
        // TRACE("Added %1m %d (7)\n", common_liberty.pos, move_value);
      }
      else if (backfill_common_liberty.pos !== NO_MOVE) {
        move_value = this.semeai_move_value(backfill_common_liberty.pos, owla, owlb, 10, critical_semeai_worms);
        this.owl_add_move(moves, backfill_common_liberty.pos, move_value,
          "backfilling move", SAME_DRAGON_NOT_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_SEMEAI_MOVES, null);
        if (this.semeai_is_riskless_move(backfill_common_liberty.pos, owla)){
          riskless_move_found = 1;
        }
        // TRACE("Added %1m %d (6)\n", backfill_common_liberty.pos, move_value);
      }
    }

    if (moves[0].pos === NO_MOVE) {
      /* If no move has been found yet, see if we can fill opponent's
       * eye (i.e. put more stones in "bulky five" shape).
       */
      if (this.min_eyes(probable_eyes_b) === 1) {
        let move = this.semeai_propose_eyespace_filling_move(owla, owlb);

        if (move) {
          this.owl_add_move(moves, move, 70, "eyespace filling",
            SAME_DRAGON_NOT_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_SEMEAI_MOVES, null);
        }
      }

      // if (moves[0].pos === NO_MOVE)
      //   TRACE("No move found\n");
    }

    /* Now we are ready to try moves. Turn on the sgf output ... */
    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;
    tested_moves = 0;
    for (k = 0; k < MAX_SEMEAI_MOVES; k++) {
      let mpos = moves[k].pos;
      if (mpos === NO_MOVE){
        break;
      }

      if (moves[k].value === 0){
        continue;
      }

      /* Do not try too many moves. */
      if (tested_moves > 2
        || (b.stackp > this.semeai_branch_depth2 && tested_moves > 1)
        || (b.stackp > this.semeai_branch_depth && tested_moves > 0)) {
        /* If allpats, try and pop to get the move in the sgf record. */
        if (!this.allpats){
          break;
        }
        else if (b.trymove(mpos, color, moves[k].name, apos)) {
          this.semeai_add_sgf_comment(moves[k].value, owl_phase);
          b.popgo();
        }
        continue;
      }

      if (b.count_variations >= this.semeai_node_limit || b.stackp >= MAX_SEMEAI_DEPTH){
        continue;
      }

      /* Try playing the move at mpos and call ourselves recursively to
       * determine the result obtained by this move.
       */
      if (this.semeai_trymove_and_recurse(apos, bpos, owla, owlb,
        owl_phase, mpos, color, best_resulta === 0 || best_resultb === 0,
        moves[k].value, moves[k].name,
        moves[k].same_dragon, moves[k].pattern_data,
        moves[k].lunch, null, this_resulta, this_resultb)) {
        tested_moves++;
        if (this_resultb === codes.WIN && this_resulta === codes.WIN) {
          /* Ideal result, no need to try any more moves. */
          resulta[0] = codes.WIN;
          resultb[0] = codes.WIN;
          move[0] = mpos;
          // TRACE("After %1m I (%C) am alive, you are dead\n", mpos, color);
          // SGFTRACE_SEMEAI(mpos, codes.WIN, codes.WIN, moves[k].name);
          this.close_pattern_list(color, shape_defensive_patterns);
          this.close_pattern_list(color, shape_offensive_patterns);
          this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, move, mpos, codes.WIN, codes.WIN);
        }
        /* When there is a choice between ko and seki, the prefer_ko
         * variable decides policy. Thus if prefer_ko === color we
         * consider attacking the opponent more important than defending
         * our dragon, and vise versa otherwise.
         */
        else if ((prefer_ko !== color
          && (this_resulta > best_resulta
            || (this_resulta === best_resulta
              && this_resultb > best_resultb)))
          || (prefer_ko === color
            && (this_resultb > best_resultb
              || (this_resultb === best_resultb
                && this_resulta > best_resulta)))) {
          best_resulta = this_resulta;
          best_resultb = this_resultb;
          best_move = mpos;
          best_move_name = moves[k].name;
        }
      }
    }

    this.close_pattern_list(color, shape_defensive_patterns);
    this.close_pattern_list(color, shape_offensive_patterns);

    /* If we can't find a move and the opponent looks alive, we have
     * lost.
     */
    if (best_resulta === 0 && best_resultb === 0 && you_look_alive) {
      resulta[0] = 0;
      resultb[0] = 0;
      move[0] = PASS_MOVE;
      // SGFTRACE_SEMEAI(PASS_MOVE, 0, 0, "You live, I die");
      this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, move, PASS_MOVE, 0, 0);
    }

    /* If we didn't find a working move and we look dead even if including the
     * opponent stones in our eyespace, we have lost.
     */
    if (best_resulta === 0 && best_resultb === 0
      && !riskless_move_found) {
      let live_reasona;
      let eyemin_a = [];
      let eyemax_a = [];
      for (sworm = 0; sworm < s_worms; sworm++) {
        if (b.board[semeai_worms[sworm]] === other) {
          if (important_semeai_worms[sworm]){
            break;
          }
        }
      }

      if (sworm === s_worms) {
        include_semeai_worms_in_eyespace = 1;
        if (!this.owl_estimate_life(owla, owlb, vital_defensive_moves,
          live_reasona, 0, dummy_eyes, eyemin_a, eyemax_a) && eyemax_a[0] < 2) {
          include_semeai_worms_in_eyespace = 0;
          resulta[0] = 0;
          resultb[0] = 0;
          move[0] = PASS_MOVE;
          // SGFTRACE_SEMEAI(PASS_MOVE, 0, 0, "You live, I die - 2");
          this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, move, PASS_MOVE, 0, 0);
        }
        include_semeai_worms_in_eyespace = 0;
      }
    }

    /* If we can't find a useful move and opponent passed, it's seki, unless
     * one dragon has more eyes than the other.
     */
    if (best_resulta === 0 && best_resultb === 0
      && !riskless_move_found) {
      if (pass) {
        if (this.max_eyes(probable_eyes_a) < this.min_eyes(probable_eyes_b)) {
          resulta[0] = 0;
          resultb[0] = 0;
          move[0] = PASS_MOVE;
          // TRACE("You have more eyes.\n");
          // SGFTRACE_SEMEAI(PASS_MOVE, 0, 0, "You have more eyes");
          this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, move, PASS_MOVE, 0, 0);
        }
        else if (this.max_eyes(probable_eyes_b) < this.min_eyes(probable_eyes_a)) {
          resulta[0] = codes.WIN;
          resultb[0] = codes.WIN;
          move[0] = PASS_MOVE;
          // TRACE("I have more eyes\n");
          // SGFTRACE_SEMEAI(PASS_MOVE, WIN, WIN, "I have more eyes");
          this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, move, PASS_MOVE, codes.WIN, codes.WIN);
        }
        else {
          resulta[0] = codes.WIN;
          resultb[0] = 0;
          move[0] = PASS_MOVE;
          // TRACE("Seki\n");
          // SGFTRACE_SEMEAI(PASS_MOVE, WIN, 0, "Seki");
          this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, move, PASS_MOVE, codes.WIN, 0);
        }
      }
      else {
        /* No working move was found, but opponent hasn't passed. Then we pass. */
        this.do_owl_analyze_semeai(bpos, apos, owlb, owla, resultb, resulta, null, 1, owl_phase);
        resulta[0] = REVERSE_RESULT(resulta[0]);
        resultb[0] = REVERSE_RESULT(resultb[0]);
        // TRACE("No move found\n");
        // SGFTRACE_SEMEAI(PASS_MOVE, *resulta, *resultb, "No move found");
        move = PASS_MOVE;
        this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp, move, PASS_MOVE, resulta[0], resultb[0]);
      }
    }

    /* There are a few selected cases where we should try to see if it
     * would be better to pass rather than playing any move in the semeai.
     *
     * A first simple example is the case of positions where there is nothing
     * left to play but common liberties. In case the above analysis concluded
     * the result is seki and if the best (and only) move happens to be a
     * common liberty, we attempt to pass, so that the engine considers tenuki
     * as a viable option in case it actually is.
     *
     * Another example is related to "disturbing" kos.
     * 
     * .OOOOOOOO.  In this position (similar to semeai:130), X has just taken
     * OOXXXXXXOO  the ko on the left. The semeai code finds the ko recapture
     * OX.XXOOXXO  as the only attacking move and concludes the result is KO_B.
     * OOXX.OO.XO
     * ----------
     *
     * In such cases too, we try to pass to see if it doesn't actually yield
     * a better result.
     *
     * FIXME: there might be more cases where passing would be valuable. 
     */
    if (!pass && k === 1) {
      if ((best_resulta === codes.WIN && best_resultb === 0
        && best_move !== NO_MOVE && best_move === common_liberty.pos)
        || (best_resulta === codes.KO_B && best_resultb === codes.KO_B && b.is_ko(best_move, owla.color, null))) {
        this.do_owl_analyze_semeai(bpos, apos, owlb, owla, this_resultb, this_resulta, null, 1, owl_phase);
        if (REVERSE_RESULT(this_resulta) >= best_resulta && REVERSE_RESULT(this_resultb) >= best_resultb) {
          best_move = PASS_MOVE;
          best_resulta = REVERSE_RESULT(this_resulta);
          best_resultb = REVERSE_RESULT(this_resultb);
          best_move_name = "Pass";
        }
      }
    }

    resulta[0] = best_resulta;
    resultb[0] = best_resultb;
    if (best_resulta === 0){
      best_move = PASS_MOVE;
    }
    move[0] = best_move;
    // SGFTRACE_SEMEAI(best_move, best_resulta, best_resultb, best_move_name);
    this.READ_RETURN_SEMEAI(routine_id.SEMEAI, apos, bpos, this.depth - b.stackp,
      move, best_move, best_resulta, best_resultb);
  },


  /* Play a move, update goal and boundaries appropriately, and call
   * do_owl_analyze_semeai() recursively to determine the result of this
   * move.
   */
  semeai_trymove_and_recurse (apos, bpos, owla, owlb, owl_phase, move, color, ko_allowed,
    move_value, move_name, same_dragon, pattern_data, lunch, semeai_move, this_resulta, this_resultb) {
    const b = this.board
    let ko_move = [0];

    this.gg_assert(this_resulta !== null && this_resultb !== null);
    this_resulta[0] = 0;
    this_resultb[0] = 0;

    if (!b.komaster_trymove(move, color, move_name, apos, ko_move, ko_allowed)) {
      let kpos = [];
      if (b.is_ko(move, color, kpos)) {
        /* Move was not allowed because of komaster. We want to check
         * if this situation is double ko and when it is, we won semeai.
         */
        let libs = [];
        let n;
        let nlib;
        let sworm;
        let worm_color;
        let other = b.OTHER_COLOR(color);

        for (sworm = 0; sworm < s_worms; sworm++) {
          worm_color = b.board[semeai_worms[sworm]];
          if (worm_color === color) {
            /* We only check up to MAX_LIBERTIES, due to performance
             * reasons. When we have more liberties we have some outside
             * liberties to fill and these moves will be tried later
             * (and double ko situation will be found).
             */
            nlib = b.findlib(semeai_worms[sworm], b.MAX_LIBERTIES, libs);
            if (nlib > b.MAX_LIBERTIES){
              return 0;
            }

            for (n = 0; n < nlib; n++)
              if (b.is_ko(libs[n], other, null)) {
                /* Check if situation is not a nested ko capture. */
                if (b.DIAGONAL_NEIGHBORS(libs[n], kpos)){
                  return 0;
                }

                /* Our dragon has double ko, but we have to check if
                 * opponent dragon doesn't have outside liberties or
                 * double ko.
                 */
                this_resulta[0] = codes.WIN;
                this_resultb[0] = codes.WIN;
              }
          }
          else if (worm_color === other) {
            if (b.countlib(semeai_worms[sworm]) > 2){
              /* In double ko situation the opponent can have only a
               * single eye and a ko outside liberty to be sure that we
               * will always win double ko.
               */
              return 0;
            }
          }
        }
        if (this_resulta[0] === codes.WIN){
          return 1;
        }
      }

      return 0;
    }

    this.semeai_add_sgf_comment(move_value, owl_phase);
    // TRACE("Trying %C %1m. Current stack: ", color, move);
    // if (verbose) {
    //   dump_stack();
    //   goaldump(owla.goal);
    //   gprintf("\n");
    //   goaldump(owlb.goal);
    //   gprintf("\n");
    // }
    // TRACE("%s, value %d, same_dragon %d\n", move_name, move_value, same_dragon);

    this.push_owl(owla);
    this.push_owl(owlb);

    if (owla.color === color) {
      this.owl_update_goal(move, same_dragon, lunch, owla, 1, pattern_data);
      this.owl_update_boundary_marks(move, owlb);
    }
    else {
      this.owl_update_goal(move, same_dragon, lunch, owlb, 1, pattern_data);
      this.owl_update_boundary_marks(move, owla);
    }
    this.mark_goal_in_sgf(owla.goal);
    this.mark_goal_in_sgf(owlb.goal);

    /* Do a recursive call to read the semeai after the move we just
     * tried. If dragon b was captured by the move, call
     * do_owl_attack() to see whether it sufficed for us to live.
     */
    if (b.board[bpos] === colors.EMPTY) {
      /* FIXME: Are all owl_data fields and relevant static
       * variables properly set up for a call to do_owl_attack()?
       */
      this_resulta[0] = REVERSE_RESULT(this.do_owl_attack(apos, semeai_move, null, owla, 0));
      this_resultb[0] = this_resulta[0];
    }
    else {
      this.do_owl_analyze_semeai(bpos, apos, owlb, owla, this_resultb, this_resulta, semeai_move, 0, owl_phase);
      this_resulta[0] = REVERSE_RESULT(this_resulta[0]);
      this_resultb[0] = REVERSE_RESULT(this_resultb[0]);
    }

    this.pop_owl(owlb);
    this.pop_owl(owla);

    b.popgo();

    /* Does success require ko? */
    if (ko_move[0]) {
      if (this_resulta[0] !== 0){
        this_resulta[0] = codes.KO_B;
      }
      if (this_resultb[0] !== 0){
        this_resultb[0] = codes.KO_B;
      }
    }

    if (b.count_variations >= this.semeai_node_limit) {
      // TRACE("Out of nodes, claiming win.\n");
      result_certain = 0;
      this_resulta[0] = codes.WIN;
      this_resultb[0] = codes.WIN;
    }
    return 1;
  },

  /* Add details in sgf file about move value and whether owl_phase is active. */
  semeai_add_sgf_comment (value, owl_phase) {},

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

  /* A move is deemed riskless (i.e., doesn't kill ourself in a seki situation)
 * if it doesn't decrease the liberty count of any goal string of our
 * dragon.
 */
  semeai_is_riskless_move (move, owla) {
    const b = this.board
    let liberties = b.accuratelib(move, owla.color, b.MAXLIBS, null);
    if (!this.liberty_of_goal(move, owla)){
      return 1;
    }
    for (let k = 0; k < 4; k++) {
      let pos = move + b.delta[k];
      if (b.board[pos] === owla.color && owla.goal[pos] && b.countlib(pos) > liberties){
        return 0;
      }
    }
    return 1;
  },

  /* Review the moves in owl_moves[] and add them into semeai_moves[].
   * This is used to merge multiple sets of owl moves into one move
   * list, while revising the values for use in semeai reading.
   *
   * We also record whether the moves include an outer or common liberty
   * in the semeai.
   */
  semeai_review_owl_moves (owl_moves, owla, owlb, color,
  safe_outside_liberty_found, safe_common_liberty_found, riskless_move_found,
  mw, semeai_moves, guess_same_dragon, value_bonus, critical_semeai_worms) {
    const b = this.board
    let move;
    let move_value;
    let same_dragon;
    let pattern_data = null;

    for (let k = 0; k < MAX_MOVES-1; k++) {
      move = owl_moves[k].pos;
      if (move === NO_MOVE){
        break;
      }

      if (owl_moves[k].value === 0){
        continue;
      }

      /* Does the move fill a liberty in the semeai? */
      if (this.liberty_of_goal(move, owlb) && this.safe_move(move, color)) {
        if (!this.liberty_of_goal(move, owla)){
          safe_outside_liberty_found[0] = 1;
        }
        else{
          safe_common_liberty_found[0] = 1;
        }
      }
      if (b.is_legal(move, color) && !b.is_ko(move, color, null) && this.semeai_is_riskless_move(move, owla)){
        riskless_move_found[0] = 1;
      }

      /* For some types of owl moves we don't have same_dragon
       * information recorded and need to guess.
       */
      if (guess_same_dragon) {
        if (this.liberty_of_goal(move, owla) || this.second_liberty_of_goal(move, owla)){
          same_dragon = SAME_DRAGON_MAYBE_CONNECTED;
        }
        else{
          same_dragon = SAME_DRAGON_NOT_CONNECTED;
        }
      }
      else {
        same_dragon = owl_moves[k].same_dragon;
        pattern_data = owl_moves[k].pattern_data;
      }

      mw[move] = 1;
      move_value = (this.semeai_move_value(move, owla, owlb, owl_moves[k].value, critical_semeai_worms) + value_bonus);
      this.owl_add_move(semeai_moves, move, move_value, owl_moves[k].name,
        same_dragon, NO_MOVE, owl_moves[k].escape, NO_MOVE, MAX_SEMEAI_MOVES, pattern_data);
      // TRACE("Added %1m %d\n", move, move_value);
    }
  },

  /* Propose an eyespace filling move.  Such a move can, for instance,
   * add a stone to opponent's "bulky five" shape.  We of course choose
   * a move that doesn't allow opponent to turn his dead eyeshape into a
   * two eyes eyeshape.  E.g. in this position, the function will
   * propose the move at '*', not at the '.':
   *
   *	 XXX
   *	XXOX
   *	XOOX
   *	X.*X
   *	----
   */
  semeai_propose_eyespace_filling_move (owla, owlb) {
    const b = this.board
    const color = b.OTHER_COLOR(owlb.color);
    let pos;
    let mw = [];
    let mz = [];

    this.owl_find_relevant_eyespaces(owlb, mw, mz);

    /* Never try to fill opponent's eyes which contain our dragon.  This
     * is nothing else than suicide.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.ON_BOARD(pos) && owla.goal[pos]){
        mw[owlb.my_eye[pos].origin] = 0;
      }
    }

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] === colors.EMPTY) {
        let origin = owlb.my_eye[pos].origin;

        if (mw[origin] > 1 && this.min_eyes(owlb.my_eye[origin].value) === 1) {
          let good_move = 0;

          if (b.trymove(pos, color, "eyespace_filling", NO_MOVE)) {
            let new_value = new EyeValue();
            let dummy_attack = [];
            let dummy_defense = [];

            this.compute_eyes(origin, new_value, dummy_attack, dummy_defense, owlb.my_eye, owlb.half_eye, 0);
            if (this.max_eyes(new_value) <= 1){
              good_move = 1;
            }

            b.popgo();
          }

          if (good_move){
            return pos;
          }
        }
      }
    }

    return NO_MOVE;
  },

  /* Try to estimate the value of a semeai move. This has two
   * components. The first is the change in the total number of
   * liberties for strings involved in the semeai. The second is a bonus
   * for attacks and defenses of critical semeai worms.
   */
  semeai_move_value (move, owla, owlb, raw_value, critical_semeai_worms) {
    const b = this.board
    let pos;
    let net = 0;
    let color = owla.color;
    // let save_verbose = verbose;
    let k;
    let bonus = 0;

    b.ASSERT1(b.board[move] === colors.EMPTY, move);
    // verbose = 0;
    if (this.safe_move(move, color)) {
      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (b.IS_STONE(b.board[pos])
          && pos === b.find_origin(pos)) {
          let count_lib = -1;
          if (owla.goal[pos]) {
            count_lib = b.countlib(pos);
            net -= 75 * count_lib;
          }
          if (owlb.goal[pos]) {
            if (count_lib < 0){
              count_lib = b.countlib(pos);
            }
            net += 100 * count_lib;
          }
        }
      }
      if (!b.trymove(move, color, null, 0)) {
        // verbose = save_verbose;
        return 0;
      }
      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (b.IS_STONE(b.board[pos])
          && pos === b.find_origin(pos)) {
          let count_lib = -1;
          if (owla.goal[pos] || (pos === move && this.liberty_of_goal(move, owla))) {
            count_lib = b.countlib(pos);
            net += 75 * count_lib;
          }
          if (owlb.goal[pos]) {
            if (count_lib < 0){
              count_lib = b.countlib(pos);
            }
            net -= 100 * count_lib;
          }
        }
      }

      this.increase_depth_values();
      for (k = 0; k < s_worms; k++) {
        if (!critical_semeai_worms[k]){
          continue;
        }
        if (b.board[semeai_worms[k]] === color && !this.attack(semeai_worms[k], null)){
          bonus += 50;
        }
        else if (b.board[semeai_worms[k]] === b.OTHER_COLOR(color) && !this.find_defense(semeai_worms[k], null)){
          bonus += 50;
        }
      }
      this.decrease_depth_values();

      b.popgo();
    }

    // verbose = save_verbose;

    if (net < 0){
      net = 0;
    }

    net /= 25;
    net *= 3;

    return raw_value + net + bonus;
  },

  /* Remove all moves from the list that would fill our own eye. */
  remove_eye_filling_moves (our_owl, moves) {
    const b = this.board
    const color = our_owl.color;

    for (let k = 0; k < MAX_MOVES; k++) {
      if (moves[k].pos === NO_MOVE){
        break;
      }
      else {
        let eye = our_owl.my_eye[moves[k].pos];

        /* If esize==1 this eye must not be a real eye (at least one
         * worm is capturable, otherwise this move would not be
         * proposed).
         */
        if (eye.color === color && eye.msize === 0 && eye.neighbors <= 1
        && eye.esize !== 1
        && our_owl.half_eye[moves[k].pos].type !== HALF_EYE
        && !b.has_neighbor(moves[k].pos, b.OTHER_COLOR(color))){
          moves[k].value = 0;
        }
      }
    }
  },

  /* Is the vertex at pos adjacent to an element of the owl goal? */
  liberty_of_goal (pos, owl) {
    const b = this.board
    for (let k = 0; k < 4; k++){
      if (b.IS_STONE(b.board[pos + b.delta[k]]) && owl.goal[pos + b.delta[k]]){
        return 1;
      }
    }
    return 0;
  },

  /* Is the vertex at pos a second liberty of the owl goal? */
  second_liberty_of_goal (pos, owl) {
    const b = this.board
    for (let k = 0; k < 4; k++){
      if (b.board[pos + b.delta[k]] === colors.EMPTY && this.liberty_of_goal(pos + b.delta[k], owl)){
        return 1;
      }
    }

    return 0;
  },

  /* 'liberty' is a liberty of 'worm' which we would like to fill.
   * However it is not safe to play there, so we look for a
   * backfilling move. For example in this situation:
   *
   *   ------+
   *   O.OaXc|
   *   OOOOOX|
   *   XXXXXb|
   *   ......|
   *
   * If 'worm' is the O string and 'liberty' is 'a', the
   * function returns 'b'. To fill at 'a', X must first
   * fill 'b' and 'c' and it is better to fill at 'b' first
   * since that will sometimes leave fewer or smaller ko threats.
   *
   * Returns NO_MOVE if no move is found.
   */
  find_semeai_backfilling_move (worm, liberty) {
    const b = this.board
    const color = b.board[worm];
    const other = b.OTHER_COLOR(color);
    let result = NO_MOVE;

    if (this.safe_move(liberty, other) === codes.WIN){
      return liberty;
    }
    if (b.is_self_atari(liberty, other)) {
      let fill = [];
      if (b.approxlib(liberty, other, 1, fill) > 0
      && b.trymove(fill, other, "find_semeai_backfilling_move", worm)) {
        if (this.safe_move(liberty, other)){
          result = fill;
        }
        else if (b.board[worm] !== colors.EMPTY){
          result = this.find_semeai_backfilling_move(worm, liberty);
        }
        b.popgo();
      }
    }
    if (b.ON_BOARD(result) && this.safe_move(result, other)){
      return result;
    }
    else{
      return NO_MOVE;
    }
  },

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

  clear_owl_move_data (moves) {
    for (let k = 0; k < MAX_MOVES; k++) {
      moves[k] = new OwlMoveData()
    }
  },

  set_single_owl_move (moves, pos, name) {
    moves[0] = new OwlMoveData({
      pos,
      name,
      value: 25,
      same_dragon: SAME_DRAGON_MAYBE_CONNECTED,
    })
    moves[1].value = 0
  },


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
        move[0] = xpos[0];
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
    if (this.owl_estimate_life(owl, null, vital_moves, live_reason,
      1, probable_eyes, eyemin, eyemax)) {
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

          // sgf_dumptree = null;
          b.count_variations = 0;
          result = this.attack(str, apos);
          if (result === codes.WIN || (result !== 0 && (this.min_eyes(probable_eyes) >= 2 || pass === 5))) {
            this.set_single_owl_move(shape_moves, apos[0], "tactical attack");
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
              // SGFTRACE(0, codes.WIN, "no defense");
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

              // sgf_dumptree = null;
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
                this.set_single_owl_move(shape_moves, dpos[0], name);
                moves = shape_moves;
              }
            }
          }
          break;
        default:
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
        console.log(mpos)
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
            //   char codes.WINstr[192];
            //   if (origin === NO_MOVE)
            //     codes.WINtxt = "all original stones captured";
            //   else
            //     codes.WINtxt = "attack effective";
            //   sprintf(winstr, "%s)\n  (%d variations", codes.WINtxt,
            //     count_variations - this_variation_number);
            //   SGFTRACE(mpos, codes.WIN, codes.WINstr);
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
    //   char codes.WINstr[128];
    //   sprintf(winstr, "attack failed)\n  (%d variations",
    //     count_variations - this_variation_number);
    //   SGFTRACE(0, 0, codes.WINstr);
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
    // let start = 0.0;
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
    const b = this.board
    const color = b.board[str];
    let shape_moves = [];
    let vital_moves = [];
    let moves;
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
    let probable_eyes = new EyeValue() /* Best guess of eyevalue. */
    let escape_route;
    let live_reason = [];
    let move_cutoff;
    let xpos = [];
    let value1 = [];
    let value2 = [];
    let this_variation_number = b.count_variations - 1;

    // SETUP_TRACE_INFO("owl_defend", str);

    shape_patterns.initialized = 0;

    str = b.find_origin(str);

    if (this.tt_get(this.ttable, routine_id.OWL_DEFEND, str, NO_MOVE, 
      this.depth - b.stackp, null, value1, value2, xpos) === 2) {

      // TRACE_CACHED_RESULT(value1, xpos);
      if (move){
        move[0] = xpos;
      }

      if (value1[0] === codes.LOSS) {
        if (wormid) {
          if (goal_worms_computed){
            wormid[0] = value2;
          }
          else{
            wormid[0] = MAX_GOAL_WORMS;
          }
        }
      }

      // if (value1 === codes.WIN || value1 === LOSS)
      //   TRACE("%oVariation %d: ALIVE (cached)\n", this_variation_number);
      // else
      //   TRACE("%oVariation %d: DEAD (cached)\n", this_variation_number);
      // SGFTRACE(xpos, value1, "cached");
      return value1[0];
    }

    /* In order to get a defense move even if we seem to already have
     * escaped and to reduce the impact of overestimated escape
     * possibilities, we don't declare escape victory on the first move.
     *
     * FIXME: Should introduce a new owl depth value rather than having
     *        this hardwired value.
     */
    escape_route = this.owl_escape_route(owl);
    if (b.stackp > 2 && escape_route >= 5) {
      /* FIXME: We probably should make distinction in the returned
       * result whether the dragon lives by making two eyes or by
       * escaping.
       */
      // TRACE("%oVariation %d: ALIVE (escaped)\n", this_variation_number);
      // SGFTRACE(0, codes.WIN, "escaped");
      this.READ_RETURN(routine_id.OWL_DEFEND, str, this.depth - b.stackp, move, 0, codes.WIN);
    }

    /* If reading goes to deep or we run out of nodes, we assume life. */
    if (this.reading_limit_reached(live_reason, this_variation_number)) {
      // SGFTRACE(0, codes.WIN, live_reason);
      this.READ_RETURN(routine_id.OWL_DEFEND, str, this.depth - b.stackp, move, 0, codes.WIN);
    }

    // memset(mw, 0, sizeof(mw));
    local_owl_node_counter++;
    global_owl_node_counter++;

    current_owl_data = owl;
    // memset(owl.safe_move_cache, 0, sizeof(owl.safe_move_cache));

    /* First see whether we might already be alive. */
    if (escape < MAX_ESCAPE) {
      if (this.owl_estimate_life(owl, null, vital_moves, live_reason, 0, probable_eyes, eyemin, eyemax)) {
        // SGFTRACE(0, codes.WIN, live_reason);
        // TRACE("%oVariation %d: ALIVE (%s)\n", this_variation_number, live_reason);
        this.READ_RETURN(routine_id.OWL_DEFEND, str, this.depth - b.stackp, move, 0, codes.WIN);
      }
    }
    else {
      /* In this case we don't recompute eyes. However, to avoid accessing
       * partially-random data left on stack, we copy eye data from the
       * previous depth level. It should be reasonably close to the actual
       * state of eyes.
       */
      // owl.my_eye = owl.restore_from.my_eye.map(item => new EyeData().copy(item))
      // owl.half_eye = owl.restore_from.half_eye.map(item => new HalfEyeData().copy(item))

      vital_moves[0].pos = 0;
      vital_moves[0].value = -1;
      probable_eyes.set([0, 0, 0, 0])
    }

    /* We try moves in four passes.
     *                                stackp==0   stackp>0
     * 0. Vital moves in the interval  [70..]      [45..]
     * 1. Shape moves
     * 2. Vital moves in the interval  [..69]      [..44]
     * 3. Tactical defense moves
     */
    for (pass = 0; pass < 4; pass++) {
      moves = null;
      move_cutoff = 1;

      current_owl_data = owl;
      switch (pass) {
        /* Get the shape moves if we are in the right pass. */
        case 1:

          if (b.stackp > this.owl_branch_depth && number_tried_moves > 0){
            continue;
          }

          this.owl_shapes(shape_patterns, shape_moves, color, owl, owl_defendpat_db);
          moves = shape_moves;
          break;

        case 0:
        case 2:
          if (b.stackp > this.owl_branch_depth && number_tried_moves > 0){
            continue;
          }

          moves = vital_moves;
          if (pass === 0 || b.stackp > this.owl_distrust_depth) {
            if (b.stackp === 0){
              move_cutoff = 70;
            }
            else if (eyemin + this.min_eyes(probable_eyes) > 3){
              move_cutoff = 25;
            }
            else if (eyemin + this.min_eyes(probable_eyes) >= 3){
              move_cutoff = 35;
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
          let goalcount = 0;

          /* If the goal is small, try a tactical defense. */
          for (k = b.BOARDMIN; k < b.BOARDMAX; k++)
            if (b.ON_BOARD(k))
              goalcount += owl.goal[k];

          if (goalcount < 5) {
            /* Look for a tactical defense. This is primarily intended for
             * the case where the whole dragon is a single string, therefore
             * we only look at the string at the "origin".
             *
             * We only accept clearly effective tactical defenses here,
             * using a liberty heuristic. The reason for this is problems
             * with ineffective self ataris which do defend tactically but
             * have no strategical effect other than wasting owl nodes or
             * confusing the eye analysis.
             */
            let dpos = [];
            // SGFTree *save_sgf_dumptree = sgf_dumptree;
            // int save_count_variations = count_variations;

            // sgf_dumptree = null;
            // count_variations = 0;
            if (this.attack_and_defend(str, null, null, null, dpos)
              && (b.approxlib(dpos[0], color, 2, null) > 1
              || this.does_capture_something(dpos[0], color))) {
              // TRACE("Found tactical defense for %1m at %1m.\n", str, dpos);
              this.set_single_owl_move(shape_moves, dpos[0], "tactical_defense");
              moves = shape_moves;
            }
            // sgf_dumptree = save_sgf_dumptree;
            // count_variations = save_count_variations;
          }
          if (!moves){
            continue;
          }
          break;
        default:
      } /* switch (pass) */

      /* For the up to MAX_MOVES best moves with value equal to
       * move_cutoff or higher, try to defend the dragon and see if it
       * can then be attacked.
       */
      for (k = 0; k < MAX_MOVES; k++) {
        let mpos;
        let ko_move = [-1];
        let new_escape;
        let wid = [MAX_GOAL_WORMS];

        /* Consider only the highest scoring move if we're deeper than
         * owl_branch_depth.
         *
         * FIXME: To behave as intended, k should be replaced by
         *        number_tried_moves.
         */
        if (b.stackp > this.owl_branch_depth && k > 0)
          break;

        current_owl_data = owl;

        if (pass === 1) {
          if (!this.get_next_move_from_list(shape_patterns, color, shape_moves, move_cutoff, owl)){
            break;
          }
        }
        else{
          if (moves[k].value < move_cutoff){
            break;
          }
        }

        mpos = moves[k].pos;
        this.modify_eyefilling_move(mpos, color);
        b.ASSERT_ON_BOARD1(mpos);

        /* Have we already tested this move? */
        if (mw[mpos]){
          continue;
        }

        /* Try to make the move. */
        if (!b.komaster_trymove(mpos, color, moves[k].name, str, ko_move, savecode === 0)){
          continue;
        }

        new_escape = escape;
        if (moves[k].escape){
          new_escape++;
        }

        // TRACE("Trying %C %1m. Escape = %d. Current stack: ", color, mpos, escape);
        // if (verbose)
        //   dump_stack();

        /* We have now made a move. Analyze the new position. */
        this.push_owl(owl);
        mw[mpos] = 1;
        number_tried_moves++;

        /* Add the stone just played to the goal dragon, unless the
         * pattern explicitly asked for not doing this.
         */
        this.owl_update_goal(mpos, moves[k].same_dragon, moves[k].lunch, owl, 0, moves[k].pattern_data);
        this.mark_goal_in_sgf(owl.goal);

        if (!ko_move[0]) {
          let acode = this.do_owl_attack(str, null, wid, owl, new_escape);
          if (!acode) {
            this.pop_owl(owl);
            b.popgo();
            // if (sgf_dumptree) {
            //   char codes.WINstr[192];
            //   sprintf(winstr, "defense effective)\n  (%d variations",
            //     count_variations - this_variation_number);
            //   SGFTRACE(mpos, codes.WIN, codes.WINstr);
            // }
            this.close_pattern_list(color, shape_patterns);
            this.READ_RETURN(routine_id.OWL_DEFEND, str, this.depth - b.stackp, move, [mpos], codes.WIN);
          }
          if (acode === codes.GAIN){
            saveworm = wid[0];
          }
          this.UPDATE_SAVED_KO_RESULT(savecode, savemove, acode, [mpos]);
        }
        else {
          if (this.do_owl_attack(str, null, null, owl, new_escape) !== codes.WIN) {
            savemove = mpos;
            savecode = codes.KO_B;
          }
        }

        /* Undo the tested move. */
        this.pop_owl(owl);
        b.popgo();
      }
    }

    this.close_pattern_list(color, shape_patterns);

    if (savecode) {
      if (savecode === codes.LOSS) {
        // SGFTRACE(savemove, savecode, "defense effective (loss) - B");
        if (wormid){
          wormid[0] = saveworm;
        }
        this.READ_RETURN2(routine_id.OWL_DEFEND, str, this.depth - b.stackp, move, savemove, savecode, saveworm);
      }
      else {
        // SGFTRACE(savemove, savecode, "defense effective (ko) - B");
        this.READ_RETURN(routine_id.OWL_DEFEND, str, this.depth - b.stackp, move, savemove, savecode);
      }
    }

    if (number_tried_moves === 0 && this.min_eyes(probable_eyes) >= 2) {
      // SGFTRACE(0, codes.WIN, "genus probably >= 2");
      this.READ_RETURN(routine_id.OWL_DEFEND, str, this.depth - b.stackp, move, 0, codes.WIN);
    }


    // if (sgf_dumptree) {
    //   char codes.WINstr[196];
    //   int print_genus = eyemin === 1 ? 1 : 0;
    //   sprintf(winstr, "defense failed - genus %d)\n  (%d variations",
    //     print_genus, count_variations - this_variation_number);
    //   SGFTRACE(0, 0, codes.WINstr);
    // }

    this.READ_RETURN0(routine_id.OWL_DEFEND, str, this.depth - b.stackp);
  },

  owl_threaten_defense () {
    
  },

  /*
   * This function calls owl_determine_life() to get an eye estimate,
   * and matchpat() for vital attack moves, and decides according to
   * various policies (depth-dependant) whether the dragon should thus
   * be considered alive.
   */
  owl_estimate_life (owl, second_owl, vital_moves, live_reason, does_attack, probable_eyes, eyemin, eyemax) {
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    const b = this.board
    const other = b.OTHER_COLOR(owl.color);
    let dummy_moves = []
    // let save_count_variations = b.count_variations;

    // sgf_dumptree = null;
    // b.count_variations = 0;

    this.owl_determine_life(owl, second_owl, does_attack, vital_moves, probable_eyes, eyemin, eyemax);

    matches_found = 0;
    found_matches.fill(0)

    if (this.get_level() >= 8) {
      // memset(owl.safe_move_cache, 0, sizeof(owl.safe_move_cache));
      if (!does_attack) {
        this.clear_owl_move_data(dummy_moves);
        this.matchpat(this.owl_shapes_callback, other, owl_vital_apat_db, dummy_moves, owl.goal);
      }
      else if (this.max_eyes(probable_eyes) >= 2){
        this.matchpat(this.owl_shapes_callback, other, owl_vital_apat_db, vital_moves, owl.goal);
      }
    }

    // if ((debug & DEBUG_EYES) && (debug & DEBUG_OWL))
    //   gprintf("owl: eyemin=%d matches_found=%d\n", *eyemin, matches_found);
    if (eyemin[0] >= matches_found){
      eyemin[0] -= matches_found;
    }
    else{
      eyemin[0] = 0;
    }

    // sgf_dumptree = save_sgf_dumptree;
    // b.count_variations = save_count_variations;

    if (eyemin[0] >= 2 || (eyemin[0] === 1 && this.min_eyes(probable_eyes) >= 4)
      || (b.stackp > this.owl_distrust_depth && this.min_eyes(probable_eyes) >= 2 && !matches_found)) {
      if (eyemin[0] >= 2){
        live_reason[0] = "2 or more secure eyes";
      }
      else if (eyemin[0] === 1 && this.min_eyes(probable_eyes) >= 4){
        live_reason[0] = "1 secure eye, likely >= 4";
      }
      else if (b.stackp > this.owl_distrust_depth && this.min_eyes(probable_eyes) >= 2 && !matches_found){
        live_reason[0] = "getting deep, looks lively";
      }
      else{
        this.gg_assert(0);
      }
      return 1;
    }

    if (!does_attack
      && (eyemin[0] + matches_found >= 2
      || (eyemin[0] + matches_found === 1 && this.min_eyes(probable_eyes) >= 4)
      || (b.stackp > this.owl_distrust_depth && this.min_eyes(probable_eyes) >= 2))) {
      /* We are not yet alive only due to owl vital attack patterns matching.
       * Let's try to defend against it.
       */
      this.owl_add_move(vital_moves, dummy_moves[0].defense_pos,
        dummy_moves[0].value, dummy_moves[0].name, SAME_DRAGON_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_MOVES, null);
    }

    return 0;
  },



  /*
   * This function is invoked from do_owl_attack() and do_owl_defend()
   * for each node to determine whether the the dragon has sufficient
   * eye potential to live. It also generates vital moves to attack or
   * defend the eyes. There are two distinct sources for eyes. The first
   * is the eyespaces found by make_domains() and evaluated by
   * compute_eyes_pessimistic(). The second is the lunches found by
   * owl_find_lunches() and evaluated by sniff_lunch().
   *
   * The best guess of the eye potential is stored as an eyevalue in
   * *probable_eyes. This is not entirely reliable though since the
   * graph matching techniques in optics.c fail to understand subtleties
   * like atari inside the eyespace, cutting points in the wall, and
   * shortage of outside liberties. (The patterns in owl_vital_apats.db
   * are used to compensate for this. See do_owl_attack() and
   * do_owl_defend() for how these are used.) Also the estimates from
   * sniff_lunch() are fairly unreliable.
   *
   * A lower and upper bound on the number of eyes are returned in
   * *eyemin and *eyemax. The value of *eyemin must be offset by the
   * matches of owl_vital_apats.db. If that number is 2 or larger, we
   * should be certain of life.
   *
   * Vital moves to attack or defend eyes are returned in the moves[]
   * array. Also moves to reduce the uncertainty of the eye estimates
   * are added to this array, but with smaller move values. The
   * parameter does_attack determines whether to generate vital attack
   * moves or vital defense moves.
   *
   * The dragon is specified by the information in the owl struct. The
   * color of the dragon is passed in the color parameter.
   *
   * For use in the semeai code, a second dragon can be provided. Set
   * this to null when only one dragon is involved.
   */
  owl_determine_life (owl, second_owl, does_attack, moves, probable_eyes, eyemin, eyemax) {
    const b = this.board
    let color = owl.color;
    let eye = owl.my_eye;
    let mw = [];  /* mark relevant eye origins */
    let mz = [];  /* mark potentially irrelevant eye origins */
    let vital_values = [];
    let dummy_eyemin = [0];
    let dummy_eyemax = [0];
    let eyevalue = new EyeValue()
    let eyevalue_list = []
    let eyes_attack_points = [];
    let pessimistic_min = []; // 指针
    let attack_point = []; // 指针
    let defense_point = []; // 指针
    let pos;
    let k;
    let lunch;
    let num_eyes = 0;
    let num_lunches = 0;
    // let save_debug = debug;

    if (!eyemin) {
      eyemin = dummy_eyemin;
    }
    if (!eyemax) {
      eyemax = dummy_eyemax;
    }
    eyemin[0] = 0
    eyemax[0] = 0

    /* Turn off eye debugging if we're not also debugging owl. */
    // if (!(debug & DEBUG_OWL))
    //   debug &= ~DEBUG_EYES;

    this.clear_owl_move_data(moves);

    if (!owl.lunches_are_current) {
      this.owl_find_lunches(owl);
    }

    this.owl_make_domains(owl, second_owl);

    this.owl_find_relevant_eyespaces(owl, mw, mz);

    /* Reset halfeye data. Set topological eye value to something big. */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.ON_BOARD(pos)) {
        owl.half_eye[pos] = new HalfEyeData({
          type : 0,
          value : 10.0,
        })
      }
    }

    /* Find topological half eyes and false eyes. */
    this.find_half_and_false_eyes(color, eye, owl.half_eye, mw);

    /* The eyespaces may have been split or changed in other ways by the
     * topological analysis, so we need to regenerate them and once more
     * determine which ones are relevant.
     */
    this.partition_eyespaces(owl.my_eye, owl.color);
    this.owl_find_relevant_eyespaces(owl, mw, mz);

    probable_eyes.set([0, 0, 0, 0])

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.ON_BOARD(pos) && mw[pos] > 1) {
        let value = 0;
        let reason = "";
        this.compute_eyes_pessimistic(pos, eyevalue, pessimistic_min, attack_point, defense_point, eye, owl.half_eye);

        /* If the eyespace is more in contact with own stones not in the goal,
         * than with ones in the goal, there is a risk that we can be cut off
         * from a major part of the eyespace. Thus we can't trust the opinion
         * of compute_eyes().
         *
         * (Obviously this is a quite fuzzy heuristic. With more accurate
         * connection analysis in the owl code we could do this more robustly.)
         */
        if (mw[pos] < mz[pos] || (mw[pos] < 3 * mz[pos] && mz[pos] > 5)) {
          pessimistic_min[0] = 0;
        }

        eyes_attack_points[num_eyes] = NO_MOVE;
        eyevalue_list[num_eyes] = eyevalue;
        eyemin[0] += pessimistic_min[0];

        /* Fill in the value field for use by the owl_eyespace() function. */
        eye[pos].value = eyevalue;

        /* This shortcut has been disabled for two reasons:
         * 1. Due to the vital attack moves being able to later reduce
         * the *eyemin, we can't say that a certain *eyemin is
         * sufficient.
         * 2. This part of the code is in no way time critical.
         */

        if (this.eye_move_urgency(eyevalue)) {
          value = 50;
          if (this.max_eyes(eyevalue) - this.min_eyes(eyevalue) === 2) {

            value = 70;
          } else if (this.max_eyes(eyevalue) - pessimistic_min[0] === 2)
            value = 60;
          reason = "vital move";
        } else if (this.max_eyes(eyevalue) !== pessimistic_min[0]) {
          if (this.max_eyes(eyevalue) - pessimistic_min[0] === 2) {
            value = 40;
          } else {
            value = 30;
          }
          reason = "marginal eye space";
        }

        if (value > 0) {
          if (does_attack && attack_point[0] !== NO_MOVE) {
            if (vital_values[attack_point[0]] > 0) {
              value += vital_values[attack_point[0]];
              if (value > 98) {
                value = 98; /* Higher values may get special interpretation. */
              }
            }

            // TRACE("%s at %1m, score %d (eye at %1m, value %s, pessimistic_min %d)\n",
            //   reason, attack_point, value, pos, eyevalue_to_string(&eyevalue), pessimistic_min);

            if (eye[attack_point[0]].marginal && this.modify_stupid_eye_vital_point(owl, attack_point, 1)){
            //   TRACE("vital point looked stupid, moved it to %1m\n", attack_point);
            }

            if (attack_point[0] !== NO_MOVE) {
              this.owl_add_move(moves, attack_point[0], value, reason, SAME_DRAGON_MAYBE_CONNECTED, NO_MOVE,
                0, NO_MOVE, MAX_MOVES, null);
              vital_values[attack_point[0]] = value;
              eyes_attack_points[num_eyes] = attack_point[0];
            }
          }

          /* The reason for the last set of tests is that we don't
           * want to play a self atari in e.g. this position
           *
           * |XXX.
           * |OOX.
           * |.OX.
           * |XOXX
           * |XOOX
           * |O*OX
           * +----
           *
           * but it's okay in this position
           * 
           * |XXXXX
           * |....X
           * |OOOOX
           * |.XXOX
           * |.*XOX
           * +-----
           *
           * In both cases * is the vital point according to the graph
           * matching. The significant difference is that in the first
           * case the vital point is adjacent to stones in the goal.
           */
          else if (!does_attack
            && defense_point[0] !== NO_MOVE
            && b.board[defense_point[0]] === colors.EMPTY
            && (!this.liberty_of_goal(defense_point[0], owl)
              || !b.is_self_atari(defense_point[0], color)
              || b.is_ko(defense_point[0], color, null)
              || this.safe_move(defense_point[0], color) !== 0)) {
            if (vital_values[defense_point[0]] > 0) {
              value += vital_values[defense_point[0]];
              if (value > 98) {
                value = 98; /* Higher values may get special interpretation. */
              }
            }

            // TRACE("%s at %1m, score %d (eye at %1m, value %s, pessimistic_min %d)\n",
            //   reason, defense_point, value, pos, eyevalue_to_string(&eyevalue), pessimistic_min);

            if ((eye[defense_point[0]].marginal || eye[defense_point[0]].origin !== pos)
              && this.modify_stupid_eye_vital_point(owl, defense_point, 0)) {
              // TRACE("vital point looked stupid, moved it to %1m\n", defense_point);
            }

            if (defense_point[0] !== NO_MOVE) {
              this.owl_add_move(moves, defense_point[0], value, reason,
                SAME_DRAGON_MAYBE_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_MOVES, null);
              vital_values[defense_point[0]] = value;
            }
          }
        }
        num_eyes++;
      }
    }

    /* Sniff each lunch for nutritional value. The assumption is that
     * capturing the lunch is gote, therefore the number of half eyes
     * equals the MINIMUM number of eyes yielded by the resulting eye
     * space.
     */
    for (lunch = 0; (lunch < MAX_LUNCHES); lunch++) {

      if (owl.lunch[lunch] !== NO_MOVE && owl.lunch_defense_point[lunch] !== NO_MOVE) {
        let value = 0;
        let lunch_min = [];
        let lunch_max = [];
        let lunch_probable = [];
        let e = new EyeValue()
        this.sniff_lunch(owl.lunch[lunch], lunch_min, lunch_probable, lunch_max, owl);

        e.set([0, 0, lunch_probable[0], lunch_probable[0]])
        eyemax[0] += lunch_max[0];

        if (lunch_probable[0] === 0) {
          if (b.countstones(owl.lunch[lunch]) === 1) {
            continue;
          }
          value = 20;
        } else if (lunch_probable[0] === 1 && lunch_max[0] === 1) {
          value = 60 + b.countstones(owl.lunch[lunch]);
        } else if (lunch_probable[0] === 1 && lunch_max[0] === 2) {
          value = 70 + b.countstones(owl.lunch[lunch]);
        } else {
          value = 75 + b.countstones(owl.lunch[lunch]);
        }

        if (owl.lunch_attack_code[lunch] !== codes.WIN) {
          value -= 10;
        }

        if (does_attack) {
          defense_point[0] = this.improve_lunch_defense(owl.lunch[lunch], owl.lunch_defense_point[lunch]);

          if (vital_values[defense_point[0]]) {
            /* The point here is that the move which saves the lunch also
             * attacks an eye. So this attack move reduces the global eye
             * potential. The eyes arithmetic for probable_eyes has then
             * to be adapted accordingly.
             */
            let ne;
            for (ne = 0; ne < num_eyes - num_lunches; ne++) {
              if (eyes_attack_points[ne] === defense_point[0]) {
                break;
              }
            }
            this.gg_assert(ne < num_eyes - num_lunches);
            /* merge eye values */
            this.add_eyevalues(eyevalue_list[ne], e, eyevalue_list[ne]);
            /* and adjust */
            eyevalue_list[ne].a = 0;
            eyevalue_list[ne].b = 0;
          } else {
            num_lunches++;
            eyevalue_list[num_eyes++] = e;
          }

          // TRACE("save lunch at %1m with %1m, score %d, probable eye %d, max eye %d\n",
          //   owl.lunch[lunch], defense_point, value, lunch_probable, lunch_max);
          this.owl_add_move(moves, defense_point[0], value, "save lunch",
            SAME_DRAGON_MAYBE_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_MOVES, null);
        } else {
          attack_point[0] = this.improve_lunch_attack(owl.lunch[lunch], owl.lunch_attack_point[lunch]);
          // TRACE("eat lunch at %1m with %1m, score %d, probable eye %d, max eye %d\n",
          //   owl.lunch[lunch], attack_point, value, lunch_probable, lunch_max);
          /* We only remember the lunch for owl_update_goal() if the lunch
           * cannot be defended with ko after the move.
           * If we capture the lunch by an illegal ko capture, we become
           * ko master with this move, and hence the above is true.
           */
          if (owl.lunch_attack_code[lunch] === codes.WIN || b.is_illegal_ko_capture(attack_point[0], owl.color)) {
            this.owl_add_move(moves, attack_point[0], value, "eat lunch",
              SAME_DRAGON_MAYBE_CONNECTED, owl.lunch[lunch], 0, NO_MOVE, MAX_MOVES, null);
          } else {
            this.owl_add_move(moves, attack_point[0], value, "eat lunch",
              SAME_DRAGON_MAYBE_CONNECTED, NO_MOVE, 0, NO_MOVE, MAX_MOVES, null);
          }
          num_lunches++;
          eyevalue_list[num_eyes++] = e;
        }
      }
    }

    /* now, totalize the eye potential */
    let ne;
    for (ne = 0; ne < num_eyes - num_lunches; ne++){
      this.add_eyevalues(probable_eyes, eyevalue_list[ne], probable_eyes);
    }

    eyemax[0] += this.max_eyes(probable_eyes);
    /* If we have at least two different eyespaces and can create one eye
     * in sente, we assume there's a chance to create another one. This is
     * needed because optics code don't know about eyespaces influencing
     * each other and combination moves (i.e. double threats to create an
     * eye).
     */
    if (num_eyes - num_lunches > 1 && this.max_eye_threat(probable_eyes) > 1){
      eyemax[0] += 1;
    }

    for (; ne < num_eyes; ne++){
      this.add_eyevalues(probable_eyes, eyevalue_list[ne], probable_eyes);
    }
    // debug = save_debug;
  },

  /* The eyespaces we want to evaluate are the ones which
   * are adjacent to the dragon (whose stones comprise the
   * support of goal) which are not GRAY bordered. These
   * are the eyespaces of the dragon. Now we find their
   * origins.
   *
   * It is required that there are at least two distinct connections,
   * adjacent or diagonal, between non-marginal eyespace vertices and
   * stones of the goal dragon. Otherwise there is a risk that we
   * include irrelevant eye spaces.
   */
  owl_find_relevant_eyespaces (owl, mw, mz) {
    const b = this.board
    let pos;
    let eye_color;
    let eye = owl.my_eye;

    if (owl.color === colors.WHITE){
      eye_color = colors.WHITE;
    }
    else{
      eye_color = colors.BLACK;
    }

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      mw[pos] = 0
      mz[pos] = 0
    }

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] === owl.color) {
        for (let k = 0; k < 8; k++) {
          let pos2 = pos + b.delta[k];
          if (b.ON_BOARD(pos2) && eye[pos2].color === eye_color && !eye[pos2].marginal) {
            if (owl.goal[pos])
              mw[eye[pos2].origin]++;
            else
              mz[eye[pos2].origin]++;
          }
        }
      }
    }
  },


  /* Case 1.
   *
   * The optics code occasionally comes up with stupid vital moves, like
   * a in this position:
   *
   * ----+
   * O...|
   * OX..|
   * OX..|
   * O.X.|
   * .O.a|
   * ....|
   *
   * This function moves such moves to the second line.
   *
   * Case 2.
   *
   * In this position the optics code can suggest the empty 1-2 point as
   * vital move for the eyespace on the right edge. That is okay for attack
   * but obviously not for defense.
   *
   * ----+
   * XO.O|
   * XOOX|
   * XXO.|
   * .XOO|
   * .XXX|
   *
   * Case 3.
   *
   * Playing into a snapback is usually not an effective way to destroy
   * an eye.
   *
   * XOOO|
   * XOXX|
   * XXO.|
   * .XXO|
   * ....|
   *
   * This function changes the attack point to NO_MOVE (i.e. removes it).
   */
  modify_stupid_eye_vital_point (owl, vital_point, is_attack_point) {
    const b = this.board
    let up;
    let right;
    let k;
    let libs = [];

    /* Case 1. */
    for (k = 0; k < 4; k++) {
      up = b.delta[k];
      if (b.ON_BOARD(vital_point[0] - up)){
        continue;
      }

      if (b.board[vital_point[0] + up] !== colors.EMPTY){
        continue;
      }

      right = b.delta[(k+1) % 4];

      if (b.board[vital_point[0] + right] !== colors.EMPTY
        || b.board[vital_point[0] - right] !== colors.EMPTY){
        continue;
      }

      if (b.board[vital_point[0] + 2 * up] !== colors.EMPTY
      || b.board[vital_point[0] + up + right] !== colors.EMPTY
      || b.board[vital_point[0] + up - right] !== colors.EMPTY) {
        vital_point[0] += up;
        return 1;
      }
    }

    /* Case 2. */
    if (!is_attack_point) {
      if (b.approxlib(vital_point[0], b.OTHER_COLOR(owl.color), 1, null) === 0) {
        for (k = 4; k < 8; k++) {
          let pos = vital_point[0] + b.delta[k];
          if (b.board[pos] === b.OTHER_COLOR(owl.color) && b.countlib(pos) === 1) {
            b.findlib(pos, 1, vital_point);
            return 1;
          }
        }
      }
    }

    /* Case 3. */
    if (is_attack_point
      && this.does_capture_something(vital_point[0], b.OTHER_COLOR(owl.color))
      && this.accuratelib(vital_point[0], b.OTHER_COLOR(owl.color), 2, libs) === 1
      && !this.attack(libs[0], null)) {
      vital_point[0] = NO_MOVE;
      return 1;
    }

    return 0;
  },

  /* The purpose of this function is to avoid moves which needlessly
   * fill in an eye. A typical example, from ld_owl:188, is
   *
   * -----+
   * .O.OX|
   * XOOXX|
   * XXOOX|
   * .XXO.|
   * ..XOO|
   * ..XXX|
   *
   * where various patterns manage to propose the eye-filling move on
   * the top edge instead of capturing the opponent stones and get two
   * solid eyes. This function modifies the move accordingly.
   */
  modify_eyefilling_move (move, color) {
    const b = this.board
    let k;
    let r;
    const other = b.OTHER_COLOR(color);
    /* Only do this for a small eye. */
    for (k = 0; k < 4; k++){
      if (b.ON_BOARD(move[0] + b.delta[k]) && b.board[move[0] + b.delta[k]] !== color){
        return 0;
      }
    }

    for (r = 4; r < 8; r++){
      if (b.board[move[0] + b.delta[r]] === other && b.countlib(move[0] + b.delta[r]) === 1) {
        for (k = 0; k < 4; k++){
          if (b.board[move[0] + b.delta[k]] === color
            && b.countlib(move[0] + b.delta[k]) === 1
            && !b.adjacent_strings(move[0] + b.delta[r], move[0] + b.delta[k])){
            break;
          }
        }

        if (k === 4) {
          let new_move = [];
          b.findlib(move[0] + b.delta[r], 1, new_move);
          // TRACE("Changing eyefilling move at %1m to capture at %1m.\n", *move, new_move);
          move[0] = new_move[0];
          return 1;
        }
      }
    }

    return 0;
  },

  /*
   * Generates up to max_moves moves, attempting to attack or defend the goal
   * dragon. The found moves are put in moves, an array of owl_move_data
   * structs, starting in the position 'initial'.  The entries in the array are
   * sorted by value with moves[initial] having highest priority. When no more
   * moves are available this is indicated by value and coordinates in the array
   * being -1.
   *
   * This function automatically initializes the owl_safe_move cache the
   * pattern list. WATCH OUT: This has to be matched with a call to
   * close_pattern_list(pattern_list)!!!
   *
   * Returns 1 if at least one move is found, or 0 if no move is found.
   */
  owl_shapes (pattern_list, moves, color, owl, type) {
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // int save_count_variations = count_variations;
    // sgf_dumptree = null;
    // count_variations = 0;

    current_owl_data = owl;

    this.clear_owl_move_data(moves);

    /* We must reset the owl safe_move_cache before starting the
     * pattern matching. The cache is used by owl_shapes_callback().
     */
    // memset(owl.safe_move_cache, 0, sizeof(owl.safe_move_cache));
    this.init_pattern_list(pattern_list);
    this.matchpat(this.collect_owl_shapes_callbacks, color, type, pattern_list, owl.goal);

    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;
  },

  /* This function contains all the expensive checks for a matched pattern. */
  check_pattern_hard (move, color, pattern, ll) {
    const b = this.board
    let constraint_checked = 0;
    let safe_move_checked = 0;

    /* The very first check is whether we can disregard the pattern due
     * due to an owl safe_move_cache lookup.
     */
    if (!(pattern.class & CLASS_s))
      if (current_owl_data.safe_move_cache[move]) {
        if (current_owl_data.safe_move_cache[move] === 1){
          return 0;
        }
        else{
          safe_move_checked = 1;
        }
      }

    /* If the constraint is cheap to check, we do this first. */
    if ((pattern.autohelper_flag & HAVE_CONSTRAINT) && pattern.constraint_cost < 0.45) {
      if (!pattern.autohelper.call(this, ll, move, color, 0)){
        return 0;
      }
      constraint_checked = 1;
    }

    /* For sacrifice patterns, the survival of the stone to be played is
     * not checked. Otherwise we discard moves which can be captured.
     * Illegal ko captures are accepted for ko analysis.
     */
    if (!(pattern.class & CLASS_s) && !safe_move_checked) {
      if (!this.owl_safe_move(move, color)) {
        return 0;
      }
      if (!b.is_legal(move, color)) {
        return 0;
      }
    }

    /* For class n patterns, the pattern is contingent on an opponent
     * move at * not being captured.
     *
     * We can't use owl_safe_move() here because we would try the wrong color.
     */
    if (pattern.class & CLASS_n) {
      if (this.safe_move(move, b.OTHER_COLOR(color)) === 0) {
        return 0;
      }
    }

    /* If the pattern has a constraint, call the autohelper to see
     * if the pattern must be rejected.
     */
    if ((pattern.autohelper_flag & HAVE_CONSTRAINT) && !constraint_checked){
      if (!pattern.autohelper(ll, move, color, 0)){
        return 0;
      }
    }
    return 1;
  },

  /* This initializes a pattern list, allocating memory for 200 patterns.
   * If more patterns need to be stored, collect_owl_shapes_callbacks will
   * dynamically reallocate additional memory.
   * The space for list.pattern_list is allocated here.
   *
   * This function is automatically called from owl_shapes. Every call here
   * has to be matched by a call to close_pattern_list below.
   */
  init_pattern_list (list) {
    this.gg_assert(!list.initialized);

    list.counter = 0;
    list.used = 0;

    list.pattern_list = new Array(200).fill().map(item => new MatchedPatternData())
    list.list_size = 200;
    list.pattern_heap = [];
    list.initialized = 1;
  },

  /* This function has to get called before the memory of *list is freed
   * in the calling function.
   */
  close_pattern_list (color, list) {
    if (list.initialized) {
      
    //   if (this.allpats && this.verbose) {
    //     int i;
    //     int found_one = 0;
    //     SGFTree *save_sgf_dumptree = sgf_dumptree;
    //     int save_count_variations = count_variations;
    //     sgf_dumptree = null;
    //     count_variations = 0;
    //
    //     if (!current_owl_data.lunches_are_current)
    //     owl_find_lunches(current_owl_data);
    //
    //     if (!list.pattern_heap)
    //     pattern_list_build_heap(list);
    //
    //     for (i = 0; i < list.heap_num_patterns; i++)
    //     if (check_pattern_hard(list.pattern_heap[i].move, color,
    //       list.pattern_heap[i].pattern,
    //       list.pattern_heap[i].ll)) {
    //       if (!found_one) {
    //         TRACE("Remaining valid (but unused) patterns at stack: ");
    //         dump_stack();
    //         found_one = 1;
    //       }
    //       TRACE("Pattern %s found at %1m with value %d\n",
    //         list.pattern_heap[i].pattern.name,
    //         list.pattern_heap[i].move,
    //         (int) list.pattern_heap[i].pattern.value);
    //     }
    //
    //     // sgf_dumptree = save_sgf_dumptree;
    //     // count_variations = save_count_variations;
    //   }

      list.pattern_list = []
      list.pattern_heap = []
    }
    list.counter = -1;
  },
  dump_pattern_list () {},

  /* This function stores a found pattern in the list for later evaluation.
   * The only processing done is computing the position of the move, and
   * forgetting the color.
   */
  collect_owl_shapes_callbacks (anchor, color, pattern, ll, data) {
    let matched_patterns = data;
    let next_pattern;

    if (matched_patterns.counter >= matched_patterns.list_size) {
      matched_patterns.list_size += 100;
      for(let i = matched_patterns.length; i<matched_patterns.list_size; i++ ){
        matched_patterns.pattern_list[i] = new MatchedPatternData()
      }
    }

    next_pattern = matched_patterns.pattern_list[matched_patterns.counter];
    next_pattern.move	= AFFINE_TRANSFORM(pattern.move_offset, ll, anchor);
    next_pattern.value	= pattern.value;
    next_pattern.ll	= ll;
    next_pattern.anchor	= anchor;
    next_pattern.pattern	= pattern;
    next_pattern.next_pattern_index = -1;

    matched_patterns.counter++;
  },

  valuate_combinable_pattern_chain (list, pos) {
    /* FIXME: This is just a first attempt at pattern combination.
   *	    Improve it.  The first idea is to differentiate between
   *	    move reason types.  For instance, when there is a secure
   *	    eye already, a threat to create another is more severe.
   *
   *	    This will certainly involve splitting the function into
   *	    attack and defense versions.
   */
    const b = this.board
    let pattern_index = list.first_pattern_index[pos];
    let num_capture_threats = 0;
    let capture_threats = [];
    let num_eye_threats = 0;
    let eye_threats = [];
    let num_reverse_sente = 0;
    let reverse_sente_against = [];
    let num_move_reasons;
    let full_value = 0.0;

    b.ASSERT1(pattern_index !== -1, pos);

    do {
      let pattern_data = list.pattern_list[pattern_index];

      /* Skip patterns that haven't passed constraint validation. */
      if (pattern_data.pattern) {
        for (let attribute = pattern_data.pattern.attributes; attribute.type !== attributeType.LAST_ATTRIBUTE; attribute++) {
          let k;
          let target = AFFINE_TRANSFORM(attribute.offset, pattern_data.ll, pattern_data.move);

          switch (attribute.type) {
            case attributeType.THREATENS_TO_CAPTURE:
              if (num_capture_threats < MAX_STORED_REASONS) {
                b.ASSERT1(b.IS_STONE(b.board[target]), target);
                target = b.find_origin(target);

                for (k = 0; k < num_capture_threats; k++) {
                  if (capture_threats[k] === target){
                    break;
                  }
                }

                if (k === num_capture_threats) {
                  capture_threats[num_capture_threats++] = target;
                  full_value += pattern_data.pattern.value;
                }
              }

              break;

            case attributeType.THREATENS_EYE:
              if (num_eye_threats < MAX_STORED_REASONS) {
                target = current_owl_data.my_eye[target].origin;

                for (k = 0; k < num_eye_threats; k++) {
                  if (eye_threats[k] === target){
                    break;
                  }
                }

                if (k === num_eye_threats) {
                  eye_threats[num_eye_threats++] = target;
                  full_value += pattern_data.pattern.value;
                }
              }

              break;

            case attributeType.REVERSE_SENTE:
              if (num_reverse_sente < MAX_STORED_REASONS) {
                b.ASSERT1(b.board[target] === colors.EMPTY, target);

                for (k = 0; k < num_reverse_sente; k++) {
                  if (reverse_sente_against[k] === target){
                    break;
                  }
                }

                if (k === num_reverse_sente) {
                  reverse_sente_against[num_reverse_sente++] = target;
                  full_value += pattern_data.pattern.value;
                }
              }

              break;

            default:
              this.gg_assert(0);
          }
        }
      }

      pattern_index = pattern_data.next_pattern_index;
    } while (pattern_index >= 0);


    num_move_reasons = num_capture_threats + num_eye_threats + num_reverse_sente;
    if (num_move_reasons <= 1) {
      /* Not much to combine, eh? */
      return 0;
    }

    if (num_move_reasons === 2){
      return  Math.min(gg_normalize_float2int(full_value, 1.0), 75);
    }
    if (num_move_reasons === 3){
      return  Math.min(gg_normalize_float2int(full_value * 0.85, 1.0), 90);
    }
    return  Math.min(gg_normalize_float2int(full_value * 0.75, 1.0), 99);
  },

  /* Compute the squared of the distance of a point on the board to the
   * center of the board.
   */
  bdist (move) {
    const b = this.board
    /* i = 0:              idist = - (board_size - 1)
     * i = board_size -1 : idist =    board_size - 1
     */
    let idist = 2*b.I(move) - b.board_size + 1;
    let jdist = 2*b.J(move) - b.board_size + 1;
    return idist*idist + jdist*jdist;
  },

  /* NOTICE : In order to stabilize the regression test results,
   * arbitrary parameters like pattern memory address and move position
   * have been included in the sorting algorithm.
   */
  BETTER_PATTERN (a, b) {
    return a.value > b.value || (a.value === b.value
      && (a.pattern < b.pattern	 || (a.pattern === b.pattern
        && (a.bdist < b.bdist	|| (a.bdist === b.bdist
          && a.move < b.move)))))
  },
  
  pattern_list_prepare (list) {
    const b = this.board
    let k;
    let pos;

    list.heap_num_patterns = 0;
    list.pattern_heap = [];


    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++)
      list.first_pattern_index[pos] = -1;

    for (k = 0; k < list.counter; k++) {
      let move = list.pattern_list[k].move;

      list.pattern_list[k].bdist = this.bdist(move);

      /* Allocate heap elements for normal patterns.  Link combinable
       * patterns in chains.
       */
      if (!(list.pattern_list[k].pattern.class & CLASS_c)){
        list.pattern_heap[list.heap_num_patterns++] = list.pattern_list[k];
      }
      else {
        list.pattern_list[k].next_pattern_index = list.first_pattern_index[move];
        list.first_pattern_index[move] = k;
      }
    }

    /* Allocate one heap element for each chain of combinable patterns
     * and calculate initial chain values (as if all patterns passed
     * constraint validation).
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (list.first_pattern_index[pos] !== -1) {
        let pattern_data = list.pattern_list[list.first_pattern_index[pos]];

        pattern_data.value = this.valuate_combinable_pattern_chain(list, pos);
        list.pattern_heap[list.heap_num_patterns++] = pattern_data;
      }
    }

    if (list.heap_num_patterns > 0){
      this.pattern_list_build_heap(list);
    }
  },

  /* Fast heap building.  Takes O(n) only. */
  pattern_list_build_heap (list) {
    let k;
    let limit = list.heap_num_patterns / 2;

    for (k = limit; --k >= 0;) {
      let parent;
      let child;
      let pattern_data = list.pattern_heap[k];

      for (parent = k; parent < limit; parent = child) {
        child = 2 * parent + 1;
        if (child + 1 < list.heap_num_patterns
        && this.BETTER_PATTERN(list.pattern_heap[child + 1], list.pattern_heap[child])){
          child++;
        }

        if (this.BETTER_PATTERN(pattern_data, list.pattern_heap[child])){
          break;
        }

        list.pattern_heap[parent] = list.pattern_heap[child];
      }

      list.pattern_heap[parent] = pattern_data;
    }
  },

  /* Pops patterns list's heap once. */
  pattern_list_pop_heap_once (list) {
    let parent;
    let child;

    list.heap_num_patterns--;
    for (parent = 0; 2 * parent + 1 < list.heap_num_patterns; parent = child) {
      child = 2 * parent + 1;
      if (this.BETTER_PATTERN(list.pattern_heap[child + 1], list.pattern_heap[child])){
        child++;
      }

      if (this.BETTER_PATTERN(list.pattern_heap[list.heap_num_patterns], list.pattern_heap[child])){
        break;
      }

      list.pattern_heap[parent] = list.pattern_heap[child];
    }

    list.pattern_heap[parent] = list.pattern_heap[list.heap_num_patterns];
  },

  /* Sink top element of heap because it got devalued.  This happens
   * when a combinable pattern doesn't pass check_pattern_hard() -- it
   * is no longer counted and its whole chain's value is reduced.
   */
  pattern_list_sink_heap_top_element (list) {
    let parent;
    let child;
    let heap_top_element = list.pattern_heap[0];

    for (parent = 0; 2 * parent + 1 < list.heap_num_patterns; parent = child) {
      child = 2 * parent + 1;
      if (child + 1 < list.heap_num_patterns
        && this.BETTER_PATTERN(list.pattern_heap[child + 1], list.pattern_heap[child])){
        child++;
      }

      if (this.BETTER_PATTERN(heap_top_element, list.pattern_heap[child])){
        break;
      }

      list.pattern_heap[parent] = list.pattern_heap[child];
    }

    list.pattern_heap[parent] = heap_top_element;
  },


  /* Adds all goal strings in the pattern area to the cuts[] list, if there
   * is more than one.
   */
  generate_cut_list (pattern, ll, anchor, cuts, owl) {
    const b = this.board
    let num = 0;
    let mark = [];

    for (let k = 0; k < pattern.patlen; k++) {
      let pos = AFFINE_TRANSFORM(pattern.patn[k].offset, ll, anchor);
      if (!b.IS_STONE(b.board[pos])){
        continue;
      }
      pos = b.find_origin(pos);
      if (!mark[pos] && b.board[pos] === owl.color && owl.goal[pos]) {
        cuts[num++] = pos;
        mark[pos] = 1;
        if (num === MAX_CUTS){
          return;
        }
      }
    }
    if (num === 1){
      cuts[0] = NO_MOVE;
    }
    // else if ((debug & DEBUG_SPLIT_OWL) && num > 1)
    //   gprintf("Move provokes %d cuts, among them %1m and %1m.\n", num, cuts[0], cuts[1]);
  },


  /* This function searches in the previously stored list of matched
   * patterns for the highest valued unused patterns that have a valid
   * constraint.  It returns the moves at the next empty positions in
   * the array moves[].  Empty positions in the moves array are marked
   * by having value <= 0.  There must be enough empty positions in the
   * list.
   *
   * If the highest valued pattern found has a value less than cutoff,
   * no move is returned.  Returns 1 if a move is found, 0 otherwise.
   *
   * This function also dispatches constraint validation of combinable
   * pattern chains.  Whenever a pattern from a chain fails constraints,
   * the chain is reevaluated and most likely drops in value enough to
   * let other patterns (or chains) climb to the top of pattern heap.
   *
   * This function loops until enough moves are found or the end of the
   * list is reached.
   */
  get_next_move_from_list (list, color, moves, cutoff, owl) {
    const b = this.board
    let move_found = 0;
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // int save_count_variations = count_variations;
    //
    // sgf_dumptree = null;
    // count_variations = 0;

    /* Prepare pattern list if needed. */
    if (!list.pattern_heap){
      this.pattern_list_prepare(list);
    }

    while (list.heap_num_patterns > 0) {
      let k;
      let move;
      let value;
      let ll;
      let anchor;
      let next_pattern_index;

      /* Peek top element of heap associated with pattern list. */
      if (list.pattern_heap[0].value < cutoff){
        break;
      }

      let pattern_data = list.pattern_heap[0];
      let pattern = list.pattern_heap[0].pattern;
      move    = list.pattern_heap[0].move;
      value   = list.pattern_heap[0].value;
      ll      = list.pattern_heap[0].ll;
      anchor  = list.pattern_heap[0].anchor;
      next_pattern_index = list.pattern_heap[0].next_pattern_index;

      list.used++;

      b.ASSERT_ON_BOARD1(move);
      for (k = 0; k < MAX_MOVES; k++) {
        if (moves[k].pos === move || moves[k].value <= 0){
          break;
        }
      }

      if (moves[k].pos === move) {
        /* No point in testing this pattern/chain.  Throw it out. */
        this.pattern_list_pop_heap_once(list);
        continue;
      }

      /* There has to be an empty space. */
      this.gg_assert(k < MAX_MOVES);

      /* If a pattern chain was devalued because its last pattern didn't
       * pass constraint validation, `pattern' is set null (i.e. nothing
       * more to test).  Note that devalued chains might still be
       * useful, i.e. if 2 of 3 patterns passed check_pattern_hard().
       */
      if (pattern === null || this.check_pattern_hard(move, color, pattern, ll)) {
        if (next_pattern_index === -1) {
          /* Normal pattern or last one in a chain. */
          this.pattern_list_pop_heap_once(list);
        }
        else {
          /* We just validated a non-last pattern in a chain.  Since the
           * chain remains at the same value, we keep the heap structure
           * untouched.  However, we need to set heap's top to point to
           * next pattern of the chain.
           */
          list.pattern_heap[0] = list.pattern_list.length + next_pattern_index;
          list.pattern_heap[0].value = value;
          continue;
        }

        moves[k].pos = move;
        moves[k].value = value;
        clear_cut_list(moves[k].cuts);
        move_found = 1;

        if (pattern && !(pattern.class & CLASS_c)) {
          moves[k].name = pattern.name;
          // TRACE("Pattern %s found at %1m with value %d\n", pattern.name, move, moves[k].value);

          if (pattern.class & CLASS_C) {
            /* Cut possible. (Only used in attack patterns). Try to find
             * goal strings in the pattern area and store them in the cut list
             * if there is more than one.
             */
            // DEBUG(DEBUG_SPLIT_OWL, "Generating cut list for move at %1m.\n", move);
            this.generate_cut_list(pattern, ll, anchor, moves[k].cuts, owl);
          }

          if (pattern.class & CLASS_B){
            moves[k].same_dragon = SAME_DRAGON_NOT_CONNECTED;
          }
          else if (pattern.class & CLASS_a) {
            moves[k].same_dragon = SAME_DRAGON_ALL_CONNECTED;
            moves[k].pattern_data = pattern_data;
          }
          else if (!(pattern.class & CLASS_b))
            moves[k].same_dragon = SAME_DRAGON_CONNECTED;
          else {
            let i;
            let same_dragon = SAME_DRAGON_MAYBE_CONNECTED;

            /* If we do not yet know whether the move belongs to the
             * same dragon, we see whether another pattern can clarify.
             */
            for (i = 0; i < list.heap_num_patterns; i++) {
              pattern_data = list.pattern_heap[i];

              if (pattern_data.pattern && pattern_data.move === move
              && ((pattern_data.pattern.class & CLASS_B) || !(pattern_data.pattern.class & CLASS_b))) {
                if (this.check_pattern_hard(move, color, pattern_data.pattern, pattern_data.ll)) {
                  // TRACE("Additionally pattern %s found at %1m\n", pattern_data.pattern.name, move);
                  if (pattern_data.pattern.class & CLASS_B){
                    same_dragon = SAME_DRAGON_NOT_CONNECTED;
                  }
                  else if (pattern_data.pattern.class & CLASS_a) {
                    same_dragon = SAME_DRAGON_ALL_CONNECTED;
                    moves[k].pattern_data = pattern_data;
                  }
                  else{
                    same_dragon = SAME_DRAGON_CONNECTED;
                  }

                  break;
                }
              }
            }

            moves[k].same_dragon = same_dragon;
          }
        }
        else {
          moves[k].name = "Pattern combination";
          // if (verbose) {
          //   /* FIXME: write names of all patterns in chain. */
          // }

          /* FIXME: Add handling of CLASS_b.
           *
           * FIXME: It is silently assumed that all patterns in the
           *	  chain have the same class.  When the last pattern in
           *	  chain didn't match, this will not work at all.
           */
          if (pattern && pattern.class & CLASS_B){
            moves[k].same_dragon = SAME_DRAGON_NOT_CONNECTED;
          }
          else if (pattern && pattern.class & CLASS_a) {
            moves[k].same_dragon = SAME_DRAGON_ALL_CONNECTED;
            moves[k].pattern_data = list.pattern_heap[0];
          }
          else
            moves[k].same_dragon = SAME_DRAGON_CONNECTED;
          }

        if (pattern && pattern.class & CLASS_E){
          moves[k].escape = 1;
        }
        else{
          moves[k].escape = 0;
        }

        break;
      }
      else {			/* !check_pattern_hard(...) */
        if (!(pattern.class & CLASS_c)) {
          /* Just forget about it. */
          this.pattern_list_pop_heap_once(list);
        }
        else {
          /* Set this pattern to not matched and advance to next one in
           * the chain, if any.
           */
          list.pattern_heap[0].pattern = null;
          if (next_pattern_index !== -1)
            list.pattern_heap[0] = list.pattern_list.length + next_pattern_index;

          /* Reevaluate chain and adjust heap structure accordingly. */
          list.pattern_heap[0].value = this.valuate_combinable_pattern_chain(list, move);
          this.pattern_list_sink_heap_top_element(list);
        }
      }
    }

    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;

    return move_found;
  },

  /* This function takes an array of already found moves (passed as
   * 'data') and looks for moves to replace these. Only moves near
   * the goal dragon are considered.
   */
  owl_shapes_callback (anchor, color, pattern, ll, data) {
    const b = this.board
    let tval;  /* trial move and its value */
    let moves = data; /* considered moves passed as data */
    let same_dragon = SAME_DRAGON_MAYBE_CONNECTED;
    let escape = 0;
    let defense_pos;

    /* Pick up the location of the move */
    let move = AFFINE_TRANSFORM(pattern.move_offset, ll, anchor);

    /* Before we do any expensive reading, check whether this move
     * already is known with a higher value or if there are too many
     * other moves with higher value.
     */
    if (!this.allpats) {
      let k;
      for (k = 0; k < MAX_MOVES; k++) {
        if (moves[k].value === -1){
          break;
        }
        if (moves[k].pos === move) {
          if (moves[k].value >= pattern.value){
            return;
          }
          else{
            break;
          }
        }
      }
      if (k === MAX_MOVES && moves[MAX_MOVES - 1].value >= pattern.value){
        return;
      }
    }

    if (!this.check_pattern_hard(move, color, pattern, ll)){
      return;
    }

    /* and work out the value of this move */
    if (pattern.helper) {
      /* ask helper function to consider the move */
      this.gg_assert(0);
      // DEBUG(DEBUG_HELPER, "  asking helper to consider '%s'+%d at %1m\n",pattern.name, ll, move);
      tval = pattern.helper(pattern, ll, move, color);

      if (tval > 0) {
        // DEBUG(DEBUG_HELPER, "helper likes pattern '%s' value %d at %1m\n",  pattern.name, tval, move);
      }
      else {
        // DEBUG(DEBUG_HELPER, "  helper does not like pattern '%s' at %1m\n",  pattern.name, move);
        return;  /* pattern matcher does not like it */
      }
    }
    else { /* no helper */
      tval = pattern.value;
    }

    /* having made it here, we have made it through all the extra checks */

    // TRACE("Pattern %s found at %1m with value %d\n", pattern.name, move, tval);

    if (pattern.class & CLASS_B){
      same_dragon = SAME_DRAGON_NOT_CONNECTED;
    }
    else if (pattern.class & CLASS_b){
      same_dragon = SAME_DRAGON_MAYBE_CONNECTED;
    }
    else if (pattern.class & CLASS_a) {
      same_dragon = SAME_DRAGON_ALL_CONNECTED;
      /* FIXME: Currently this code is only used with vital attack
       * moves, so there is no use for the "a" classification. If it
       * would be needed in the future it's necessary to set up a struct
       * matched_pattern_data here to be passed to owl_add_move(). This
       * is not all that simple with respect to memory management
       * however. Notice that a local variable in this function would go
       * out of scope too early.
       */
      this.gg_assert(0);
    }
    else{
      same_dragon = SAME_DRAGON_CONNECTED;
    }

    if (pattern.class & CLASS_E){
      escape = 1;
    }
    else{
      escape = 0;
    }

    /* Finally, check for position of defense move. */
    defense_pos = move;
    for (let k = 0; k < pattern.patlen; k++)
    if (pattern.patn[k].att === ATT_not){
      defense_pos = AFFINE_TRANSFORM(pattern.patn[k].offset, ll, anchor);
    }

    this.owl_add_move(moves, move, tval, pattern.name, same_dragon, NO_MOVE, escape, defense_pos, MAX_MOVES, null);
  },

  /* Add a move to the list of candidate moves */
  owl_add_move (moves, move, value, reason, same_dragon, lunch, escape, defense_pos, max_moves, pattern_data) {
    let k;

    if (!found_matches[move]) {
      found_matches[move] = 1;
      matches_found++;
    }

    /* Add the new move to the list of already found moves, if the value
     * is sufficently large. We keep the list sorted.
     *
     * First we must see if this move already is in the list.
     */
    for (k = 0; k < max_moves; k++) {
      if (moves[k].value === -1){
        break;
      }
      if (moves[k].pos === move) {
        if (same_dragon > moves[k].same_dragon) {
          moves[k].same_dragon = same_dragon;
          moves[k].pattern_data = pattern_data;
        }
        if (!moves[k].escape){
          escape = 0;
        }
        break;
      }
    }

    /* Did we already have this move in the list with a higher value? */
    if (k < max_moves && moves[k].value >= value){
      return;
    }

    /* Insert the move at the right place in the list and adjust other
     * entries as needed.
     */
    for (; k >= 0; k--) {
      if (k === 0 || value <= moves[k-1].value) {
        /* Can't get higher. Insert the move below this point and quit
         * looping.
         */
        if (k < max_moves) {
          moves[k].pos = move;
          moves[k].value = value;
          moves[k].name = reason;
          /* If B or b class pattern, this move shouldn't be added to the
                 * dragon under consideration.
           */
          moves[k].same_dragon = same_dragon;
          moves[k].pattern_data = pattern_data;
          moves[k].lunch = lunch;
          moves[k].escape = escape;
          moves[k].defense_pos = defense_pos;
        }
        break;
      }
      /* Shuffle the passed move one step downwards. */
      if (k < max_moves){
        moves[k] = moves[k-1]; /* struct copy */
      }
    }
  },

  /* Marks the dragons at apos and bpos. If only one dragon
   * needs marking, bpos should be passed as NO_MOVE.
   */
  owl_mark_dragon (apos, bpos, owl, new_dragons) {
    const b = this.board
    const color = b.board[apos];
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

  /* Marks the worms at apos and bpos. If only one worm
   * needs marking, bpos should be passed as NO_MOVE.
   */
  owl_mark_worm (apos, bpos, owl) {
    const b = this.board
    let color = b.board[apos];

    b.ASSERT1(bpos === NO_MOVE || b.board[bpos] === color, bpos);

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos)) {
        if (this.is_same_worm(pos, apos) || this.is_same_worm(pos, bpos)){
          owl.goal[pos] = 1;
        }
        else{
          owl.goal[pos] = 0;
        }
      }
    }

    owl.color = color;
  },

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
    const b = this.board
    let stones = []
    let num_stones = [];
    let k;
    let do_add = 1;
    let save_count_variations = b.count_variations;

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


  /* Computes the connected components of a the graph that is given by
   * having graph[i][j] = 1 if i and j are connected, and that has size
   * graph_size.
   *
   * This function is generic, but without having the fixed MAX_CUTS
   * array size it is ugly to write in ANSI C89 (no variably sized arrays),
   * so we leave it here for now.
   */
  connected_components (graph, graph_size, component) {
    let num_components = 0;
    let k, j;

    if (graph_size <= 0){
      return 0;
    }

    // memset(component, -1, MAX_CUTS);
    for (;;) {
      let found_one;
      /* Find unidentified string. */
      for (k = 0; k < graph_size; k++){
        if (component[k] === -1){
          break;
        }
      }
      if (k === graph_size){
        break; /* All are identified. */
      }
      component[k] = num_components; /* Start new component. */
      do { /* Spread new component. */
        found_one = 0;
        for (j = k+1; j < graph_size; j++){
          if (graph[k][j] && component[j] === -1) {
            component[j] = num_components;
            found_one = 1;
          }
        }
      } while (found_one);
      num_components++;
    }
    this.gg_assert(num_components > 0);
    return num_components;
  },

  /* This functions gets called after a move has been made that threatens
 * to cut the owl goal dragon. It cuts the goal if necessary, and sets it
 * to the biggest remaining component.
 */
  owl_test_cuts (goal, color, cuts) {
    const b = this.board
    let k, j;
    let connected = new Array(MAX_CUTS).map(item => new Array(MAX_CUTS).fill(1))
    /* let connect_move[MAX_CUTS][MAX_CUTS]; */
    let num_cuts;
    let found_cut = 0;
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // let save_count_variations = count_variations;

    // sgf_dumptree = null;
    // count_variations = 0;

    // memset(connected, 1, MAX_CUTS*MAX_CUTS);
    // if (debug & DEBUG_SPLIT_OWL) {
    //   gprintf("Called for this goal: ");
    //   goaldump(goal);
    //   gprintf("At this position:\n");
    //   showboard(0);
    // }

    /* Delete captured strings from list. */
    for (k = 0; k < MAX_CUTS; k++) {
      if (cuts[k] === NO_MOVE)
        break;
      if (b.board[cuts[k]] === colors.EMPTY) {
        for (j = k + 1; j < MAX_CUTS; j++) {
          if (cuts[j] === NO_MOVE)
            break;
          cuts[j-1] = cuts[j];
        }
        cuts[k] = NO_MOVE;
        k--;
      }
    }
    num_cuts = k;

    /* Test for each pair of strings in cuts[] whether it can now be
     * disconnected.
     */
    for (k = 0; k < num_cuts; k++) {
      b.ASSERT1(b.board[cuts[k]] === color, cuts[k]);
      for (j = k + 1; j < num_cuts; j++){
        if (this.fast_disconnect(cuts[k], cuts[j], null) === codes.WIN) {
          found_cut = 1;
          connected[k][j] = 0;
          connected[j][k] = 0;
        }
      }
    }

    if (found_cut) {
      let component = []
      let component2 = [];
      let component_size = []
      let biggest_component = -1;
      let conn_data;
      let c_id;
      let pos;

      /* Start by computing the connected components among the strings
       * listed in cuts[].
       */
      let num_components = this.connected_components(connected, num_cuts, component);
      if (num_components <= 1) {
        // sgf_dumptree = save_sgf_dumptree;
        // count_variations = save_count_variations;
        return;
      }

      /* Now break up the goal by associating each goal stone to one of
       * the connected components.
       *
       * First we compute the connection distances from each of the
       * partial goals we have found.
       */
      // memset(component2, -1, b.BOARDMAX);
      // memset(component_size, 0, sizeof(int) * num_components);
      // conn_data = malloc(sizeof(struct connection_data) * num_components);
      for (c_id = 0; c_id < num_components; c_id++) {
        let this_goal = [];
        // memset(this_goal, 0, b.BOARDMAX);

        for (k = 0; k < num_cuts; k++){
          if (component[k] === c_id) {
            b.mark_string(cuts[k], this_goal, 1);
            b.mark_string(cuts[k], component2, c_id);
          }
        }
        this.init_connection_data(color, this_goal, NO_MOVE, FP(3.01), conn_data + c_id, 1);
        this.spread_connection_distances(color, conn_data + c_id);
      }

      /* Now put each goal string to the component to which it has the
       * smallest distance.
       */
      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        let closest_dist = HUGE_CONNECTION_DISTANCE;
        let closest_component = -1;
        if (b.board[pos] !== color || !goal[pos]){
          continue;
        }
        if (pos !== b.find_origin(pos)){
          continue;
        }
        for (c_id = 0; c_id < num_components; c_id++) {
          if (conn_data[c_id].distances[pos] < closest_dist) {
            closest_dist = conn_data[c_id].distances[pos];
            closest_component = c_id;
          }
        }
        /* FIXME: What to do if no close component found? */
        if (closest_component !== -1) {
          b.mark_string(pos, component2, closest_component);
          component_size[closest_component] += b.countstones(pos);
        }
      }

      /* Now find the biggest_component. */
      let biggest_size = 0;
      for (c_id = 0; c_id < num_components; c_id++)
        if (component_size[c_id] > biggest_size) {
          biggest_size = component_size[c_id];
          biggest_component = c_id;
        }
      this.gg_assert(biggest_component !== -1);

      /* Now delete everything except the biggest component from the goal. */
      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
        if (component2[pos] !== biggest_component){
          goal[pos] = 0;
        }
      }
      // if (debug & DEBUG_SPLIT_OWL) {
      //   gprintf("Split dragon. Biggest component is %d (of %d).\n",  biggest_component, num_components);
      //   showboard(0);
      //   componentdump(component2);
      // }
      // free(conn_data);
    }
    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;
  },

  /* We update the boundary marks. The boundary mark must be
   * constant on each string. It is nonzero if the string
   * adjoins the goal dragon, or if the string includes a
   * stone played in the course of analysis. If the string
   * adjoins a live friendly dragon, the boundary mark is 2.
   */
  owl_update_boundary_marks (pos, owl) {
    const b = this.board
    let boundary_mark = 0;

    for (let k = 0; k < 4; k++) {
      let pos2 = pos + b.delta[k];

      if (b.ON_BOARD(pos2) && owl.boundary[pos2] > boundary_mark){
        boundary_mark = owl.boundary[pos2];
      }

      if (b.board[pos2] === owl.color
        && this.dragon[pos2].color === owl.color
        && this.dragon[pos2].status === dragon_status.ALIVE
        && !owl.goal[pos2]
        && !owl.neighbors[pos2]){
        boundary_mark = 2;
      }
    }

    b.mark_string(pos, owl.boundary, boundary_mark);
  },
  goaldump () {},
  componentdump () {},

  /*
 * Owl attack moves are ineffective when the dragon can still live in a
 * semeai. This function tests whether an owl attack move has this problem.
 * If not, an owl attack move reason is added, otherwise we treat the
 * move as a strategic attack.
 */
  test_owl_attack_move (pos, dr, kworm, acode) {
    const b = this.board
    const color = b.OTHER_COLOR(b.board[dr]);
    if (this.DRAGON2(dr).semeais === 0
      || this.DRAGON2(dr).semeai_defense_point === NO_MOVE
      || (this.DRAGON2(dr).semeais === 1 && this.semeai_move_reason_known(pos, dr))
      || acode === codes.GAIN) {
      this.add_owl_attack_move(pos, dr, kworm, acode);
      // DEBUG(DEBUG_OWL, "owl: %1m attacks %1m (%s) at move %d\n",
      //   pos, dr, result_to_string(this.DRAGON2(dr).owl_attack_code), movenum+1);
    }
    else {
      let dr2 = this.DRAGON2(dr).semeai_defense_target;
      let semeai_result = [], certain = [];
      // let save_verbose = verbose;
      // if (verbose > 0)
      //   verbose--;
      this.owl_analyze_semeai_after_move(pos, color, dr, dr2, semeai_result, null, null, 1, certain, 0);
      // verbose = save_verbose;
      if (certain[0] >= this.DRAGON2(dr).semeai_defense_certain
        && (semeai_result[0] >= REVERSE_RESULT(acode))) {
        /* Demote the move reasons. */
        // DEBUG(DEBUG_OWL, "owl: %1m ineffective owl attack on %1m (can live in semeai with %1m)\n", pos, dr, dr2);
        this.add_strategical_attack_move(pos, dr);
      }
      else {
        this.add_owl_attack_move(pos, dr, kworm, acode);
        // DEBUG(DEBUG_OWL, "owl: %1m attacks %1m (%s) at move %d\n",
        //   pos, dr, result_to_string(DRAGON2(dr).owl_attack_code), movenum+1);
      }
    }
  },

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
    const b = this.boardReadConnect
    let color = b.board[target];
    let result = [0];
    let owl = new LocalOwlData()

    let reading_nodes_when_called = this.get_reading_node_counter();
    let tactical_nodes;
    let wpos = [NO_MOVE];
    let wid = [MAX_GOAL_WORMS];
    // let start = 0.0;

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
      if (b.board[pos] === color && owl.goal[pos]) {
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


  /* Try to improve the move to attack a lunch. Essentially we try to avoid
   * unsafe moves when there are less risky ways to attack.
   *
   * This function also improves lunch attack point in a special case when
   * we capture a one- or two-stone lunch on the first line. If we eat it
   * with a first line move, there is a huge risk we'll end up with a false
   * eye. Therefore, we move the attack to the second line when it works.
   *
   *   .*OO	.*OOO	    .*OOOO
   *   .,XO	.,X.O	    .,XX.O
   *   ----	-----	    ------
   *
   * In all these position the attack point is moved from ',' to '*'.
   */
  improve_lunch_attack (lunch, attack_point) {
    const b = this.board
    const color = b.OTHER_COLOR(b.board[lunch]);
    let defense_point = [];

    if (this.safe_move(attack_point, color)) {
      if (b.is_edge_vertex(lunch)
        && b.is_edge_vertex(attack_point)
        && b.neighbor_of_string(attack_point, lunch)) {
        let stones = b.countstones(lunch);
        let libs = [];

        if (stones === 1 || (stones === 2
            && b.findlib(lunch, 2, libs) === 2
            && b.is_edge_vertex(libs[0])
            && b.is_edge_vertex(libs[1]))) {
          for (let k = 0; k < 4; k++) {
            let apos = attack_point + b.delta[k];
            if (!b.ON_BOARD(attack_point - b.delta[k]) && b.board[apos] === colors.EMPTY) {
              if (this.does_attack(apos, lunch) && this.safe_move(apos, color)){
                return apos;
              }
              break;
            }
          }
        }
      }

      return attack_point;
    }

    for (let k = 0; k < 4; k++) {
      let pos = attack_point + b.delta[k];
      if (b.board[pos] === color
        && this.attack(pos, null)
        && this.find_defense(pos, defense_point)
        && defense_point[0] !== NO_MOVE
        && this.does_attack(defense_point[0], lunch)) {
        // TRACE("Moved attack of lunch %1m from %1m to %1m.\n", lunch, attack_point, defense_point);
        return defense_point[0];
      }
    }

    return attack_point;
  },


  /* Try to improve the move to defend a lunch.
   *
   * An example where this is useful is the position below, where the
   * defense of A is moved from b to c. This is a possible variation in
   * ld_owl:182.
   *
   * ...X..|      ...X..|
   * ...X..|	...Xc.|
   * ..XXO.|	..XXOb|
   * XXXOOX|	XXXOOA|
   * XOOOX.|	XOOOX.|
   * .XOX.X|	.XOX.X|
   * ------+	------+
   */
  improve_lunch_defense (lunch, defense_point) {
    const b = this.board
    const color = b.board[lunch];

    for (let k = 0; k < 4; k++) {
      let pos = defense_point + b.delta[k];
      if (b.board[pos] === b.OTHER_COLOR(color)
        && b.countlib(pos) === 2) {
        let libs = [];
        let pos2;

        b.findlib(pos, 2, libs);
        if (libs[0] === defense_point){
          pos2 = libs[1];
        }
        else{
          pos2 = libs[0];
        }

        if (b.accuratelib(pos2, color, b.MAXLIBS, null) > b.accuratelib(defense_point, color, b.MAXLIBS, null)
          && this.does_defend(pos2, lunch)) {
          // TRACE("Moved defense of lunch %1m from %1m to %1m.\n", lunch, defense_point, pos2);
          return pos2;
        }
      }
    }

    return defense_point;
  },


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


  /* True unless (pos) is colors.EMPTY or occupied by a lunch for the goal dragon.
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


  /* Caching version of safe_move for the callback. This function has
   * its own cache, separate from the global safe move cache. Note that
   * since the cache is reset by owl_shapes before starting pattern
   * matching, and since (unlike safe_move) this function is always
   * called from the same place in owl_shapes_callback, the color will
   * be the same each time it is called. So there is no need to have
   * separate caches for B and W.
   */
  owl_safe_move (move, color) {
    const b = this.board
    let acode, safe = 0;

    if (b.trymove(move, color, "owl_safe_move", 0)) {
      acode = this.attack(move, null);
      if (acode !== codes.WIN){
        safe = 1;
      }
      else{
        safe = 0;
      }
      b.popgo();
    }
    current_owl_data.safe_move_cache[move] = safe+1;
    return safe;
  },

  owl_substantial (str) {
    const b = this.board
    let k;
    let libs = [];
    let liberties = b.findlib(str, MAX_SUBSTANTIAL_LIBS+1, libs);
    let reading_nodes_when_called = this.get_reading_node_counter();
    let tactical_nodes;
    let result;
    // double start = 0.0;
    let owl = new LocalOwlData();
    let num_moves = 0;

    // if (debug & DEBUG_OWL_PERFORMANCE)
    //   start = gg_cputime();

    /* FIXME: We want to use the full init_owl here too (cf. similar
     * remark below).
     */
    this.reduced_init_owl(owl, 1);

    owl.color = b.OTHER_COLOR(b.board[str]);
    local_owl_node_counter = 0;

    /* Big strings are always substantial since the biggest nakade is
     * six stones. (There are probably rare exceptions to this
     * rule, but they are unlikely to come up in a game.)
     */
    if (b.countstones(str) > 6){
      return 1;
    }

    if (liberties > MAX_SUBSTANTIAL_LIBS){
      return 0;
    }

    // memset(owl.goal, 0, sizeof(owl.goal));
    /* Mark the neighbors of the string. If one is found which is alive, return
     * true. */
    let adjs = [];
    let adj = b.chainlinks(str, adjs);
    for (k = 0; k < adj; k++) {
      if (this.dragon[adjs[k]].status === dragon_status.ALIVE){
        return 1;
      }
      this.mark_dragon(adjs[k], owl.goal, 1);
    }

    /* We must check the cache while stackp === 0, but we wait until the
     * trivial tests have been done.
     */
    if (this.search_persistent_owl_cache(routine_id.OWL_SUBSTANTIAL, str, 0, 0, result, null, null, null)){
      return result;
    }

    /* fill all the liberties */
    for (k = 0; k < liberties; k++) {
      if (b.trymove(libs[k], owl.color, null, 0)) {
        if (this.get_level() >= 8){
          this.increase_depth_values();
        }
        owl.goal[libs[k]] = 1;
        num_moves++;
      }
      else {
        /* if we can't fill, try swapping with the next liberty */
        if (k < liberties-1
          && b.trymove(libs[k+1], owl.color, null, 0)) {
          if (this.get_level() >= 8){
            this.increase_depth_values();
          }
          owl.goal[libs[k+1]] = 1;
          libs[k+1] = libs[k];
          num_moves++;
        }
        else {
          /* Can't fill the liberties. Give up! */
          while (num_moves-- > 0) {
            if (this.get_level() >= 8) {
              this.decrease_depth_values();
            }
            b.popgo();
          }
          return 0;
        }
      }
    }
    /* FIXME: We would want to use init_owl() here too, but it doesn't
     * fit very well with the construction of the goal array above.
     */
    owl.cumulative_goal = owl.goal.slice()
    // memcpy(owl.cumulative_goal, owl.goal, b.BOARDMAX);
    this.compute_owl_escape_values(owl);
    this.owl_mark_boundary(owl);
    owl.lunches_are_current = 0;

    if (this.do_owl_attack(libs[0], null, null, owl, 0)){
      result = 0;
    }
    else{
      result = 1;
    }
    while (num_moves-- > 0) {
      if (this.get_level() >= 8){
        this.decrease_depth_values();
      }
      b.popgo();
    }

    tactical_nodes = this.get_reading_node_counter() - reading_nodes_when_called;
    // DEBUG(DEBUG_OWL_PERFORMANCE,
    //   "owl_substantial %1m, result %d (%d, %d nodes, %f seconds)\n",
    //   str, result, local_owl_node_counter, tactical_nodes, gg_cputime() - start);

    this.store_persistent_owl_cache(routine_id.OWL_SUBSTANTIAL, str, 0, 0, result,
      0, 0, 0, tactical_nodes, owl.goal, owl.color);

    return result;
  },

  /* Returns true if and only if (i, j) is a 1-2 vertex, i.e. next to a
   * corner.
   */
  one_two_point (pos) {
    const b = this.board
    const i = b.I(pos);
    const j = b.J(pos);

    if ((i === 0 || i === b.board_size-1 || j === 0 || j === b.board_size-1)
      && (i === 1 || i === b.board_size-2 || j === 1 || j === b.board_size-2)){
      return 1;
    }

    return 0;
  },

  /* Reports the number of eyes gotten by capturing a boundary string.
   * This implementation tends to give an optimistic view of the
   * chances, so if it tells that the lunch is worthless, it truly
   * should be. The converse is not true.
   */
  sniff_lunch (lunch, min, probable, max, owl) {
    const b = this.board
    const other = b.OTHER_COLOR(b.board[lunch]);
    let libs = [];
    let r;

    b.ASSERT1(b.IS_STONE(b.board[lunch]), lunch);

    if (owl.boundary[lunch] === 2) {
      min[0] = 2;
      probable[0] = 2;
      max[0] = 2;
      return;
    }

    /* Do we believe this capture would help escaping? */
    let liberties = b.findlib(lunch, b.MAXLIBS, libs);
    for (r = 0; r < liberties; r++) {
      if (owl.escape_values[libs[r]] > 0 && !b.is_self_atari(libs[r], other)) {
        let k;
        for (k = 0; k < 8; k++){
          if (b.ON_BOARD(libs[r] + b.delta[k]) && owl.goal[libs[r] + b.delta[k]]){
            break;
          }
        }
        if (k === 8) {
          min[0] = 2;
          probable[0] = 2;
          max[0] = 2;
          return;
        }
      }
    }

    this.estimate_lunch_eye_value(lunch, min, probable, max, 1);

    if (min[0] < 2) {
      const bonus = this.estimate_lunch_half_eye_bonus(lunch, owl.half_eye);
      min[0] += bonus/2;
      probable[0] += bonus;
      max[0] += (bonus + 1)/2;
    }

    if (probable[0] < 2){
      this.eat_lunch_escape_bonus(lunch, min, probable, max, owl);
    }
  },

  /* Capturing a lunch can give eyes by turning a false eye into a proper one,
   * etc. This function returns the likely increase in half eyes
   * by capturing the string at (lunch).
   */
  estimate_lunch_half_eye_bonus (lunch, half_eye) {
    const b= this.board
    let stones = [];
    let size = b.findstones(lunch, 10, stones);
    let half_eyes = 0;

    b.ASSERT1(size < 10, lunch);

    for (let k = 0; k < size; k++) {
      let stone = stones[k];
      for (let d = 4; d < 8; d++) {
        let pos = stone + b.delta[d];
        if (b.ON_BOARD(pos) && (this.is_halfeye(half_eye, pos) || this.is_false_eye(half_eye, pos))){
          half_eyes++;
        }
      }
    }
    return half_eyes;
  },

  // pointers: min, probable, max
  estimate_lunch_eye_value (lunch, min, probable, max, appreciate_one_two_lunches) {
    const b = this.board
    const other = b.OTHER_COLOR(b.board[lunch]);
    const size = b.countstones(lunch);

    if (size > 6) {
      min[0] = 2;
      probable[0] = 2;
      max[0] = 2;
    }
    else if (size > 4) {
      min[0] = 1;
      probable[0] = 2;
      max[0] = 2;
    }
    else if (size > 2) {
      min[0] = 0;
      probable[0] = 1;
      max[0] = 2;
    }
    else if (size === 2) {
      let stones = []
      b.findstones(lunch, 2, stones);
      /* A lunch on a 1-2 point tends always to be worth contesting. */
      if ((this.obvious_false_eye(stones[0], other) || this.obvious_false_eye(stones[1], other))
        && (!appreciate_one_two_lunches || !(this.one_two_point(stones[0]) || this.one_two_point(stones[1])))) {
        min[0] = 0;
        probable[0] = 0;
        max[0] = 0;
      }
      else {
        min[0] = 0;
        probable[0] = 1;
        max[0] = 1;
      }
    }
    else if (size === 1) {
      if (!this.obvious_false_eye(lunch, other)) {
        min[0] = 0;
        probable[0] = 1;
        max[0] = 1;
      }
      else {
        min[0] = 0;
        probable[0] = 0;
        max[0] = 0;
      }
    }
  },

  /* Gives a bonus for a lunch capture which joins a (or some) friendly
   * string(s) to the goal dragon and improves the escape potential at
   * the same time. This is indicated in some situations where the owl
   * code would stop the analysis because of various cutoffs. See
   * do_owl_defend()
   *
   * The following implementation tries to get a precise idea of the
   * escape potential improvement by calling dragon_escape() twice.

   * pointers: min, max, probable
   */
  eat_lunch_escape_bonus (lunch, min, probable, max, owl) {
    const b = this.board
    let adjacent = [];
    let neighbors;
    let adjoins = 0;
    let n;

    /* Don't mess up with kos */
    if (b.is_ko_point(lunch)){
      return;
    }

    neighbors = b.chainlinks(lunch, adjacent);
    for (n = 0; n < neighbors; n++){
      adjoins |= !owl.goal[adjacent[n]];
    }

    if (adjoins) {
      let before, after;
      before = this.dragon_escape(owl.goal, owl.color, owl.escape_values);
      /* if the escape route is already large enough to be considered
       * a WIN by the owl code, then no need for more */
      if (before < 5) {
        let new_goal = owl.goal.slice()
        // memcpy(new_goal, owl.goal, sizeof(new_goal));
        for (n = 0; n < neighbors; n++){
          if (!owl.goal[adjacent[n]]){
            b.mark_string(adjacent[n], new_goal, 2);
          }
        }
        after = this.dragon_escape(new_goal, owl.color, owl.escape_values);

        /* Following is completely ad hoc. Another set of tests might
         * very well get better results. */
        if (after - before >= 3) {
          if (after >= 8 || (before === 0 && after >= 5)) {
            probable[0] = 2;
            max[0] = 2;
          }
          else if (max[0] < 2){
            max[0]++;
          }
        }
      }
    }
  },

  /* Find a new origin when it has been captured or cut out of the
   * goal. Used in do_owl_attack()
   */
  select_new_goal_origin (origin, owl) {
    const b = this.board
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.board[pos] === owl.color && owl.goal[pos] === 1){
        return b.find_origin(pos);
      }
    }

    return origin;
  },


  /* Retrieve topological eye values stored in the half_eye[] array of
   * the current owl data.
   *
   * FIXME: Sooner or later we'll want this to return a non-rounded
   * value. When we change this, we have to review all patterns using
   * the autohelper owl_topological_eye().
   */
  owl_topological_eye (pos, color) {
    let value = current_owl_data.half_eye[pos].value;
    if (value > 2.0 && value < 4.0){
      return 3;
    }
    else if (value <= 2.0){
      return parseInt(value + 0.99); /* Round up. */
    }
    else{
      return parseInt(value);          /* Round down. */
    }
  },

  /* This function returns true if it is judged that the capture of the
   * string at (pos) is sufficient to create one eye.
   *
   * Update: Now it instead returns the max number of eyes.
   */
  vital_chain (pos) {
    let min = [];
    let probable = [];
    let max = [];
    this.sniff_lunch(pos, min, probable, max, current_owl_data);

    return max[0];
  },


  compute_owl_escape_values (owl) {
    const b = this.board
    let safe_stones = [];
    // SGFTree *save_sgf_dumptree = sgf_dumptree;
    // let save_count_variations = count_variations;
    let mx = [];
    // memset(mx, 0, sizeof(mx));

    // sgf_dumptree = null;
    // count_variations = 0;
    this.get_lively_stones(b.OTHER_COLOR(owl.color), safe_stones);
    // sgf_dumptree = save_sgf_dumptree;
    // count_variations = save_count_variations;

    this.compute_escape_influence(owl.color, safe_stones, null, null, owl.escape_values);

    // DEBUG(DEBUG_ESCAPE, "Owl escape values:\n");
    for (let m = 0; m < b.board_size; m++) {
      for (let n = 0; n < b.board_size; n++) {
        let pos = b.POS(m, n);
        if (this.dragon[pos].color === owl.color && !owl.goal[pos]) {
          if (this.dragon[pos].crude_status === dragon_status.ALIVE){
            owl.escape_values[pos] = 6;
          }
          else if (this.dragon[pos].crude_status === dragon_status.UNKNOWN) {
            if (this.DRAGON2(pos).moyo_size > 5){
              owl.escape_values[pos] = 4;
            }
            else if (this.DRAGON2(pos).escape_route > 5) {
              if (mx[this.dragon[pos].origin]){
                owl.escape_values[pos] = owl.escape_values[this.dragon[pos].origin];
              }
              else {
                let pos2;
                let escape_values = [];
                let dragon_stones = [];

                this.compute_escape_influence(owl.color, safe_stones, owl.goal, null, escape_values);

                /* mark_dragon() can't be used here in case a string of
                 * the dragon was captured by the initial move in
                 * owl_does_attack(). Actually it isn't really proper to
                 * use is_same_dragon() at stackp>0 either but it's more
                 * robust at least.
                 */
                for (pos2 = b.BOARDMIN; pos2 < b.BOARDMAX; pos2++) {
                  if (b.ON_BOARD(pos2)){
                    this.dragon_stones[pos2] = this.is_same_dragon(pos2, pos);
                  }
                }

                if (this.dragon_escape(dragon_stones, owl.color, escape_values) > 5){
                  owl.escape_values[this.dragon[pos].origin] = 4;
                }

                mx[this.dragon[pos].origin] = 1;
              }
            }
          }
        }
        // DEBUG(DEBUG_ESCAPE, "%o%d", owl.escape_values[pos]);
      }
      // DEBUG(DEBUG_ESCAPE, "%o\n");
    }
  },

  /* Used by autohelpers. */
  owl_escape_value (pos) {
    /* FIXME: Should have a more robust mechanism to avoid
     * escaping inwards. Returning a negative value is just a kludge.
     */
    const b = this.board
    b.ASSERT_ON_BOARD1(pos);
    if (current_owl_data.goal[pos]){
      return -10;
    }

    if (b.board[pos] === colors.EMPTY){
      for (let k = 0; k < 8; k++){
        if (b.ON_BOARD(pos + b.delta[k]) && current_owl_data.goal[pos + b.delta[k]]){
          return -10;
        }
      }
    }

    return current_owl_data.escape_values[pos];
  },
  /* Used by autohelpers. */
  owl_goal_dragon (pos) {
    return current_owl_data.goal[pos] !== 0;
  },

  /* Used by autohelpers.
   * Returns 1 if (pos) is an eyespace for the color of the dragon currently
   * under owl investigation.
   */
  owl_eyespace (pos) {
    const b = this.board
    b.ASSERT_ON_BOARD1(pos);

    let origin = current_owl_data.my_eye[pos].origin;
    return (b.ON_BOARD(origin)
      && (current_owl_data.my_eye[origin].color === current_owl_data.color)
      && this.max_eyes(current_owl_data.my_eye[origin].value) > 0);
  },

  /* Used by autohelpers.
   * Returns 1 if (pos) is an eyespace for the color of the dragon currently
   * under owl investigation, which is possibly worth (at least) 2 eyes.
   */
  owl_big_eyespace (pos) {
    const b = this.board
    b.ASSERT_ON_BOARD1(pos);

    let origin = current_owl_data.my_eye[pos].origin;
    return (b.ON_BOARD(origin)
      && (current_owl_data.my_eye[origin].color === current_owl_data.color)
      && this.max_eyes(current_owl_data.my_eye[origin].value) >= 2);
  },

  /* Used by autohelpers.
   * Returns 1 if (pos) is an eyespace for the color of the dragon currently
   * under owl investigation.
   */
  owl_mineye (pos) {
    const b = this.board
    b.ASSERT_ON_BOARD1(pos);

    let origin = current_owl_data.my_eye[pos].origin;
    if (!b.ON_BOARD(origin) || (current_owl_data.my_eye[origin].color !== current_owl_data.color)){
      return 0;
    }

    return this.min_eyes(current_owl_data.my_eye[origin].value);
  },

  /* Used by autohelpers.
   * Returns 1 if (pos) is an eyespace for the color of the dragon currently
   * under owl investigation.
   */
  owl_maxeye (pos) {
    const b = this.board
    b.ASSERT_ON_BOARD1(pos);

    let origin = current_owl_data.my_eye[pos].origin;
    if (!b.ON_BOARD(origin) || (current_owl_data.my_eye[origin].color !== current_owl_data.color)){
      return 0;
    }

    return this.max_eyes(current_owl_data.my_eye[origin].value);
  },

  /* Used by autohelpers.
 * Returns 1 if (pos) is a non-marginal eyespace for the color of the
 * dragon currently under owl investigation.
 */
  owl_proper_eye (pos) {
    const b = this.board
    b.ASSERT_ON_BOARD1(pos);

    return ((current_owl_data.my_eye[pos].color === current_owl_data.color)
      && !current_owl_data.my_eye[pos].marginal);
  },

  /* Used by autohelpers.
   * Returns the effective size of the eyespace at pos.
   */
  owl_eye_size (pos) {
    const b = this.board
    b.ASSERT_ON_BOARD1(pos);

    let origin = current_owl_data.my_eye[pos].origin;
    return current_owl_data.my_eye[origin].esize - current_owl_data.my_eye[origin].msize;
  },

  /* Used by autohelpers.
   * Returns whether str is a lunch.
   */
  owl_lunch (str) {
    const b = this.board
    b.ASSERT_ON_BOARD1(str);
    b.ASSERT1(current_owl_data.lunches_are_current, str);
    let origin = b.find_origin(str);

    for (let k = 0; k < MAX_LUNCHES; k++) {
      if (current_owl_data.lunch[k] === NO_MOVE){
        break;
      }
      if (current_owl_data.lunch[k] === origin){
        return 1;
      }
    }

    return 0;
  },


  /* Used by autohelpers.

   * Returns 1 if (pos) is considered to be a strong dragon. This is
   * intended to be used to decide whether connecting to some external
   * stones is an easy way to live. The current implementation is fairly
   * conservative, requiring that (pos) was part of a dragon with two
   * eyes according to the static analysis. This requirement may be
   * relaxed considerably in the future.
   *
   * (pos) must not be part of the goal dragon.
   */
  owl_strong_dragon (pos) {
    const b = this.board
    b.ASSERT_ON_BOARD1(pos);
    b.ASSERT1(b.IS_STONE(b.board[pos]), pos);

    return (!current_owl_data.goal[pos]
      && this.dragon[pos].color === b.board[pos]
      && this.dragon[pos].crude_status === dragon_status.ALIVE);
  },


  owl_escape_route (owl) {
    const b = this.board
    let modified_escape = owl.escape_values.slice()
    // memcpy(modified_escape, owl.escape_values, sizeof(modified_escape));
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos) && owl.cumulative_goal[pos]){
        modified_escape[pos] = 0;
      }
    }
    return this.dragon_escape(owl.goal, owl.color, modified_escape);
  },

  /* This is a temporary solution. We want to be able to use the full
   * init_owl() also in owl_substantial.
   */
  reduced_init_owl (owl, at_bottom_of_stack) {
    if (at_bottom_of_stack){
      owl_stack = [owl]
    } else {
      owl_stack.push(owl)
    }
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


  /* Push owl data one step upwards in the stack. The stack is extended
   * with dynamically allocated memory if it is too small.
   *
   * This function no longer may move existing owl data around, so
   * existing pointers do not risk becoming invalid.
   */
  push_owl (owl) {
    owl_stack.push(owl);
  },

  /* Retrieve owl data from the stack. */
  pop_owl () {
    owl_stack.pop();
  },

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