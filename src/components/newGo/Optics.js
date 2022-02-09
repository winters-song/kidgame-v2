import {colors, NO_MOVE} from "./Constants";
import {EyeData} from "./Liberty";

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

  propagate_eye () {},
  find_eye_dragons () {},
  print_eye () {},
  compute_eyes () {},
  compute_eyes_pessimistic () {},
  guess_eye_space () {},
  read_eye () {},
  recognize_eye () {},
  reset_map () {},
  first_map () {},
  next_map () {},
  add_false_eye () {},
  is_eye_space () {},
  is_proper_eye_space () {},
  max_eye_value () {},
  is_marginal_eye_space () {},
  is_halfeye () {},
  is_false_eye () {},
  find_half_and_false_eyes () {},
  topological_eye () {},
  evaluate_diagonal_intersection () {},
  obvious_false_eye () {},
  set_eyevalue () {},
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