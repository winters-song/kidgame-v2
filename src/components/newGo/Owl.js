import {colors, NO_MOVE} from "./Constants";

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


class LocalOwlData {}

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


let include_semeai_worms_in_eyespace = 0

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
  owl_attack () {},
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
  owl_mark_dragon () {},
  owl_mark_worm () {},
  owl_mark_boundary () {},
  owl_update_goal () {},
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
  owl_make_domains () {},


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

  reduced_init_owl () {},
  init_owl () {},
  check_owl_stack_size () {},
  do_push_owl () {},
  push_owl () {},
  pop_owl () {},
  list_goal_worms () {},
  prepare_goal_list () {},
  finish_goal_list () {},
  reset_owl_node_counter () {},
  get_owl_node_counter () {}
}