import {
  colors, NO_MOVE, PASS_MOVE
} from './Constants'
import {dragon_status, MAX_CLOSE_WORMS} from "./Liberty";

export const Unconditional = {

  capture_non_invincible_strings() {},

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
}

}