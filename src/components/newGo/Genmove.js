import {
  DEFAULT_LEVEL, NO_MOVE, PASS_MOVE
} from './Constants'
import {Globals} from "./Globals";
import {Utils} from "./Utils";
import {Worm} from "./Worm";
import {Unconditional} from "./Unconditional";
import {Reading} from "./Reading";
import {MoveList} from "./MoveList";
import {Persistent} from "./Persistent";
import {Cache} from "./Cache"

// const EXAMINE_WORMS =               1
// const EXAMINE_INITIAL_INFLUENCE =   2
// const EXAMINE_DRAGONS_WITHOUT_OWL = 3
// const EXAMINE_DRAGONS =             4
// const EXAMINE_OWL_REASONS =         5
// const EXAMINE_INITIAL_INFLUENCE2 =  6
// const FULL_EXAMINE_DRAGONS =        7
const EXAMINE_ALL =                 99


export default class Genmove {
  constructor(board) {
    this.board = board
    Object.assign(this, Globals, Utils, Worm, Unconditional, Reading, MoveList,Persistent, Cache)

    this.initData()


    this.reading_cache_init()
    this.persistent_cache_init()
  }

  initData() {
    Object.assign(this, {
      limit_search : 0,
      search_mask : [],
      /* Position numbers for which various examinations were last made. */
      worms_examined : -1,
      initial_influence_examined : -1,
      dragons_examined_without_owl : -1,
      dragons_examined : -1,
      initial_influence2_examined : -1,
      dragons_refinedly_examined : -1,
    })
  }

  needsUpdate(x){
    // x = position_number
    return x !== this.position_number
  }

  get_level(){
    return DEFAULT_LEVEL
  }

  reset_engine() {
    /* Initialize things for hashing of positions. */
    this.reading_cache_clear();

    // hashdata_recalc(&board_hash, board, board_ko_pos);

    this.worms_examined = -1;
    this.initial_influence_examined = -1;
    this.dragons_examined_without_owl = -1;
    this.dragons_examined = -1;
    this.initial_influence2_examined = -1;
    this.dragons_refinedly_examined = -1;

    /* Prepare our table of move reasons. */
    // clear_move_reasons();
    // clear_break_in_list();

    /* Set up depth values (see comments there for details). */
    this.set_depth_values(this.get_level(), 0);

    /* Initialize arrays of moves which are meaningless due to
     * static analysis of unconditional status.
     */
    // clear_unconditionally_meaningless_moves();
  }

  examine_position(how_much, aftermath_play) {
    // let save_verbose = this.verbose;

    // 清除缓存
    // purge_persistent_caches();

    if (this.needsUpdate(this.worms_examined)) {
      this.worms_examined = this.position_number
      this.start_timer(0);
      this.make_worms();
      this.time_report(0, "  make worms", NO_MOVE, 1.0);
    }

  // if (how_much == EXAMINE_WORMS) {
  //   verbose = save_verbose;
  //   gg_assert(test_gray_border() < 0);
  //   return;
  // }
  //
  // if (stones_on_board(BLACK | WHITE) != 0) {
  //   if (NEEDS_UPDATE(initial_influence_examined))
  //     compute_worm_influence();
  //   if (how_much == EXAMINE_INITIAL_INFLUENCE) {
  //     verbose = save_verbose;
  //     gg_assert(test_gray_border() < 0);
  //     return;
  //   }
  //
  //   if (how_much == EXAMINE_DRAGONS_WITHOUT_OWL) {
  //     if (NEEDS_UPDATE(dragons_examined_without_owl))
  //       make_dragons(1);
  //     verbose = save_verbose;
  //     gg_assert(test_gray_border() < 0);
  //     return;
  //   }
  //
  //   if (NEEDS_UPDATE(dragons_examined)) {
  //     make_dragons(0);
  //     compute_scores(chinese_rules || aftermath_play);
  //     /* We have automatically done a partial dragon analysis as well. */
  //     dragons_examined_without_owl = position_number;
  //   }
  //   if (how_much == EXAMINE_DRAGONS) {
  //     verbose = save_verbose;
  //     gg_assert(test_gray_border() < 0);
  //     return;
  //   }
  // }
  // else if (how_much == EXAMINE_INITIAL_INFLUENCE
  //   || how_much == EXAMINE_DRAGONS
  //   || how_much == EXAMINE_ALL) {
  //   initialize_dragon_data();
  //   compute_scores(chinese_rules || aftermath_play);
  //   verbose = save_verbose;
  //   gg_assert(test_gray_border() < 0);
  //   return;
  // }
  //
  // verbose = save_verbose;
  //
  // if (NEEDS_UPDATE(initial_influence2_examined)) {
  //   compute_dragon_influence();
  // }
  // if (how_much == EXAMINE_INITIAL_INFLUENCE2) {
  //   gg_assert(test_gray_border() < 0);
  //   return;
  // }
  //
  // if (NEEDS_UPDATE(dragons_refinedly_examined)) {
  //   compute_refined_dragon_weaknesses();
  //   compute_strategic_sizes();
  // }
  // if (how_much == FULL_EXAMINE_DRAGONS) {
  //   gg_assert(test_gray_border() < 0);
  //   return;
  // }
  //
  // if (printworms)
  //   show_dragons();
  }

  silent_examine_position() {}

  genmove(color, value) {
    return this.do_genmove(color, 0.4, null, value) || PASS_MOVE;
  }

  collect_move_reasons() {}

  monte_carlo_genmove() {}

  /*
 * Perform the actual move generation.
 *
 * The array allowed_moves restricts which moves may be considered. If
 * NULL any move is allowed. Pass is always allowed and will be chosen
 * if the move generation doesn't like any of the allowed moves (or
 * overlooks them).
 */
  do_genmove(color, pure_threat_value, allowed_moves, value) {
    let average_score, pessimistic_score, optimistic_score;
    // let save_verbose;
    // let save_depth;
    let move;
    let dummy_value;
    // let use_thrashing_dragon_heuristics = 0;

    if (!value){
      value = dummy_value;
    }

    // start_timer(0);
    // clearstats();

    /* Prepare our table of moves considered. */
    this.potential_moves = []

    /* no move is found yet. */
    move = PASS_MOVE;
    value = 0.0;

    /* Prepare pattern matcher and reading code. */
    this.reset_engine();

    /* Store the depth value so we can check that it hasn't changed when
     * we leave this function.
     */
    // save_depth = this.depth;

    /* If in mirror mode, try to find a mirror move. */
    // if (play_mirror_go && (mirror_stones_limit < 0 || stones_on_board(WHITE | BLACK) <= mirror_stones_limit)
    // && find_mirror_move(&move, color)) {
    //   TRACE("genmove() recommends mirror move at %1m\n", move);
    //   *value = 1.0;
    //   return move;
    // }

    /* Find out information about the worms and dragons. */
    // start_timer(1);
    this.examine_position(EXAMINE_ALL, 0);
    // time_report(1, "examine position", NO_MOVE, 1.0);


    /* The score will be used to determine when we are safely
   * ahead. So we want the most conservative score.
   *
   * We always want to have the score from our point of view. So
   * negate it if we are black.
   */
  if (color === colors.WHITE) {
    pessimistic_score = this.black_score;
    optimistic_score = this.white_score;
  }
  else {
    pessimistic_score = -this.white_score;
    optimistic_score = -this.black_score;
  }

  if (color === colors.WHITE) {
    average_score = (this.white_score + this.black_score)/ 2.0;
  }
  else{
    average_score = -(this.white_score + this.black_score)/ 2.0;
  }
  // choose_strategy(color, average_score, game_status(color));

    // ......
    return move;
  }

  move_considered() {}

  revise_semeai(){}

  revise_thrashing_dragon() {}

  find_mirror_move() {}

  compute_scores() {}

  break_mirror_go() {}

  should_resign() {}


/*********************************************************************\
 *                Mark a limited search area                         *
\*********************************************************************/

/* Activate or deactivate search limit. */
  set_limit_search(value) {}

  set_search_diamond() {}

  reset_search_mask() {}

  set_search_mask() {}

  draw_search_area() {}

  within_search_area() {}
}