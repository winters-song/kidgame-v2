import {
  colors,
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
import {dragon_status} from "./Liberty";
import {Matchpat} from "./Matchpat";
import {Influence} from "./Influence";
import {Connections} from "./Connections";
import {Dragon} from "./Dragon";

import {transformation_init} from "./patterns/transform";
import {Test} from "./Test";

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
    Object.assign(this, Globals, Utils, Worm, Unconditional, Reading, MoveList,Persistent, Cache,
      Matchpat, Influence, Connections, Dragon, Test)

    this.initData()

    this.reading_cache_init()
    this.persistent_cache_init()

    transformation_init(board)
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

      // globals
      dragon: [],
      half_eye: [],
      black_vital_points: [],
      white_vital_points: [],
      cutting_points: []
    })
  }

  NEEDS_UPDATE(x){
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

    if (this.NEEDS_UPDATE(this.worms_examined)) {
      this.worms_examined = this.position_number
      this.start_timer(0);
      this.make_worms();
      this.time_report(0, "  make worms", NO_MOVE, 1.0);
    }

  //
  if (this.board.stones_on_board(colors.BLACK | colors.WHITE) !== 0) {
    if (this.NEEDS_UPDATE(this.initial_influence_examined)){
      this.compute_worm_influence();
    }
      if (this.NEEDS_UPDATE(this.dragons_examined)) {
        this.make_dragons(0);
        // compute_scores(chinese_rules || aftermath_play);
        /* We have automatically done a partial dragon analysis as well. */
        // dragons_examined_without_owl = position_number;
      }

  }
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

  collect_move_reasons(color) {
    this.worm_reasons(color);
    this.semeai_move_reasons(color);
    this.owl_reasons(color);
    this.cut_reasons(color);
    this.break_in_move_reasons(color);
    this.unconditional_move_reasons(color);
  }

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
    const b = this.board
    let average_score, pessimistic_score, optimistic_score;
    let save_verbose;
    let save_depth;
    let move;
    let dummy_value;
    let use_thrashing_dragon_heuristics = 0;

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
    save_depth = this.depth;

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

    b.ASSERT1(b.stackp === 0, null);

    /*
     * Ok, information gathering is complete. Now start to find some moves!
     */
    /* Pick up moves that we know of already. */
    // save_verbose = this.verbose;
    // if (this.verbose > 0){
    //   this.verbose--;
    // }
    // this.collect_move_reasons(color);
    // this.verbose = save_verbose;
    // time_report(1, "generate move reasons", NO_MOVE, 1.0);

    /* Try to find empty corner moves. */
    // this.fuseki(color);
    // b.ASSERT1(this.stackp === 0, null);

    /* Look for moves to break mirror play by the opponent. */
    this.break_mirror_go(color);

    /* If we are ahead by 5 points or more, consider a thrashing
     * dragon dangerous and change its status from DEAD to
     * UNKNOWN. Otherwise, pretend there is no thrashing dragon.
     */
    // if (!doing_scoring) {
    //   use_thrashing_dragon_heuristics = this.revise_thrashing_dragon(color, pessimistic_score, 5.0);
    // }

    /* The general pattern database. */
    // shapes(color);
    // time_report(1, "shapes", NO_MOVE, 1.0);
    // b.ASSERT1(this.stackp === 0, null);

    /* Look for combination attacks and defenses against them. */
    // this.combinations(color);
    // time_report(1, "combinations", NO_MOVE, 1.0);
    // b.ASSERT1(this.stackp === 0, null);


    /* Review the move reasons and estimate move values. */
    // if (review_move_reasons(&move, value, color,
    //   pure_threat_value, pessimistic_score, allowed_moves,
    //   use_thrashing_dragon_heuristics))
    // TRACE("Move generation likes %1m with value %f\n", move, *value);
    // gg_assert(stackp == 0);
    // time_report(1, "review move reasons", NO_MOVE, 1.0);


    /* If the move value is 6 or lower, we look for endgame patterns too. */
    // if (*value <= 6.0 && !disable_endgame_patterns) {
    //   endgame_shapes(color);
    //   endgame(color);
    //   gg_assert(stackp == 0);
    //   if (review_move_reasons(&move, value, color, pure_threat_value,
    //     pessimistic_score, allowed_moves,
    //     use_thrashing_dragon_heuristics))
    //   TRACE("Move generation likes %1m with value %f\n", move, *value);
    //   gg_assert(stackp == 0);
    //   time_report(1, "endgame", NO_MOVE, 1.0);
    // }

    /* If no move found yet, revisit any semeai and change the
    * status of the opponent group from DEAD to UNKNOWN, then
    * run shapes and endgame_shapes again. This may turn up a move.
    */
    // if (move === PASS_MOVE) {
    //   if (this.revise_semeai(color)) {
    //     this.shapes(color);
    //     this.endgame_shapes(color);
    //     if (this.review_move_reasons(move, value, color, pure_threat_value,
    //       pessimistic_score, allowed_moves, use_thrashing_dragon_heuristics)) {
    //       // TRACE("Upon reconsideration move generation likes %1m with value %f\n", move, *value);
    //     }
    //   }
    // }

    b.ASSERT1(b.stackp === 0);
    b.ASSERT1(b.test_gray_border() < 0);
    b.ASSERT1(this.depth === save_depth);

    return move;
  }

  move_considered() {}

  revise_semeai(){}

  /* If the opponent's last move added a stone to a dead dragon,
   * revise it's status to UNKNOWN. This will cause genmove to
   * generate moves restraining the dragon. We only do this if
   * we are ahead by 'advantage', and no owl threat has been found.
   */
  revise_thrashing_dragon(color, our_score, advantage) {
    const b = this.board
    let safe_stones = [];
    let strength = [];

    /* Trust the owl code's opinion if we are behind. */
    if (our_score < advantage){
      return 0;
    }

    if (this.disable_threat_computation
      || !this.thrashing_dragon
      || this.dragon[this.thrashing_dragon].status !== dragon_status.DEAD)
      return 0;

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++)
      if (b.ON_BOARD(pos) && this.thrashing_stone[pos]
        && this.worm[pos].unconditional_status !== dragon_status.DEAD) {
        this.dragon[pos].status = dragon_status.UNKNOWN;
        this.DRAGON2(pos).safety = dragon_status.ALIVE;
      }

    this.set_strength_data(b.OTHER_COLOR(color), safe_stones, strength);
    this.compute_influence(b.OTHER_COLOR(color), safe_stones, strength, this.OPPOSITE_INFLUENCE(color),
      NO_MOVE, "revised thrashing dragon");
    this.compute_refined_dragon_weaknesses();

    return 1;
  }

  find_mirror_move() {}

  /* Computer two territory estimates: for *upper, the status of all
   * cricital stones gets resolved in White's favor; vice verso for
   * black.
   */
  compute_scores(use_chinese_rules) {
    let safe_stones = [];
    let strength = [];

    // dragon.c
    this.set_strength_data(colors.WHITE, safe_stones, strength);
    // influence.c
    this.compute_influence(colors.EMPTY, safe_stones, strength, this.move_influence, NO_MOVE, "White territory estimate");
    this.white_score = this.influence_score(this.move_influence, use_chinese_rules);
    // dragon.c
    this.set_strength_data(colors.BLACK, safe_stones, strength);
    this.compute_influence(colors.EMPTY, safe_stones, strength, this.move_influence, NO_MOVE, "White territory estimate");
    this.black_score = this.influence_score(this.move_influence, use_chinese_rules);

  }

  /* Detect if a white opponent has played mirror go for at least 10
   * moves and if so play on tengen.
   *
   * Mirror breaking moves in other situations are handled by patterns
   * in patterns.db.
   */
  break_mirror_go(color) {
    const b = this.board
    let tengen = b.POS((b.board_size - 1) / 2, (b.board_size - 1) / 2);
    if (b.board[tengen] === colors.EMPTY
      && color === colors.BLACK
      && b.stones_on_board(colors.BLACK | colors.WHITE) > 10
      && this.test_symmetry_after_move(tengen, color, 1)) {
      // move_reasons.c
      this.set_minimum_move_value(tengen, 30.0);
      // TRACE("Play %1m to break mirror go, value 30.\n", tengen);
    }
  }

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