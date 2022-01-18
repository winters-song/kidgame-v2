import {colors, SURROUNDED, WEAKLY_SURROUNDED} from "./Constants";
import {dragon_status} from "./Liberty";

export const Dragon = {
  make_dragons(stop_before_owl){
    const b = this.board
    this.dragon2_initialized = 0;
    this.initialize_dragon_data();

    /* Find explicit connections patterns in database and amalgamate
     * involved dragons.
     */
    // memset(cutting_points, 0, sizeof(cutting_points));
    this.find_cuts();
    this.find_connections();

    /* At this time, all dragons have been finalized and we can
     * initialize the dragon2[] array. After that we can no longer allow
     * amalgamation of dragons.
     */
    this.initialize_supplementary_dragon_data();

    this.make_domains(black_eye, white_eye, 0);

    /* Find adjacent worms which can be easily captured: */
    this.find_lunches();

    /* Find topological half eyes and false eyes. */
    this.find_half_and_false_eyes(colors.BLACK, black_eye, half_eye, null);
    this.find_half_and_false_eyes(colors.WHITE, white_eye, half_eye, null);

    /* Compute the number of eyes, half eyes, determine attack/defense points
     * etc. for all eye spaces. */
    this.eye_computations();
    /* Try to determine whether topologically false and half eye points
     * contribute to territory even if the eye doesn't solidify.
     */
    this.analyze_false_eye_territory();

    /* Now we compute the genus. */
    for (let d = 0; d < number_of_dragons; d++){
      this.compute_dragon_genus(dragon2[d].origin, this.dragon2[d].genus, NO_MOVE);
    }

    /* Compute the escape route measure. */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++){
      if (b.IS_STONE(b.board[str]) && this.dragon[str].origin === str){
        this.DRAGON2(str).escape_route = this.compute_escape(str, 0);
      }
    }

    /* Set dragon weaknesses according to initial_influence. */
    this.compute_refined_dragon_weaknesses();
    for (let d = 0; d < number_of_dragons; d++){
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
      if (b.ON_BOARD(str) && b.board[str] !== EMPTY){
        this.dragon[str] = this.dragon[this.dragon[str].origin];
      }
    }

    this.find_neighbor_dragons();

    for (let d = 0; d < number_of_dragons; d++) {
      this.dragon2[d].surround_status
        = compute_surroundings(this.dragon2[d].origin, NO_MOVE, 0, this.dragon2[d].surround_size);
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
        let no_eyes;
        this.set_eyevalue(no_eyes, 0, 0, 0, 0);

        if (b.board[str] === colors.EMPTY || this.dragon[str].origin !== str){
          continue;
        }

        /* Some dragons can be ignored but be extra careful with big dragons. */
        if (crude_dragon_weakness(ALIVE, no_eyes, 0,
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
            if (!DRAGON2(str).owl_attack_certain) {
              kworm = NO_MOVE;
              dcode = this.owl_defend(str, this.defense_point,
            this.DRAGON2(str).owl_defense_certain, this.kworm);
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
    // time_report(2, "  owl reading", NO_MOVE, 1.0);

    /* Compute the status to be used by the matcher. We most trust the
     * owl status, if it is available. If it's not we assume that we are
     * already confident that the dragon is alive, regardless of
     * crude_status.
     */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
      if (b.IS_STONE(b.board[str])) {
        if (this.DRAGON2(str).owl_status !== dragon_status.UNCHECKED)
          this.dragon[str].status = this.DRAGON2(str).owl_status;
        else
          this.dragon[str].status = dragon_status.ALIVE;
      }

    /* The dragon data is now correct at the origin of each dragon but
     * we need to copy it to every vertex.
     */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
      if (b.ON_BOARD(str) && b.board[str] !== colors.EMPTY)
        this.dragon[str] = this.dragon[dragon[str].origin];

    this.identify_thrashing_dragons();

    /* Owl threats. */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
      if (b.ON_BOARD(str)
        && b.board[str] !== colors.EMPTY
        && this.dragon[str].origin === str) {
        let no_eyes;
        this.set_eyevalue(no_eyes, 0, 0, 0, 0);
        if (this.crude_dragon_weakness(ALIVE, no_eyes, 0,
          this.DRAGON2(str).moyo_territorial_value,
        this.DRAGON2(str).escape_route - 10)
          < 0.00001 + Math.max(0.12, 0.32 - 0.01*this.dragon[str].effective_size)) {
          this.DRAGON2(str).owl_threat_status = dragon_status.UNCHECKED;
          this.DRAGON2(str).owl_second_attack_point  = NO_MOVE;
          this.DRAGON2(str).owl_second_defense_point = NO_MOVE;
        }
      else {
          let acode = this.DRAGON2(str).owl_attack_code;
          let dcode = this.DRAGON2(str).owl_defense_code;
          let defense_point, second_defense_point;

          if (get_level() >= 8
            && !disable_threat_computation
            && (owl_threats
              || thrashing_stone[str])) {
            if (acode && !dcode && DRAGON2(str).owl_attack_point !== NO_MOVE) {
              if (owl_threaten_defense(str, defense_point, second_defense_point)) {
                this.DRAGON2(str).owl_threat_status = dragon_status.CAN_THREATEN_DEFENSE;
                this.DRAGON2(str).owl_defense_point = defense_point;
                this.DRAGON2(str).owl_second_defense_point = second_defense_point;
              }
            else
              this.DRAGON2(str).owl_threat_status = dragon_status.DEAD;
            }
            else if (!acode) {
              let attack_point, second_attack_point;
              if (owl_threaten_attack(str, attack_point, second_attack_point)) {
                this.DRAGON2(str).owl_threat_status = dragon_status.CAN_THREATEN_ATTACK;
                this.DRAGON2(str).owl_attack_point = attack_point;
                this.DRAGON2(str).owl_second_attack_point = second_attack_point;
              }
            else
              this.DRAGON2(str).owl_threat_status = dragon_status.ALIVE;
            }
          }
        }
      }

    /* Once again, the dragon data is now correct at the origin of each dragon
     * but we need to copy it to every vertex.
     */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
      if (b.ON_BOARD(str) && b.board[str] !== colors.EMPTY)
        this.dragon[str] = this.dragon[this.dragon[str].origin];

    // time_report(2, "  owl threats ", NO_MOVE, 1.0);


    /* Compute the safety value. */
    for (let d = 0; d < number_of_dragons; d++) {
      let true_genus;
      let origin = this.dragon2[d].origin;
      // struct eyevalue *genus = &dragon2[d].genus;

      /* FIXME: We lose information when constructing true_genus. This
       * code can be improved.
       */
      true_genus = this.max_eyes(genus) + this.min_eyes(genus);
      if (this.dragon_looks_inessential(origin))
        this.dragon2[d].safety = dragon_status.INESSENTIAL;
      else if (dragon[origin].size === this.worm[origin].size
        && this.worm[origin].attack_codes[0] !== 0
        && this.worm[origin].defense_codes[0] === 0)
        this.dragon2[d].safety = dragon_status.TACTICALLY_DEAD;
      else if (0) /* Seki is detected by the call to semeai() below. */
        this.dragon2[d].safety = dragon_status.ALIVE_IN_SEKI;
      else if (dragon_invincible(origin)) {
        this.dragon2[d].safety = dragon_status.INVINCIBLE;
        /* Sometimes the owl analysis may have misevaluated invincible
         * dragons, typically if they live by topologically false eyes.
         * Therefore we also set the status here.
         */
        this.DRAGON(d).status = dragon_status.ALIVE;
      }
      else if (this.dragon2[d].owl_status == DEAD)
        this.dragon2[d].safety = dragon_status.DEAD;
      else if (this.dragon2[d].owl_status == CRITICAL)
        this.dragon2[d].safety = dragon_status.CRITICAL;
      else if (true_genus >= 6 || this.dragon2[d].moyo_size > 20)
        this.dragon2[d].safety = dragon_status.STRONGLY_ALIVE;
      else
        this.dragon2[d].safety = dragon_status.ALIVE;
    }

    /* The status is now correct at the origin of each dragon
     * but we need to copy it to every vertex.
     */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++)
      if (b.ON_BOARD(str))
        this.dragon[str].status = this.dragon[this.dragon[str].origin].status;

    /* Revise inessentiality of critical worms and dragons. */
    this.revise_inessentiality();

    this.semeai();
    // time_report(2, "  semeai module", NO_MOVE, 1.0);

    /* Count the non-dead dragons. */
    this.lively_white_dragons = 0;
    this.lively_black_dragons = 0;

    for (let d = 0; d < number_of_dragons; d++)
      if (this.DRAGON(d).status !== dragon_status.DEAD) {
        if (this.DRAGON(d).color === colors.WHITE)
          this.lively_white_dragons++;
        else
          this.lively_black_dragons++;
      }
  }
}