import {colors, InterpolationData, NO_MOVE} from "./Constants";
import {DEFAULT_STRENGTH} from "./Liberty";

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



const  initial_black_influence = new InfluenceData
const  initial_white_influence = new InfluenceData

/* Thresholds values used in the whose_moyo() functions */
const moyo_data = new MoyoDeterminationData
const moyo_restricted_data = new MoyoDeterminationData

/* Thresholds value used in the whose_territory() function */
let territory_determination_value = 0


const min_infl_for_territory = new InterpolationData(6, 0.0, 24.0, [ 6.0, 15.0, 26.0, 36.0, 45.0, 50.0, 55.0 ])

/* Determines the territory correction factor in dependence of the ratio
 * ( influence of stronger color / min_infl_for_territory(intersection))
 */
const territory_correction = new InterpolationData(5, 0.0, 1.0, [ 0.0, 0.25, 0.45, 0.65, 0.85, 1.0 ])


let influence_id = 0;
let cosmic_importance


export const Influence = {

  accumulate_influence(){},

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
      attenuation = TERR_DEFAULT_ATTENUATION;
    } else {
      attenuation = 2 * DEFAULT_ATTENUATION;
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
        q.non_territory[i] = EMPTY;

        if (b.IS_STONE(b.board[i])) {
          if (!safe_stones[i]) {
            if (b.board[i] === colors.WHITE){
              q.white_permeability[i] = 0.0;
            } else {
              q.black_permeability[i] = 0.0;
            }
          }
          else {
            if (b.board[i] === colors.WHITE) {
              if (strength){
                q.white_strength[i] = strength[i];
              } else {
                q.white_strength[i] = DEFAULT_STRENGTH;
              }
              q.black_permeability[i] = 0.0;
            }
            else {
              if (strength){
                q.black_strength[i] = strength[i];
              } else{
                q.black_strength[i] = DEFAULT_STRENGTH;
              }
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
          q.safe[i] = 0;
        }
      }
    }
  },

  compute_influence (color, safe_stones, strength, q, move, trace_message) {
    q.is_territorial_influence = 1;
    q.color_to_move = color;

    influence_id++;
    q.id = influence_id;

    this.do_compute_influence(safe_stones, null, strength, q, move, trace_message);
  },


  /* Do the real work of influence computation. This is called from
   * compute_influence and compute_escape_influence.
   *
   * q->is_territorial_influence and q->color_to_move must be set by the caller.
   */
  do_compute_influence(safe_stones, inhibited_sources, strength, q,  move, trace_message) {
    this.init_influence(q, safe_stones, strength);

    this.modify_depth_values(stackp - 1);
    this.find_influence_patterns(q);
    this.modify_depth_values(1 - stackp);

    for (let ii = BOARDMIN; ii < BOARDMAX; ii++)
      if (ON_BOARD(ii) && !(inhibited_sources && inhibited_sources[ii])) {
        if (q.white_strength[ii] > 0.0){
          this.accumulate_influence(q, ii, colors.WHITE);
        }
        if (q.black_strength[ii] > 0.0){
          this.accumulate_influence(q, ii, colors.BLACK);
        }
      }

    this.value_territory(q);
    this.remove_double_blocks(q, inhibited_sources);

    this.value_territory(q);

    // if ((move == NO_MOVE
    //   && (printmoyo & PRINTMOYO_INITIAL_INFLUENCE))
    //   || (debug_influence && move == debug_influence))
    //   print_influence(q, trace_message);
  }
}
