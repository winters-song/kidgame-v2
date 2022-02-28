import {
  colors, NO_MOVE
} from './Constants'

let meaningless_black_moves = [];
let meaningless_white_moves = [];

export const Unconditional = {

  /* Capture as many strings of the given color as we can. Played stones
   * are left on the board and the number of played stones is returned.
   * Strings marked in the exceptions array are excluded from capturing
   * attempts. If all non-excepted strings are successfully captured,
   * *none_invincible is set to one. Set none_invincible to NULL if you
   * don't need that information.
   */
  // 提掉非排除列表的棋串，如果全部提掉，none_invincible = 1
  // 在棋串所有气试下敌方棋子，能提掉的保留试下，不能提掉的回退
  capture_non_invincible_strings(color, exceptions, none_invincible) {
    const b = this.board
    let other = b.OTHER_COLOR(color);
    let something_captured = 1; /* To get leto the first turn of the loop. */
    let string_found = 0;
    let moves_played = 0;
    let save_moves;
    let libs = [];
    let liberties;
    let pos;
    let k;

    while (something_captured) {
      /* Nothing captured so far in this turn of the loop. */
      something_captured = 0;

      /* Is there something left to try to capture? */
      string_found = 0;

      /* Visit all friendly strings on the board. */
      for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        // 同色，origin
        if (b.board[pos] !== color || b.find_origin(pos) !== pos){
          continue;
        }

        if (exceptions && exceptions[pos]){
          continue;
        }

        string_found = 1;

        /* Try to capture the string at pos. */
        liberties = b.findlib(pos, b.MAXLIBS, libs);
        save_moves = moves_played;
        for (k = 0; k < liberties; k++) {
          if (b.trymove(libs[k], other, "unconditional_life", pos)){
            moves_played++;
          }
        }

        /* Successful if already captured or a single liberty remains.
         * Otherwise we must rewind and take back the last batch of moves.
         */
        if (b.board[pos] === colors.EMPTY){
          something_captured = 1;
        }
        else if (b.findlib(pos, 2, libs) === 1) {
          /* Need to use tryko as a defense against the extreme case
          * when the only opponent liberty that is not suicide is an
          * illegal ko capture, like in this 5x5 position:
          * +-----+
          * |.XO.O|
          * |XXOO.|
          * |X.XOO|
          * |XXOO.|
          * |.XO.O|
          * +-----+
          */
          const success = b.tryko(libs[0], other, "unconditional_life");
          b.ASSERT1(success);
          moves_played++;
          something_captured = 1;
        }
        else{
          while (moves_played > save_moves) {
            b.popgo();
            moves_played--;
          }
        }
      }
    }

    if (none_invincible){
      none_invincible[0] = !string_found;
    }

    return moves_played;
  },

  unconditional_life(unconditional_territory, color) {
    const b = this.board
    const other = b.OTHER_COLOR(color);
    const libs = []
    const potential_sekis = []
    // 指针
    const none_invincible = []

    /* Initialize unconditional_territory array. */
    unconditional_territory.fill(0)

    /* Find isolated two-stone strings which might be involved in the
     * kind of seki described in the comments.
     * 找到潜在双活2子
     */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      let isolated = 1;
      let stones = [];
      // 相同颜色、相同origin、子数是2
      if (b.board[pos] !== color || b.find_origin(pos) !== pos || b.countstones(pos) !== 2){
        continue;
      }

      // 从棋串获取n个棋子，存到stones中
      b.findstones(pos, 2, stones);
      for (let k = 0; k < 2 && isolated; k++) {
        for (let r = 0; r < 8 && isolated; r++) {
          let pos2 = stones[k] + b.delta[r];
          // 棋子在边缘、同色但不在一个棋串
          if (!b.ON_BOARD(pos2) || (b.board[pos2] === color && !b.same_string(pos, pos2))){
            isolated = 0;
          }
        }
      }

      if (isolated) {
        potential_sekis[stones[0]] = 1;
        potential_sekis[stones[1]] = 1;
      }
    }

    let moves_played = this.capture_non_invincible_strings(color, potential_sekis, none_invincible);

    /* If there are no invincible strings, nothing can be unconditionally
     * settled.
     * 没有净活，后面都不用看了
     */
    if (none_invincible[0]) {
      /* Take back all moves. */
      while (moves_played > 0) {
        b.popgo();
        moves_played--;
      }
      return;
    }

    /* The strings still remaining except those marked in
     * potential_sekis[] are uncapturable. Now see which opponent
     * strings can survive.
     *
     * 1. Play opponent stones on all liberties of the unconditionally
     *    alive strings except where illegal.
     * 净活棋子的气填充对方棋子（收气）
     */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      // 同色，相同origin，非潜在双活
      if (b.board[pos] !== color || potential_sekis[pos] || b.find_origin(pos) !== pos){
        continue;
      }

      /* Play as many liberties as we can. */
      const liberties = b.findlib(pos, b.MAXLIBS, libs);
      for (let k = 0; k < liberties; k++) {
        if (b.trymove(libs[k], other, "unconditional_life", pos)){
          moves_played++;
        }
      }
    }

    /* 2. Recursively extend opponent strings in atari, except where this
     *    would be suicide.
     */
    let found_one = 1;
    while (found_one) {
      /* Nothing found so far in this turn of the loop. */
      found_one = 0;

      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        // 敌方，剩1口气
        if (b.board[pos] !== other || b.countlib(pos) > 1){
          continue;
        }

        /* Try to extend the string at (m, n). */
        b.findlib(pos, 1, libs);
        if (b.trymove(libs[0], other, "unconditional_life", pos)) {
          moves_played++;
          found_one = 1;
        }
      }
    }

    /* Now see whether there are any significant sekis on the board. */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      // 所有潜在双活
      if (!potential_sekis[pos] || b.board[pos] === colors.EMPTY || b.find_origin(pos) !== pos){
        continue;
      }

      // 4个方向
      for (let r = 0; r < 4; r++) {
        const up = b.delta[r];
        let right = b.delta[(r + 1) % 4];
        let locally_played_moves = 0;

        // 上：黑，上上：空，下：空
        // 假设双活黑棋2子
        /**
         * .
         * O
         * O <-
         * .
         */
        if (b.board[pos + up] !== color || b.board[pos + up + up] !== colors.EMPTY || b.board[pos - up] !== colors.EMPTY){
          continue;
        }

        // 左右镜像
        /**
         *   .
         * . O
         *   O .
         *   .
         */
        for (let k = 0; k < 2; k++) {
          if (k === 1){
            right = -right;
          }
          if (b.board[pos + right] !== colors.EMPTY || b.board[pos + up - right] !== colors.EMPTY){
            continue;
          }
          /**
           *   .
           * . O *
           * * O .
           *   .
           */
          if (b.board[pos - right] === colors.EMPTY
            && b.trymove(pos - right, other, "unconditional_life", pos)){
            locally_played_moves++;
          }
          if (b.board[pos + up + right] === colors.EMPTY
            && b.trymove(pos + up + right, other, "unconditional_life", pos)){
            locally_played_moves++;
          }
          if (b.board[pos - right] === other && b.board[pos + up + right] === other
            && b.same_string(pos - right, pos + up + right)) {
            /* This is a critical seki. Extend the string with one stone
                  * in an arbitrary direction to break the seki.
            */
            while (locally_played_moves > 0) {
              b.popgo();
              locally_played_moves--;
            }
            // 增加1子，打破双活
            b.trymove(pos - up, color, "unconditional_life", pos);
            moves_played++;
            break;
          }
          else {
            while (locally_played_moves > 0) {
              b.popgo();
              locally_played_moves--;
            }
          }
        }
        if (b.countstones(pos) > 2)
          break;
      }
    }

    /* Capture the strings involved in potential sekis. */
    // 提掉黑3子
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!potential_sekis[pos] || b.board[pos] === colors.EMPTY)
        continue;
      /* Play as many liberties as we can. */
      let liberties = b.findlib(pos, this.MAXLIBS, libs);
      for (let k = 0; k < liberties; k++) {
        if (b.trymove(libs[k], other, "unconditional_life", pos)){
          moves_played++;
        }
      }
    }


    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      // 2口气位置
      if (b.board[pos] !== other || b.countlib(pos) !== 2){
        continue;
      }
      b.findlib(pos, 2, libs);
      const apos = libs[0];
      const bpos = libs[1];
      // 需要相邻位置
      if (Math.abs(b.I(apos) - b.I(bpos)) + Math.abs(b.J(apos) - b.J(bpos)) !== 1){
        continue;
      }

      /* Only two liberties and these are adjacent. Play one. We want
       * to maximize the number of open liberties. In this particular
       * situation we can count this with approxlib for the opposite
       * color. If the number of open liberties is the same, we
       * maximize the total number of obtained liberties.
       * Two relevant positions:
       *
       * |XXX.
       * |OOXX    |XXXXXXX
       * |O.OX    |OOXOOOX
       * |..OX    |..OO.OX
       * +----    +-------
       *
       * 左： aopen == bopen, alib < blib
       * 右： aopen< bopen,
       */
      const aopen = b.approxlib(apos, color, 4, null);
      const bopen = b.approxlib(bpos, color, 4, null);
      const alib  = b.approxlib(apos, other, 4, null);
      const blib  = b.approxlib(bpos, other, 4, null);

      if (aopen > bopen || (aopen === bopen && alib >= blib)) {
        b.trymove(apos, other, "unconditional_life", pos);
        moves_played++;
      } else {
        b.trymove(bpos, other, "unconditional_life", pos);
        moves_played++;
      }
    }

    /* Identify unconditionally alive stones and unconditional territory. */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      // 同色、非潜在双活（净活）
      if (b.board[pos] === color && !potential_sekis[pos]) {
        unconditional_territory[pos] = 1;
        if (b.find_origin(pos) === pos) {
          let liberties = b.findlib(pos, b.MAXLIBS, libs);
          for (let k = 0; k < liberties; k++){
            // 净活的气
            unconditional_territory[libs[k]] = 2;
          }
        }
      }
      // 净杀
      else if (b.board[pos] === other && b.countlib(pos) === 1) {
        unconditional_territory[pos] = 2;
        b.findlib(pos, 1, libs);
        unconditional_territory[libs[0]] = 2;
      }
    }

    /* Take back all moves. */
    while (moves_played > 0) {
      b.popgo();
      moves_played--;
    }
  },


  /* By unconditional status analysis we can statically find some moves
   * which there is never any need to play. Those belong to three
   * different categories:
   *
   * 1. A move on a vertex which is already unconditional territory for
   *    either color.
   * 2. A move which after having been made ends up as unconditional
   *    territory for the opponent.
   * 3. If a move at vertex A makes vertex B become unconditional
   *    territory, there is no need to consider a move at B, since A has
   *    all the positive effects that B would have.
   *
   * Moves in categories 1 and 2 are never any better than passing and
   * often worse (with territory scoring always worse). Moves in
   * category three can be either better or worse than passing, but it's
   * always true that a move at A is at least as good as a move at B.
   * Occasionally they are identically good (A makes B unconditional
   * territory and B makes A unconditional territory) but there is never
   * any need to analyze both.
   *
   * In meaningless_black_moves[] and meaningless_white_moves[] a value
   * of -1 means it is not meaningless, 0 (NO_MOVE) means it belongs to
   * category 1 or 2, and a value greater than zero points to the
   * preferred move in category 3.
   *
   * The parameter unconditional_territory should contain the result of
   * calling unconditional_life() in the original position. Meaningless
   * moves are computed for the given color.
   */
// 更新各方无意义着子：meaningless_black_moves, meaningless_white_moves
  find_unconditionally_meaningless_moves (unconditional_territory, color) {
    const b = this.board
    let meaningless_moves;
    let other = b.OTHER_COLOR(color);
    let friendly_unconditional = [];
    let opponent_unconditional = [];
    let pos;
    let pos2;

    b.ASSERT1(color === colors.BLACK || color === colors.WHITE);

    if (color === colors.BLACK){
      meaningless_moves = meaningless_black_moves;
    } else {
      meaningless_moves = meaningless_white_moves;
    }

    /* Initialize meaningless_moves and detect moves of category 1, but
     * only for own unconditional territory.
     *
     * FIXME: We would save some time by detecting all category 1 moves
     * here but then we would need to have the initial unconditional
     * territory for the opponent as well. This can of course be done,
     * the question is how we get it in the nicest way.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.board[pos] === colors.EMPTY) {
        if (unconditional_territory[pos]) {
          meaningless_moves[pos] = NO_MOVE;
        } else {
          meaningless_moves[pos] = -1;
        }
      }
    }

    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      // 找到空并且是无条件领土
      if (b.board[pos] !== colors.EMPTY || meaningless_moves[pos] !== -1){
        continue;
      }

      if (!b.tryko(pos, color, "find_unconditionally_meaningless_moves")){
        continue;
      }

      this.unconditional_life(opponent_unconditional, other);
      if (opponent_unconditional[pos]) {
        /* Move of category 1 or 2. */
        meaningless_moves[pos] = NO_MOVE;
      }
      else {
        this.unconditional_life(friendly_unconditional, color);
        if (friendly_unconditional[pos]){
          for (pos2 = b.BOARDMIN; pos2 < b.BOARDMAX; pos2++){
            if (b.board[pos2] === colors.EMPTY
              && meaningless_moves[pos2] === -1
              && friendly_unconditional[pos2]) {
              /* Move of category 3. */
              meaningless_moves[pos2] = pos;
            }
          }
        }
      }

      b.popgo();
    }

    /* Meaningless moves of category 3 may have been found in multiple
     * steps. Normalize to the final replacement move.
     */
    for (pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.board[pos] === colors.EMPTY && meaningless_moves[pos] > 0){
        while (meaningless_moves[meaningless_moves[pos]] > 0){
          meaningless_moves[pos] = meaningless_moves[meaningless_moves[pos]];
        }
      }
    }
  },
  unconditionally_meaningless_move () {},
  clear_unconditionally_meaningless_moves () {},
  unconditional_move_reasons () {},
}