import {codes, colors, NO_MOVE} from "./Constants";
import {EyeData, EyeValue, FALSE_EYE, HALF_EYE, MAX_EYE_ATTACKS} from "./Liberty";
import {CAN_BE_EMPTY, CAN_CONTAIN_STONE, EYE_ATTACK_POINT, EYE_DEFENSE_POINT, graphs} from "./patterns/eyes";

const MAXEYE = 20

class VitalPoints {
  attacks =[];
  defenses =[];
  num_attacks;
  num_defenses;
};

/* These are used during the calculations of eye spaces. */
// let black_domain = [];
// let white_domain = [];

/* Used internally by mapping functions. */
let map_size;
let used_index = [];

export const Optics = {
  /*
   * make_domains() is called from make_dragons() and from
   * owl_determine_life(). It marks the black and white domains
   * (eyeshape regions) and collects some statistics about each one.
   */
  make_domains (b_eye, w_eye, owl_call) {
    let k;
    let pos;
    let lively = [];
    let false_margins = [];
    const b = this.board

    this.black_domain = []
    this.white_domain = []

    if (b_eye) {
      b_eye.splice(0, b_eye.length)
    }
    if (w_eye){
      w_eye.splice(0, w_eye.length)
    }

    /* Initialize eye data and compute the lively array. */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos)){
        lively[pos] = this.is_lively(owl_call, pos);
      }
    }

    /* Compute the domains of influence of each color. */
    this.compute_primary_domains(colors.BLACK, this.black_domain, lively, false_margins, 1);
    this.compute_primary_domains(colors.WHITE, this.white_domain, lively, false_margins, 0);

    /* Now we fill out the arrays b_eye and w_eye with data describing
     * each eye shape.
     */

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }

      w_eye[pos] = new EyeData()
      b_eye[pos] = new EyeData()

      if (b.board[pos] === colors.EMPTY || !lively[pos]) {
        if (this.black_domain[pos] === 0 && this.white_domain[pos] === 0) {
          if (w_eye){
            w_eye[pos].color = colors.GRAY;
          }
          if (b_eye){
            b_eye[pos].color = colors.GRAY;
          }
        }
        else if (this.black_domain[pos] === 1 && this.white_domain[pos] === 0 && b_eye) {
          b_eye[pos].color = colors.BLACK;
          for (k = 0; k < 4; k++) {
            let apos = pos + b.delta[k];
            if (b.ON_BOARD(apos) && this.white_domain[apos] && !this.black_domain[apos]) {
              b_eye[pos].marginal = 1;
              break;
            }
          }
        }
        else if (this.black_domain[pos] === 0 && this.white_domain[pos] === 1 && w_eye) {
          w_eye[pos].color = colors.WHITE;
          for (k = 0; k < 4; k++) {
            let apos = pos + b.delta[k];
            if (b.ON_BOARD(apos) && this.black_domain[apos] && !this.white_domain[apos]) {
              w_eye[pos].marginal = 1;
              break;
            }
          }
        }
        else if (this.black_domain[pos] === 1 && this.white_domain[pos] === 1) {
          if (b_eye) {
            for (k = 0; k < 4; k++) {
              let apos = pos + b.delta[k];
              if (b.ON_BOARD(apos) && this.black_domain[apos] && !this.white_domain[apos]) {
                b_eye[pos].marginal = 1;
                b_eye[pos].color = colors.BLACK;
                break;
              }
            }
            if (k === 4){
              b_eye[pos].color = colors.GRAY;
            }
          }

          if (w_eye) {
            for (k = 0; k < 4; k++) {
              let apos = pos + b.delta[k];
              if (b.ON_BOARD(apos) && this.white_domain[apos] && !this.black_domain[apos]) {
                w_eye[pos].marginal = 1;
                w_eye[pos].color = colors.WHITE;
                break;
              }
            }
            if (k === 4){
              w_eye[pos].color = colors.GRAY;
            }
          }
        }
      }
    }

    /* The eye spaces are all found. Now we need to find the origins. */
    this.partition_eyespaces(b_eye, colors.BLACK);
    this.partition_eyespaces(w_eye, colors.WHITE);
  },

  /* Find connected eyespace components and compute relevant statistics. */
  partition_eyespaces (eye, color) {
    const b = this.board
    let pos;

    if (!eye){
      return;
    }

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos)){
        eye[pos].origin = NO_MOVE;
      }
    }

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }
      if (eye[pos].origin === NO_MOVE && eye[pos].color === color) {
        let esize = [0];
        let msize = [0];

        this.originate_eye(pos, pos, esize, msize, eye);
        eye[pos].esize = esize[0];
        eye[pos].msize = msize[0];
      }
    }

    /* Now we count the number of neighbors and marginal neighbors
     * of each vertex.
     */
    this.count_neighbours(eye);
  },


  /* Compute the domains of influence of each color, used in determining
   * eye shapes. NOTE: the term influence as used here is distinct from the
   * influence in influence.c.
   *
   * For this algorithm the strings which are not lively are invisible. Ignoring
   * these, the algorithm assigns friendly influence to:
   *
   * (1) every vertex which is occupied by a (lively) friendly stone,
   * (2) every empty vertex adjoining a (lively) friendly stone,
   * (3) every empty vertex for which two adjoining vertices (not
   *     on the first line) in the (usually 8) surrounding ones have friendly
   *     influence, with two CAVEATS explained below.
   *
   * Thus in the following diagram, e would be assigned friendly influence
   * if a and b have friendly influence, or a and d. It is not sufficent
   * for b and d to have friendly influence, because they are not adjoining.
   *
   *        uabc
   *         def
   *         ghi
   *
   * The constraint that the two adjoining vertices not lie on the first
   * line prevents influence from leaking under a stone on the third line.
   *
   * The first CAVEAT alluded to above is that even if a and b have friendly
   * influence, this does not cause e to have friendly influence if there
   * is a lively opponent stone at d. This constraint prevents
   * influence from leaking past knight's move extensions.
   *
   * The second CAVEAT is that even if a and b have friendly influence
   * this does not cause e to have influence if there are lively opponent
   * stones at u and at c. This prevents influence from leaking past
   * nikken tobis (two space jumps).
   *
   * The corner vertices are handled slightly different.
   *
   *    +---
   *    |ab
   *    |cd
   *
   * We get friendly influence at a if we have friendly influence
   * at b or c and no lively unfriendly stone at b, c or d.
   *
   */
  sufficient_influence (influence, threshold, pos, apos, bpos) {
    return this.board.ON_BOARD(bpos) && influence[bpos] > threshold[pos] - influence[apos]
  },
  compute_primary_domains (color, domain, lively, false_margins, first_time) {
    const b = this.board
    const other = b.OTHER_COLOR(color);
    let k;
    let pos, pos2;
    let own, enemy;
    let threshold = [];
    let influence = [];
    let list = [];
    let size = 0, lastchange = 0;

    /* In the first pass we
     * 1. Give influence to lively own stones and their neighbors.
     *    (Cases (1) and (2) above.)
     * 2. Fill influence[] and threshold[] arrays with initial values.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }

      if (lively[pos]) {
        if (b.board[pos] === color) {
          domain[pos] = 1; /* Case (1) above. */
          influence[pos] = 1;
        }
        else{
          influence[pos] = -1;
        }
        continue;
      }

      own = enemy = 0;
      for (k = 0; k < 4; k++) {
        pos2 = pos + b.delta[k];
        if (b.ON_BOARD(pos2) && lively[pos2]) {
          if (b.board[pos2] === color){
            own = 1;
          }
          else{
            enemy = 1;
          }
        }
      }

      if (own) {
        /* To explain the asymmetry between the first time around
         * this loop and subsequent ones, a false margin is adjacent
         * to both B and W lively stones, so it's found on the first
         * pass through the loop.
         */
        if (first_time) {
          if (b.board[pos] === colors.EMPTY
            && (this.false_margin(pos, color, lively) || this.false_margin(pos, other, lively))) {
            false_margins[pos] = 1;
          }
          else {
            domain[pos] = 1;
            influence[pos] = 1;
          }
        }
        else if (b.board[pos] !== colors.EMPTY || !false_margins[pos]) {
          domain[pos] = 1;
          influence[pos] = 1;
        }
      }
      else
        list[size++] = pos;

      if (enemy) {
        threshold[pos] = 1;
        influence[pos]--;
      }
      else if (b.is_edge_vertex(pos))
        influence[pos]--;
    }

    /* Now we loop over the board until no more vertices can be added to
     * the domain through case (3) above.
     */
    if (size) {
      k = size;
      while (1) {
        if (!k) {
          k = size;
        }
        pos = list[--k];

        /* Case (3) above. */
        if  (this.sufficient_influence(influence, threshold, pos, b.SOUTH(pos), b.SE(pos))
          || this.sufficient_influence(influence, threshold, pos, b.SOUTH(pos), b.SW(pos))
          || this.sufficient_influence(influence, threshold, pos, b.EAST(pos), b.SE(pos))
          || this.sufficient_influence(influence, threshold, pos, b.EAST(pos), b.NE(pos))
          || this.sufficient_influence(influence, threshold, pos, b.WEST(pos), b.SW(pos))
          || this.sufficient_influence(influence, threshold, pos, b.WEST(pos), b.NW(pos))
          || this.sufficient_influence(influence, threshold, pos, b.NORTH(pos), b.NW(pos))
          || this.sufficient_influence(influence, threshold, pos, b.NORTH(pos), b.NE(pos))) {
          domain[pos] = 1;
          influence[pos]++;

          if (!--size){
            break;
          }
          if (k < size){
            list[k] = list[size];
          }
          else{
            k--;
          }
          lastchange = k;
        }
        else if (k === lastchange){
          break; /* Looped the whole list and found nothing new */
        }
      }
    }

  },
  count_neighbours (eyedata) {
    const b = this.board

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos) || eyedata[pos].origin === NO_MOVE)
        continue;

      eyedata[pos].esize = eyedata[eyedata[pos].origin].esize;
      eyedata[pos].msize = eyedata[eyedata[pos].origin].msize;
      eyedata[pos].neighbors = 0;
      eyedata[pos].marginal_neighbors = 0;

      for (let k = 0; k < 4; k++) {
        let pos2 = pos + b.delta[k];
        if (b.ON_BOARD(pos2) && eyedata[pos2].origin === eyedata[pos].origin) {
          eyedata[pos].neighbors++;
          if (eyedata[pos2].marginal){
            eyedata[pos].marginal_neighbors++;
          }
        }
      }
    }
  },

  is_lively (owl_call, pos) {
    if (this.board.board[pos] === colors.EMPTY){
      return 0;
    }

    if (owl_call){
      return this.owl_lively(pos);
    }
    else {
      return !this.worm[pos].inessential
        && (this.worm[pos].attack_codes[0] === 0 || this.worm[pos].defense_codes[0] !== 0);
    }
  },
  false_margin () {},

  /*
   * originate_eye(pos, pos, *esize, *msize, eye) creates an eyeshape
   * with origin pos. esize and msize return the size and the number of
   * marginal vertices. The repeated variables (pos) are due to the
   * recursive definition of the function.
   */
  originate_eye (origin, pos, esize, msize, eye) {
    const b = this.board
    b.ASSERT_ON_BOARD1(origin);
    b.ASSERT_ON_BOARD1(pos);

    eye[pos].origin = origin;
    esize[0]++;
    if (eye[pos].marginal){
      msize[0]++;
    }

    for (let k = 0; k < 4; k++) {
      let pos2 = pos + b.delta[k];
      if (b.ON_BOARD(pos2)
        && eye[pos2].color === eye[pos].color
        && eye[pos2].origin === NO_MOVE
        && (!eye[pos2].marginal || !eye[pos].marginal)){
        this.originate_eye(origin, pos2, esize, msize, eye);
      }
    }
  },

  /*
   * propagate_eye(origin) copies the data at the (origin) to the
   * rest of the eye (invariant fields only).
   */
  propagate_eye (origin, eye) {
    const b = this.board

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos) && eye[pos].origin === origin) {
        eye[pos].color         = eye[origin].color;
        eye[pos].esize         = eye[origin].esize;
        eye[pos].msize         = eye[origin].msize;
        eye[pos].origin        = eye[origin].origin;
        eye[pos].value         = eye[origin].value;
      }
    }
  },
  find_eye_dragons () {},
  print_eye () {},

  /*
   * Given an eyespace with origin (pos), this function computes the
   * minimum and maximum numbers of eyes the space can yield. If max and
   * min are different, then vital points of attack and defense are also
   * generated.
   *
   * If add_moves == 1, this function may add a move_reason for (color) at
   * a vital point which is found by the function. If add_moves == 0,
   * set color == EMPTY.
   */
  compute_eyes (pos, value, attack_point, defense_point, eye, heye, add_moves) {
    if (attack_point) {
      attack_point[0] = NO_MOVE;
    }
    if (defense_point){
      defense_point[0] = NO_MOVE;
    }

    // if (debug & DEBUG_EYES) {
    //   print_eye(eye, heye, pos);
    //   DEBUG(DEBUG_EYES, "\n");
    // }

    /* Look up the eye space in the graphs database. */
    if (this.read_eye(pos, attack_point, defense_point, value, eye, heye, add_moves)) {
      return;
    }

    /* Ideally any eye space that hasn't been matched yet should be two
     * secure eyes. Until the database becomes more complete we have
     * some additional heuristics to guess the values of unknown
     * eyespaces.
     */
    if (eye[pos].esize - 2*eye[pos].msize > 3){
      this.set_eyevalue(value, 2, 2, 2, 2);
    }
    else if (eye[pos].esize - 2*eye[pos].msize > 0){
      this.set_eyevalue(value, 1, 1, 1, 1);
    }
    else{
      this.set_eyevalue(value, 0, 0, 0, 0);
    }
  },
  compute_eyes_pessimistic () {},
  guess_eye_space () {},


  /* This function does some minor reading to improve the results of
   * recognize_eye(). Currently, it has two duties. One is to read
   * positions like this:
   *
   *     .XXXX|        with half eye         with proper eye
   *     XXOOO|
   *     XO.O.|           .   (1 eye)           .   (2 eyes)
   *     XXOa.|         !..                    .*
   *     -----+
   *
   * recognize_eye() sees the eyespace of the white dragon as shown
   * (there's a half eye at a and it is considered the same as '!.' by
   * the optics code). Normally, that eye shape gives only one secure
   * eye, and owl thinks that the white dragon is dead unconditionally.
   * This function tries to turn such ko-dependent half eyes into proper
   * eyes and chooses the best alternative. Note that we don't have any
   * attack/defense codes here, since owl will determine them itself.
   *
   * Another one is related to some cases when replacing half eyes with
   * '!.' doesn't work. E.g. consider this eye (optics:328):
   *
   *     XXXOO         eye graph is 310:
   *     X..X.
   *     XOXX.             !.!  (second '!' is due to the halfeye)
   *     OXO..
   *     O.O..
   *
   * When this function detects such a half eye that can be attacked
   * and/or defended inside its eyespace, it tries to turn it into a
   * proper eye and see what happens. In case it gives an improvement
   * for attacker and/or defender, the function keeps new result but
   * only if new vital points are also vital points for the half eye.
   * The heuristics used here might need improvements since they are
   * based on a single game position.
   *
   * If add_moves != 0, this function may add move reasons for (color)
   * at the vital points which are found by recognize_eye(). If add_moves
   * == 0, set color to be EMPTY.
   */
  read_eye (pos, attack_point, defense_point, value, eye, heye, add_moves) {
    let eye_color;
    let k;
    let combination_halfeye = NO_MOVE;
    let combination_attack = NO_MOVE;
    let combination_defense = NO_MOVE;
    let num_ko_halfeyes = 0;
    let ko_halfeye = NO_MOVE;

    let vp = new VitalPoints()
    let ko_vp = new VitalPoints()
    let best_vp = vp
    const b = this.board

    eye_color = this.recognize_eye(pos, attack_point, defense_point, value, eye, heye, vp);
    if (!eye_color) {
      return 0;
    }

    /* Find ko half eyes and "combination" half eyes if any. */
    for (let pos2 = b.BOARDMIN; pos2 < b.BOARDMAX; pos2++) {
      if (b.ON_BOARD(pos2) && eye[pos2].origin === pos && heye[pos2].type === HALF_EYE) {
        if (combination_halfeye === NO_MOVE) {
          let apos = NO_MOVE;
          let dpos = NO_MOVE;

          for (k = 0; k < heye[pos2].num_attacks; k++) {
            if (eye[heye[pos2].attack_point[k]].origin === pos) {
              apos = heye[pos2].attack_point[k];
              break;
            }
          }

          for (k = 0; k < heye[pos2].num_defenses; k++) {
            if (eye[heye[pos2].defense_point[k]].origin === pos) {
              dpos = heye[pos2].defense_point[k];
              break;
            }
          }

          if (apos || dpos) {
            combination_halfeye = pos2;
            combination_attack = apos;
            combination_defense = dpos;
          }
        }

        if (heye[pos2].value < 3.0) {
          num_ko_halfeyes++;
          ko_halfeye = pos2;
        }
      }
    }

    /* In case we have a "combination" half eye, turn it into a proper eye
     * vertex for a while and see what happens.
     */
    if (combination_halfeye !== NO_MOVE) {
      let result;
      let apos = [NO_MOVE];
      let dpos = [NO_MOVE];
      let combination_value = [];
      let combination_vp = new VitalPoints()

      heye[combination_halfeye].type = 0;
      result = this.recognize_eye(pos, apos, dpos, combination_value, eye, heye, combination_vp);
      heye[combination_halfeye].type = HALF_EYE;

      if (result) {
        if (combination_attack
          && this.min_eyes(value) > this.min_eyes(combination_value)) {
          /* FIXME: I'm not sure we can ever get here. */
          for (k = 0; k < combination_vp.num_attacks; k++) {
            if (combination_vp.attacks[k] === combination_attack) {
              value.a = combination_value.a;
              value.b = combination_value.b;
              attack_point[0] = apos;
              best_vp.num_attacks = 1;
              best_vp.attacks[0] = combination_attack;
              break;
            }
          }
        }

        if (combination_defense
          && this.max_eyes(value) < this.max_eyes(combination_value)) {
          /* Turning the half eye into a proper eye gives an improvement.
           * However, we can only accept this result if there is a vital
           * point that defends both the half eye and the whole eyespace.
           */
          for (k = 0; k < combination_vp.num_defenses; k++) {
            if (combination_vp.defenses[k] === combination_defense) {
              value.c = combination_value.c;
              value.d = combination_value.d;
              defense_point[0] = dpos;
              best_vp.num_defenses = 1;
              best_vp.defenses[0] = combination_defense;
              break;
            }
          }
        }

        if (this.min_eyes(value) !== this.max_eyes(value)) {
          b.ASSERT1(combination_attack || combination_defense, combination_halfeye);
          if (attack_point[0] === NO_MOVE) {
            attack_point[0] = combination_attack;
            if (attack_point[0] === NO_MOVE){
              attack_point[0] = combination_defense;
            }
          }

          if (defense_point[0] === NO_MOVE) {
            defense_point[0] = combination_defense;
            if (defense_point[0] === NO_MOVE){
              defense_point[0] = combination_defense;
            }
          }
        }
      }
    }

    /* The same with ko half eye (we cannot win two kos at once, therefore we
     * give up if there is more than one ko half eye).
     */
    if (num_ko_halfeyes === 1) {
      let result;
      let apos = [NO_MOVE];
      let dpos = [NO_MOVE];
      let ko_value = new EyeValue();

      heye[ko_halfeye].type = 0;
      result = this.recognize_eye(pos, apos, dpos, ko_value, eye, heye, ko_vp);
      heye[ko_halfeye].type = HALF_EYE;

      if (result && this.max_eyes(value) < this.max_eyes(ko_value)) {
        /* It is worthy to win the ko. */
        value[0] = ko_value;
        attack_point[0] = apos[0];
        defense_point[0] = dpos[0];
        best_vp = ko_vp;
      }
    }

    if (add_moves) {
      let vital
      if (eye_color === colors.WHITE){
        vital = this.white_vital_points;
      }
      else{
        vital = this.black_vital_points;
      }
      for (k = 0; k < best_vp.num_defenses && k < MAX_EYE_ATTACKS; k++){
        vital[pos].defense_points[k] = best_vp.defenses[k];
      }
      for (k = 0; k < best_vp.num_attacks && k < MAX_EYE_ATTACKS; k++){
        vital[pos].attack_points[k] = best_vp.attacks[k];
      }
    }

    return 1;
  },

  /* recognize_eye(pos, *attack_point, *defense_point, *max, *min, eye_data,
   * half_eye_data, color, vp), where pos is the origin of an eyespace, returns
   * owner of eye (his color) if there is a pattern in eyes.db matching the
   * eyespace, or 0 if no match is found. If there is a key point for attack,
   * (*attack_point) is set to its location, or NO_MOVE if there is none.
   * Similarly (*defense_point) is the location of a vital defense point.
   * *value is set according to the pattern found. Vital attack/defense points
   * exist if and only if min_eyes(value) != max_eyes(value).
   */
  recognize_eye (pos, attack_point, defense_point, value, eye, heye, vp) {
    let pos2;
    let eye_size = 0;
    let num_marginals = 0;
    let vpos = [];
    let marginal= [], edge= [], neighbors= [];
    let graph;
    let map = [];
    let best_score;
    let r;
    const b = this.board

    b.ASSERT1(attack_point !== null);
    b.ASSERT1(defense_point !== null);

    /* Set `eye_color' to the owner of the eye. */
    let eye_color = eye[pos].color;

    if (eye[pos].esize - eye[pos].msize > 8){
      return 0;
    }

    if (eye[pos].msize > MAXEYE){
      return 0;
    }

    /* Create list of eye vertices */
    for (pos2 = b.BOARDMIN; pos2 < b.BOARDMAX; pos2++) {
      if (!b.ON_BOARD(pos2)){
        continue;
      }
      if (eye[pos2].origin === pos) {
        vpos[eye_size] = pos2;
        marginal[eye_size] = eye[pos2].marginal;
        if (marginal[eye_size]){
          num_marginals++;
        }
        neighbors[eye_size] = eye[pos2].neighbors;

        if (b.is_corner_vertex(pos2)){
          edge[eye_size] = 2;
        }
        else if (b.is_edge_vertex(pos2)){
          edge[eye_size] = 1;
        }
        else{
          edge[eye_size] = 0;
        }

        if (this.is_halfeye(heye, pos2)) {
          neighbors[eye_size]++;      /* Increase neighbors of half eye. */
          eye_size++;
          /* Use a virtual marginal vertex for mapping purposes. We set it
           * to be at NO_MOVE so it won't accidentally count as a
           * neighbor for another vertex. Note that the half eye precedes
           * the virtual marginal vertex in the list.
           */
          vpos[eye_size] = NO_MOVE;
          marginal[eye_size] = 1;
          num_marginals++;
          edge[eye_size] = 0;
          neighbors[eye_size] = 1;
        }

        eye_size++;
      }
    }

    /* We attempt to construct a map from the graph to the eyespace
     * preserving the adjacency structure. If this can be done, we've
     * identified the eyeshape.
     */

    for (graph = 0; !!graphs[graph].vertex; graph++) {
      if (graphs[graph].esize !== eye_size || graphs[graph].msize !== num_marginals){
        continue;
      }

      this.reset_map(eye_size);
      let q = 0;
      this.first_map(map[0]);

      while (1) {
        let gv = graphs[graph].vertex[q];
        let mv = map[q];
        let ok = 1;

        if (neighbors[mv] !== gv.neighbors || marginal[mv] !== gv.marginal || edge[mv] < gv.edge){
          ok = 0;
        }

        if (ok) {
          if (b.IS_STONE(b.board[vpos[mv]])) {
            if (!(gv.flags & CAN_CONTAIN_STONE)){
              ok = 0;
            }
          }
          /* Virtual half eye marginals also fall here since they are off
           * board.
           */
          else if (!(gv.flags & CAN_BE_EMPTY)){
            ok = 0;
          }
        }

        if (ok) {
          for (let k = 0; k < gv.neighbors; k++) {
            if (gv.n[k] < q) {
              let mn = map[gv.n[k]];

              /* Two eye vertices are neighbours if they are adjacent on the
               * board or one of them is a half eye and the other is its
               * virtual marginal vertex (and follows it in vpos[] array).
               */
              if (vpos[mv] !== b.SOUTH(vpos[mn])
                && vpos[mv] !== b.WEST(vpos[mn])
                && vpos[mv] !== b.NORTH(vpos[mn])
                && vpos[mv] !== b.EAST(vpos[mn])
                && (mv !== mn - 1 || vpos[mv] === NO_MOVE || heye[vpos[mv]].type !== HALF_EYE)
                && (mn !== mv - 1 || vpos[mn] === NO_MOVE || heye[vpos[mn]].type !== HALF_EYE)) {
                ok = 0;
                break;
              }
            }
          }
        }

        if (!ok) {
          if (!this.next_map(q, map)){
            break;
          }
        }
        else {
          q++;
          if (q === eye_size){
            break;			/* A match! */
          }

          this.first_map(map[q]);
        }
      }

      if (q === eye_size) {
        /* We have found a match! Now sort out the vital moves. */
        value[0] = graphs[graph].value;
        vp.num_attacks = 0;
        vp.num_defenses = 0;

        if (this.eye_move_urgency(value) > 0) {
          /* Collect all attack and defense points in the pattern. */
          for (let k = 0; k < eye_size; k++) {
            let ev = graphs[graph].vertex[k];

            if (ev.flags & EYE_ATTACK_POINT) {
              /* Check for a marginal vertex matching a half eye virtual
               * marginal. This is the case if a half eye preceeds the
               * current vertex in the list.
               */
              if (ev.marginal
                && map[k] > 0
                && vpos[map[k] - 1] !== NO_MOVE
                && this.is_halfeye(heye, vpos[map[k] - 1])) {
                /* Add all diagonals as vital. */
                let he = heye[vpos[map[k] - 1]];

                for (let ix = 0; ix < he.num_attacks; ix++) {
                  vp.attacks[vp.num_attacks++] = he.attack_point[ix];
                }
              }
              else{
                vp.attacks[vp.num_attacks++] = vpos[map[k]];
              }
            }

            if (ev.flags & EYE_DEFENSE_POINT) {
              /* Check for a half eye virtual marginal vertex. */
              if (ev.marginal
                && map[k] > 0
                && vpos[map[k] - 1] !== NO_MOVE
                && this.is_halfeye(heye, vpos[map[k] - 1])) {
                /* Add all diagonals as vital. */
                let he = heye[vpos[map[k] - 1]];

                for (let ix = 0; ix < he.num_defenses; ix++)
                vp.defenses[vp.num_defenses++] = he.defense_point[ix];
              }
              else
                vp.defenses[vp.num_defenses++] = vpos[map[k]];
            }
          }

          b.ASSERT1(vp.num_attacks > 0 && vp.num_defenses > 0);

          /* We now have all vital attack and defense points listed but
                 * we are also expected to single out of one of each to return
                 * in *attack_point and *defense_point. Since sometimes those
                 * are the only vital points considered, we want to choose the
                 * best ones, in the sense that they minimize the risk for
                 * error in the eye space analysis.
           *
           * One example is this position
           *
           * |..XXXX
           * |XXX..X
           * |..!O.X
           * |OO.O.X
           * |.O.!XX
           * +------
           *
           * where O has an eyespace of the !..! type. The graph
           * matching finds that both marginal vertices are vital points
           * but here the one at 3-3 fails to defend. (For attack both
           * points work but the 3-3 one is still worse since it leaves
           * a ko threat.)
           *
           * In order to differentiate between the marginal points we
           * count the number of straight and diagonal neighbors within
           * the eye space. In the example above both have one straight
           * neighbor each but the edge margin wins because it also has
           * a diagonal margin.
           */

          best_score = -10;
          for (let k = 0; k < vp.num_attacks; k++) {
            let apos = vp.attacks[k];
            let score = 0;
            for (r = 0; r < 8; r++) {
              if (b.ON_BOARD(apos + b.delta[r])
                && eye[apos + b.delta[r]].color === eye[pos].color
                && !eye[apos + b.delta[r]].marginal) {
                score++;
                if (r < 4) {
                  score++;
                  if (b.board[apos + b.delta[r]] !== colors.EMPTY){
                    score++;
                  }
                }
              }
            }

            /* If a vital point is not adjacent to any point in the eye
                   * space, it must be a move to capture or defend a string
                   * related to a halfeye, e.g. the move * in this position,
             *
             * ......|
             * .XXXX.|
             * .X.O..|
             * .XO.OO|
             * .*XO..|
             * ------+
             *
             * Playing this is probably a good idea.
             */
            if (score === 0){
              score += 2;
            }

            if (score > best_score) {
              attack_point[0] = apos;
              best_score = score;
            }
          }

          best_score = -10;
          for (let k = 0; k < vp.num_defenses; k++) {
            let dpos = vp.defenses[k];
            let score = 0;
            for (r = 0; r < 8; r++)
              if (b.ON_BOARD(dpos + b.delta[r])
                && eye[dpos + b.delta[r]].color === eye[pos].color
                && !eye[dpos + b.delta[r]].marginal) {
                score++;
                if (r < 4) {
                  score++;
                  if (b.board[dpos + b.delta[r]] !== colors.EMPTY)
                    score++;
                }
              }

            /* If possible, choose a non-sacrificial defense point.
             * Compare white T8 and T6 in lazarus:21.
             */
            if (this.safe_move(dpos, eye_color) !== codes.WIN){
              score -= 5;
            }

            /* See comment to the same code for attack points. */
            if (score == 0){
              score += 2;
            }

            if (score > best_score) {
              defense_point[0] = dpos;
              best_score = score;
            }
          }

          // DEBUG(DEBUG_EYES, "  vital points: %1m (attack) %1m (defense)\n", *attack_point, *defense_point);
          // DEBUG(DEBUG_EYES, "  pattern matched:  %d\n", graphs[graph].patnum);

        }
        // TRACE("eye space at %1m of type %d\n", pos, graphs[graph].patnum);

        return eye_color;
      }
    }

    return 0;
  },
  reset_map () {},
  first_map () {},
  next_map () {},

  /* add_false_eye() turns a proper eyespace into a margin. */
  add_false_eye (pos, eye, heye) {
    const b = this.board
    b.ASSERT1(heye[pos].type === FALSE_EYE, pos);
    // DEBUG(DEBUG_EYES, "false eye found at %1m\n", pos);

    if (eye[pos].color === colors.GRAY || eye[pos].marginal !== 0){
      return;
    }

    eye[pos].marginal = 1;
    eye[eye[pos].origin].msize++;
    for (let k = 0; k < 4; k++){
      if (b.ON_BOARD(pos + b.delta[k]) && eye[pos + b.delta[k]].origin === eye[pos].origin){
        eye[pos + b.delta[k]].marginal_neighbors++;
      }
    }
    this.propagate_eye(eye[pos].origin, eye);
  },

  is_eye_space () {},
  is_proper_eye_space () {},
  max_eye_value () {},
  is_marginal_eye_space () {},
  is_halfeye () {},
  is_false_eye () {},

  /* Find topological half eyes and false eyes by analyzing the
   * diagonal intersections, as described in the Texinfo
   * documentation (Eyes/Eye Topology).
   */
  find_half_and_false_eyes (color, eye, heye, find_mask) {
    const b = this.board
    let eye_color = color;

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      /* skip eyespaces which owl doesn't want to be searched */
      if (!b.ON_BOARD(pos) || (find_mask && find_mask[eye[pos].origin] <= 1)){
        continue;
      }

      /* skip every vertex which can't be a false or half eye */
      if (eye[pos].color !== eye_color || eye[pos].marginal || eye[pos].neighbors > 1) {
        continue;
      }

      let sum = this.topological_eye(pos, color, eye, heye);
      if (sum >= 4.0) {
        /* false eye */
        heye[pos].type = FALSE_EYE;
        if (eye[pos].esize === 1
          || b.is_legal(pos, b.OTHER_COLOR(color)) || b.board[pos] === b.OTHER_COLOR(color)){
          this.add_false_eye(pos, eye, heye);
        }
      }
      else if (sum > 2.0) {
        /* half eye */
        heye[pos].type = HALF_EYE;
        b.ASSERT1(heye[pos].num_attacks > 0, pos);
        b.ASSERT_ON_BOARD1(heye[pos].attack_point[0]);
        b.ASSERT1(heye[pos].num_defenses > 0, pos);
        b.ASSERT_ON_BOARD1(heye[pos].defense_point[0]);
      }
    }
  },

  /* See Texinfo documentation (Eyes:Eye Topology). Returns:
   * - 2 or less if (pos) is a proper eye for (color);
   * - between 2 and 3 if the eye can be made false only by ko
   * - 3 if (pos) is a half eye;
   * - between 3 and 4 if the eye can be made real only by ko
   * - 4 or more if (pos) is a false eye.
   *
   * Attack and defense points for control of the diagonals are stored
   * in the heye[] array.
   *
   * my_eye is the eye space information with respect to (color).
   */
  topological_eye (pos, color, my_eye, heye) {
    let sum = 0.0;
    let val;
    let num_attacks = 0;
    let num_defenses = 0;
    let attack_values = [];
    let defense_values = [];
    let k;
    let r;
    let attack_point = [];
    let defense_point = [];
    let attack_value;
    let defense_value;
    const b = this.board

    /* Loop over the diagonal directions. */
    for (k = 4; k < 8; k++) {
      let diag = pos + b.delta[k];
      val = this.evaluate_diagonal_intersection(b.I(pos) + b.deltai[k],
        b.J(pos) + b.deltaj[k], color, attack_point, defense_point, my_eye);

      if (val < 2.0 && b.board[pos] === colors.EMPTY && b.board[diag] === b.OTHER_COLOR(color)
        && !b.is_edge_vertex(pos) && b.neighbor_of_string(pos, diag) && b.countstones(diag) >= 3) {
        let strings = [];
        let string_count = 0
        let s;
        for (r = 0; r < 4; r++) {
          let str;
          str = pos + b.delta[r];

          if (b.board[str] !== color){
            continue;
          }

          b.ASSERT1(string_count < 3, pos);
          for (s = 0; s < string_count; s++){
            if (b.same_string(str, strings[s])){
              break;
            }
          }
          if (s !== string_count){
            continue;
          }

          strings[string_count++] = str;
        }
        if (string_count > 1) {
          for (s = 0; s < string_count; s++) {
            let libs = [];
            let adj_eye_count = 0;
            let lib_count = b.findlib(strings[s], b.MAX_LIBERTIES, libs);
            if (lib_count > b.MAX_LIBERTIES){
              continue;
            }

            for (r = 0; r < lib_count && adj_eye_count < 2; r++) {
              if (my_eye[libs[r]].color === b.OTHER_COLOR(color) && !my_eye[libs[r]].marginal){
                adj_eye_count++;
              }
            }
            if (adj_eye_count < 2) {
              val = 2.0;
              break;
            }
          }
        }
      }

      sum += val;

      if (val > 0.0 && val < 2.0) {
        /* Diagonals off the edge has value 1.0 but no attack or defense
         * point.
         */
        if (attack_point[0] !== NO_MOVE && defense_point[0] !== NO_MOVE) {
          b.ASSERT_ON_BOARD1(attack_point[0]);
          b.ASSERT_ON_BOARD1(defense_point[0]);
          /* Store these in sorted (descending) order. We remap val
                 * differently for attack and defense points according to:
           *
           * val    attack_value     defense_value
           * ---    ------------     -------------
           * 1.0    3                3
           * <1.0   2                1
           * >1.0   1                2
           *
           * This means that we primarily want to take control of
           * diagonals without ko and secondarily of diagonals we can
           * take unconditionally but not the opponent.
           */
          if (val === 1.0) {
            attack_value = 3;
            defense_value = 3;
          }
          else if (val < 1.0) {
            attack_value = 2;
            defense_value = 1;
          }
          else {
            attack_value = 1;
            defense_value = 2;
          }

          for (r = 0; r < 4; r++) {
            if (attack_values[r] < attack_value) {
              let tmp_value = attack_values[r];
              let tmp_point;
              if (tmp_value){
                tmp_point = heye[pos].attack_point[r];
              }
              else{
                tmp_point = 0;
              }
              attack_values[r] = attack_value;
              heye[pos].attack_point[r] = attack_point;
              attack_value = tmp_value;
              attack_point = tmp_point;
            }

            if (defense_values[r] < defense_value) {
              let tmp_value = defense_values[r];
              let tmp_point;
              if (tmp_value){
                tmp_point = heye[pos].defense_point[r];
              }
              else{
                tmp_point = 0;
              }
              defense_values[r] = defense_value;
              heye[pos].defense_point[r] = defense_point;
              defense_value = tmp_value;
              defense_point = tmp_point;
            }
          }

          num_attacks++;
          num_defenses++;
        }
      }
    }

    /* Remove attacks and defenses with smaller value than the best
     * ones. (These might be useful to save as well, but not unless we
     * also store the attack/defense values in the half_eye_data.)
     */
    for (r = 0; r < num_attacks; r++) {
      if (attack_values[r] < attack_values[0]) {
        num_attacks = r;
        break;
      }
    }

    for (r = 0; r < num_defenses; r++) {
      if (defense_values[r] < defense_values[0]) {
        num_defenses = r;
        break;
      }
    }

    heye[pos].num_attacks = num_attacks;
    heye[pos].num_defenses = num_defenses;
    heye[pos].value = sum;

    return sum;
  },

  evaluate_diagonal_intersection () {},
  obvious_false_eye () {},

  set_eyevalue (e, a, b, c, d) {
    e.a = a
    e.b = b
    e.c = c
    e.d = d
  },
  min_eye_threat () {},
  min_eyes () {},
  max_eyes () {},
  max_eye_threat () {},
  add_eyevalues () {},
  eye_move_urgency () {},
  eyevalue_to_string () {},
  test_eyeshape () {},
  eyegraph_trymove () {},
  eyegraph_is_margin_or_outer_liberty () {},
  eyegraph_order_moves () {},
  white_area () {},
  EYEGRAPH_RETURN () {},
  tactical_life_attack () {},
  tactical_life_defend () {},
  tactical_life () {},
  evaluate_eyespace () {},
  add_margins () {},
  analyze_eyegraph () {},
}