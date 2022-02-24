import {NO_MOVE} from "./Constants";


/* values for move_reason.type */
const THREAT_BIT =    1

/* Only use even values for non-threat move reasons! */
const ATTACK_MOVE =              2
const ATTACK_MOVE_GOOD_KO =      4
const ATTACK_MOVE_BAD_KO =       6
const ATTACK_THREAT =           (ATTACK_MOVE | THREAT_BIT)
const DEFEND_MOVE =              8
const DEFEND_MOVE_GOOD_KO =     10
const DEFEND_MOVE_BAD_KO =      12
const DEFEND_THREAT =           (DEFEND_MOVE | THREAT_BIT)

const CONNECT_MOVE =            14
const CUT_MOVE =                16

const SEMEAI_MOVE =             18
const SEMEAI_THREAT =           (SEMEAI_MOVE | THREAT_BIT)

const EXPAND_TERRITORY_MOVE =   20
const EXPAND_MOYO_MOVE =        22
const INVASION_MOVE =           24

const OWL_ATTACK_MOVE =         26
const OWL_ATTACK_MOVE_GOOD_KO = 28
const OWL_ATTACK_MOVE_BAD_KO =  30
const OWL_ATTACK_THREAT =       (OWL_ATTACK_MOVE | THREAT_BIT)
const OWL_DEFEND_MOVE =         32
const OWL_DEFEND_MOVE_GOOD_KO = 34
const OWL_DEFEND_MOVE_BAD_KO =  36
const OWL_DEFEND_THREAT =       (OWL_DEFEND_MOVE | THREAT_BIT)
const OWL_PREVENT_THREAT =      38
const UNCERTAIN_OWL_ATTACK =    40
const UNCERTAIN_OWL_DEFENSE =   42
const STRATEGIC_ATTACK_MOVE =   44
const STRATEGIC_DEFEND_MOVE =   46

const MY_ATARI_ATARI_MOVE =     50
const YOUR_ATARI_ATARI_MOVE =   52
const VITAL_EYE_MOVE =          54

const OWL_ATTACK_MOVE_GAIN =    60
const OWL_DEFEND_MOVE_LOSS =    62
const POTENTIAL_SEMEAI_ATTACK =	64
const POTENTIAL_SEMEAI_DEFENSE = 66

const ANTISUJI_MOVE =           70

const EITHER_MOVE =             100
const ALL_MOVE =                102


/* Bitmap values for move_reason.status */
const ACTIVE =                  0
const TERRITORY_REDUNDANT =     1
const STRATEGICALLY_REDUNDANT = 2
const REDUNDANT =               (TERRITORY_REDUNDANT | STRATEGICALLY_REDUNDANT)
const SECONDARY =               4

const MAX_REASONS = 120

const MAX_TRACE_LENGTH =  160

const HUGE_MOVE_VALUE = 10.0*19*19

class MoveReason {
  type;   /* e.g. attack, defend, or connect */
  what;   /* pointer into list of strings, list of pair of dragons, or similar */
  status; /* This is a bitmap to mark redundant or secondary move reasons. */
};


class MoveData {
  value = 0.0;    /* total comparison value, computed at the very end */
  final_value = 0.0; /* value after point redistribution. */
  additional_ko_value = 0.0; /* Additional threat value if ko fight going on.*/

  territorial_value = 0.0; /* Value in terms of actual profit. */
  strategical_value = 0.0; /* Value with respect to strength, weakness, and safety of all groups on the board. */

  maxpos_shape = 0.0;      /* Maximal positive contribution to shape */
  maxneg_shape = 0;      /* Maximal negative contribution to shape */
  numpos_shape = 0.0;        /* Number of positive contributions to shape */
  numneg_shape = 0;        /* Number of negative contributions to shape */

  followup_value = 0.0;;    /* Value of followup move (our sente). */
  influence_followup_value = 0.0;;  /* Followup value of move as reported by
                                      experimental influence. */
  reverse_followup_value = 0.0;;	/* Value of opponents followup move
				   (reverse sente). */
  secondary_value = 0.0;;      /* Secondary move value. */
  min_value = 0.0;;            /* Minimum allowed value for the move. */
  max_value = HUGE_MOVE_VALUE;;            /* Maximum allowed value for the move. */
  min_territory = 0.0;;        /* Minimum territorial value. */
  max_territory = HUGE_MOVE_VALUE;;        /* Maximum territorial value. */
  randomness_scaling = 1.0;;   /* Increase to randomize this move. */

  reason = new Array(MAX_REASONS).fill(-1); /* List of reasons for a move. */
  move_safety = 0;         /* Whether the move seems safe. */
  worthwhile_threat = 0;   /* Play this move as a pure threat. */
  random_number = 1.0;     /* Random number connected to this move. */
};

const MAX_MOVE_REASONS =	1000
const MAX_WORMS =		2*19*19/3
const MAX_DRAGONS =		MAX_WORMS
const MAX_CONNECTIONS = 	4*MAX_WORMS
const MAX_POTENTIAL_SEMEAI =	50
const MAX_EYES =		19*19/2
const MAX_LUNCHES =		MAX_WORMS
const MAX_EITHER =		100
const MAX_ALL = 		100
const MAX_ATTACK_THREATS =	6


let move = [];
let move_reasons = [];

/* Connections */
let conn_worm1 = [];
let conn_worm2 = [];

/* Potential semeai moves. */
let semeai_target1 = [];
let semeai_target2 = [];

/* Unordered sets (currently pairs) of move reasons / targets */
let either_data = [];
let next_either;
let all_data = [];
let next_all;

/* Eye shapes */
let eyes = [];
let eyecolor = [];

/* Lunches */
let lunch_dragon = []; /* eater */
let lunch_worm = [];   /* food */

/* Point redistribution */
let replacement_map = [];

/* The color for which we are evaluating moves. */
let current_color;

/* Attack threats that are known to be sente locally. */
let known_good_attack_threats = [];

/* Moves that are known to be safe (in the sense that played stones can
 * be captured, but opponent loses much more when attempting to do so)
 */
let known_safe_moves = [];

/* Helper functions to check conditions in discard rules. */

class DiscardRule {
  reason_type = [];
  condition;
  flags;
  trace_message = [];
};


export const MoveReasons = {

  clear_move_reasons () {
    this.next_reason = 0;
    this.next_connection = 0;
    this.next_semeai = 0;
    this.next_either = 0;
    this.next_all = 0;
    this.next_eye = 0;
    this.next_lunch = 0;
      
    const b = this.board

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.ON_BOARD(pos)) {
       
        move[pos] = new MoveData()
        /* The reason we assign a random number to each move immediately
         * is to avoid dependence on which moves are evaluated when it
         * comes to choosing between multiple moves of the same value.
         * In this way we can get consistent results for use in the
         * regression tests.
         */
        move[pos].random_number = Math.random();
  
        /* Do not send away the points (yet). */
        replacement_map[pos] = NO_MOVE;
      }
    }
  
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      known_safe_moves[pos] = 0;
      known_good_attack_threats[pos] = []
      for (let k = 0; k < MAX_ATTACK_THREATS; k++){
        known_good_attack_threats[pos][k] = NO_MOVE;
      }
    }
    /* This array lists rules according to which we set the status
    * flags of a move reasons.
    * The format is:
    * { List of reasons to which the rule applies, condition of the rule,
    * flags to be set, trace message }
    * The condition must be of type discard_condition_fn_ptr, that is a pointer
    * to a function with parameters (pos, what).
    *
    * FIXME: Add handling of ALL and EITHER moves for inessential worms.
    */

    this.discard_rules = [
      [ [ ATTACK_MOVE, ATTACK_MOVE_GOOD_KO, ATTACK_MOVE_BAD_KO, ATTACK_THREAT,
        DEFEND_MOVE, DEFEND_MOVE_GOOD_KO, DEFEND_MOVE_BAD_KO, DEFEND_THREAT, -1 ],
        this.owl_move_vs_worm_known, TERRITORY_REDUNDANT,
          "  %1m: 0.0 - (threat of) attack/defense of %1m (owl attack/defense as well)\n" ],
      [ [ SEMEAI_MOVE, SEMEAI_THREAT, -1 ], this.owl_move_reason_known, REDUNDANT,
          "  %1m: 0.0 - (threat to) win semeai involving %1m (owl move as well)\n"],
      [ [ SEMEAI_MOVE, SEMEAI_THREAT, -1 ], this.tactical_move_vs_whole_dragon_known, REDUNDANT,
          "  %1m: 0.0 - (threat to) win semeai involving %1m (tactical move as well)\n"],
      [ [ EITHER_MOVE, -1 ],
        this.either_worm_attackable, REDUNDANT,
          "  %1m: 0.0 - 'attack either' is redundant at %1m (direct att./def. as well)\n"],
      [ [ ALL_MOVE, -1 ],
        this.one_of_both_attackable, REDUNDANT,
          "  %1m: 0.0 - 'defend both' is redundant at %1m (direct att./def. as well)\n"],
      [ [ ATTACK_THREAT, DEFEND_THREAT, -1 ],
        this.concerns_inessential_worm, TERRITORY_REDUNDANT,
          "  %1m: 0.0 - attack/defense threat of %1m (inessential)\n"],
      [ [ OWL_ATTACK_THREAT, UNCERTAIN_OWL_DEFENSE, -1 ],
        this.concerns_inessential_dragon, REDUNDANT,
          "  %1m: 0.0 - (uncertain) owl attack/defense of %1m (inessential)\n"],
      [ [ ATTACK_MOVE, ATTACK_MOVE_GOOD_KO, ATTACK_MOVE_BAD_KO,
        DEFEND_MOVE, DEFEND_MOVE_GOOD_KO, DEFEND_MOVE_BAD_KO, -1],
        this.move_is_marked_unsafe, REDUNDANT,
          "  %1m: 0.0 - tactical move vs %1m (unsafe move)\n"],
      [ [ OWL_ATTACK_MOVE, OWL_ATTACK_MOVE_GOOD_KO, OWL_ATTACK_MOVE_BAD_KO,
        OWL_DEFEND_MOVE, OWL_DEFEND_MOVE_GOOD_KO, OWL_DEFEND_MOVE_BAD_KO, -1],
        this.concerns_noncritical_dragon, REDUNDANT,
          "  %1m: 0.0 - owl move vs %1m (non-critical)\n"],
      [ [ -1 ], null, 0, ""]  /* Keep this entry at end of the list. */
      ]
  
  },
  find_connection () {},
  find_either_data () {},
  find_all_data () {},
  find_pair_data () {},
  get_pos () {},
  /*
   * See if a lunch is already in the list of lunches, otherwise add a new
   * entry. A lunch is in this context a pair of eater (a dragon) and food
   * (a worm).
   */
  add_lunch (eater, food) {
    let dragon1 = this.dragon[eater].origin;
    let worm1   = this.worm[food].origin;
    this.board.ASSERT_ON_BOARD1(eater);
    this.board.ASSERT_ON_BOARD1(food);

    for (let k = 0; k < this.next_lunch; k++) {
      if ((lunch_dragon[k] === dragon1) && (lunch_worm[k] === worm1)){
        return;
      }
    }

    /* Add a new entry. */
    this.board.ASSERT1(this.next_lunch < MAX_LUNCHES);
    lunch_dragon[this.next_lunch] = dragon1;
    lunch_worm[this.next_lunch] = worm1;
    this.next_lunch++;
    return;
  },

  add_move_reason () {},
  remove_move_reason () {},
  move_reason_known () {},
  attack_move_reason_known () {},
  defense_move_reason_known () {},

  /* Check whether a dragon consists of only one worm. If so, check
 * whether we know of a tactical attack or defense move.
 */
  tactical_move_vs_whole_dragon_known (pos, what) {
    return ((this.worm[what].size === this.dragon[what].size)
      && (this.attack_move_reason_known(pos, what) || this.defense_move_reason_known(pos, what)));
  },
  owl_attack_move_reason_known () {},
  owl_defense_move_reason_known () {},
  /*
 * Check whether an owl attack/defense move reason is recorded for a move.
 * A negative value for 'what' means only match 'type'.
 */
  owl_move_reason_known (pos, what) {
    return (this.owl_attack_move_reason_known(pos, what) || this.owl_defense_move_reason_known(pos, what));
  },

  /*
 * Check whether we have an owl attack/defense reason for a move that
 * involves a specific worm.
 */
  owl_move_vs_worm_known (pos, what) {
    return this.owl_move_reason_known(pos, this.dragon[what].origin);
  },
  semeai_move_reason_known () {},
  concerns_inessential_worm () {},
  concerns_inessential_dragon () {},
  move_is_marked_unsafe () {},
  concerns_noncritical_dragon () {},
  either_worm_attackable () {},
  one_of_both_attackable () {},
  add_attack_move () {},
  add_defense_move () {},
  add_attack_threat_move () {},
  remove_attack_threat_move () {},
  add_defense_threat_move () {},
  get_attack_threats () {},
  get_defense_threats () {},
  get_biggest_owl_target () {},
  add_connection_move () {},
  add_cut_move () {},
  add_antisuji_move () {},
  add_semeai_move () {},
  add_potential_semeai_move () {},
  add_potential_semeai_attack () {},
  add_potential_semeai_defense () {},
  add_semeai_threat () {},
  add_either_move () {},
  add_all_move () {},
  add_loss_move () {},
  add_expand_territory_move () {},
  add_expand_moyo_move () {},
  add_invasion_move () {},
  add_shape_value () {},
  add_worthwhile_threat_move () {},
  add_strategical_attack_move () {},
  add_strategical_defense_move () {},
  add_owl_attack_move () {},
  add_owl_defense_move () {},
  add_owl_attack_threat_move () {},
  add_owl_uncertain_defense_move () {},
  add_owl_uncertain_attack_move () {},
  add_owl_defense_threat_move () {},
  add_my_atari_atari_move () {},
  add_your_atari_atari_move () {},
  add_owl_prevent_threat_move () {},
  add_followup_value () {},
  add_reverse_followup_value () {},
  set_minimum_move_value () {},
  set_maximum_move_value () {},
  set_minimum_territorial_value () {},
  set_maximum_territorial_value () {},
  add_replacement_move () {},
  get_saved_worms () {},
  mark_changed_dragon () {},
  mark_changed_string () {},
  get_saved_dragons () {},
  mark_safe_stones () {},
  list_move_reasons () {},
  discard_redundant_move_reasons () {},
  is_antisuji_move () {},
  scale_randomness () {},
  register_good_attack_threat () {},
  is_known_good_attack_threat () {},
  register_known_safe_move () {},
  is_known_safe_move () {},

}