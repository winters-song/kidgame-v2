

/* Returns true if a dragon is enclosed within the convex hull of
 * its hostile neighbor dragons. This is an indication that the dragon is
 * in danger. Stones on the second and first lines are not tested.
 *
 * Normally NULL will be passed to the parameter apos. It can be
 * an empty board location. If apos is non NULL it is marked and
 * added to the the hull. Thus we can ask if adding a single stone
 * to the board surrounds the dragon.
 *
 * A CORNER is a vertex of the polygon which comprises this convex
 * hull. The algorithm proceeds by first finding the sequence of
 * corners on the left side of the polyhedron, then the sequence
 * of corners on the right side.
 *
 * The hull is marked in the array mn with the number 1.  A slight
 * expansion is marked with the number 2. Return code is SURROUNDED if
 * the friendly dragon lies within the area marked 1,
 * WEAKLY_SURROUNDED if it lies in the slightly larger area marked 1
 * and 2, and 0 otherwise.
 *
 * The notion of weak surroundedness seems to be much less indicative
 * of a dragon's immanent danger than surroundedness.
 *
 * An exception: if the larger area contains any stone of a different
 * friendly dragon (which is not DEAD) the return code is 0, unless
 * that allied dragon is ENTIRELY contained within the hull.
 *
 * Another exception: an ikken tobi (one space jump) is generally not
 * a connection but in practice may be almost as good. If there is an
 * ikken tobi out of the hull, then the dragon is not surrounded.
 *
 * If the parameter showboard is 1, the figure is drawn. If showboard
 * is 2, the figure is only drawn if the region is surrounded.
 *
 * If (apos) is NULL, the result is saved in the surround_data cache.
 * The assumption is that the function will only be called once
 * with (apos) null, during make_dragons; thereafter the surroundedness
 * will be accessed using the function is_surrounded().
 *
 * If *surround_size is not a NULL pointer, then surround_size
 * returns the size of the surroundings.
 */
import {colors, NO_MOVE, SURROUNDED, WEAKLY_SURROUNDED} from "./Constants";

let gg;

const MAX_SURROUND  = 10


export const Surround = {
  compute_surroundings(pos, apos, showboard, surround_size) {
    let i, j;
    let m, n;
    let k;
    let dpos;
    let surrounded;
    const b = this.board

    let left_corner = [];
    let right_corner = [];
    let corner = [];
    let left_corners = 0, right_corners = 0;
    let corners = 0;
    let top_row, bottom_row;
    let color = b.board[pos];
    let other = b.OTHER_COLOR(color);
    let gi = 0;
    let gj = 0;
    let stones = 0;
    let found_some;

    let mf = []; /* friendly dragon  */
    let mn = []; /* neighbor dragons */
    let sd = []; /* distances to the goal */

    if (this.DRAGON2(pos).hostile_neighbors === 0){
      return 0;
    }

    this.mark_dragon(pos, mf, 1);

    /* mark hostile neighbors */

    for (k = 0; k < this.DRAGON2(pos).neighbors; k++) {
      let nd = this.DRAGON(this.DRAGON2(pos).adjacent[k]).origin;

      if (b.board[nd] !== color) {
        this.mark_dragon(nd, mn, 1);
      }
    }

    /* descend markings from stones lying on the 2nd and third lines */

    for (dpos = b.BOARDMIN; dpos < b.BOARDMAX; dpos++) {
      if (b.ON_BOARD(dpos) && mn[dpos]) {
        for (k = 0; k < 4; k++) {
          let d = b.delta[k];
          if (!b.ON_BOARD(dpos + d)){
            continue;
          }
          if (!b.ON_BOARD(dpos + 2*d)) {
            if (b.board[dpos + d] === colors.EMPTY){
              mn[dpos + d] = 1;
            }
          }
          else if (!b.ON_BOARD(dpos + 3*d)) {
            if (b.board[dpos + d] === colors.EMPTY && b.board[dpos + 2*d] === colors.EMPTY){
              mn[dpos + 2*d] = 1;
            }
          }
        }
      }
    }

    /* compute minimum distances to the goal */
    for (dpos = b.BOARDMIN; dpos < b.BOARDMAX; dpos++) {
      if (b.ON_BOARD(dpos) && mn[dpos]) {
        sd[dpos] = this.goal_dist(dpos, mf);
      }
    }

    /* revise markings */

    do {
      found_some = 0;
      for (dpos = b.BOARDMIN; dpos < b.BOARDMAX; dpos++) {
        if (b.ON_BOARD(dpos) && mn[dpos] && sd[dpos] > 8) {
          /* discard markings if we can find 2 stones
           * that verify :
           * - it is closer to the goal than we are
           * - it is closer to us than the goal is
           * - they are closer to each other than we are to the goal
           */
          for (i = b.BOARDMIN; i < b.BOARDMAX; i++) {
            if (b.ON_BOARD(i) && mn[i] && i !== dpos && sd[i] < sd[dpos] && b.square_dist(i, dpos) < sd[dpos]) {
              for (j = i + 1; j < b.BOARDMAX; j++) {
                if (b.ON_BOARD(j) && mn[j] && j !== dpos
                  && sd[j] < sd[dpos]
                  && b.square_dist(j, dpos) < sd[dpos]
                  && b.square_dist(i, j) < sd[dpos]) {
                  mn[dpos] = 0;
                  found_some = 1;
                  break;
                }
              }
              if (mn[dpos] === 0){
                break;
              }
            }
          }
        }
      }
    } while (found_some);

    /* prepare corner array */

    for (dpos = b.BOARDMIN; dpos < b.BOARDMAX; dpos++){
      if (b.ON_BOARD(dpos) && mn[dpos]){
        corner[corners++] = dpos;
      }
    }

    /* compute gravity center of the goal */

    for (dpos = b.BOARDMIN; dpos < b.BOARDMAX; dpos++) {
      if (b.ON_BOARD(dpos) && mf[dpos]) {
        gi += b.I(dpos);
        gj += b.J(dpos);
        stones++;
      }
    }
    gi /= stones;
    gj /= stones;
    gg = b.POS(gi, gj);

    /* sort the corner array */

    corner.sort((a,b) => {
      return this.compare_angles(a,b)
    })

    /* if apos is not NO_MOVE, mark it. */

    if (apos !== NO_MOVE) {
      b.ASSERT_ON_BOARD1(apos);
      mn[apos] = 1;
    }

    if (showboard === 1) {
      this.show_surround_map(mf, mn);
    }

    /* find top row of surrounding polyhedron */

    top_row = -1;
    for (m = 0; m < b.board_size; m++) {
      if (top_row !== -1){
        break;
      }
      for (n = 0; n < b.board_size; n++){
        if (mn[b.POS(m, n)]) {
          left_corner[0] = b.POS(m, n);
          top_row = m;
          break;
        }
      }
    }

    /* find bottom row */

    bottom_row = -1;
    for (m = b.board_size - 1; m >= 0; m--) {
      if (bottom_row !== -1){
        break;
      }
      for (n = 0; n < b.board_size; n++){
        if (mn[b.POS(m, n)]) {
          bottom_row = m;
          break;
        }
      }
    }

    /* find the corners on the left side */

    for (left_corners = 1; b.I(left_corner[left_corners-1]) < bottom_row; left_corners++) {
      let best_found = 0;
      let best_slope = 0.;
      let m = b.I(left_corner[left_corners-1]);
      let n = b.J(left_corner[left_corners-1]);

      for (i = m + 1; i <= bottom_row; i++){
        for (j = 0; j < b.board_size; j++){
          if (mn[b.POS(i, j)]) {
            let slope = (j - n)/ (i - m);
            // if (0)
            //   gprintf("(left) at %m, last %m, slope=%f\n", i, j, m, n, slope);

            if (!best_found || slope < best_slope) {
              best_found = b.POS(i, j);
              best_slope = slope;
            }
          }
        }
      }
      b.ASSERT_ON_BOARD1(best_found);
      left_corner[left_corners] = best_found;
    }

    for (n = b.board_size-1; n >= 0; n--){
      if (mn[b.POS(top_row, n)]) {
        right_corner[0] = b.POS(top_row, n);
        break;
      }
    }

    /* find the corners on the right side */

    for (right_corners = 1; b.I(right_corner[right_corners-1]) < bottom_row; right_corners++) {
      let best_found = 0;
      let best_slope = 0.;
      let m = b.I(right_corner[right_corners-1]);
      let n = b.J(right_corner[right_corners-1]);

      for (i = m + 1; i <= bottom_row; i++) {
        for (j = b.board_size - 1; j >= 0; j--) {
          if (mn[b.POS(i, j)]) {
            let slope = (j - n)/(i - m);
            // if (0)
            //   gprintf("(right) at %m, last %m, slope=%f\n", i, j, m, n, slope);
            if (!best_found || slope > best_slope) {
              best_found = b.POS(i, j);
              best_slope = slope;
            }
          }
        }
      }
      b.ASSERT_ON_BOARD1(best_found);
      right_corner[right_corners] = best_found;
    }

    // if (0) {
    //   for (k = 0; k < left_corners; k++)
    //     gprintf("left corner %d: %1m\n", k, left_corner[k]);
    //
    //   for (k = 0; k < right_corners; k++)
    //     gprintf("right corner %d: %1m\n", k, right_corner[k]);
    // }

    /* Now mark the interior of the convex hull */

    for (n = b.J(left_corner[0]); n <= b.J(right_corner[0]); n++){
      mn[b.POS(top_row, n)] = 1;
    }

    for (n = b.J(left_corner[left_corners-1]); n <= b.J(right_corner[right_corners-1]); n++){
      mn[b.POS(bottom_row, n)] = 1;
    }

    for (m = top_row+1; m < bottom_row; m++) {
      let left_boundary = -1, right_boundary = -1;
      for (k = 1; k < left_corners; k++) {
        if (b.I(left_corner[k]) > m) {
          let ti = b.I(left_corner[k-1]);
          let tj = b.J(left_corner[k-1]);
          let bi = b.I(left_corner[k]);
          let bj = b.J(left_corner[k]);

          // if (0)
          //   gprintf("(left) %d: %1m %1m\n",
          //     m, left_corner[k-1], left_corner[k]);
          /* left edge in this row is on segment (ti,tj) -> (bi, bj) */

          /* FIXME: Rewrite this to avoid floating point arithmetic */
          left_boundary = Math.ceil(tj + (m - ti) * (bj - tj) / (bi - ti));
          break;
        }
      }

      for (k = 1; k < right_corners; k++) {
        if (b.I(right_corner[k]) > m) {
          let ti = b.I(right_corner[k-1]);
          let tj = b.J(right_corner[k-1]);
          let bi = b.I(right_corner[k]);
          let bj = b.J(right_corner[k]);

          // if (0)
          //   gprintf("(right) %d: %1m %1m\n",
          //     m, right_corner[k-1], right_corner[k]);

          /* FIXME: Rewrite this to avoid floating point arithmetic */
          right_boundary = Math.floor(tj + (m - ti) * (bj - tj) / (bi - ti));
          break;
        }
      }

      for (n = left_boundary; n <= right_boundary; n++){
        mn[b.POS(m, n)] = 1;
      }
    }

    /* mark the expanded region */

    for (dpos = b.BOARDMIN; dpos < b.BOARDMAX; dpos++){
      if (b.ON_BOARD(dpos) && mn[dpos] === 1){
        for (k = 0; k < 4; k++){
          if (b.ON_BOARD(dpos + b.delta[k]) && !mn[dpos + b.delta[k]]){
            mn[dpos + b.delta[k]] = 2;
          }
        }
      }
    }

    /* Mark allied dragons that intersect the (unexpanded) hull.
     * These must all lie entirely within the hull for the
     * dragon to be considered surrounded.
     *
     * Only neighbor dragons are considered since dragons that
     * are not neighbors are less likely to be helpful.
     */

    for (dpos = b.BOARDMIN; dpos < b.BOARDMAX; dpos++) {
      let mpos;
      if (b.ON_BOARD(dpos)
        && mn[dpos] === 1
        && b.board[dpos] === color
        && this.are_neighbor_dragons(pos, dpos)
        && !mf[dpos]) {

        for (mpos = b.BOARDMIN; mpos < b.BOARDMAX; mpos++){
          if (b.ON_BOARD(mpos) && this.is_same_dragon(mpos, dpos)){
            mf[mpos] = 2;
          }
        }
      }
      /* A special case
       *
       *  . X X .
       *  X O . X
       *  X . O O
       *  . O . .
       *
       * The O stone hasn't been amalgamated and the surround computations
       * might think this single stone dragon is surrounded, which in turn
       * can generate overvaluation of moves around this stone.
       * Consequently, we allow inclusion of the stones at kosumi distance
       * in the mf (friendly) array.
       */
      if (b.ON_BOARD(dpos)
        && mn[dpos] === 2
        && b.board[dpos] === color
        && this.are_neighbor_dragons(pos, dpos)
        && !mf[dpos]) {
        for (k = 4; k < 8; k++){
          if (b.ON_BOARD(dpos + b.delta[k]) && b.board[dpos + b.delta[k]] === color
            && mn[dpos + b.delta[k]] === 1
            && b.board[dpos + b.delta[k-4]] === colors.EMPTY
            && b.board[dpos + b.delta[(k-3)%4]] === colors.EMPTY) {
            for (mpos = b.BOARDMIN; mpos < b.BOARDMAX; mpos++) {
              if (b.ON_BOARD(mpos) && this.is_same_dragon(mpos, dpos)){
                mf[mpos] = 2;
              }
            }
          }
        }
      }
    }

    /* determine the surround status of the dragon */

    surrounded = SURROUNDED;

    /* Compute the maximum surround status awarded
     * If distances between enclosing stones are large, reduce to
     * WEAKLY_SURROUNDED. If (really) too large, then reduce to 0
     * FIXME: constants chosen completely ad hoc. Possibly better tunings
     *        can be found.
     */

    for (k = 0; k < corners - 1; k++) {
      if (b.is_edge_vertex(corner[k]) && b.is_edge_vertex(corner[k+1])){
        continue;
      }
      if (b.square_dist(corner[k], corner[k+1]) > 60) {
        surrounded = 0;
        break;
      }
      else if (b.square_dist(corner[k], corner[k+1]) > 27){
        surrounded = WEAKLY_SURROUNDED;
      }
    }
    if (surrounded && (!b.is_edge_vertex(corner[0]) || !b.is_edge_vertex(corner[corners-1]))) {
      if (b.square_dist(corner[0], corner[corners-1]) > 60){
        surrounded = 0;
      }
      else if (b.square_dist(corner[0], corner[corners-1]) > 27){
        surrounded = WEAKLY_SURROUNDED;
      }
    }

    if (surrounded){
      for (dpos = b.BOARDMIN; dpos < b.BOARDMAX; dpos++){
        if (mf[dpos]) {
          if (mn[dpos] === 0) {
            surrounded = 0;
            break;
          }
          else if (mn[dpos] === 2){
            surrounded = WEAKLY_SURROUNDED;
          }
        }
      }
    }

    /* revise the status for single stone dragons. */

    if (stones === 1 && surrounded === WEAKLY_SURROUNDED && mn[pos] === 2){
      surrounded = 0;
    }

    /* revise the status if an ikken tobi jumps out. */

    if (surrounded) {
      for (dpos = b.BOARDMIN; dpos < b.BOARDMAX && surrounded; dpos++) {
        if (!b.ON_BOARD(dpos) || !mf[dpos])
          continue;

        for (k = 0; k < 4; k++) {
          let up = b.delta[k];
          let right = b.delta[(k + 1) % 4];
          if (b.board[dpos + up] === colors.EMPTY
            && b.board[dpos + 2*up] === color
            && mn[dpos + 2*up] != 1
            && b.ON_BOARD(dpos + up + right)
            && b.board[dpos + up + right] !== other
            && b.ON_BOARD(dpos + up - right)
            && b.board[dpos + up - right] !== other) {
            surrounded = 0;
            break;
          }
        }
      }
    }

    if (showboard === 1 || (showboard === 2 && surrounded)) {
      this.show_surround_map(mf, mn);
    }

    if (!apos && surrounded && this.surround_pointer < MAX_SURROUND) {
      this.surroundings[this.surround_pointer].surround_map = mn.slice()
      this.surroundings[this.surround_pointer].dragon_number = this.dragon[pos].id;
      this.surround_pointer++;
    }

    if (surround_size) {
      surround_size[0] = 0;
      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
        if (b.ON_BOARD(pos) && mn[pos] === 1){
          surround_size[0]++;
        }
      }
    }

    return surrounded;
  },


  /* Compares angles. Chosen convention:
   * - SOUTH is "lowest"
   * - ascending order is done clock-wise (WEST, NORTH, EAST)
   */
  compare_angles(a, b) {
    let aa = a*1
    let bb = b*1

    let di_a = b.I(aa) - b.I(gg);
    let dj_a = b.J(aa) - b.J(gg);
    let di_b = b.I(bb) - b.I(gg);
    let dj_b = b.J(bb) - b.J(gg);

    let sin_a, sin_b;

    if (aa === gg){
      return 1;
    }
    if (bb === gg){
      return -1;
    }

    if (dj_a === 0) {
      if (di_a > 0) {
        if (dj_b !== 0 || di_b <= 0){
          return -1;
        }
        return 0;
      }
      else {
        if (dj_b > 0){
          return -1;
        }
        else if (dj_b < 0 || di_b > 0){
          return 1;
        }
        else{
          return 0;
        }
      }
    }

    sin_a = di_a / Math.sqrt(di_a*di_a + dj_a*dj_a);
    sin_b = di_b / Math.sqrt(di_b*di_b + dj_b*dj_b);

    if (dj_a > 0) {
      if (dj_b <= 0){
        return 1;
      }
      if (sin_a > sin_b){
        return 1;
      }
      else if (sin_a < sin_b){
        return -1;
      }
      else{
        return 0;
      }
    }
    else { /* if (dj_a < 0) */
      if (dj_b > 0){
        return -1;
      }
      if (sin_a < sin_b){
        return 1;
      }
      else if (sin_a > sin_b){
        return -1;
      }
      else{
        return 0;
      }
    }
  },

  /* Computes the minimum distance to the goal
   */
  goal_dist(pos, goal) {
    let dist = 10000;
    const b = this.board

    for (let ii = b.BOARDMIN; ii < b.BOARDMAX; ii++){
      if (b.ON_BOARD(ii) && goal[ii]) {
        dist = Math.min(dist, b.square_dist(ii, pos));
      }
    }

    return dist;
  },

  show_surround_map (mf, mn) {
    // print方法
    return
  },

  is_surrounded (dr) {
    return this.DRAGON2(dr).surround_status
  },

  does_surround (move, dr) {
    if (this.DRAGON2(dr).surround_status){
      return 0;
    }
    return this.compute_surroundings(dr, move, 0, null);
  },

  /* Should be run once per genmove, before make_dragons. */
  reset_surround_data () {
    this.surround_pointer = 0;
  },

  /* Returns 1 (respectively 2) if pos is in the convex hull
   * (respectively expanded hull boundary) of the surrounding
   * dragons. Returns -1 if the dragon is not found.
   */
  surround_map (dr, pos) {
    for (let k = 0; k < this.surround_pointer; k++){
      if (this.surroundings[k].dragon_number === this.dragon[dr].id){
        return this.surroundings[k].surround_map[pos];
      }
    }
    return -1;
  },
}
