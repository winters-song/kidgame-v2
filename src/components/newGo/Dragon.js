import {DEFAULT_STRENGTH, dragon_status, EyeValue, HalfEyeData, INFLUENCE_SAFE_STONE} from "./Liberty";
import {codes, colors, InterpolationData, NO_MOVE, SURROUNDED, WEAKLY_SURROUNDED} from "./Constants";
import {initial_black_influence, initial_white_influence} from "./Influence";
import {gg_interpolate} from "./GgUtils";

/* A "dragon" is a union of strings of the same color which will be
 * treated as a unit. The dragons are generated anew at each
 * move. If two strings are in the dragon, it is GNU Go's working
 * hypothesis that they will live or die together and are
 * effectively connected.
 *
 *                    _____/|        (! !)
 *                   / ____/|        /@ @)
 *                  / /   __        //  +--oo
 *                 | /   |   >>    /<  _-v--}
 *                 | |   UUU\\\     / / \\
 *                 | |   __ _\\\    \ \  U
 *                 | |  /  V  \\-->  \ \ 
 *                 | <_/           \_/  }
 *                 |      __     ____  /
 *                  \    /  \___/   / /\
 *                  <  \<          < <\ \
 *                   ( )))         ( ))))) 
 */

const MAX_NEIGHBOR_DRAGONS = 10

class DragonData {
  color;    /* its color                                                 */
  id;       /* the index into the dragon2 array                          */
  origin;   /* the origin of the dragon. Two vertices are in the same dragon iff they have same origin.                         */
  size;     /* size of the dragon                                        */
  effective_size; /* stones and surrounding spaces                     */
  crude_status; /* (ALIVE, DEAD, UNKNOWN, CRITICAL)       */
  status;       /* best trusted status                    */

  constructor(cfg) {
    Object.assign(this, cfg)
  }
};

class DragonData2 {
  origin;                         /* the origin of the dragon            */
  adjacent =[]; /* adjacent dragons                    */
  neighbors = 0;                      /* number of adjacent dragons          */
  hostile_neighbors = 0;              /* neighbors of opposite color         */

  moyo_size = -1;		      /* size of surrounding influence moyo, */
  moyo_territorial_value = 0.0;       /* ...and its territorial value        */
  safety = -1;          /* a more detailed status estimate     */
  weakness;           /* a continuous estimate of the dragon's safety  */
  weakness_pre_owl;   /* dragon safety based on pre-owl computations   */
  strategic_size; /* An effective size including weakness of neighbors */
  escape_route = 0;         /* a measurement of likelihood of escape         */
  genus;    /* the number of eyes (approximately)            */
  heye = NO_MOVE;     /* coordinates of a half eye                                 */
  lunch = NO_MOVE;    /* if lunch != 0 then lunch points to a boundary worm which can be captured easily.                                   */
  surround_status = 0;         /* Is it surrounded?                          */
  surround_size;           /* Size of the surrounding area               */

  semeais = 0;         /* number of semeais in which the dragon is involved  */
  semeai_defense_code = 0;/* Result code for semeai defense.                */
  semeai_defense_point	= NO_MOVE;/* Move found by semeai code to rescue dragon     */
  semeai_defense_certain;
  semeai_defense_target; /* The opponent dragon involved in the semeai   */
  semeai_attack_code = 0; /* Result code for semeai attack.                 */
  semeai_attack_point	= NO_MOVE; /* Move found by semeai code to kill dragon       */
  semeai_attack_certain;
  semeai_attack_target; /* The opponent dragon involved in the semeai    */
  owl_threat_status = dragon_status.UNCHECKED; /* CAN_THREATEN_ATTACK/DEFENSE       */
  owl_status = dragon_status.UNCHECKED; /* (ALIVE, DEAD, UNKNOWN, CRITICAL, UNCHECKED)    */
  owl_attack_point = NO_MOVE;    /* vital pofor attack                         */
  owl_attack_code = 0;     /* ko result code                                 */
  owl_attack_certain = 1;  /* 0 if owl reading node limit is reached         */
  owl_attack_node_count;
  owl_second_attack_point = NO_MOVE;/* if attacker gets both attack points, wins   */
  owl_defense_point = NO_MOVE;   /* vital pofor defense                        */
  owl_defense_code = 0;    /* ko result code                                 */
  owl_defense_certain = 1; /* 0 if owl reading node limit is reached         */
  owl_second_defense_point = NO_MOVE;/* if defender gets both attack points, wins  */
  owl_attack_kworm;    /* only valid when owl_attack_code is GAIN        */
  owl_defense_kworm;   /* only valid when owl_defense_code is LOSS       */
  constructor(cfg) {
    Object.assign(this, cfg)
  }
}

let dragon2_initialized;
// let lively_white_dragons;
// let lively_black_dragons;



let moyo_value2weakness = new InterpolationData([ 5, 0.0, 15.0, [1.0, 0.65, 0.3, 0.15, 0.05, 0.0]])
let escape_route2weakness = new InterpolationData([ 5, 0.0, 25.0, [1.0, 0.6, 0.3, 0.1, 0.05, 0.0]])
let genus2weakness = new InterpolationData([  6, 0.0, 3.0, [1.0, 0.95, 0.8, 0.5, 0.2, 0.1, 0.0]])


let new_dragon_origins = []


// struct cut_data {
//   int apos;
//   int bpos;
//   int move;
// };

let num_cuts = 0;
let cut_list = []



/* This basic function finds all dragons and collects some basic information
 * about them in the dragon array.
 *
 * color is the player in turn to move. This does in no way affect the
 * information collected about the dragons, but it does affect what
 * information is passed on to the move generation code. If
 * color == EMPTY no information at all is passed on to the move generation.
 */
export const Dragon = {

  DRAGON(d) {
    return this.dragon[this.dragon2[d].origin]
  },

  // macro
  DRAGON2(pos){
    return this.dragon2[this.dragon[pos].id]
  },

  dragon2_func(dragon , pos){
    const b = this.board
    b.ASSERT1(b.ON_BOARD1(pos) && dragon[pos].id >= 0  && dragon[pos].id < this.number_of_dragons, pos);
    return this.dragon2[dragon[pos].id];
  },

  make_dragons(stop_before_owl){
    const b = this.board

    dragon2_initialized = 0;
    this.initialize_dragon_data();

    /* Find explicit connections patterns in database and amalgamate
     * involved dragons.
     */
    this.cutting_points = []
    this.find_cuts();
    this.find_connections();

    /* At this time, all dragons have been finalized and we can
     * initialize the dragon2[] array. After that we can no longer allow
     * amalgamation of dragons.
     */
    this.initialize_supplementary_dragon_data();

    this.make_domains(this.black_eye, this.white_eye, 0);

    // /* Find adjacent worms which can be easily captured: */
    this.find_lunches();

    // /* Find topological half eyes and false eyes. */
    this.find_half_and_false_eyes(colors.BLACK, this.black_eye, this.half_eye, null);
    this.find_half_and_false_eyes(colors.WHITE, this.white_eye, this.half_eye, null);

    // /* Compute the number of eyes, half eyes, determine attack/defense points
    //  * etc. for all eye spaces. */
    this.eye_computations();
    // /* Try to determine whether topologically false and half eye points
    //  * contribute to territory even if the eye doesn't solidify.
    //  */
    this.analyze_false_eye_territory();

    // /* Now we compute the genus. */
    for (let d = 0; d < this.number_of_dragons; d++){
      this.compute_dragon_genus(this.dragon2[d].origin, this.dragon2[d].genus, NO_MOVE);
    }

    /* Compute the escape route measure. */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++){
      if (b.IS_STONE(b.board[str]) && this.dragon[str].origin === str){
        this.DRAGON2(str).escape_route = this.compute_escape(str, 0);
      }
    }

    /* Set dragon weaknesses according to initial_influence. */
    this.compute_refined_dragon_weaknesses();
    for (let d = 0; d < this.number_of_dragons; d++){
      this.dragon2[d].weakness_pre_owl = this.dragon2[d].weakness;
    }

    /* Determine status: ALIVE, DEAD, CRITICAL or UNKNOWN */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++) {
      if (b.ON_BOARD(str)){
        if (this.dragon[str].origin === str && b.board[str]){
          this.dragon[str].crude_status = this.compute_crude_status(str);
        }
      }
    }

    /* We must update the dragon status at every intersection before we
     * call the owl code. This updates all fields.
     */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++){
      if (b.ON_BOARD(str) && b.board[str] !== colors.EMPTY){
        this.dragon[str] = this.dragon[this.dragon[str].origin];
      }
    }

    this.find_neighbor_dragons();

    for (let d = 0; d < this.number_of_dragons; d++) {
      this.dragon2[d].surround_status = this.compute_surroundings(this.dragon2[d].origin, NO_MOVE, 0, this.dragon2[d].surround_size);
      if (this.dragon2[d].surround_status === SURROUNDED) {
        this.dragon2[d].escape_route = 0;
        // if (debug & DEBUG_DRAGONS)
        //   gprintf("surrounded dragon found at %1m\n", dragon2[d].origin);
      }
      else if (this.dragon2[d].surround_status === WEAKLY_SURROUNDED) {
        this.dragon2[d].escape_route /= 2;
        // if (debug & DEBUG_DRAGONS)
        //   gprintf("weakly surrounded dragon found at %1m\n", dragon2[d].origin);
      }
    }

    if (stop_before_owl){
      return;
    }

    /* Determine life and death status of each dragon using the owl code
     * if necessary.
     */
    // start_timer(2);
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
      if (b.ON_BOARD(str)) {
        let attack_point = NO_MOVE;
        let defense_point = NO_MOVE;
        let no_eyes = new EyeValue();

        if (b.board[str] === colors.EMPTY || this.dragon[str].origin !== str){
          continue;
        }

        /* Some dragons can be ignored but be extra careful with big dragons. */
        if (this.crude_dragon_weakness(dragon_status.ALIVE, no_eyes, 0,
          this.DRAGON2(str).moyo_territorial_value,
          this.DRAGON2(str).escape_route - 10) <
          0.00001 + Math.max(0.12, 0.32 - 0.01* this.dragon[str].effective_size)) {
          this.DRAGON2(str).owl_status = dragon_status.UNCHECKED;
          this.DRAGON2(str).owl_attack_point  = NO_MOVE;
          this.DRAGON2(str).owl_defense_point = NO_MOVE;
        }
        else {
          let acode = 0;
          let dcode = 0;
          let kworm = NO_MOVE;
          let owl_nodes_before = this.get_owl_node_counter();
          // start_timer(3);
          acode = this.owl_attack(str, this.attack_point, this.DRAGON2(str).owl_attack_certain, this.kworm);
          this.DRAGON2(str).owl_attack_node_count = this.get_owl_node_counter() - owl_nodes_before;
          if (acode !== 0) {
            this.DRAGON2(str).owl_attack_point = attack_point;
            this.DRAGON2(str).owl_attack_code = acode;
            this.DRAGON2(str).owl_attack_kworm = kworm;
            if (attack_point !== NO_MOVE) {
              kworm = NO_MOVE;
              dcode = this.owl_defend(str, this.defense_point, this.DRAGON2(str).owl_defense_certain, this.kworm);
              if (dcode !== 0) {
                if (defense_point !== NO_MOVE) {
                  this.DRAGON2(str).owl_status = (acode === codes.GAIN ? dragon_status.ALIVE : dragon_status.CRITICAL);
                  this.DRAGON2(str).owl_defense_point = defense_point;
                  this.DRAGON2(str).owl_defense_code = dcode;
                  this.DRAGON2(str).owl_defense_kworm = kworm;
                }
                else {
                  /* Due to irregularities in the owl code, it may
                   * occasionally happen that a dragon is found to be
                   * attackable but also alive as it stands. In this case
                   * we still choose to say that the owl_status is
                   * CRITICAL, although we don't have any defense move to
                   * propose. Having the status right is important e.g.
                   * for connection moves to be properly valued.
                   */
                  this.DRAGON2(str).owl_status = (acode === codes.GAIN ? dragon_status.ALIVE : dragon_status.CRITICAL);
                  // DEBUG(DEBUG_OWL_PERFORMANCE,
                  //   "Inconsistent owl attack and defense results for %1m.\n",
                  //   str);
                  /* Let's see whether the attacking move might be the right
                   * defense:
                   */
                  dcode = this.owl_does_defend(this.DRAGON2(str).owl_attack_point, str, null);
                  if (dcode !== 0) {
                    this.DRAGON2(str).owl_defense_point = this.DRAGON2(str).owl_attack_point;
                    this.DRAGON2(str).owl_defense_code = dcode;
                  }
                }
              }
            }
            if (dcode === 0) {
              this.DRAGON2(str).owl_status = dragon_status.DEAD;
              this.DRAGON2(str).owl_defense_point = NO_MOVE;
              this.DRAGON2(str).owl_defense_code = 0;
            }
          }
          else {
            if (!this.DRAGON2(str).owl_attack_certain) {
              kworm = NO_MOVE;
              dcode = this.owl_defend(str, this.defense_point, this.DRAGON2(str).owl_defense_certain, this.kworm);
              if (dcode !== 0) {
                /* If the result of owl_attack was not certain, we may
                 * still want the result of owl_defend */
                this.DRAGON2(str).owl_defense_point = defense_point;
                this.DRAGON2(str).owl_defense_code = dcode;
                this.DRAGON2(str).owl_defense_kworm = kworm;
              }
            }
            this.DRAGON2(str).owl_status = dragon_status.ALIVE;
            this.DRAGON2(str).owl_attack_point = NO_MOVE;
            this.DRAGON2(str).owl_attack_code = 0;

          }
        }
      }
    // // time_report(2, "  owl reading", NO_MOVE, 1.0);

    // /* Compute the status to be used by the matcher. We most trust the
    //  * owl status, if it is available. If it's not we assume that we are
    //  * already confident that the dragon is alive, regardless of
    //  * crude_status.
    //  */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
    //   if (b.IS_STONE(b.board[str])) {
    //     if (this.DRAGON2(str).owl_status !== dragon_status.UNCHECKED)
    //       this.dragon[str].status = this.DRAGON2(str).owl_status;
    //     else
    //       this.dragon[str].status = dragon_status.ALIVE;
    //   }

    // /* The dragon data is now correct at the origin of each dragon but
    //  * we need to copy it to every vertex.
    //  */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
    //   if (b.ON_BOARD(str) && b.board[str] !== colors.EMPTY)
    //     this.dragon[str] = this.dragon[dragon[str].origin];

    // this.identify_thrashing_dragons();

    // /* Owl threats. */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
    //   if (b.ON_BOARD(str)
    //     && b.board[str] !== colors.EMPTY
    //     && this.dragon[str].origin === str) {
    //     let no_eyes;
    //     this.set_eyevalue(no_eyes, 0, 0, 0, 0);
    //     if (this.crude_dragon_weakness(ALIVE, no_eyes, 0,
    //       this.DRAGON2(str).moyo_territorial_value,
    //     this.DRAGON2(str).escape_route - 10)
    //       < 0.00001 + Math.max(0.12, 0.32 - 0.01*this.dragon[str].effective_size)) {
    //       this.DRAGON2(str).owl_threat_status = dragon_status.UNCHECKED;
    //       this.DRAGON2(str).owl_second_attack_point  = NO_MOVE;
    //       this.DRAGON2(str).owl_second_defense_point = NO_MOVE;
    //     }
    //   else {
    //       let acode = this.DRAGON2(str).owl_attack_code;
    //       let dcode = this.DRAGON2(str).owl_defense_code;
    //       let defense_point, second_defense_point;

    //       if (get_level() >= 8
    //         && !disable_threat_computation
    //         && (owl_threats
    //           || thrashing_stone[str])) {
    //         if (acode && !dcode && DRAGON2(str).owl_attack_point !== NO_MOVE) {
    //           if (owl_threaten_defense(str, defense_point, second_defense_point)) {
    //             this.DRAGON2(str).owl_threat_status = dragon_status.CAN_THREATEN_DEFENSE;
    //             this.DRAGON2(str).owl_defense_point = defense_point;
    //             this.DRAGON2(str).owl_second_defense_point = second_defense_point;
    //           }
    //         else
    //           this.DRAGON2(str).owl_threat_status = dragon_status.DEAD;
    //         }
    //         else if (!acode) {
    //           let attack_point, second_attack_point;
    //           if (owl_threaten_attack(str, attack_point, second_attack_point)) {
    //             this.DRAGON2(str).owl_threat_status = dragon_status.CAN_THREATEN_ATTACK;
    //             this.DRAGON2(str).owl_attack_point = attack_point;
    //             this.DRAGON2(str).owl_second_attack_point = second_attack_point;
    //           }
    //         else
    //           this.DRAGON2(str).owl_threat_status = dragon_status.ALIVE;
    //         }
    //       }
    //     }
    //   }

    // /* Once again, the dragon data is now correct at the origin of each dragon
    //  * but we need to copy it to every vertex.
    //  */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
    //   if (b.ON_BOARD(str) && b.board[str] !== colors.EMPTY)
    //     this.dragon[str] = this.dragon[this.dragon[str].origin];

    // // time_report(2, "  owl threats ", NO_MOVE, 1.0);


    // /* Compute the safety value. */
    // for (let d = 0; d < this.number_of_dragons; d++) {
    //   let true_genus;
    //   let origin = this.dragon2[d].origin;
    //   // struct eyevalue *genus = &dragon2[d].genus;

    //   /* FIXME: We lose information when constructing true_genus. This
    //    * code can be improved.
    //    */
    //   true_genus = this.max_eyes(genus) + this.min_eyes(genus);
    //   if (this.dragon_looks_inessential(origin))
    //     this.dragon2[d].safety = dragon_status.INESSENTIAL;
    //   else if (dragon[origin].size === this.worm[origin].size
    //     && this.worm[origin].attack_codes[0] !== 0
    //     && this.worm[origin].defense_codes[0] === 0)
    //     this.dragon2[d].safety = dragon_status.TACTICALLY_DEAD;
    //   else if (0) /* Seki is detected by the call to semeai() below. */
    //     this.dragon2[d].safety = dragon_status.ALIVE_IN_SEKI;
    //   else if (dragon_invincible(origin)) {
    //     this.dragon2[d].safety = dragon_status.INVINCIBLE;
    //     /* Sometimes the owl analysis may have misevaluated invincible
    //      * dragons, typically if they live by topologically false eyes.
    //      * Therefore we also set the status here.
    //      */
    //     this.DRAGON(d).status = dragon_status.ALIVE;
    //   }
    //   else if (this.dragon2[d].owl_status == DEAD)
    //     this.dragon2[d].safety = dragon_status.DEAD;
    //   else if (this.dragon2[d].owl_status == CRITICAL)
    //     this.dragon2[d].safety = dragon_status.CRITICAL;
    //   else if (true_genus >= 6 || this.dragon2[d].moyo_size > 20)
    //     this.dragon2[d].safety = dragon_status.STRONGLY_ALIVE;
    //   else
    //     this.dragon2[d].safety = dragon_status.ALIVE;
    // }

    // /* The status is now correct at the origin of each dragon
    //  * but we need to copy it to every vertex.
    //  */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
    //   if (b.ON_BOARD(str))
    //     this.dragon[str].status = this.dragon[this.dragon[str].origin].status;

    // /* Revise inessentiality of critical worms and dragons. */
    // this.revise_inessentiality();

    // this.semeai();
    // // time_report(2, "  semeai module", NO_MOVE, 1.0);

    // /* Count the non-dead dragons. */
    // this.lively_white_dragons = 0;
    // this.lively_black_dragons = 0;

    // for (let d = 0; d < number_of_dragons; d++)
    //   if (this.DRAGON(d).status !== dragon_status.DEAD) {
    //     if (this.DRAGON(d).color === colors.WHITE)
    //       this.lively_white_dragons++;
    //     else
    //       this.lively_black_dragons++;
    //   }
  },

  /* Find capturable worms adjacent to each dragon. */
  find_lunches () {
    const b = this.board
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++){
      if (b.ON_BOARD(str)) {
        let food;

        if (this.worm[str].origin !== str || b.board[str] === colors.EMPTY || this.worm[str].lunch === NO_MOVE){
          continue;
        }

        food = this.worm[str].lunch;

        /* In contrast to worm lunches, a dragon lunch must also be
         * able to defend itself.
         */
        // 大龙的lunch不能是死子
        if (this.worm[food].defense_codes[0] === 0){
          continue;
        }

        /* Tell the move generation code about the lunch. */
        this.add_lunch(str, food);

        /* If several lunches are found, we pick the juiciest.
         * First maximize cutstone, then minimize liberties.
         */

        let origin = this.dragon[str].origin;
        let lunch = this.DRAGON2(origin).lunch;

        if (lunch === NO_MOVE
          || this.worm[food].cutstone > this.worm[lunch].cutstone
          || (this.worm[food].cutstone === this.worm[lunch].cutstone
            && (this.worm[food].liberties < this.worm[lunch].liberties))) {
          this.DRAGON2(origin).lunch = this.worm[food].origin;
          // TRACE("at %1m setting %1m.lunch to %1m (cutstone=%d)\n",
          //   str, origin, worm[food].origin, worm[food].cutstone);
        }
      }
    }
  },

  /* Compute the value of each eye space. Store its attack and defense point.
   * A more comlete list of attack and defense points is stored in the lists
   * black_vital_points and white_vital_points.
   */
  eye_computations () {
    const b = this.board

    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++) {
      if (!b.ON_BOARD(str)){
        continue;
      }

      if (this.black_eye[str].color === colors.BLACK && this.black_eye[str].origin === str) {
        let value = new EyeValue()
        let attack_point = []
        let defense_point = []

        this.compute_eyes(str, value, attack_point, defense_point, this.black_eye, this.half_eye, 1);
        // DEBUG(DEBUG_EYES, "Black eyespace at %1m: %s\n", str, eyevalue_to_string(&value));
        this.black_eye[str].value = value;
        this.propagate_eye(str, this.black_eye);
      }

      if (this.white_eye[str].color === colors.WHITE && this.white_eye[str].origin === str) {
        let value = new EyeValue()
        let attack_point = []
        let defense_point = []

        this.compute_eyes(str, value, attack_point, defense_point, this.white_eye, this.half_eye, 1);
        // DEBUG(DEBUG_EYES, "White eyespace at %1m: %s\n", str, eyevalue_to_string(&value));
        this.white_eye[str].value = value;
        this.propagate_eye(str, this.white_eye);
      }
    }
  },
  revise_inessentiality () {},

/* Initialize the dragon[] array. */
  initialize_dragon_data () {
    const b = this.board
    /* VALGRIND_MAKE_WRITABLE(dragon, BOARDMAX * sizeof(struct dragon_data)); */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++){

      if (b.ON_BOARD(str)) {

        this.dragon[str] = new DragonData({
          id                 : -1,
          size               : this.worm[str].size,
          effective_size     : this.worm[str].effective_size,
          color              : this.worm[str].color,
          origin             : this.worm[str].origin,
          crude_status       : dragon_status.UNKNOWN,
          status             : dragon_status.UNKNOWN,
        })

        this.half_eye[str] = new HalfEyeData({
          type  :  0,
          value :  10.0, /* Something big. */
        })
        
        if (b.IS_STONE(b.board[str]) && this.worm[str].origin === str) {
          console.log("Initializing dragon", str, this.worm[str].size);
        }
      }
    }

    /* This is a private array to obtain a list of worms belonging to each
    * dragon. Public access is via first_worm_in_dragon() and
    * next_worm_in_dragon().
    */
    this.next_worm_list = []

    /* We need to reset this to avoid trouble on an empty board when
    * moves have previously been generated for a non-empty board.
    *
    * Comment: The cause of this is that make_dragons() is not called
    * for an empty board, only initialize_dragon_data(), so we never
    * reach initialize_supplementary_dragon_data().
    */
    this.number_of_dragons = 0;

    this.num_cuts = 0;
  },

  /* Initialize the dragon2[] array. */
  initialize_supplementary_dragon_data () {
    let str;
    let d;
    let origin;
    const b = this.board
    /* Give each dragon (caves excluded) an id number for indexing into
     * the dragon2 array. After this the DRAGON2 macro can be used.
     */
    this.number_of_dragons = 0;
    for (str = b.BOARDMIN; str < b.BOARDMAX; str++) {
      if (!b.ON_BOARD(str)){
        continue;
      }
      origin = this.dragon[str].origin;

      if (b.board[str] === colors.EMPTY){
        continue;
      }
      // number_of_dragons计数作为dragon.id
      if (this.dragon[origin].id === -1) {
        this.dragon[origin].id = this.number_of_dragons++;
      }
      this.dragon[str].id = this.dragon[origin].id;
    }

    this.dragon2 = [];

    /* Initialize the rest of the dragon2 data. */
    for (d = 0; d < this.number_of_dragons; d++) {
      this.dragon2[d] = new DragonData2({
        genus: new EyeValue()
      })
    }

    /* Find the origins of the dragons to establish the mapping back to
     * the board. After this the DRAGON macro can be used.
     */
    // 设置origin
    for (str = b.BOARDMIN; str < b.BOARDMAX; str++) {
      if (!b.ON_BOARD(str))
        continue;
      if (b.IS_STONE(b.board[str]) && this.dragon[str].origin === str) {
        this.DRAGON2(str).origin = str;
      }
    }

    dragon2_initialized = 1;
  },

  /* Examine which dragons are adjacent to each other. This is
   * complicated by the fact that adjacency may involve a certain
   * amount of empty space.
   *
   * The approach we use is to extend the dragons into their
   * surrounding influence areas until they collide. We also accept
   * one step extensions into neutral regions. After having done this
   * we can look for immediate adjacencies.
   */
  find_neighbor_dragons () {
    let pos;
    let pos2;
    let i, j;
    let dragons = [];
    let distances = [];
    let dist;
    let k;
    let color;

    const b = this.board
    b.ASSERT1(dragon2_initialized);

    /* Initialize the arrays. */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.IS_STONE(b.board[pos])) {
        dragons[pos] = this.dragon[pos].id;
        distances[pos] = 0;
      }
      else if (b.ON_BOARD(pos)) {
        dragons[pos] = -1;
        distances[pos] = -1;
      }
    }

    /* Expand from dist-1 to dist. Break out of the loop at the end if
     * we couldn't expand anything. Never expand more than five steps.
     */
    for (dist = 1; dist <= 5; dist++) {
      let found_one = 0;

      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (!b.ON_BOARD(pos)){
          continue;
        }

        if (distances[pos] !== dist-1 || dragons[pos] < 0){
          continue;
        }

        color = this.DRAGON(dragons[pos]).color;
        for (k = 0; k < 4; k++) {
          pos2 = pos + b.delta[k];

          if (!b.ON_BOARD1(pos2)){
            continue;
          }

          /* Consider expansion from (pos) to adjacent intersection
           * (pos2).
           */
          if (distances[pos2] >= 0 && distances[pos2] < dist){
            continue; /* (pos2) already occupied. */
          }

          /* We can always expand the first step, regardless of influence. */
          if (dist === 1
            || (this.whose_area(this.INITIAL_INFLUENCE(color), pos) === color
              && this.whose_area(this.INITIAL_INFLUENCE(color), pos2) !== b.OTHER_COLOR(color))) {
            /* Expansion ok. Now see if someone else has tried to
             * expand here. In that case we indicate a collision by
             * setting the dragon number to -2.
             */
            if (distances[pos2] === dist) {
              if (dragons[pos2] !== dragons[pos]){
                dragons[pos2] = -2;
              }
            }
            else {
              dragons[pos2] = dragons[pos];
              distances[pos2] = dist;
              found_one = 1;
            }
          }
        }
      }
      if (!found_one){
        break;
      }
    }


    /* Now go through dragons to find neighbors. It suffices to look
     * south and east for neighbors. In the case of a collision zone
     * where dragons==-2 we set all the neighbors of this intersection
     * as adjacent to each other.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }
      if (dragons[pos] === -2) {
        let neighbors = 0;
        let adjacent = [];

        for (k = 0; k < 4; k++) {
          pos2 = pos + b.delta[k];

          if (b.ON_BOARD1(pos2) && dragons[pos2] >= 0){
            adjacent[neighbors++] = dragons[pos2];
          }
        }
        for (i = 0; i < neighbors; i++){
          for (j = i+1; j < neighbors; j++){
            this.add_adjacent_dragons(adjacent[i], adjacent[j]);
          }
        }
      }
      else if (dragons[pos] >= 0) {
        if (b.ON_BOARD(b.NORTH(pos))) {
          if (dragons[b.NORTH(pos)] >= 0 && dragons[b.NORTH(pos)] !== dragons[pos]){
            this.add_adjacent_dragons(dragons[pos], dragons[b.NORTH(pos)]);
          }
        }
        if (b.ON_BOARD(b.EAST(pos))) {
          if (dragons[b.EAST(pos)] >= 0 && dragons[b.EAST(pos)] !== dragons[pos]) {
            this.add_adjacent_dragons(dragons[pos], dragons[b.EAST(pos)]);
          }
        }
      }
    }
  },

  /* Add the dragons with id a and b as adjacent to each other. */
  add_adjacent_dragons (a, b) {
    this.board.ASSERT1(a >= 0 && a < this.number_of_dragons && b >= 0 && b < this.number_of_dragons);
    if (a === b){
      return;
    }
    this.add_adjacent_dragon(a, b);
    this.add_adjacent_dragon(b, a);
  },

  /* Add the dragon with id b as adjacent to a. */
  add_adjacent_dragon (a, b) {
    const bd = this.board
    bd.ASSERT1(a >= 0 && a < this.number_of_dragons && b >= 0 && b < this.number_of_dragons);
    /* If the array of adjacent dragons already is full, ignore
     * additional neighbors.
     */
    if (this.dragon2[a].neighbors === MAX_NEIGHBOR_DRAGONS)
      return;

    for (let i = 0; i < this.dragon2[a].neighbors; i++){
      if (this.dragon2[a].adjacent[i] === b){
        return;
      }
    }

    this.dragon2[a].adjacent[this.dragon2[a].neighbors++] = b;

    if (this.DRAGON(a).color === bd.OTHER_COLOR(this.DRAGON(b).color)){
      this.dragon2[a].hostile_neighbors++;
    }
  },

  dragon_invincible () {},
  dragon_looks_inessential () {},

  /* Report which stones are alive if it's (color)'s turn to move. I.e.
   * critical stones belonging to (color) are considered alive.
   * A stone is dead resp. critical if the tactical reading code _or_ the
   * owl code thinks so.
   */
  get_alive_stones (color, safe_stones) {
    const b= this.board
    this.get_lively_stones(color, safe_stones);
    for (let d = 0; d < this.number_of_dragons; d++) {
      if (this.dragon2[d].safety === dragon_status.DEAD
        || (this.dragon2[d].safety === dragon_status.CRITICAL
          && b.board[this.dragon2[d].origin] === b.OTHER_COLOR(color))) {
        this.mark_dragon(this.dragon2[d].origin, safe_stones, 0);
      }
    }
  },

  identify_thrashing_dragons () {},

  set_dragon_strengths (safe_stones, strength) {
    const b = this.board
    for (let i = b.BOARDMIN; i < b.BOARDMAX; i++){
      if (b.ON_BOARD(i)) {
        if (safe_stones[i]) {
          b.ASSERT1(b.IS_STONE(b.board[i]), i);
          strength[i] = DEFAULT_STRENGTH * (1.0 - 0.3 * this.DRAGON2(i).weakness_pre_owl);
        }
        else{
          strength[i] = 0.0;
        }
      }
    }
  },

  /* Marks all inessential stones with INFLUENCE_SAFE_STONE, leaves
   * everything else unchanged.
   */
  mark_inessential_stones (color, safe_stones) {
    const b = this.board
    for (let i = b.BOARDMIN; i < b.BOARDMAX; i++)
      if (b.IS_STONE(b.board[i])
        && (this.DRAGON2(i).safety === dragon_status.INESSENTIAL
          || (this.worm[i].inessential
            /* FIXME: Why is the check below needed?
             * Why does it use .safety, not .status? /ab
             */
            && ((this.DRAGON2(i).safety !== dragon_status.DEAD
              && this.DRAGON2(i).safety !== dragon_status.TACTICALLY_DEAD
              && this.DRAGON2(i).safety !== dragon_status.CRITICAL)
              || (this.DRAGON2(i).safety === dragon_status.CRITICAL && b.board[i] === color))))){
        safe_stones[i] = INFLUENCE_SAFE_STONE;
      }
  },

  set_strength_data (color, safe_stones, strength) {
    this.gg_assert(this.board.IS_STONE(color) || color === colors.EMPTY);

    this.get_alive_stones(color, safe_stones);
    this.set_dragon_strengths(safe_stones, strength);
    this.mark_inessential_stones(color, safe_stones);
  },

  compute_dragon_influence () {},

  /* Compute dragon's genus, possibly excluding one given eye.  To
   * compute full genus, just set `eye_to_exclude' to NO_MOVE.
   */
  compute_dragon_genus (d, genus, eye_to_exclude) {
    const b = this.board
    const dr = [];

    b.ASSERT1(b.IS_STONE(b.board[d]), d);
    b.ASSERT1(eye_to_exclude === NO_MOVE || b.ON_BOARD1(eye_to_exclude));

    // this.set_eyevalue(genus, 0, 0, 0, 0);

    if (b.board[d] === colors.BLACK) {
      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (!b.ON_BOARD(pos)){
          continue;
        }

        if (this.black_eye[pos].color === colors.BLACK && this.black_eye[pos].origin === pos
          && (eye_to_exclude === NO_MOVE || this.black_eye[eye_to_exclude].origin !== pos)
          && this.find_eye_dragons(pos, this.black_eye, colors.BLACK, dr, 1) === 1
          && this.is_same_dragon(dr, d)) {
            // TRACE("eye at %1m (%s) found for dragon at %1m--augmenting genus\n",
            //   pos, eyevalue_to_string(&black_eye[pos].value), dr);

          if (eye_to_exclude === NO_MOVE
            && (this.eye_move_urgency(this.black_eye[pos].value) > this.eye_move_urgency(genus))) {
            this.DRAGON2(d).heye = this.black_vital_points[pos].defense_points[0];
          }

          this.add_eyevalues(genus, this.black_eye[pos].value, genus);
        }
      }
    }
    else {
      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (!b.ON_BOARD(pos)){
          continue;
        }

        if (this.white_eye[pos].color === colors.WHITE && this.white_eye[pos].origin === pos
          && (eye_to_exclude === NO_MOVE || this.white_eye[eye_to_exclude].origin !== pos)
          && this.find_eye_dragons(pos, this.white_eye, colors.WHITE, dr, 1) === 1
          && this.is_same_dragon(dr, d)) {
          // TRACE("eye at %1m (%s) found for dragon at %1m--augmenting genus\n",
          //   pos, eyevalue_to_string(&white_eye[pos].value), dr);

          if (eye_to_exclude === NO_MOVE
            && (this.eye_move_urgency(this.white_eye[pos].value) > this.eye_move_urgency(genus))) {
            this.DRAGON2(d).heye = this.white_vital_points[pos].defense_points[0];
          }

          this.add_eyevalues(genus, this.white_eye[pos].value, genus);
        }
      }
    }
  },


  /* Try to determine whether topologically false and half eye points
   * contribute to territory even if the eye doesn't solidify. The purpose
   * is to be able to distinguish between, e.g., these positions:
   *
   * |.OOOOO       |.OOOOO
   * |.O.XXO       |.O.OXO
   * |OOX.XO       |OOX.XO
   * |O*XXXO  and  |O*XXXO
   * |OX.XOO       |OX.XOO
   * |X.XOO.       |X.XOO.
   * |.XXO..       |.XXO..
   * +------       +------
   *
   * In the left one the move at * is a pure dame point while in the
   * right one it is worth one point of territory for either player.
   *
   * In general the question is whether a topologically false eye vertex
   * counts as territory or not and the answer depends on whether each
   * string adjoining the eye is externally connected to at least one
   * proper eye.
   *
   * This function loops over the topologically false and half eye
   * vertices and calls connected_to_eye() for each adjoining string to
   * determine whether they all have external connection to an eye. The
   * result is stored in the false_eye_territory[] array.
   */
  analyze_false_eye_territory () {
    const b = this.board
    let color;
    let eye_color;
    let eye

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }

      this.false_eye_territory[pos] = 0;

      /* The analysis only applies to false and half eyes. */
      if (this.half_eye[pos].type === 0){
        continue;
      }

      /* Determine the color of the eye. */
      if (this.white_eye[pos].color === colors.WHITE) {
        color = colors.WHITE;
        eye_color = colors.WHITE;
        eye = this.white_eye;
      }
      else if (this.black_eye[pos].color === colors.BLACK) {
        color = colors.BLACK;
        eye_color = colors.BLACK;
        eye = this.black_eye;
      }
      else
        continue;

      /* Make sure we have a "closed" position. Positions like
       *
       * |XXXXXX.
       * |OOOOOXX
       * |.O.O*..
       * +-------
       *
       * disqualify without further analysis. (* is a false eye vertex)
       */
      let k = 0
      for (k = 0; k < 4; k++){
        if (b.ON_BOARD(pos + b.delta[k]) && b.board[pos + b.delta[k]] !== color
          && eye[pos + b.delta[k]].color !== eye_color){
          break;
        }
      }

      if (k < 4){
        continue;
      }

      /* Check that all adjoining strings have external connection to an
       * eye.
       */
      for (k = 0; k < 4; k++){
        if (b.ON_BOARD(pos + b.delta[k])
          && b.board[pos + b.delta[k]] === color
          && !this.connected_to_eye(pos, pos + b.delta[k], color, eye_color, eye)){
          break;
        }
      }

      if (k === 4) {
        this.false_eye_territory[pos] = 1;
      }
    }

    /* FIXME: This initialization doesn't really belong here but must be
     *        done somewhere within examine_position().
     *        The array is eventually filled by the endgame() function.
     */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos)){
        this.forced_backfilling_moves[pos] = 0;
      }
    }
  },

  /*
 * This function (implicitly) finds the connected set of strings of a
 * dragon, starting from (str) which is next to the analyzed halfeye
 * at (pos). Strings are for this purpose considered connected if and
 * only if they have a common liberty, which is not allowed to be the
 * half eye itself or one of its diagonal neighbors. For these strings
 * it is examined whether their liberties are parts of eyespaces worth
 * at least two halfeyes (again not counting the eyespace at (pos)).
 *
 * The real work is done by the recursive function
 * connected_to_eye_recurse() below.
 */
  connected_to_eye (pos, str, color, eye_color, eye) {
    let mx= [];
    let me= [];
    let halfeyes = [0];
    const b= this.board

    /* mx marks strings and liberties which have already been investigated.
     * me marks the origins of eyespaces which have already been counted.
     * Start by marking (pos) and the surrounding vertices in mx.
     */
    mx[pos] = 1;
    for (let k = 0; k < 8; k++){
      if (b.ON_BOARD(pos + b.delta[k])){
        mx[pos + b.delta[k]] = 1;
      }
    }

    this.connected_to_eye_recurse(pos, str, color, eye_color, eye, mx, me, halfeyes);

    if (halfeyes[0] >= 2){
      return 1;
    }

    return 0;
  },

  /* Recursive helper for connected_to_eye(). Stop searching when we
   * have found at least two halfeyes.
   */
  connected_to_eye_recurse (pos, str, color, eye_color, eye, mx, me, halfeyes) {
    const b = this.board
    let liberties;
    let libs = [];
    let r;
    let k;

    b.mark_string(str, mx, 1);
    liberties = b.findlib(str, b.MAXLIBS, libs);

    /* Search the liberties of (str) for eyespaces. */
    for (r = 0; r < liberties; r++) {
      if (eye[libs[r]].color === eye_color && libs[r] !== pos && !me[eye[libs[r]].origin]) {
        me[eye[libs[r]].origin] = 1;
        halfeyes[0] += (this.min_eyes(eye[libs[r]].value) + this.max_eyes(eye[libs[r]].value));
      }
    }

    if (halfeyes[0] >= 2){
      return;
    }

    /* Search for new strings in the same dragon with a liberty in
     * common with (str), and recurse.
     */
    for (r = 0; r < liberties; r++) {
      if (mx[libs[r]]){
        continue;
      }
      mx[libs[r]] = 1;
      for (k = 0; k < 4; k++) {
        if (b.ON_BOARD(libs[r] + b.delta[k])
          && b.board[libs[r] + b.delta[k]] === color
          && this.is_same_dragon(str, libs[r] + b.delta[k])
          && !mx[libs[r] + b.delta[k]]){
          this.connected_to_eye_recurse(pos, libs[r] + b.delta[k], color, eye_color, eye, mx, me, halfeyes);
        }
        if (halfeyes[0] >= 2){
          return;
        }
      }
    }
  },

  show_dragons () {},
  compute_new_dragons () {},

  /* This gets called if we are trying to compute dragons outside of
 * make_dragons(), typically after a move has been made.
 */
  join_new_dragons (d1, d2) {
    const b = this.board
    /* Normalize dragon coordinates. */
    d1 = new_dragon_origins[d1];
    d2 = new_dragon_origins[d2];

    /* If d1 and d2 are the same dragon, we do nothing. */
    if (d1 === d2){
      return;
    }

    b.ASSERT1(b.board[d1] === b.board[d2], d1);
    b.ASSERT1(b.IS_STONE(b.board[d1]), d1);

    /* Don't bother to do anything fancy with dragon origins. */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++)
      if (b.ON_BOARD(pos) && new_dragon_origins[pos] === d2){
        new_dragon_origins[pos] = d1;
      }
  },

  /*
   * join_dragons amalgamates the dragon at (d1) to the
   * dragon at (d2).
   */
  join_dragons(d1, d2) {
    let ii;
    let origin; /* new origin */
    const b = this.board
    /* If not called from make_dragons(), we don't work on the main
     * dragon[] array.
     */
    if (b.stackp > 0) {
      this.join_new_dragons(d1, d2);
      return;
    }
    //
    // /* Normalize dragon coordinates. */
    d1 = this.dragon[d1].origin;
    d2 = this.dragon[d2].origin;

    /* If d1 and d2 are the same dragon, we do nothing. */
    if (d1 === d2){
      return;
    }

    // 同色
    b.ASSERT1(b.board[d1] === b.board[d2], d1);
    b.ASSERT1(dragon2_initialized === 0);
    b.ASSERT1(b.IS_STONE(b.board[d1]), d1);
    //
    // /* We want to have the origin pointing to the largest string of
    //  * the dragon.  If this is not unique, we take the "upper
    //  * leftmost" one.
    //  */
    if (this.worm[d1].size > this.worm[d2].size
      || (this.worm[d1].size === this.worm[d2].size && d1 < d2)) {
      origin = d1;
      // DEBUG(DEBUG_DRAGONS, "joining dragon at %1m to dragon at %1m\n", d2, d1);
    }
    else {
      origin = d2;
      // DEBUG(DEBUG_DRAGONS, "joining dragon at %1m to dragon at %1m\n", d1, d2);
    }
    //
    this.dragon[origin].size = this.dragon[d2].size + this.dragon[d1].size;
    this.dragon[origin].effective_size = this.dragon[d2].effective_size + this.dragon[d1].effective_size;
    //
    // /* Join the second next_worm_in_dragon chain at the end of the first one. */
    //
    let last_worm_origin_dragon = origin;
    while (this.next_worm_list[last_worm_origin_dragon]){
      last_worm_origin_dragon = this.next_worm_list[last_worm_origin_dragon];
    }
    if (origin === d1)
      this.next_worm_list[last_worm_origin_dragon] = d2;
    else
      this.next_worm_list[last_worm_origin_dragon] = d1;

    for (ii = b.BOARDMIN; ii < b.BOARDMAX; ii++) {
      if (b.ON_BOARD(ii) && (this.dragon[ii].origin === d1 || this.dragon[ii].origin === d2)){
        this.dragon[ii].origin = origin;
      }
    }
  },

  /*
   * compute_crude_status(pos) tries to determine whether the dragon
   * at (pos) is ALIVE, DEAD, or UNKNOWN. The algorithm is not perfect
   * and can give incorrect answers.
   *
   * The dragon is judged alive if its genus is >1. It is judged dead if
   * the genus is <2, it has no escape route, and no adjoining string can
   * be easily captured. Otherwise it is judged UNKNOWN.  */
  compute_crude_status (pos) {
    /* FIXME: We lose information when constructing true_genus. This
   * code can be improved.
   */
    let genus = this.DRAGON2(pos).genus;
    let true_genus = this.max_eyes(genus) + this.min_eyes(genus);
    let lunch = this.DRAGON2(pos).lunch;
    const b = this.board
    b.ASSERT1(dragon2_initialized);

    /* If it has two sure eyes, everything is just dandy. */
    if (true_genus > 3){
      return dragon_status.ALIVE;
    }

    /* If the dragon consists of one worm, there is an attack, but
     * no defense and there is less than one eye and one half eye,
     * the situation is hopeless.
     */
    if (this.dragon[pos].size === this.worm[pos].size
      && this.worm[pos].attack_codes[0] !== 0
      && this.worm[pos].defense_codes[0] === 0
      && true_genus < 3) {
      return dragon_status.DEAD;
    }

    if (lunch !== NO_MOVE
      && true_genus < 3
      && this.worm[lunch].defense_codes[0] !== 0
      && this.DRAGON2(pos).escape_route < 5) {
      if (true_genus === 2 || this.worm[lunch].size > 2) {
        return dragon_status.CRITICAL;
      }
    }

    if (lunch !== NO_MOVE && true_genus >= 3) {
      return dragon_status.ALIVE;
    }

    if (lunch === NO_MOVE || this.worm[lunch].cutstone < 2) {
      if (true_genus < 3
        && this.DRAGON2(pos).escape_route === 0
        && this.DRAGON2(pos).moyo_size < 5) {
        return dragon_status.DEAD;
      }

      if (true_genus === 3 && this.DRAGON2(pos).escape_route < 5){
        return dragon_status.CRITICAL;
      }
    }

    if (this.DRAGON2(pos).moyo_territorial_value > 9.99){
      return dragon_status.ALIVE;
    }

    return dragon_status.UNKNOWN;
  },

  /* Compute the escape potential described above. The dragon is marked
   * in the goal array.
   */
  dragon_escape (goal, color, escape_value) {
    const b = this.board
    let ii;
    let k;
    let mx = [];
    let queue = [];
    let queue_start = 0;
    let queue_end = 0;
    let other = b.OTHER_COLOR(color);
    let distance;
    let escape_potential = 0;

    const ENQUEUE = (pos) => {
      queue[queue_end++] = pos;
      mx[pos] = 1
    }

    b.ASSERT1(b.IS_STONE(color));

    /* Enter the stones of the dragon in the queue. */
    for (ii = b.BOARDMIN; ii < b.BOARDMAX; ii++) {
      if (b.ON_BOARD(ii) && goal[ii]){
        ENQUEUE(ii);
      }
    }

    /* Find points at increasing distances from the dragon. At distance
     * four, sum the escape values at those points to get the escape
     * potential.
     */
    for (distance = 0; distance <= 4; distance++) {
      let save_queue_end = queue_end;
      while (queue_start < save_queue_end) {
        ii = queue[queue_start];
        queue_start++;

        /* Do not pass connection inhibited intersections. */
        if (this.cut_possible(ii, b.OTHER_COLOR(color))){
          continue;
        }
        if (distance === 4){
          escape_potential += escape_value[ii];
        }
        else {
          if (b.ON_BOARD(b.SOUTH(ii))
            && !mx[b.SOUTH(ii)]
            && (b.board[b.SOUTH(ii)] === color
              || (b.board[b.SOUTH(ii)] === colors.EMPTY
                && b.ON_BOARD(b.SE(ii)) && b.board[b.SE(ii)] !== other
                && b.ON_BOARD(b.SS(ii)) && b.board[b.SS(ii)] !== other
                && b.ON_BOARD(b.SW(ii)) && b.board[b.SW(ii)] !== other))){
            ENQUEUE(b.SOUTH(ii));
          }

          if (b.ON_BOARD(b.WEST(ii))
            && !mx[b.WEST(ii)]
            && (b.board[b.WEST(ii)] === color
              || (b.board[b.WEST(ii)] === colors.EMPTY
                && b.ON_BOARD(b.SW(ii)) && b.board[b.SW(ii)] !== other
                && b.ON_BOARD(b.WW(ii)) && b.board[b.WW(ii)] !== other
                && b.ON_BOARD(b.NW(ii)) && b.board[b.NW(ii)] !== other))){
            ENQUEUE(b.WEST(ii));
          }

          if (b.ON_BOARD(b.NORTH(ii))
            && !mx[b.NORTH(ii)]
            && (b.board[b.NORTH(ii)] === color
              || (b.board[b.NORTH(ii)] === colors.EMPTY
                && b.ON_BOARD(b.NW(ii)) && b.board[b.NW(ii)] !== other
                && b.ON_BOARD(b.NN(ii)) && b.board[b.NN(ii)] !== other
                && b.ON_BOARD(b.NE(ii)) && b.board[b.NE(ii)] !== other))){
            ENQUEUE(b.NORTH(ii));
          }

          if (b.ON_BOARD(b.EAST(ii))
            && !mx[b.EAST(ii)]
            && (b.board[b.EAST(ii)] === color
              || (b.board[b.EAST(ii)] === colors.EMPTY
                && b.ON_BOARD(b.NE(ii)) && b.board[b.NE(ii)] !== other
                && b.ON_BOARD(b.EE(ii)) && b.board[b.EE(ii)] !== other
                && b.ON_BOARD(b.SE(ii)) && b.board[b.SE(ii)] !== other))){
            ENQUEUE(b.EAST(ii));
          }

          /* For distance one intersections, allow kosumi to move out. I.e.
           *
           * ??..
           * X.*.
           * ?O.?
           * ??X?
           *
           */
          if (distance === 0) {
            if (b.board[b.SOUTH(ii)] === colors.EMPTY
              && b.board[b.WEST(ii)] === colors.EMPTY
              && !mx[b.SW(ii)]
              && (b.board[b.SW(ii)] === color
                || (b.board[b.SW(ii)] === colors.EMPTY
                  && b.ON_BOARD(b.SOUTH(b.SW(ii)))
                  && b.board[b.SOUTH(b.SW(ii))] !== other
                  && b.ON_BOARD(b.WEST(b.SW(ii)))
                  && b.board[b.WEST(b.SW(ii))] !== other))){
              ENQUEUE(b.SW(ii));
            }

            if (b.board[b.WEST(ii)] === colors.EMPTY
              && b.board[b.NORTH(ii)] === colors.EMPTY
              && !mx[b.NW(ii)]
              && (b.board[b.NW(ii)] === color
                || (b.board[b.NW(ii)] === colors.EMPTY
                  && b.ON_BOARD(b.WEST(b.NW(ii)))
                  && b.board[b.WEST(b.NW(ii))] !== other
                  && b.ON_BOARD(b.NORTH(b.NW(ii)))
                  && b.board[b.NORTH(b.NW(ii))] !== other))){
              ENQUEUE(b.NW(ii));
            }

            if (b.board[b.NORTH(ii)] === colors.EMPTY
              && b.board[b.EAST(ii)] === colors.EMPTY
              && !mx[b.NE(ii)]
              && (b.board[b.NE(ii)] === color
                || (b.board[b.NE(ii)] === colors.EMPTY
                  && b.ON_BOARD(b.NORTH(b.NE(ii)))
                  && b.board[b.NORTH(b.NE(ii))] !== other
                  && b.ON_BOARD(b.EAST(b.NE(ii)))
                  && b.board[b.EAST(b.NE(ii))] !== other))){
              ENQUEUE(b.NE(ii));
            }

            if (b.board[b.EAST(ii)] === colors.EMPTY
              && b.board[b.SOUTH(ii)] === colors.EMPTY
              && !mx[b.SE(ii)]
              && (b.board[b.SE(ii)] === color
                || (b.board[b.SE(ii)] === colors.EMPTY
                  && b.ON_BOARD(b.EAST(b.SE(ii)))
                  && b.board[b.EAST(b.SE(ii))] !== other
                  && b.ON_BOARD(b.SOUTH(b.SE(ii)))
                  && b.board[b.SOUTH(b.SE(ii))] !== other))){
              ENQUEUE(b.SE(ii));
            }
          }
        }
      }
    }

    /* Reset used mx cells. */
    for (k = 0; k < queue_end; k++) {
      /* The assertion fails if the same element should have been queued
       * twice, which might happen if ENQUEUE() is called without
       * checking mx[].
       */
      b.ASSERT1(mx[queue[k]] === 1, queue[k]);
      mx[queue[k]] = 0;
    }

    return escape_potential;
  },


  /* Wrapper to call the function above and compute the escape potential
   * for the dragon at (pos).
   */
  compute_escape (pos, dragon_status_known) {
    let ii;
    let goal = [];
    let escape_value = [];
    let safe_stones = [];
    const b = this.board

    b.ASSERT1(b.IS_STONE(b.board[pos]), pos);

    for (ii = b.BOARDMIN; ii < b.BOARDMAX; ii++) {
      if (b.ON_BOARD(ii)){
        goal[ii] = this.is_same_dragon(ii, pos);
      }
    }

    /* Compute escape_value array.  Points are awarded for moyo (4),
     * area (2) or EMPTY (1).  Values may change without notice.
     */
    this.get_lively_stones(b.OTHER_COLOR(b.board[pos]), safe_stones);
    this.compute_escape_influence(b.board[pos], safe_stones, null, 0, escape_value);

    /* If we can reach a live group, award 6 points. */
    for (ii = b.BOARDMIN; ii < b.BOARDMAX; ii++) {
      if (!b.ON_BOARD(ii)) {
        continue;
      }

      if (dragon_status_known) {
        if (this.dragon[ii].crude_status === dragon_status.ALIVE) {
          escape_value[ii] = 6;
        }
        else if (this.dragon[ii].crude_status === dragon_status.UNKNOWN &&
          (this.DRAGON2(ii).escape_route > 5   || this.DRAGON2(ii).moyo_size  > 5)) {
          escape_value[ii] = 4;
        }
      }
      else {
        if (b.board[ii] === b.board[pos] && !goal[ii] && this.worm[ii].attack_codes[0] === 0){
          escape_value[ii] = 2;
        }
      }
    }

    return this.dragon_escape(goal, b.board[pos], escape_value);
  },

  /*
   * Sum up the surrounding moyo sizes for each dragon. For this
   * we retrieve the moyo data stored in influence_data (*q) (which must
   * have been computed previously) from the influence module.
   * We set dragon2[].moyo_size and .moyo_value if it is smaller than the
   * current entry.
   *
   * Currently this is implemented differently depending on whether
   * experimental connections are used or not. The reason why this is
   * needed is that most of the B patterns in conn.db are disabled for
   * experimental connections, which may cause the moyo segmentation to
   * pass through cutting points between dragons, making the surrounding
   * moyo size mostly useless. Instead we only use the part of the
   * surrounding moyo which is closest to some worm of the dragon.
   */
  compute_surrounding_moyo_sizes (q) {
    let pos;
    let d;
    let k;
    let moyo_color;
    const b = this.board
    let moyo_sizes = [];
    let moyo_values = [];


    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      moyo_sizes[pos] = 0.0;
      moyo_values[pos] = 0.0;
    }

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)) {
        continue;
      }
      moyo_color = this.whose_moyo_restricted(q, pos);

      if (moyo_color === b.board[pos]){
        continue;
      }

      if (moyo_color === colors.WHITE) {
        for (k = 0; k < this.number_close_white_worms[pos]; k++) {
          let w = this.close_white_worms[pos][k];
          let dr = this.dragon[w].origin;

          moyo_sizes[dr] += 1.0 / this.number_close_white_worms[pos];
          moyo_values[dr] += Math.min(this.influence_territory(q, pos, colors.WHITE), 1.0) / this.number_close_white_worms[pos];
        }
      }

      if (moyo_color === colors.BLACK) {
        for (k = 0; k < this.number_close_black_worms[pos]; k++) {
          let w = this.close_black_worms[pos][k];
          let dr = this.dragon[w].origin;

          moyo_sizes[dr] += 1.0 / this.number_close_black_worms[pos];
          moyo_values[dr] += Math.min(this.influence_territory(q, pos, colors.BLACK), 1.0) / this.number_close_black_worms[pos];
        }
      }
    }

    for (d = 0; d < this.number_of_dragons; d++) {
      let this_moyo_size = moyo_sizes[this.dragon2[d].origin];
      let this_moyo_value = moyo_values[this.dragon2[d].origin];

      if (this_moyo_size < this.dragon2[d].moyo_size) {
        this.dragon2[d].moyo_size = this_moyo_size;
        this.dragon2[d].moyo_territorial_value = this_moyo_value;
      }
    }
  },

  crude_dragon_weakness (safety, genus, has_lunch, moyo_value, escape_route) {
    /* FIXME: We lose information when constructing true_genus. This
     * code can be improved.
     */
    let true_genus = 0.5 * (this.max_eyes(genus) + this.min_eyes(genus) + (has_lunch !== 0));
    let weakness_value = [];
    let weakness;

    if (safety === dragon_status.INVINCIBLE || safety === dragon_status.INESSENTIAL){
      return 0.0;
    }
    if (safety === dragon_status.TACTICALLY_DEAD || safety === dragon_status.DEAD || safety === dragon_status.CRITICAL){
      return 1.0;
    }

    weakness_value[0] = gg_interpolate(moyo_value2weakness, moyo_value);
    weakness_value[1] = gg_interpolate(escape_route2weakness, escape_route);
    weakness_value[2] = gg_interpolate(genus2weakness, true_genus);

    // DEBUG(DEBUG_DRAGONS, "  moyo value %f -> %f, escape %f -> %f, eyes %f -> %f\n",
    //   moyo_value, weakness_value[0], escape_route, weakness_value[1], true_genus, weakness_value[2]);

    for (let i = 0; i < 3; i++){
      for (let j = i + 1; j < 3; j++){
        if (weakness_value[j] < weakness_value[i]) {
          let tmp = weakness_value[i];
          weakness_value[i] = weakness_value[j];
          weakness_value[j] = tmp;
        }
      }
    }

    /* The overall weakness is mostly, but not completely determined by the
     * best value found so far:
     */
    weakness = Math.min(0.7 * weakness_value[0] + 0.3 * weakness_value[1], 1.3 * weakness_value[0]);

    this.board.ASSERT1(weakness >= 0.0 && weakness <= 1.0);

    return weakness;
  },

  /* This function tries to guess a coefficient measuring the weakness of
   * a dragon. This coefficient * the effective size of the dragon can be
   * used to award a strategic penalty for weak dragons.
   */
  compute_dragon_weakness_value (d) {
    // let origin = this.dragon2[d].origin;
    /* Possible ingredients for the computation:
     * 	'+' means currently used, '-' means not (yet?) used
     * - pre-owl moyo_size
     * + post-owl moyo_size and its territory value
     * + escape factor
     * + number of eyes
     *   - minus number of vital attack moves?
     * + from owl:
     *   + attack certain?
     *   - number of owl nodes
     *   - maybe reading shadow?
     *   + threat to attack?
     * - possible connections to neighbour dragons
     */

    // DEBUG(DEBUG_DRAGONS, "Computing weakness of dragon at %1m:\n", origin);

    let weakness = this.crude_dragon_weakness(this.dragon2[d].safety, this.dragon2[d].genus,
      this.dragon2[d].lunch !== NO_MOVE, this.dragon2[d].moyo_territorial_value, this.dragon2[d].escape_route);

    /* Now corrections due to (uncertain) owl results resp. owl threats. */
    if (!this.dragon2[d].owl_attack_certain){
      weakness += Math.min(0.25 * (1.0 - weakness), 0.25 * weakness);
    }
    if (!this.dragon2[d].owl_defense_certain){
      weakness += Math.min(0.25 * (1.0 - weakness), 0.25 * weakness);
    }
    if (this.dragon2[d].owl_threat_status === dragon_status.CAN_THREATEN_ATTACK){
      weakness += 0.15 * (1.0 - weakness);
    }

    if (weakness < 0.0){
      weakness = 0.0;
    }
    if (weakness > 1.0){
      weakness = 1.0;
    }

    // DEBUG(DEBUG_DRAGONS, " result: %f.\n", weakness);
    return weakness;
  },

  /* This function has to be called _after_ the owl analysis and the
   * subsequent re-run of the influence code.
   */
  compute_refined_dragon_weaknesses () {
    let d;

    /* Compute the surrounding moyo sizes. */
    for (d = 0; d < this.number_of_dragons; d++) {
      this.dragon2[d].moyo_size = 2 * this.board.BOARDMAX;
    }

    /* Set moyo sizes according to initial_influence. */
    this.compute_surrounding_moyo_sizes(initial_black_influence);
    this.compute_surrounding_moyo_sizes(initial_white_influence);

    for (d = 0; d < this.number_of_dragons; d++) {
      this.dragon2[d].weakness = this.compute_dragon_weakness_value(d);
    }
  },
  compute_strategic_sizes () {},

  /*
 * Test whether two dragons are the same. Used by autohelpers and elsewhere.
 */
  is_same_dragon (d1, d2) {
    if (d1 === NO_MOVE || d2 === NO_MOVE){
      return (d1 === d2);
    }

    this.board.ASSERT_ON_BOARD1(d1);
    this.board.ASSERT_ON_BOARD1(d2);

    return this.dragon[d1].origin === this.dragon[d2].origin
  },

  /* Test whether two dragons are neighbors. */
  are_neighbor_dragons (d1, d2) {
    let k;
    d1 = this.dragon[d1].origin;
    d2 = this.dragon[d2].origin;

    for (k = 0; k < this.DRAGON2(d1).neighbors; k++){
      if (this.dragon2[this.DRAGON2(d1).adjacent[k]].origin === d2){
        return 1;
      }
    }

    /* Just to be make sure that this function is always symmetric, we
     * do it the other way round too.
     */
    for (k = 0; k < this.DRAGON2(d2).neighbors; k++){
      if (this.dragon2[this.DRAGON2(d2).adjacent[k]].origin === d1){
        return 1;
      }
    }

    return 0;
  },

  mark_dragon (pos, mx, mark) {
    for (let w = this.first_worm_in_dragon(this.dragon[pos].origin); w !== NO_MOVE; w = this.next_worm_in_dragon(w)){
      this.board.mark_string(w, mx, mark);
    }
  },

  /* The following two functions allow to traverse all worms in a dragon:
   * for (ii = first_worm_in_dragon(pos); ii != NO_MOVE;
   *      ii = next_worm_in_dragon(ii);)
   *   ...
   * At the moment first_worm_in_dragon(pos) will always be the origin
   * of the dragon, but you should not rely on that.
   */
  first_worm_in_dragon (d) {
    return this.dragon[d].origin;
  },

  next_worm_in_dragon (w) {
    this.board.ASSERT1(this.worm[w].origin === w, w);
    return this.next_worm_list[w];
  },


  /* ================================================================ */
  /*                       A few status functions                     */
  /* ================================================================ */

  /*
   * These functions are only here because then we don't need to expose
   * the dragon structure to the external program.
   */
  crude_status (pos) {
    return this.dragon[pos].crude_status;
  },
  dragon_status () {},
  lively_dragon_exists () {},
  dragon_weak () {},
  size_of_biggest_critical_dragon () {},
  clear_cut_list () {},


  /* Store in the list that (move) disconnects the two strings at
   * apos and bpos.
   */
  add_cut (apos, bpos, move) {
    const b = this.board
    this.gg_assert(b.board[apos] === b.board[bpos]);
    // MAX_CUTS = 3 * MAX_BOARD * MAX_BOARD
    if (this.num_cuts === 3 * b.MAX_BOARD * b.MAX_BOARD){
      return;
    }
    if (apos > bpos) {
      let tmp = apos;
      apos = bpos;
      bpos = tmp;
    }
    if (move === NO_MOVE){
      return;
    }
    this.cut_list[num_cuts].apos = apos;
    this.cut_list[num_cuts].bpos = bpos;
    this.cut_list[num_cuts].move = move;
    this.num_cuts++;
    // if (0)
    //   gprintf("Added %d-th cut at %1m between %1m and %1m.\n", num_cuts, move, apos, bpos);
  },

  /* For every move in the cut list disconnecting two of opponent's strings,
   * test whether the two strings can be connected at all. If so, add a
   * CUT_MOVE reason.
   */
  cut_reasons (color) {
    const b = this.board
    for (let k = 0; k < num_cuts; k++){
      if (b.board[cut_list[k].apos] === b.OTHER_COLOR(color)
        && !this.is_same_dragon(this.cut_list[k].apos, this.cut_list[k].bpos)
        && this.string_connect(this.cut_list[k].apos, this.cut_list[k].bpos, null) === codes.WIN){
        this.add_cut_move(this.cut_list[k].move, this.cut_list[k].apos, this.cut_list[k].bpos);
      }
    }
  },
  ascii_report_dragon () {},
  report_dragon () {},
}