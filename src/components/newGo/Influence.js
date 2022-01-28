import {colors, InterpolationData, matchpat, NO_MOVE} from "./Constants";
import {AFFINE_TRANSFORM, DEFAULT_STRENGTH} from "./Liberty";
import {
  ATT_comma,
  ATT_not,
  ATT_O, ATT_X,
  CLASS_A,
  CLASS_B,
  CLASS_D, CLASS_e,
  CLASS_E,
  CLASS_I,
  CLASS_s,
  CLASS_t, HAVE_ACTION,
  HAVE_CONSTRAINT, INFLUENCE_CALLBACK
} from "./patterns/Patterns";
import {influencepat_db} from "./patterns/influence"
import {barrierspat_db} from "./patterns/barriers"

import {Globals} from './Globals'
import {gg_interpolate} from "./GgUtils";


const DEFAULT_ATTENUATION = cosmic_importance => (cosmic_importance * 2.7  + (1.0 - cosmic_importance) * 3.0)
const TERR_DEFAULT_ATTENUATION = cosmic_importance => (cosmic_importance * 2.15 + (1.0 - cosmic_importance) * 2.4)

/* Extra damping coefficient for spreading influence diagonally. */
const DIAGONAL_DAMPING = cosmic_importance => (cosmic_importance * 2.5 + (1.0 - cosmic_importance) * 2.0)
const TERR_DIAGONAL_DAMPING = cosmic_importance => (cosmic_importance * 2.5 + (1.0 - cosmic_importance) * 1.7)

/* Smallest amount of influence that we care about distributing. */
const INFLUENCE_CUTOFF = 0.02


class IntrusionData {
  source_pos = 0; 	/* Stone from which intrusion originates.*/
  strength_pos = 0;     /* Position of the intrusion influence soure. */
  strength = 0;
  attenuation = 0;
};


class InfluenceData {
  safe = [];

  white_influence = []; 	/* Accumulated influence. */
  black_influence = []; 	/* Accumulated influence. */
  white_strength = [];  	/* Strength of influence source. */
  black_strength = [];  	/* Strength of influence source. */
  white_attenuation = [];
  black_attenuation = [];
  white_permeability = [];
  black_permeability = [];

  is_territorial_influence = 0; /* 0 only if computing escape_influence.*/

  territory_value = [];
  non_territory = [];
  captured = 0;

  color_to_move = 0; /* Which color is in turn to move. */

  queue = [];     /* Points receiving influence. */

  intrusion_counter = 0;
  intrusions = [];
  id = null;
};

class MoyoDeterminationData {
  influence_balance = 0
  my_influence_minimum = 0
  opp_influence_maximum = 0
}

export const initial_black_influence = new InfluenceData()
export const initial_white_influence = new InfluenceData()

const move_influence = new InfluenceData()
const followup_influence = new InfluenceData()

/* Influence used for estimation of escape potential. */
const escape_influence = new InfluenceData()

/* Pointer to influence data used during pattern matching. */
let current_influence = null

/* Thresholds values used in the whose_moyo() functions */
const moyo_data = new MoyoDeterminationData()
const moyo_restricted_data = new MoyoDeterminationData()

/* Thresholds value used in the whose_territory() function */
let territory_determination_value = 0


const min_infl_for_territory = new InterpolationData(6, 0.0, 24.0, [ 6.0, 15.0, 26.0, 36.0, 45.0, 50.0, 55.0 ])

/* Determines the territory correction factor in dependence of the ratio
 * ( influence of stronger color / min_infl_for_territory(intersection))
 */
const territory_correction = new InterpolationData(5, 0.0, 1.0, [ 0.0, 0.25, 0.45, 0.65, 0.85, 1.0 ])


let influence_id = 0;
let cosmic_importance


const code1 = function (arg_di, arg_dj, arg, arg_d , {ii, q, delta_i, delta_j, queue_start, queue_end,  permeability_array, b, current_strength, working}) {
  if (!q.safe[arg] && (arg_di * delta_i + arg_dj * delta_j > 0 || queue_start === 1)) {
    let contribution;
    let permeability = permeability_array[ii];
    if (arg_d) {
      permeability *= Math.max(permeability_array[ii + b.DELTA(arg_di, 0)], permeability_array[ii + b.DELTA(0, arg_dj)]);
      if (permeability === 0.0) {
        return
      }
    }
    contribution = current_strength * permeability;
    if (queue_start !== 1) {
      let a = arg_di * delta_i + arg_dj * delta_j;
      contribution *= (a * a) * b;
    }
    if (contribution <= INFLUENCE_CUTOFF) {
      return
    }
    if (working[arg] === 0.0) {
      q.queue[queue_end] = (arg);
      queue_end++;
    }
    working[arg] += contribution;
  }
}

export const Influence = {

  accumulate_influence(q, pos, color) {
    const b = this.board
    let ii;
    let m = b.I(pos);
    let n = b.J(pos);
    let k;
    let bb;
    let inv_attenuation;
    let inv_diagonal_damping;
    let permeability_array;

    /* Clear the queue. Entry 0 is implicitly (m, n). */
    let queue_start = 0;
    let queue_end = 1;

    let working = [];
    let working_area_initialized = 0;

    if (!working_area_initialized) {
      for (ii = 0; ii < b.BOARDMAX; ii++){
        working[ii] = 0.0;
      }
      working_area_initialized = 1;
    }

    /* Attenuation only depends on the influence origin. */
    if (color === colors.WHITE){
      inv_attenuation = 1.0 / q.white_attenuation[pos];
    }
    else {
      inv_attenuation = 1.0 / q.black_attenuation[pos];
    }

    if (q.is_territorial_influence){
      inv_diagonal_damping = 1.0 / TERR_DIAGONAL_DAMPING;
    }
    else {
      inv_diagonal_damping = 1.0 / DIAGONAL_DAMPING;
    }

    if (color === colors.WHITE) {
      permeability_array = q.white_permeability;
    }
    else {
      permeability_array = q.black_permeability;
    }

    /* We put the original source into slot 0.  */
    q.queue[0] = pos;

    if (color === colors.WHITE) {
      working[pos] = q.white_strength[pos];
    }
    else {
      working[pos] = q.black_strength[pos];
    }


    /* Spread influence until the stack is empty. */
    while (queue_start < queue_end) {
      let current_strength;
      let delta_i, delta_j;

      ii = q.queue[queue_start];
      delta_i = b.I(ii) - m;
      delta_j = b.J(ii) - n;
      queue_start++;
      if (permeability_array[ii] === 0.0){
        continue;
      }

      if (queue_start === 1){
        bb = 1.0;
      }
      else {
        bb = 1.0 / ((delta_i) * (delta_i) + (delta_j) * (delta_j));
      }

      current_strength = working[ii] * inv_attenuation;

      const params = {q, ii, delta_i, delta_j, queue_start, queue_end,  permeability_array, b, current_strength, working}

      if (b.ON_BOARD(ii + b.delta[0]))
        code1(b.deltai[0], b.deltaj[0], ii + b.delta[0], 0, params);
      if (b.ON_BOARD(ii + b.delta[1]))
        code1(b.deltai[1], b.deltaj[1], ii + b.delta[1], 0, params);
      if (b.ON_BOARD(ii + b.delta[2]))
        code1(b.deltai[2], b.deltaj[2], ii + b.delta[2], 0, params);
      if (b.ON_BOARD(ii + b.delta[3]))
        code1(b.deltai[3], b.deltaj[3], ii + b.delta[3], 0, params);

      /* Update factors for diagonal movement. */
      bb *= 0.5;
      current_strength *= inv_diagonal_damping;

      if (b.ON_BOARD(ii + b.delta[4]))
        code1(b.deltai[4], b.deltaj[4], ii + b.delta[4], 1, params);
      if (b.ON_BOARD(ii + b.delta[5]))
        code1(b.deltai[5], b.deltaj[5], ii + b.delta[5], 1, params);
      if (b.ON_BOARD(ii + b.delta[6]))
        code1(b.deltai[6], b.deltaj[6], ii + b.delta[6], 1, params);
      if (b.ON_BOARD(ii + b.delta[7]))
        code1(b.deltai[7], b.deltaj[7], ii + b.delta[7], 1, params);
    }

    /* Add the values in the working area to the accumulated influence
     * and simultaneously reset the working area. We know that all
     * influenced points were stored in the queue, so we just traverse
     * it.
     */
    for (k = 0; k < queue_end; k++) {
      ii = q.queue[k];

      if (color === colors.WHITE) {
        if (working[ii] > 1.01 * INFLUENCE_CUTOFF || q.white_influence[ii] === 0.0){
          q.white_influence[ii] += working[ii];
        }
      }
      else {
        if (working[ii] > 1.01 * INFLUENCE_CUTOFF || q.black_influence[ii] === 0.0){
          q.black_influence[ii] += working[ii];
        }
      }

      working[ii] = 0.0;
    }
  },

  init_influence(q, safe_stones, strength) {
    const b = this.board
    let attenuation;

    /* Initialisation of some global positional values, based on
     * game stage.
     */

    /* non-cosmic values */
    cosmic_importance = 0.0;

    moyo_data.influence_balance     = 7.0;
    moyo_data.my_influence_minimum  = 5.0;
    moyo_data.opp_influence_maximum = 10.0;

    moyo_restricted_data.influence_balance     = 10.0;
    moyo_restricted_data.my_influence_minimum  = 10.0;
    moyo_restricted_data.opp_influence_maximum = 10.0;

    territory_determination_value = 0.95;

    min_infl_for_territory.values[0] = 6.0;
    min_infl_for_territory.values[1] = 15.0;
    min_infl_for_territory.values[2] = 26.0;
    min_infl_for_territory.values[3] = 36.0;
    min_infl_for_territory.values[4] = 45.0;
    min_infl_for_territory.values[5] = 50.0;
    min_infl_for_territory.values[6] = 55.0;

    if (q.is_territorial_influence) {
      attenuation = TERR_DEFAULT_ATTENUATION(cosmic_importance);
    } else {
      attenuation = 2 * DEFAULT_ATTENUATION(cosmic_importance);
    }

    q.intrusion_counter = 0;

    /* Remember this for later. */
    q.safe = safe_stones.slice()
    q.captured = b.black_captured - b.white_captured;

    for (let i = b.BOARDMIN; i < b.BOARDMAX; i++){

      if (b.ON_BOARD(i)) {
        /* Initialize. */
        q.white_influence[i] = 0.0;
        q.black_influence[i] = 0.0;
        q.white_attenuation[i] = attenuation;
        q.black_attenuation[i] = attenuation;
        q.white_permeability[i] = 1.0;
        q.black_permeability[i] = 1.0;
        q.white_strength[i] = 0.0;
        q.black_strength[i] = 0.0;
        q.non_territory[i] = colors.EMPTY;

        if (b.IS_STONE(b.board[i])) {
          // 有棋子，不是活棋, 我方穿透为0
          if (!safe_stones[i]) {
            if (b.board[i] === colors.WHITE){
              q.white_permeability[i] = 0.0;
            } else {
              q.black_permeability[i] = 0.0;
            }
          }
          else {
            // 活棋,strength = 100，对方穿透为0
            if (b.board[i] === colors.WHITE) {
              q.white_strength[i] = strength ? strength[i] : DEFAULT_STRENGTH;
              q.black_permeability[i] = 0.0;
            }
            else {
              q.black_strength[i] = strength ? strength[i] : DEFAULT_STRENGTH;
              q.white_permeability[i] = 0.0;
            }
          }
        }
        else{

          /* Ideally, safe_stones[] should always be zero for empty
           * intersections. This is currently, however, sometimes not true
           * when an inessential worm gets captured. So we revise this
           * in our private copy here.
           */
          // 空的safe_stones值为0
          q.safe[i] = 0;
        }
      }
    }
  },

  /* Adds an influence source at position pos with prescribed strength
   * and attenuation. color can be BLACK, WHITE or both. If there
   * already exists an influence source of the respective color at pos
   * that is stronger than the new one, we do nothing.
   */
  add_influence_source(pos, color, strength, attenuation, q){
    if ((color & colors.WHITE) && (q.white_strength[pos] < strength)) {
      q.white_strength[pos] = strength;
      q.white_attenuation[pos] = attenuation;
    }

    if ((color & colors.BLACK) && (q.black_strength[pos] < strength)) {
      q.black_strength[pos] = strength;
      q.black_attenuation[pos] = attenuation;
    }
  },

  enter_intrusion_source(){},
  compare_intrusions(){},

  /* It may happen that we have a low intensity influence source at a
   * blocked intersection (due to an intrusion). This function resets the
   * permeabilities.
   */
  reset_unblocked_blocks(q){
    const b = this.board
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos)) {
        if (!q.safe[pos] && q.white_strength[pos] > 0.0 && q.white_permeability[pos] !== 1.0) {
          // DEBUG(DEBUG_INFLUENCE, "  black block removed from %1m\n", pos);
          q.white_permeability[pos] = 1.0;
        }
        if (!q.safe[pos] && q.black_strength[pos] > 0.0 && q.black_permeability[pos] !== 1.0) {
          // DEBUG(DEBUG_INFLUENCE, "  white block removed from %1m\n", pos);
          q.black_permeability[pos] = 1.0;
        }
      }
    }
  },

  /* This function goes through the list of intrusion sources, and adds
   * the intrusion as influence sources for color. The strength is
   * corrected so that each stone's intrusions sources can have total
   * strength of at most 60%/100% of the strength of the stone.
   * (100% is if q == &followup_influence, 60% otherwise).
   */
  add_marked_intrusions(q){
    let j = 0;
    let correction;
    let source_strength;
    let allowed_strength;
    let color = q.color_to_move;

    // gg_sort(q.intrusions, q.intrusion_counter, sizeof(q.intrusions[0]), compare_intrusions);

    /* Go through all intrusion sources. */
    for (let i = 0; i < q.intrusion_counter; i = j) {
      let strength_sum = 0.0;
      let source_pos = q.intrusions[i].source_pos;
      /* "Anonymous" intrusios go in uncorrected. */
      if (source_pos === NO_MOVE) {
        this.add_influence_source(q.intrusions[i].strength_pos, color,
          q.intrusions[j].strength, q.intrusions[j].attenuation, q);
        // DEBUG(DEBUG_INFLUENCE, "Adding %s intrusion at %1m, value %f\n",
        //   (color === colors.BLACK) ? "black" : "white",
        //   q.intrusions[j].strength_pos, q.intrusions[j].strength);
        j = i+1;
        continue;
      }
      if (color === colors.BLACK){
        source_strength = q.black_strength[source_pos];
      }
      else{
        source_strength = q.white_strength[source_pos];
      }

      /* First loop: Determine correction factor. */
      for (j = i; j < q.intrusion_counter && q.intrusions[j].source_pos === source_pos; j++) {
        /* Of identical strength positions, only take strongest value. */
        if (j === i || q.intrusions[j].strength_pos !== q.intrusions[j-1].strength_pos){
          strength_sum += q.intrusions[j].strength;
        }
      }
      if (q === followup_influence){
        allowed_strength = source_strength;
      }
      else{
        allowed_strength = 0.6 * source_strength;
      }
      if (strength_sum > allowed_strength){
        correction = allowed_strength / strength_sum;
      }
      else{
        correction = 1.0;
      }

      /* Second loop: Add influence sources. */
      for (j = i; j < q.intrusion_counter && q.intrusions[j].source_pos === source_pos; j++) {
        /* Of identical strenght positions, only take strongest value. */
        if (j === i || q.intrusions[j].strength_pos !== q.intrusions[j-1].strength_pos) {
          this.add_influence_source(q.intrusions[j].strength_pos, color,
            correction * q.intrusions[j].strength, q.intrusions[j].attenuation, q);
          // DEBUG(DEBUG_INFLUENCE,
          //   "Adding %s intrusion for %1m at %1m, value %f (correction %f)\n",
          //   (color == BLACK) ? "black" : "white", source_pos,
          //   q.intrusions[j].strength_pos,
          //   correction * q.intrusions[j].strength, correction);
        }
      }
    }
  },

  /* Callback for the matched patterns in influence.db and barriers.db.
   * The pattern classes used here are:
   * A - Barrier pattern, where O plays first and X tries to block influence.
   * D - Barrier pattern, where O plays first and O tries to block influence.
   * B - Intrusion patterns, adding a low intensity influence source.
   * E - Enhance patterns, FIXME: document this one!
   * t - Non-territory patterns, marking vertices as not territory.
   * I - Invasion patterns, adding a low intensity influence source.
   * e - Escape bonus. Used together with I to increase the value substantially
   *     if escape influence is being computed.
   *
   * Classes A, D, and B are matched with color as O, and it is assumed
   * that O is in turn to move. Classes E and I are matched with either
   * color as O.
   */
  influence_callback(anchor, color, pattern, ll, data){
    const b = this.board
    let pos = AFFINE_TRANSFORM(pattern.move_offset, ll, anchor);
    let k;
    let q = data;

    /* We also ignore enhancement patterns in territorial influence. */
    // CLASS_E： 想要扩张模样
    if ((pattern.class & CLASS_E) && q.is_territorial_influence) {
      return;
    }

    /* Don't use invasion (I) patterns when scoring. */
    // 点目时不考虑入侵
    if (Globals.doing_scoring && (pattern.class & CLASS_I)) {
      return;
    }

    /* Loop through pattern elements to see if an A or D pattern
     * can possibly have any effect. If not we can skip evaluating
     * constraint and/or helper.
     */
    // Attack,Defense模式
    if (pattern.class & (CLASS_A | CLASS_D)) {
      let something_to_do = 0;
      // gg_assert(q.is_territorial_influence);
      for (k = 0; k < pattern.patlen; ++k) { /* match each point */
        let blocking_color;
        /* The order of elements is: All commas, all "!", then other. */
        if (pattern.patn[k].att !== ATT_comma && pattern.patn[k].att !== ATT_not){
          break;
        }

        let ii = AFFINE_TRANSFORM(pattern.patn[k].offset, ll, anchor);

        if (pattern.class & CLASS_D) {
          blocking_color = color;
        }
        else {
          blocking_color = b.OTHER_COLOR(color);
        }
        if ((blocking_color === colors.WHITE && q.black_permeability[ii] !== 0.0)
          || (blocking_color === colors.BLACK && q.white_permeability[ii] !== 0.0)) {
          something_to_do = 1;
          break;
        }
      }
      if (!something_to_do){
        return;
      }
    }

    /* Require that all O stones in the pattern have non-zero influence
     * strength for patterns of type D, E, B, t, and all X stones have
     * non-zero strength for patterns of type A and t.
     *
     * Patterns also having class s are an exception from this rule.
     */
    if ((pattern.class & (CLASS_D | CLASS_A | CLASS_B | CLASS_E | CLASS_t)) && !(pattern.class & CLASS_s)) {
      for (k = 0; k < pattern.patlen; ++k) { /* match each point */
        let ii = AFFINE_TRANSFORM(pattern.patn[k].offset, ll, anchor);
        if (pattern.patn[k].att === ATT_O) {
          if ((pattern.class & (CLASS_B | CLASS_t | CLASS_E | CLASS_D))
            && ((color === colors.WHITE && q.white_strength[ii] === 0.0) || (color === colors.BLACK && q.black_strength[ii] === 0.0)))
          return;
        }
        else if (pattern.patn[k].att === ATT_X) {
          if ((pattern.class & (CLASS_A | CLASS_t))
            && ((color === colors.BLACK && q.white_strength[ii] === 0.0) || (color === colors.WHITE && q.black_strength[ii] === 0.0)))
          return; /* Match failed. */
        }
      }
    }

    /* If the pattern has a constraint, call the autohelper to see
     * if the pattern must be rejected.
     */
    if ((pattern.autohelper_flag & HAVE_CONSTRAINT) && !pattern.autohelper(ll, pos, color, 0)) {
      return;
    }

    // DEBUG(DEBUG_INFLUENCE, "influence pattern '%s'+%d matched at %1m\n", pattern.name, ll, anchor);

    /* For t patterns, everything happens in the action. */
    if ((pattern.class & CLASS_t) && (pattern.autohelper_flag & HAVE_ACTION)) {
      pattern.autohelper(ll, pos, color, INFLUENCE_CALLBACK);
      return;
    }

    /* For I patterns, add a low intensity, both colored, influence
     * source at *.
     */
    if (pattern.class & CLASS_I) {
      let this_color = colors.EMPTY;
      let strength;
      let attenuation;

      if (q.color_to_move === colors.EMPTY || (pattern.class & CLASS_s)){
        this_color = colors.BLACK | colors.WHITE;
      }
      else if (q.color_to_move !== color){
        this_color = q.color_to_move;
      }

      strength = pattern.value;
      attenuation = 1.5;

      /* Increase strength if we're computing escape influence. */
      if (!q.is_territorial_influence && (pattern.class & CLASS_e)) {
        this.add_influence_source(pos, this_color, 20 * strength, attenuation, q);
      }
      else {
        this.add_influence_source(pos, this_color, strength, attenuation, q);
      }

      // DEBUG(DEBUG_INFLUENCE, "  low intensity influence source at %1m, strength %f, color %C\n", pos, strength, this_color);
      return;
    }

    /* For E patterns, add a new influence source of the same color and
     * pattern defined strength at *.
     */
    if (pattern.class & CLASS_E) {
      this.add_influence_source(pos, color, pattern.value, DEFAULT_ATTENUATION(cosmic_importance), q);
      // DEBUG(DEBUG_INFLUENCE, "  extra %C source at %1m, strength %f\n", color, pos, pattern.value);
      return;
    }

    /* For B patterns add intrusions sources at "!" points. */
    if (pattern.class & CLASS_B) {
      let strength = pattern.value;

      /* match each point */
      for (k = 0; k < pattern.patlen; ++k) {

        if (pattern.patn[k].att === ATT_not) {
          /* transform pattern real coordinate */
          let ii = AFFINE_TRANSFORM(pattern.patn[k].offset, ll, anchor);

          /* Low intensity influence source for the color in turn to move. */
          if (q.is_territorial_influence) {
            this.enter_intrusion_source(anchor, ii, strength, TERR_DEFAULT_ATTENUATION, q);
          }
          else {
            this.add_influence_source(ii, color, strength, DEFAULT_ATTENUATION, q);
          }
          // DEBUG(DEBUG_INFLUENCE, "  intrusion at %1m\n", ii);
        }
      }
      return;
    }

    // gg_assert(pattern.class & (CLASS_D | CLASS_A));
    /* For A, D patterns, add blocks for all "," or "!" points.  */
    for (k = 0; k < pattern.patlen; ++k) { /* match each point */
      if (pattern.patn[k].att === ATT_comma || pattern.patn[k].att === ATT_not) {
        /* transform pattern real coordinate */
        let ii = AFFINE_TRANSFORM(pattern.patn[k].offset, ll, anchor);
        let blocking_color;
        if (pattern.class & CLASS_D) {
          blocking_color = color;
        }
        else {
          blocking_color = b.OTHER_COLOR(color);
        }
        // DEBUG(DEBUG_INFLUENCE, "  barrier for %s influence at %1m\n", color_to_string(OTHER_COLOR(blocking_color)), ii);
        if (pattern.patn[k].att === ATT_comma) {
          if (blocking_color === colors.WHITE) {
            q.black_permeability[ii] = 0.0;
          }
          else {
            q.white_permeability[ii] = 0.0;
          }
        }
        /* Weak barrier at !-marked points. */
        else {
          if (blocking_color === colors.WHITE){
            q.black_permeability[ii] *= 0.7;
          }
          else{
            q.white_permeability[ii] *= 0.7;
          }
        }
      }
    }
  },

  followup_influence_callback(){},
  influence_mark_non_territory(){},
  influence_erase_territory(){},

  /* Match the patterns in influence.db and barriers.db in order to add:
   * - influence barriers,
   * - extra influence sources at possible invasion and intrusion points, and
   * - extra influence induced by strong positions.
   * Reduce permeability around each living stone.
   * Reset permeability to 1.0 at intrusion points.
   */
  find_influence_patterns(q){
    const b = this.board
    current_influence = q;
    this.matchpat(this.influence_callback, matchpat.ANCHOR_COLOR, influencepat_db, q, null);
    if (q.color_to_move !== colors.EMPTY){
      this.matchpat(this.influence_callback, q.color_to_move, barrierspat_db, q, null);
    }

    if (q.is_territorial_influence){
      this.add_marked_intrusions(q);
    }

    /* Additionally, we introduce a weaker kind of barriers around living
     * stones.
     */
    // 计算穿透permeability
    for (let i = b.BOARDMIN; i < b.BOARDMAX; i++){

      if (b.ON_BOARD(i) && !q.safe[i]) {
        let k;
        let black_reduction = 1.0;
        let white_reduction = 1.0;
        for (k = 0; k < 8; k++) {
          let d = b.delta[k];
          if (b.IS_STONE(b.board[i + d]) && q.safe[i + d]) {
            /* Reduce less diagonally. */
            let reduction = (k < 4) ? 0.25 : 0.65;
            if (b.board[i + d] === colors.BLACK){
              white_reduction *= reduction;
            }
            else {
              black_reduction *= reduction;
            }
          } else if (b.IS_STONE(b.board[i + d]) && !q.safe[i + d]) {
            if (b.board[i + d] === colors.BLACK){
              white_reduction = -100.0;
            }
            else {
              black_reduction = -100.0;
            }
          }
        }
        if (black_reduction > 0.0){
          q.black_permeability[i] *= black_reduction;
        }
        if (white_reduction > 0.0){
          q.white_permeability[i] *= white_reduction;
        }
      }
    }

    this.reset_unblocked_blocks(q);
  },
  check_double_block(){},

  /* This function checks for the situation where an influence source for
   * the color to move is direclty neighbored by 2 or more influence blocks.
   * It then removes the least valuable of these blocks, and re-runs the
   * influence accumulation for this position.
   *
   * See endgame:840 for an example where this is essential.
   */
  remove_double_blocks() {

  },

  /* Do the real work of influence computation. This is called from
   * compute_influence and compute_escape_influence.
   *
   * q->is_territorial_influence and q->color_to_move must be set by the caller.
   */
  // 需要指定： 是否是实地影响、下一步颜色
  do_compute_influence(safe_stones, inhibited_sources, strength, q,  move, trace_message) {
    const b = this.board
    this.init_influence(q, safe_stones, strength);

    this.modify_depth_values(b.stackp - 1);
    this.find_influence_patterns(q);
    this.modify_depth_values(1 - b.stackp);

    for (let i = b.BOARDMIN; i < b.BOARDMAX; i++) {
      if (b.ON_BOARD(i) && !(inhibited_sources && inhibited_sources[i])) {
        if (q.white_strength[i] > 0.0){
          this.accumulate_influence(q, i, colors.WHITE);
        }
        if (q.black_strength[i] > 0.0){
          this.accumulate_influence(q, i, colors.BLACK);
        }
      }
    }

    this.value_territory(q);
    this.remove_double_blocks(q, inhibited_sources);

    this.value_territory(q);

    // if ((move == NO_MOVE
    //   && (printmoyo & PRINTMOYO_INITIAL_INFLUENCE))
    //   || (debug_influence && move == debug_influence))
    //   print_influence(q, trace_message);
  },

  compute_influence (color, safe_stones, strength, q, move, trace_message) {
    // 类型不同，衰减度不同
    q.is_territorial_influence = 1;
    q.color_to_move = color;

    influence_id++;
    q.id = influence_id;

    this.do_compute_influence(safe_stones, null, strength, q, move, trace_message);
  },

  whose_territory () {},
  whose_moyo () {},
  whose_moyo_restricted () {},
  whose_area () {},

  value_territory (q) {
    const b = this.board
    let ii;
    let dist_i, dist_j;
    let central;
    let first_guess = []
    let ratio;
    let k;

    // memset(first_guess, 0, BOARDMAX*sizeof(float));
    // memset(q->territory_value, 0, BOARDMAX*sizeof(float));
    /* First loop: guess territory directly from influence. */
    for (ii = b.BOARDMIN; ii < b.BOARDMAX; ii++) {
      if (b.ON_BOARD(ii) && !q.safe[ii]) {
        let diff = 0.0;
        if (q.white_influence[ii] + q.black_influence[ii] > 0) {
          diff = (q.white_influence[ii] - q.black_influence[ii]) / (q.white_influence[ii] + q.black_influence[ii]);
        }
        first_guess[ii] = diff * diff * diff;

        /* If both side have small influence, we have to reduce this value.
         * What we consider "small influence" depends on how central this
         * intersection lies.
         *
         * The values of central on an 11x11 board become:
         *
         *  4  5  6  7  7  7  7  7  6  5  4
         *  5  8  9 10 10 10 10 10  9  8  5
         *  6  9 12 13 13 13 13 13 12  9  6
         *  7 10 13 16 16 16 16 16 13 10  7
         *  7 10 13 16 17 17 17 16 13 10  7
         *  7 10 13 16 17 18 17 16 13 10  7
         *  7 10 13 16 17 17 17 16 13 10  7
         *  7 10 13 16 16 16 16 16 13 10  7
         *  6  9 12 13 13 13 13 13 12  9  6
         *  5  8  9 10 10 10 10 10  9  8  5
         *  4  5  6  7  7  7  7  7  6  5  4
         */
        dist_i = Math.min(b.I(ii), b.board_size - b.I(ii) - 1);
        dist_j = Math.min(b.J(ii), b.board_size - b.J(ii) - 1);
        if (dist_i > dist_j){
          dist_i = Math.min(4, dist_i);
        }
        else {
          dist_j = Math.min(4, dist_j);
        }
        central =  2 * Math.min(dist_i, dist_j) + dist_i + dist_j;
        ratio = Math.max(q.black_influence[ii], q.white_influence[ii]) / gg_interpolate(min_infl_for_territory, central);

        /* Do not make this adjustment when scoring unless both
         * players have non-zero influence.
         */
        if (Globals.doing_scoring && (q.black_influence[ii] === 0.0 || q.white_influence[ii] === 0.0)){
          ratio = 1.0;
        }

        first_guess[ii] *= gg_interpolate(territory_correction, ratio);

        /* Dead stone, upgrade to territory. Notice that this is not
         * the point for a prisoner, which is added later. Instead
         * this is to make sure that the vertex is not regarded as
         * moyo or area. Also notice that the non-territory
         * degradation below may over-rule this decision.
         */
        if (b.board[ii] === colors.BLACK) {
          first_guess[ii] = 1.0;
        }
        else if (b.board[ii] === colors.WHITE) {
          first_guess[ii] = -1.0;
        }
        q.territory_value[ii] = first_guess[ii];
      }
    }

    /* Second loop: Correct according to neighbour vertices. Each territory
     * value is degraded to the minimum value of its neighbors (unless this
     * neighbor has reduced permeability for the opponent's influence).
     */
    for (ii = b.BOARDMIN; ii < b.BOARDMAX; ii++)
      /* Do not overrule dead stone territory above.
        * FIXME: This does not do what it claims to do. Correcting it
        * seems to break some tests, though.
        */
      if (b.ON_BOARD(ii) && !q.safe[ii]) {
      /* Loop over all neighbors. */
      for (k = 0; k < 4; k++) {
        if (!b.ON_BOARD(ii + b.delta[k]))
          continue;
        if (q.territory_value[ii] > 0.0) {
          /* White territory. */
          if (!q.safe[ii + b.delta[k]]) {
            let neighbor_val = q.black_permeability[ii + b.delta[k]] * first_guess[ii + b.delta[k]]
                + (1.0 - q.black_permeability[ii + b.delta[k]]) * first_guess[ii];
            q.territory_value[ii] = Math.max(0, Math.min(q.territory_value[ii], neighbor_val));
          }
        }
        else {
          /* Black territory. */
          if (!q.safe[ii + b.delta[k]]) {
            let neighbor_val = q.white_permeability[ii + b.delta[k]] * first_guess[ii + b.delta[k]]
                + (1 - q.white_permeability[ii + b.delta[k]]) * first_guess[ii];
            q.territory_value[ii] = Math.min(0, Math.max(q.territory_value[ii], neighbor_val));
          }
        }
      }
    }

    /* Third loop: Nonterritory patterns, points for prisoners. */
    for (ii = b.BOARDMIN; ii < b.BOARDMAX; ii++) {
      if (b.ON_BOARD(ii) && !q.safe[ii]) {
        /* If marked as non-territory for the color currently owning
         * it, reset the territory value.
         */
        if (q.territory_value[ii] > 0.0 && (q.non_territory[ii] & colors.WHITE)) {
          q.territory_value[ii] = 0.0;
        }

        if (q.territory_value[ii] < 0.0 && (q.non_territory[ii] & colors.BLACK)) {
          q.territory_value[ii] = 0.0;
        }

        /* Dead stone, add one to the territory value. */
        if (b.board[ii] === colors.BLACK) {
          q.territory_value[ii] += 1.0;
        } else if (b.board[ii] === colors.WHITE) {
          q.territory_value[ii] -= 1.0;
        }
      }
    }

  },

  segment_region () {},
  influence_get_territory_segmentation () {},
  influence_territory () {},
  influence_considered_lively () {},
  compute_followup_influence () {},
  compute_escape_influence () {},
  retrieve_delta_territory_cache () {},
  store_delta_territory_cache () {},
  influence_delta_territory () {},
  influence_score () {},
  game_status () {},
  debug_influence_move () {},
  get_influence () {},
  print_influence () {},
  print_numeric_influence () {},
  print_influence_areas () {},
}
