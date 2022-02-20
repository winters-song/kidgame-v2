import {dragon_status, EyeValue, HalfEyeData} from "./Liberty";
import {colors, NO_MOVE} from "./Constants";

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

/* This basic function finds all dragons and collects some basic information
 * about them in the dragon array.
 *
 * color is the player in turn to move. This does in no way affect the
 * information collected about the dragons, but it does affect what
 * information is passed on to the move generation code. If
 * color == EMPTY no information at all is passed on to the move generation.
 */
export const Dragon = {

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
    // const b = this.board

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
    // this.analyze_false_eye_territory();

    // /* Now we compute the genus. */
    // for (let d = 0; d < number_of_dragons; d++){
    //   this.compute_dragon_genus(dragon2[d].origin, this.dragon2[d].genus, NO_MOVE);
    // }

    // /* Compute the escape route measure. */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++){
    //   if (b.IS_STONE(b.board[str]) && this.dragon[str].origin === str){
    //     this.DRAGON2(str).escape_route = this.compute_escape(str, 0);
    //   }
    // }

    // /* Set dragon weaknesses according to initial_influence. */
    // this.compute_refined_dragon_weaknesses();
    // for (let d = 0; d < number_of_dragons; d++){
    //   this.dragon2[d].weakness_pre_owl = this.dragon2[d].weakness;
    // }

    // /* Determine status: ALIVE, DEAD, CRITICAL or UNKNOWN */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++) {
    //   if (b.ON_BOARD(str)){
    //     if (this.dragon[str].origin === str && b.board[str]){
    //       this.dragon[str].crude_status = this.compute_crude_status(str);
    //     }
    //   }
    // }

    // /* We must update the dragon status at every intersection before we
    //  * call the owl code. This updates all fields.
    //  */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++){
    //   if (b.ON_BOARD(str) && b.board[str] !== EMPTY){
    //     this.dragon[str] = this.dragon[this.dragon[str].origin];
    //   }
    // }

    // this.find_neighbor_dragons();

    // for (let d = 0; d < number_of_dragons; d++) {
    //   this.dragon2[d].surround_status
    //     = compute_surroundings(this.dragon2[d].origin, NO_MOVE, 0, this.dragon2[d].surround_size);
    //   if (this.dragon2[d].surround_status === SURROUNDED) {
    //     this.dragon2[d].escape_route = 0;
    //     // if (debug & DEBUG_DRAGONS)
    //     //   gprintf("surrounded dragon found at %1m\n", dragon2[d].origin);
    //   }
    //   else if (this.dragon2[d].surround_status === WEAKLY_SURROUNDED) {
    //     this.dragon2[d].escape_route /= 2;
    //     // if (debug & DEBUG_DRAGONS)
    //     //   gprintf("weakly surrounded dragon found at %1m\n", dragon2[d].origin);
    //   }
    // }

    // if (stop_before_owl){
    //   return;
    // }

    // /* Determine life and death status of each dragon using the owl code
    //  * if necessary.
    //  */
    // // start_timer(2);
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
    //   if (b.ON_BOARD(str)) {
    //     let attack_point = NO_MOVE;
    //     let defense_point = NO_MOVE;
    //     let no_eyes;
    //     this.set_eyevalue(no_eyes, 0, 0, 0, 0);

    //     if (b.board[str] === colors.EMPTY || this.dragon[str].origin !== str){
    //       continue;
    //     }

    //     /* Some dragons can be ignored but be extra careful with big dragons. */
    //     if (crude_dragon_weakness(ALIVE, no_eyes, 0,
    //       this.DRAGON2(str).moyo_territorial_value,
    //       this.DRAGON2(str).escape_route - 10) <
    //       0.00001 + Math.max(0.12, 0.32 - 0.01* this.dragon[str].effective_size)) {
    //       this.DRAGON2(str).owl_status = dragon_status.UNCHECKED;
    //       this.DRAGON2(str).owl_attack_point  = NO_MOVE;
    //       this.DRAGON2(str).owl_defense_point = NO_MOVE;
    //     }
    //   else {
    //       let acode = 0;
    //       let dcode = 0;
    //       let kworm = NO_MOVE;
    //       let owl_nodes_before = this.get_owl_node_counter();
    //       // start_timer(3);
    //       acode = this.owl_attack(str, this.attack_point, this.DRAGON2(str).owl_attack_certain, this.kworm);
    //       this.DRAGON2(str).owl_attack_node_count = this.get_owl_node_counter() - owl_nodes_before;
    //       if (acode !== 0) {
    //         this.DRAGON2(str).owl_attack_point = attack_point;
    //         this.DRAGON2(str).owl_attack_code = acode;
    //         this.DRAGON2(str).owl_attack_kworm = kworm;
    //         if (attack_point !== NO_MOVE) {
    //           kworm = NO_MOVE;
    //           dcode = this.owl_defend(str, this.defense_point, this.DRAGON2(str).owl_defense_certain, this.kworm);
    //           if (dcode !== 0) {
    //             if (defense_point !== NO_MOVE) {
    //               this.DRAGON2(str).owl_status = (acode === codes.GAIN ? dragon_status.ALIVE : dragon_status.CRITICAL);
    //               this.DRAGON2(str).owl_defense_point = defense_point;
    //               this.DRAGON2(str).owl_defense_code = dcode;
    //               this.DRAGON2(str).owl_defense_kworm = kworm;
    //             }
    //             else {
    //               /* Due to irregularities in the owl code, it may
    //                * occasionally happen that a dragon is found to be
    //                * attackable but also alive as it stands. In this case
    //                * we still choose to say that the owl_status is
    //                * CRITICAL, although we don't have any defense move to
    //                * propose. Having the status right is important e.g.
    //                * for connection moves to be properly valued.
    //                */
    //               this.DRAGON2(str).owl_status = (acode === codes.GAIN ? dragon_status.ALIVE : dragon_status.CRITICAL);
    //               // DEBUG(DEBUG_OWL_PERFORMANCE,
    //               //   "Inconsistent owl attack and defense results for %1m.\n",
    //               //   str);
    //               /* Let's see whether the attacking move might be the right
    //                * defense:
    //                */
    //               dcode = this.owl_does_defend(this.DRAGON2(str).owl_attack_point, str, null);
    //               if (dcode !== 0) {
    //                 this.DRAGON2(str).owl_defense_point = this.DRAGON2(str).owl_attack_point;
    //                 this.DRAGON2(str).owl_defense_code = dcode;
    //               }
    //             }
    //           }
    //         }
    //         if (dcode === 0) {
    //           this.DRAGON2(str).owl_status = dragon_status.DEAD;
    //           this.DRAGON2(str).owl_defense_point = NO_MOVE;
    //           this.DRAGON2(str).owl_defense_code = 0;
    //         }
    //       }
    //       else {
    //         if (!DRAGON2(str).owl_attack_certain) {
    //           kworm = NO_MOVE;
    //           dcode = this.owl_defend(str, this.defense_point,
    //         this.DRAGON2(str).owl_defense_certain, this.kworm);
    //           if (dcode !== 0) {
    //             /* If the result of owl_attack was not certain, we may
    //              * still want the result of owl_defend */
    //             this.DRAGON2(str).owl_defense_point = defense_point;
    //             this.DRAGON2(str).owl_defense_code = dcode;
    //             this.DRAGON2(str).owl_defense_kworm = kworm;
    //           }
    //         }
    //         this.DRAGON2(str).owl_status = dragon_status.ALIVE;
    //         this.DRAGON2(str).owl_attack_point = NO_MOVE;
    //         this.DRAGON2(str).owl_attack_code = 0;

    //       }
    //     }
    //   }
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
        let value = []
        let attack_point = []
        let defense_point = []

        this.compute_eyes(str, value, attack_point, defense_point, this.black_eye, this.half_eye, 1);
        // DEBUG(DEBUG_EYES, "Black eyespace at %1m: %s\n", str, eyevalue_to_string(&value));
        this.black_eye[str].value = value;
        this.propagate_eye(str, this.black_eye);
      }

      if (this.white_eye[str].color === colors.WHITE && this.white_eye[str].origin === str) {
        let value = []
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
        genus: new EyeValue({a:0, b:0, c:0, d: 0})
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
  
  find_neighbor_dragons () {},
  add_adjacent_dragons () {},
  add_adjacent_dragon () {},
  dragon_invincible () {},
  dragon_looks_inessential () {},
  get_alive_stones () {},
  identify_thrashing_dragons () {},
  set_dragon_strengths () {},
  mark_inessential_stones () {},
  set_strength_data () {},
  compute_dragon_influence () {},
  compute_dragon_genus () {},
  analyze_false_eye_territory () {},
  connected_to_eye () {},
  connected_to_eye_recurse () {},
  show_dragons () {},
  compute_new_dragons () {},
  join_new_dragons () {},

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

  compute_crude_status () {},
  dragon_escape () {},
  compute_escape () {},
  compute_surrounding_moyo_sizes () {},
  crude_dragon_weakness () {},
  compute_dragon_weakness_value () {},
  compute_refined_dragon_weaknesses () {},
  compute_strategic_sizes () {},
  is_same_dragon () {},
  are_neighbor_dragons () {},
  mark_dragon () {},
  first_worm_in_dragon () {},
  next_worm_in_dragon () {},
  crude_status () {},
  dragon_status () {},
  lively_dragon_exists () {},
  dragon_weak () {},
  size_of_biggest_critical_dragon () {},
  clear_cut_list () {},
  add_cut () {},
  cut_reasons () {},
  ascii_report_dragon () {},
  report_dragon () {},
}