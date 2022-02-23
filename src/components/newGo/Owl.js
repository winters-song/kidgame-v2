import {colors, NO_MOVE} from "./Constants";
import {AFFINE_TRANSFORM, dragon_status, routine_id} from "./Liberty";
import {ATT_O} from "./patterns/Patterns";

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

class MatchedPatternsListData{}

let result_certain;

/* Statistics. */
let local_owl_node_counter;
/* Node limitation. */
let global_owl_node_counter = 0;

let current_owl_data = {};
let other_owl_data = {};

let goal_worms_computed = 0;
let owl_goal_worm = [];


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
  reading_limit_reached () {},
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
  do_owl_attack () {},
  owl_threaten_attack () {},
  owl_defend () {},
  do_owl_defend () {},
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
    // let save_count_variations = count_variations;
    const b = this.board

    /* Turn off sgf output during find_superstring(). */
    // count_variations = 0;

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
    // count_variations = save_count_variations;

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
    //   goaldump(owl->goal);
  },
  connected_components () {},
  owl_test_cuts () {},
  owl_update_boundary_marks () {},
  goaldump () {},
  componentdump () {},
  test_owl_attack_move () {},
  owl_reasons () {},
  owl_does_defend () {},
  owl_confirm_safety () {},
  owl_does_attack () {},
  owl_connection_defends () {},
  owl_find_lunches () {},
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
  list_goal_worms () {},
  prepare_goal_list () {},
  finish_goal_list () {},
  reset_owl_node_counter () {
    global_owl_node_counter = 0;
  },
  get_owl_node_counter () {
    return global_owl_node_counter
  }
}