export const MoveList = {
  movelist_move_known() {},

  /*
 * This function does the real work for change_attack(),
 * change_defense(), change_attack_threat(), and
 * change_defense_threat().
 */
  movelist_change_point(move, code, max_points, points, codes) {
    /* First see if we already know about this point. */
    let k
    for (k = 0; k < max_points; k++){
      if (points[k] === move){
        break;
      }
    }

    /* Yes, we do. */
    if (k < max_points) {
      if (codes[k] <= code){
        return; /* Old news. */
      }

      codes[k] = code;
      this.movelist_sort_points(max_points, points, codes);
      return;
    }

    /* This tactical point is new to us. */
    if (code > codes[max_points - 1]) {
      points[max_points - 1] = move;
      codes[max_points - 1] = code;
      this.movelist_sort_points(max_points, points, codes);
    }
  },


  /* Sort the tactical points so we have it sorted in falling order on
   * the code values.
   *
   * We use shaker sort because we prefer a stable sort and in all use
   * cases we can expect it to suffice with one turn through the outer
   * loop.
   */
  // 按"成功->失败"排序
  movelist_sort_points(max_points, points, codes) {
    let start = 0;
    let end = max_points - 1;

    while (start < end) {
      let new_start = end;
      for (let k = end; k > start; k--){
        if (codes[k] > codes[k-1]) {
          this.swap_points_and_codes(points, codes, k, k-1);
          new_start = k;
        }
      }
      start = new_start;
      let new_end = start;
      for (let k = start; k < end - 1; k++){
        if (codes[k] < codes[k+1]) {
          this.swap_points_and_codes(points, codes, k, k+1);
          new_end = k;
        }
      }
      end = new_end;
    }
  },

  swap_points_and_codes(points, codes, m, n) {
    let tmp = points[m];
    points[m] = points[n];
    points[n] = tmp;
    tmp = codes[m];
    codes[m] = codes[n];
    codes[n] = tmp;
  }

}