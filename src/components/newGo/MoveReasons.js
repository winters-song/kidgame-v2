import {codes, colors, NO_MOVE} from "./Constants";
import {ATTACK_STRING, DEFEND_STRING, dragon_status} from "./Liberty";


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
// const VITAL_EYE_MOVE =          54

const OWL_ATTACK_MOVE_GAIN =    60
const OWL_DEFEND_MOVE_LOSS =    62
// const POTENTIAL_SEMEAI_ATTACK =	64
// const POTENTIAL_SEMEAI_DEFENSE = 66

const ANTISUJI_MOVE =           70

const EITHER_MOVE =             100
const ALL_MOVE =                102


/* Bitmap values for move_reason.status */
const ACTIVE =                  0
const TERRITORY_REDUNDANT =     1
const STRATEGICALLY_REDUNDANT = 2
const REDUNDANT =               (TERRITORY_REDUNDANT | STRATEGICALLY_REDUNDANT)
// const SECONDARY =               4

const MAX_REASONS = 120

// const MAX_TRACE_LENGTH =  160

const HUGE_MOVE_VALUE = 10.0*19*19

// class MoveReason {
//   type;   /* e.g. attack, defend, or connect */
//   what;   /* pointer into list of strings, list of pair of dragons, or similar */
//   status; /* This is a bitmap to mark redundant or secondary move reasons. */
// };


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
// const MAX_DRAGONS =		MAX_WORMS
const MAX_CONNECTIONS = 	4*MAX_WORMS
// const MAX_POTENTIAL_SEMEAI =	50
// const MAX_EYES =		19*19/2
const MAX_LUNCHES =		MAX_WORMS
const MAX_EITHER =		100
const MAX_ALL = 		100
const MAX_ATTACK_THREATS =	6



/* Helper functions to check conditions in discard rules. */

// class DiscardRule {
//   reason_type = [];
//   condition;
//   flags;
//   trace_message = [];
// };


export const MoveReasons = {

  // 初始化
  clear_move_reasons () {
    this.next_reason = 0;
    this.next_connection = 0;
    this.next_semeai = 0;
    this.next_either = 0;
    this.next_all = 0;
    this.next_eye = 0;
    this.next_lunch = 0;
      
    const b = this.board

    this.move = [];
    this.move_reasons = [];

    /* Connections */
    this.conn_worm1 = [];
    this.conn_worm2 = [];

    /* Potential semeai moves. */
    this.semeai_target1 = [];
    this.semeai_target2 = [];

    /* Unordered sets (currently pairs) of move reasons / targets */
    this.either_data = [];
    // this.next_either;
    this.all_data = [];
    // this.next_all;

    /* Eye shapes */
    this.eyes = [];
    this.eyecolor = [];

    /* Lunches */
    this.lunch_dragon = []; /* eater */
    this.lunch_worm = [];   /* food */

    /* Point redistribution */
    this.replacement_map = [];

    /* The color for which we are evaluating moves. */
    // this.current_color;

    /* Attack threats that are known to be sente locally. */
    this.known_good_attack_threats = [];

    /* Moves that are known to be safe (in the sense that played stones can
     * be captured, but opponent loses much more when attempting to do so)
     */
    this.known_safe_moves = [];

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.ON_BOARD(pos)) {
       
        this.move[pos] = new MoveData()
        /* The reason we assign a random number to each move immediately
         * is to avoid dependence on which moves are evaluated when it
         * comes to choosing between multiple moves of the same value.
         * In this way we can get consistent results for use in the
         * regression tests.
         */
        this.move[pos].random_number = Math.random();
  
        /* Do not send away the points (yet). */
        this.replacement_map[pos] = NO_MOVE;
      }
    }
  
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      this.known_safe_moves[pos] = 0;
      this.known_good_attack_threats[pos] = []
      for (let k = 0; k < MAX_ATTACK_THREATS; k++){
        this.known_good_attack_threats[pos][k] = NO_MOVE;
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

  /*
 * Find the index of a connection in the list of connections.
 * If necessary, add a new entry.
 */
  find_connection (worm1, worm2) {
    if (worm1 > worm2) {
      /* Swap to canonical order. */
      let tmp = worm1;
      worm1 = worm2;
      worm2 = tmp;
    }

    for (let k = 0; k < this.next_connection; k++){
      if (this.conn_worm1[k] === worm1 && this.conn_worm2[k] === worm2){
        return k;
      }
    }

    /* Add a new entry. */
    this.gg_assert(this.next_connection < MAX_CONNECTIONS);
    this.conn_worm1[this.next_connection] = worm1;
    this.conn_worm2[this.next_connection] = worm2;
    this.next_connection++;
    return this.next_connection - 1;
  },
  find_either_data (reason1, what1, reason2, what2) {
    /* Make sure the worms are ordered canonically. */
    if (what1 > what2) {
      let tmp = what1;
      what1 = what2;
      what2 = tmp;
    }

    for (let k = 0; k < this.next_either; k++){
      if (this.either_data[k].reason1    === reason1
        && this.either_data[k].what1   === what1
        && this.either_data[k].reason2 === reason2
        && this.either_data[k].what2   === what2){
        return k;
      }
    }

    /* Add a new entry. */
    this.gg_assert(this.next_either < MAX_EITHER);
    this.either_data[this.next_either].reason1 = reason1;
    this.either_data[this.next_either].what1   = what1;
    this.either_data[this.next_either].reason2 = reason2;
    this.either_data[this.next_either].what2   = what2;
    this.next_either++;

    return this.next_either - 1;
  },

  find_all_data (reason1, what1, reason2, what2) {
    /* Make sure the worms are ordered canonically. */
    if (what1 > what2) {
      let tmp = what1;
      what1 = what2;
      what2 = tmp;
    }

    for (let k = 0; k < this.next_all; k++){
      if (this.all_data[k].reason1    === reason1
        && this.all_data[k].what1   === what1
        && this.all_data[k].reason2 === reason2
        && this.all_data[k].what2   === what2){
        return k;
      }
    }

    /* Add a new entry. */
    this.gg_assert(this.next_all < MAX_ALL);
    this.all_data[this.next_all].reason1 = reason1;
    this.all_data[this.next_all].what1   = what1;
    this.all_data[this.next_all].reason2 = reason2;
    this.all_data[this.next_all].what2   = what2;
    this.next_all++;
    return this.next_all - 1;
  },

  find_pair_data (what1, what2) {
    for (let k = 0; k < this.next_either; k++){
      if (this.either_data[k].what1 === what1 && this.either_data[k].what2 === what2){
        return k;
      }
    }

    /* Add a new entry. */
    this.gg_assert(this.next_either < MAX_EITHER);
    this.either_data[this.next_either].what1   = what1;
    this.either_data[this.next_either].what2   = what2;
    this.next_either++;
    return this.next_either - 1;
  },

  /* Interprets the object of a reason and returns its position.
   * If the object is a pair (of worms or dragons), the position of the first
   * object is returned. (This is only used for trace outputs.) Returns
   * NO_MOVE if move does not point to a location.
   * FIXME: This new function produces some code duplication with other
   * trace output function. Do some code cleanup here.
   */
  get_pos (reason, what) {
    switch (reason) {
      case ATTACK_MOVE:
      case DEFEND_MOVE:
      case ATTACK_THREAT:
      case DEFEND_THREAT:
      case ATTACK_MOVE_GOOD_KO:
      case ATTACK_MOVE_BAD_KO:
      case DEFEND_MOVE_GOOD_KO:
      case DEFEND_MOVE_BAD_KO:
        return what;

      case SEMEAI_MOVE:
      case SEMEAI_THREAT:
      case STRATEGIC_ATTACK_MOVE:
      case STRATEGIC_DEFEND_MOVE:
      case OWL_ATTACK_MOVE:
      case OWL_DEFEND_MOVE:
      case OWL_ATTACK_THREAT:
      case OWL_DEFEND_THREAT:
      case OWL_PREVENT_THREAT:
      case UNCERTAIN_OWL_ATTACK:
      case UNCERTAIN_OWL_DEFENSE:
      case OWL_ATTACK_MOVE_GOOD_KO:
      case OWL_ATTACK_MOVE_BAD_KO:
      case OWL_DEFEND_MOVE_GOOD_KO:
      case OWL_DEFEND_MOVE_BAD_KO:
        return what;

      case EITHER_MOVE:
        /* FIXME: What should we return here? */
        return this.either_data[what].what1;

      case ALL_MOVE:
        /* FIXME: What should we return here? */
        return this.all_data[what].what1;

      case CONNECT_MOVE:
      case CUT_MOVE:
        return this.conn_worm1[what];

      case ANTISUJI_MOVE:
      case EXPAND_TERRITORY_MOVE:
      case EXPAND_MOYO_MOVE:
      case INVASION_MOVE:
      case MY_ATARI_ATARI_MOVE:
      case YOUR_ATARI_ATARI_MOVE:
        return NO_MOVE;

      case OWL_ATTACK_MOVE_GAIN:
      case OWL_DEFEND_MOVE_LOSS:
        /* FIXME: What should we return here? */
        return this.either_data[what].what1;

      default:
        /* We should never get here: */
        this.gg_assert(0);
        return 0; /* To keep gcc happy. */
    }
  },

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
      if (this.lunch_dragon[k] === dragon1 && this.lunch_worm[k] === worm1){
        return;
      }
    }

    /* Add a new entry. */
    this.gg_assert(this.next_lunch < MAX_LUNCHES);
    this.lunch_dragon[this.next_lunch] = dragon1;
    this.lunch_worm[this.next_lunch] = worm1;
    this.next_lunch++;
    return;
  },


  /* ---------------------------------------------------------------- */


  /*
   * Add a move reason for (pos) if it's not already there or the
   * table is full.
   */
  add_move_reason (pos, type, what) {
    const b = this.board;
    let k;

    b.ASSERT_ON_BOARD1(pos);
    if (b.stackp === 0) {
      b.ASSERT1(b.board[pos] === colors.EMPTY, pos);
    }

    for (k = 0; k < MAX_REASONS; k++) {
      let r = this.move[pos].reason[k];
      if (r < 0){
        break;
      }
      if (this.move_reasons[r].type === type && this.move_reasons[r].what === what){
        return;  /* Reason already listed. */
      }
    }

    /* Reason not found, add it if there is place left in both lists.
     * Otherwise drop it.
     */
    if (k >= MAX_REASONS) {
      // DEBUG(DEBUG_MOVE_REASONS, "Move reason at %1m (type=%d, what=%d) dropped because list full.\n", pos, type, what);
      return;
    }

    if (this.next_reason >= MAX_MOVE_REASONS) {
      // DEBUG(DEBUG_MOVE_REASONS, "Move reason at %1m (type=%d, what=%d) dropped because global list full.\n", pos, type, what);
      return;
    }

    /* Add a new entry. */
    this.move[pos].reason[k] = this.next_reason;
    this.move_reasons[this.next_reason].type = type;
    this.move_reasons[this.next_reason].what = what;
    this.move_reasons[this.next_reason].status = ACTIVE;
    this.next_reason++;
  },

  /*
   * Remove a move reason for (pos). Ignore silently if the reason
   * wasn't there.
   */
  remove_move_reason (pos, type, what) {
    let k;
    let n = -1; /* Position of the move reason to be deleted. */

    this.board.ASSERT_ON_BOARD1(pos);
    for (k = 0; k < MAX_REASONS; k++) {
      let r = this.move[pos].reason[k];
      if (r < 0){
        break;
      }
      if (this.move_reasons[r].type === type && this.move_reasons[r].what === what){
        n = k;
      }
    }

    if (n === -1){
      return; /* Move reason wasn't there. */
    }

    /* Now move the last move reason to position n, thereby removing the
     * one we were looking for.
     */
    k--;
    this.move[pos].reason[n] = this.move[pos].reason[k];
    this.move[pos].reason[k] = -1;
  },

  /*
   * Check whether a move reason already is recorded for a move.
   * A negative value for 'what' means only match 'type'.
   */
  move_reason_known (pos, type, what) {
    this.board.ASSERT_ON_BOARD1(pos);
    for (let k = 0; k < MAX_REASONS; k++) {
      let r = this.move[pos].reason[k];
      if (r < 0)
        break;
      if (this.move_reasons[r].type === type && (what < 0 || this.move_reasons[r].what === what)){
        return 1;
      }
    }
    return 0;
  },


  /* ---------------------------------------------------------------- */

  /* Functions used in discard_rules follow below. */

  /*
   * Check whether an attack move reason already is recorded for a move.
   * A negative value for 'what' means only match 'type'.
   */
  attack_move_reason_known (pos, what) {
    const b = this.board
    b.ASSERT1(what < 0 || b.IS_STONE(b.board[what]), what);
    what = this.worm[what].origin;
    if (this.move_reason_known(pos, ATTACK_MOVE, what)){
      return codes.WIN;
    }
    if (this.move_reason_known(pos, ATTACK_MOVE_GOOD_KO, what)){
      return codes.KO_A;
    }
    if (this.move_reason_known(pos, ATTACK_MOVE_BAD_KO, what)){
      return codes.KO_B;
    }
    return 0;
  },

  /*
 * Check whether a defense move reason already is recorded for a move.
 * A negative value for 'what' means only match 'type'.
 */
  defense_move_reason_known (pos, what) {
    const b = this.board
    b.ASSERT1(what < 0 || b.IS_STONE(b.board[what]), what);
    what = this.worm[what].origin;
    if (this.move_reason_known(pos, DEFEND_MOVE, what)){
      return codes.WIN;
    }
    if (this.move_reason_known(pos, DEFEND_MOVE_GOOD_KO, what)){
      return codes.KO_A;
    }
    if (this.move_reason_known(pos, DEFEND_MOVE_BAD_KO, what)){
      return codes.KO_B;
    }
    return 0;
  },

  /* Check whether a dragon consists of only one worm. If so, check
 * whether we know of a tactical attack or defense move.
 */
  tactical_move_vs_whole_dragon_known (pos, what) {
    return ((this.worm[what].size === this.dragon[what].size)
      && (this.attack_move_reason_known(pos, what) || this.defense_move_reason_known(pos, what)));
  },

  /*
 * Check whether an owl attack move reason already is recorded for a move.
 * A negative value for 'what' means only match 'type'.
 */
  owl_attack_move_reason_known (pos, what) {
    if (this.move_reason_known(pos, OWL_ATTACK_MOVE, what)){
      return codes.WIN;
    }
    if (this.move_reason_known(pos, OWL_ATTACK_MOVE_GOOD_KO, what)){
      return codes.KO_A;
    }
    if (this.move_reason_known(pos, OWL_ATTACK_MOVE_BAD_KO, what)){
      return codes.KO_B;
    }
    return 0;
  },
  owl_defense_move_reason_known (pos, what) {
    if (this.move_reason_known(pos, OWL_DEFEND_MOVE, what)){
      return codes.WIN;
    }
    if (this.move_reason_known(pos, OWL_DEFEND_MOVE_GOOD_KO, what)){
      return codes.KO_A;
    }
    if (this.move_reason_known(pos, OWL_DEFEND_MOVE_BAD_KO, what)){
      return codes.KO_B;
    }
    return 0;
  },
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

  semeai_move_reason_known (pos, what) {
    return this.move_reason_known(pos, SEMEAI_MOVE, what);
  },
  concerns_inessential_worm (pos, what) {
    return this.DRAGON2(what).safety === dragon_status.INESSENTIAL || this.worm[what].inessential;
  },
  /* Check whether a dragon is inessential */
  concerns_inessential_dragon (pos, what) {
    return this.DRAGON2(what).safety === dragon_status.INESSENTIAL;
  },
  move_is_marked_unsafe (pos, what) {
    return (!this.move[pos].move_safety && !this.adjacent_to_nondead_stone(pos, this.current_color));
  },

  /* Check whether a dragon is non-critical. */
  concerns_noncritical_dragon (pos, what) {
    return (this.dragon[what].status !== dragon_status.CRITICAL && this.worm[what].attack_codes[0] === 0);
  },

  /* (what) points to two worms listed in either_data. Returns true if
 * this is a "attack either" move reason, and one of the worms attackable.
 * FIXME: Ko?
 */
  either_worm_attackable (pos, what) {
    return (this.either_data[what].reason1 === ATTACK_STRING
      && this.either_data[what].reason2 === ATTACK_STRING
      && (this.worm[this.either_data[what].what1].attack_codes[0] !== 0
        || this.worm[this.either_data[what].what2].attack_codes[0] !== 0));
  },

  /* (what) points to two worms via all_data. Returns true if this is
 * a "defend both" move reason, and one of the worms is attackable.
 * FIXME: Ko?
 */
  one_of_both_attackable (pos, what) {
    return (this.all_data[what].reason1 === DEFEND_STRING
      && this.all_data[what].reason2 === DEFEND_STRING
      && (this.worm[this.all_data[what].what1].attack_codes[0] !== 0
        || this.worm[this.all_data[what].what2].attack_codes[0] !== 0));
  },

  /*
   * Add to the reasons for the move at (pos) that it attacks the worm
   * at (ww).
   */
  add_attack_move (pos, ww, code) {
    const b = this.board
    b.ASSERT_ON_BOARD1(ww);
    ww = this.worm[ww].origin;

    if (code === codes.WIN){
      this.add_move_reason(pos, ATTACK_MOVE, ww);
    }
    else if (code === codes.KO_A){
      this.add_move_reason(pos, ATTACK_MOVE_GOOD_KO, ww);
    }
    else if (code === codes.KO_B){
      this.add_move_reason(pos, ATTACK_MOVE_BAD_KO, ww);
    }
  },

  /*
 * Add to the reasons for the move at (pos) that it defends the worm
 * at (ww).
 */
  add_defense_move (pos, ww, code) {
    const b = this.board
    b.ASSERT_ON_BOARD1(ww);
    ww = this.worm[ww].origin;

    if (code === codes.WIN){
      this.add_move_reason(pos, DEFEND_MOVE, ww);
    }
    else if (code === codes.KO_A){
      this.add_move_reason(pos, DEFEND_MOVE_GOOD_KO, ww);
    }
    else if (code === codes.KO_B){
      this.add_move_reason(pos, DEFEND_MOVE_BAD_KO, ww);
    }
  },

  /*
 * Add to the reasons for the move at (pos) that it threatens to
 * attack the worm at (ww).
 */
  add_attack_threat_move (pos, ww, code) {
    this.board.ASSERT_ON_BOARD1(ww);
    this.add_move_reason(pos, ATTACK_THREAT, this.worm[ww].origin);
  },
  remove_attack_threat_move (pos, ww) {
    this.board.ASSERT_ON_BOARD1(ww);
    this.remove_move_reason(pos, ATTACK_THREAT, this.worm[ww].origin);
  },

  /*
   * Add to the reasons for the move at (pos) that it defends the worm
   * at (ww).
   */
  add_defense_threat_move (pos, ww, code) {
    this.board.ASSERT_ON_BOARD1(ww);
    this.add_move_reason(pos, DEFEND_THREAT, this.worm[ww].origin);
  },

  /* Report all, or up to max_strings, strings that are threatened
   * at (pos).
   */
  get_attack_threats (pos, max_strings, strings) {
    let num_strings = 0;

    for (let k = 0; k < MAX_REASONS; k++) {
      let r = this.move[pos].reason[k];
      if (r < 0){
        break;
      }

      if (this.move_reasons[r].type === ATTACK_THREAT){
        strings[num_strings++] = this.move_reasons[r].what;
      }

      if (num_strings === max_strings){
        break;
      }
    }

    return num_strings;
  },

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

  /*
   * Set a minimum allowed value for the move.
   */
  set_minimum_move_value (pos, value) {
    this.board.ASSERT_ON_BOARD1(pos);
    if (value > this.move[pos].min_value) {
      this.move[pos].min_value = value;
      return 1;
    }
    return 0;
  },
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