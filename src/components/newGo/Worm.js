import {
  codes,
  colors, NO_MOVE
} from './Constants'
import {dragon_status, MAX_CLOSE_WORMS, MAX_TACTICAL_POINTS, REVERSE_RESULT} from "./Liberty";

class WormData{
  constructor(cfg) {
    Object.assign(this, cfg)

    this.attack_points = []
    this.attack_codes = []
    this.defense_points = []
    this.defense_codes = []
    this.attack_threat_points = []
    this.attack_threat_codes = []
    this.defense_threat_points = []
    this.defense_threat_codes = []
  }
}
export const Worm = {
  make_worms() {
    /* Build the basic worm data:  color, origin, size, liberties. */
    // 建立棋串基本信息
    this.build_worms();

    /* No point continuing if the board is completely empty. */
    if (this.board.stones_on_board(colors.BLACK | colors.WHITE) === 0){
      return;
    }

    /* Compute effective sizes of all worms. */
    this.compute_effective_worm_sizes();

    // console.log(this.close_worms)

    /* Look for unconditionally alive and dead worms, and unconditional
     * territory.
     */
    // this.compute_unconditional_status();

    this.find_worm_attacks_and_defenses();

    // gg_assert(stackp == 0);

    // /* Count liberties of different orders and initialize cutstone fields. */
    // for (let pos = BOARDMIN; pos < BOARDMAX; pos++) {
    //   if (IS_STONE(board[pos]) && is_worm_origin(pos, pos)) {
    //     int lib1, lib2, lib3, lib4;
    //
    //     ping_cave(pos, &lib1, &lib2, &lib3, &lib4);
    //     ASSERT1(worm[pos].liberties == lib1, pos);
    //     worm[pos].liberties2 = lib2;
    //     worm[pos].liberties3 = lib3;
    //     worm[pos].liberties4 = lib4;
    //     worm[pos].cutstone = 0;
    //     worm[pos].cutstone2 = 0;
    //     propagate_worm(pos);
    //   }
    // }
    //
    // gg_assert(stackp == 0);
    //
    // /*
    //  * There are two concepts of cutting stones in the worm array.
    //  *
    //  * worm.cutstone:
    //  *
    //  *     A CUTTING STONE is one adjacent to two enemy strings,
    //  *     which do not have a liberty in common. The most common
    //  *     type of cutting string is in this situation.
    //  *
    //  *     XO
    //  *     OX
    //  *
    //  *     A POTENTIAL CUTTING STONE is adjacent to two enemy
    //  *     strings which do share a liberty. For example, X in:
    //  *
    //  *     XO
    //  *     O.
    //  *
    //  *     For cutting strings we set worm[m][n].cutstone=2. For potential
    //  *     cutting strings we set worm[m][n].cutstone=1. For other strings,
    //  *     worm[m][n].cutstone=0.
    //  *
    //  * worm.cutstone2:
    //  *
    //  *     Cutting points are identified by the patterns in the
    //  *     connections database. Proper cuts are handled by the fact
    //  *     that attacking and defending moves also count as moves
    //  *     cutting or connecting the surrounding dragons.
    //  *
    //  * The cutstone field will now be set. The cutstone2 field is set
    //  * later, during find_cuts(), called from make_dragons().
    //  *
    //  * We maintain both fields because the historically older cutstone
    //  * field is needed to deal with the fact that e.g. in the position
    //  *
    //  *
    //  *    OXX.O
    //  *    .OOXO
    //  *    OXX.O
    //  *
    //  * the X stones are amalgamated into one dragon because neither cut
    //  * works as long as the two O stones are in atari. Therefore we add
    //  * one to the cutstone field for each potential cutting point,
    //  * indicating that these O stones are indeed worth rescuing.
    //  *
    //  * For the time being we use both concepts in parallel. It's
    //  * possible we also need the old concept for correct handling of lunches.
    //  */
    //
    // for (pos = BOARDMIN; pos < BOARDMAX; pos++) {
    //   int w1 = NO_MOVE;
    //   int w2 = NO_MOVE;
    //   int k;
    //   int pos2;
    //
    //   /* Only work on each worm once. This is easiest done if we only
    //    * work with the origin of each worm.
    //    */
    //   if (!IS_STONE(board[pos]) || !is_worm_origin(pos, pos))
    //     continue;
    //
    //   /* Try to find two adjacent worms (w1) and (w2)
    //    * of opposite colour from (pos).
    //    */
    //   for (pos2 = BOARDMIN; pos2 < BOARDMAX; pos2++) {
    //     /* Work only with the opposite color from (pos). */
    //     if (board[pos2] != OTHER_COLOR(board[pos]))
    //       continue;
    //
    //     for (k = 0; k < 4; k++) {
    //       if (!ON_BOARD(pos2 + delta[k])
    //         || worm[pos2 + delta[k]].origin != pos)
    //         continue;
    //
    //       ASSERT1(board[pos2 + delta[k]] == board[pos], pos);
    //
    //       /* If we have not already found a worm which meets the criteria,
    //        * store it into (w1), otherwise store it into (w2).
    //        */
    //       if (w1 == NO_MOVE)
    //         w1 = worm[pos2].origin;
    //       else if (!is_same_worm(pos2, w1))
    //         w2 = worm[pos2].origin;
    //     }
    //   }
    //
    //   /*
    //    *  We now verify the definition of cutting stones. We have
    //    *  verified that the string at (pos) is adjacent to two enemy
    //    *  strings at (w1) and (w2). We need to know if these
    //    *  strings share a liberty.
    //    */
    //
    //   /* Only do this if we really found something. */
    //   if (w2 != NO_MOVE) {
    //     worm[pos].cutstone = 2;
    //     if (count_common_libs(w1, w2) > 0)
    //       worm[pos].cutstone = 1;
    //
    //     DEBUG(DEBUG_WORMS, "Worm at %1m has w1 %1m and w2 %1m, cutstone %d\n",
    //       pos, w1, w2, worm[pos].cutstone);
    //   }
    // }
    //
    // gg_assert(stackp == 0);
    //
    // /* Set the genus of all worms. */
    // for (pos = BOARDMIN; pos < BOARDMAX; pos++) {
    //   if (IS_STONE(board[pos]) && is_worm_origin(pos, pos)) {
    //     worm[pos].genus = genus(pos);
    //     propagate_worm(pos);
    //   }
    // }
    // gg_assert(stackp == 0);
    //
    // /* Now we try to improve the values of worm.attack and worm.defend.
    //  * If we find that capturing the string at str also defends the
    //  * string at str2, or attacks it, then we add points of attack and
    //  * defense. We don't add attacking point for strings that can't be
    //  * defended.
    //  */
    // {
    //   int color;
    //   int str;
    //   int moves_to_try[BOARDMAX];
    //   memset(moves_to_try, 0, sizeof(moves_to_try));
    //
    //   /* Find which colors to try at what points. */
    //   for (str = BOARDMIN; str < BOARDMAX; str++) {
    //     if (IS_STONE(board[str]) && is_worm_origin(str, str)) {
    //       color = board[str];
    //       moves_to_try[worm[str].defense_points[0]] |= color;
    //       moves_to_try[worm[str].attack_points[0]] |= OTHER_COLOR(color);
    //     }
    //   }
    //
    //   /* Loop over the board and over the colors and try the moves found
    //    * in the previous loop.
    //    */
    //   for (pos = BOARDMIN; pos < BOARDMAX; pos++) {
    //     if (!ON_BOARD(pos))
    //       continue;
    //
    //     for (color = WHITE; color <= BLACK; color++) {
    //       if (!(moves_to_try[pos] & color))
    //         continue;
    //
    //       /* Try to play color at pos and see what it leads to. */
    //       if (!trymove(pos, color, "make_worms", NO_MOVE))
    //         continue;
    //
    //       /* We must read to the same depth that was used in the
    //        * initial determination of worm.attack and worm.defend
    //        * to avoid horizon effects. Since stackp has been
    //        * incremented we must also increment depth values.
    //        */
    //
    //       DEBUG(DEBUG_WORMS, "trying %1m\n", pos);
    //       increase_depth_values();
    //
    //       /* Now we try to find a group which is saved or attacked as well
    //        * by this move.
    //        */
    //       for (str = BOARDMIN; str < BOARDMAX; str++) {
    //         if (!IS_STONE(board[str])
    //           || !is_worm_origin(str, str))
    //           continue;
    //
    //         /* If the worm is of the opposite color to the move,
    //          * then we try to defend it. If there was a previous
    //          * attack and defense of it, and there is no defense
    //          * for the attack now...
    //          */
    //         if (worm[str].color == OTHER_COLOR(color)
    //           && worm[str].attack_codes[0] != 0
    //           && worm[str].defense_codes[0] != 0) {
    //           int dcode = find_defense(str, NULL);
    //           if (dcode < worm[str].defense_codes[0]) {
    //             int attack_works = 1;
    //
    //             /* Sometimes find_defense() fails to find a
    //              * defense which has been found by other means.
    //              * Try if the old defense move still works.
    //              *
    //              * However, we first check if the _attack_ still exists,
    //              * because we could, for instance, drive the worm into
    //              * seki with our move.
    //              */
    //             if (attack(str, NULL) >= worm[str].attack_codes[0]) {
    //               if (worm[str].defense_codes[0] != 0
    //                 && trymove(worm[str].defense_points[0],
    //                   OTHER_COLOR(color), "make_worms", 0)) {
    //                 int this_dcode = REVERSE_RESULT(attack(str, NULL));
    //                 if (this_dcode > dcode) {
    //                   dcode = this_dcode;
    //                   if (dcode >= worm[str].defense_codes[0])
    //                     attack_works = 0;
    //                 }
    //                 popgo();
    //               }
    //             }
    //             else
    //               attack_works = 0;
    //
    //             /* ...then add an attack point of that worm at pos. */
    //             if (attack_works) {
    //               DEBUG(DEBUG_WORMS,
    //                 "adding point of attack of %1m at %1m with code %d\n",
    //                 str, pos, REVERSE_RESULT(dcode));
    //               change_attack(str, pos, REVERSE_RESULT(dcode));
    //             }
    //           }
    //         }
    //
    //         /* If the worm is of the same color as the move we try to
    //          * attack it. If there previously was an attack on it, but
    //          * there is none now, then add a defense point of str at
    //          * pos.
    //          */
    //         else if (worm[str].color == color
    //           && worm[str].attack_codes[0] != 0) {
    //           int acode = attack(str, NULL);
    //           if (acode < worm[str].attack_codes[0]) {
    //             int defense_works = 1;
    //             /* Sometimes attack() fails to find an
    //              * attack which has been found by other means.
    //              * Try if the old attack move still works.
    //              */
    //             if (worm[str].attack_codes[0] != 0
    //               && trymove(worm[str].attack_points[0],
    //                 OTHER_COLOR(color), "make_worms", 0)) {
    //               int this_acode;
    //               if (board[str] == EMPTY)
    //                 this_acode = WIN;
    //               else
    //                 this_acode = REVERSE_RESULT(find_defense(str, NULL));
    //               if (this_acode > acode) {
    //                 acode = this_acode;
    //                 if (acode >= worm[str].attack_codes[0])
    //                   defense_works = 0;
    //               }
    //               popgo();
    //             }
    //
    //             /* ...then add an attack point of that worm at pos. */
    //             if (defense_works) {
    //               DEBUG(DEBUG_WORMS,
    //                 "adding point of defense of %1m at %1m with code %d\n",
    //                 str, pos, REVERSE_RESULT(acode));
    //               change_defense(str, pos, REVERSE_RESULT(acode));
    //             }
    //           }
    //         }
    //       }
    //       decrease_depth_values();
    //       popgo();
    //     }
    //   }
    // }
    //
    // gg_assert(stackp == 0);
    //
    // /* Sometimes it happens that the tactical reading finds adjacent
    //  * strings which both can be attacked but not defended. (The reason
    //  * seems to be that the attacker tries harder to attack a string,
    //  * than the defender tries to capture it's neighbors.) When this
    //  * happens, the eyes code produces overlapping eye spaces and, still
    //  * worse, all the nondefendable stones actually get amalgamated with
    //  * their allies on the outside.
    //  *
    //  * To solve this we scan through the strings which can't be defended
    //  * and check whether they have a neighbor that can be attacked. In
    //  * this case we set the defense point of the former string to the
    //  * attacking point of the latter.
    //  *
    //  * Please notice that find_defense() will still read this out
    //  * incorrectly, which may lead to some confusion later.
    //  */
    //
    // /* First look for vertical neighbors. */
    // for (pos = BOARDMIN; pos < BOARDMAX; pos++) {
    //   if (IS_STONE(board[pos])
    //     && IS_STONE(board[SOUTH(pos)])
    //     && !is_same_worm(pos, SOUTH(pos))) {
    //     if (worm[pos].attack_codes[0] != 0
    //       && worm[SOUTH(pos)].attack_codes[0] != 0) {
    //       if (worm[pos].defense_codes[0] == 0
    //         && does_defend(worm[SOUTH(pos)].attack_points[0], pos)) {
    //         /* FIXME: need to check ko relationship here */
    //         change_defense(pos, worm[SOUTH(pos)].attack_points[0], WIN);
    //       }
    //       if (worm[SOUTH(pos)].defense_codes[0] == 0
    //         && does_defend(worm[pos].attack_points[0], SOUTH(pos))) {
    //         /* FIXME: need to check ko relationship here */
    //         change_defense(SOUTH(pos), worm[pos].attack_points[0], WIN);
    //       }
    //     }
    //   }
    // }
    //
    // /* Then look for horizontal neighbors. */
    // for (pos = BOARDMIN; pos < BOARDMAX; pos++) {
    //   if (IS_STONE(board[pos])
    //     && IS_STONE(board[EAST(pos)])
    //     && !is_same_worm(pos, EAST(pos))) {
    //     if (worm[pos].attack_codes[0] != 0
    //       && worm[EAST(pos)].attack_codes[0] != 0) {
    //       if (worm[pos].defense_codes[0] == 0
    //         && does_defend(worm[EAST(pos)].attack_points[0], pos)) {
    //         /* FIXME: need to check ko relationship here */
    //         change_defense(pos, worm[EAST(pos)].attack_points[0], WIN);
    //       }
    //       if (worm[EAST(pos)].defense_codes[0] == 0
    //         && does_defend(worm[pos].attack_points[0], EAST(pos))) {
    //         /* FIXME: need to check ko relationship here */
    //         change_defense(EAST(pos), worm[pos].attack_points[0], WIN);
    //       }
    //     }
    //   }
    // }
    //
    // gg_assert(stackp == 0);
    //
    // /* Find adjacent worms that can be easily captured, aka lunches. */
    //
    // for (pos = BOARDMIN; pos < BOARDMAX; pos++) {
    //   int lunch;
    //
    //   if (!IS_STONE(board[pos]) || !is_worm_origin(pos, pos))
    //     continue;
    //
    //   if (find_lunch(pos, &lunch)
    //     && (worm[lunch].attack_codes[0] == WIN
    //     || worm[lunch].attack_codes[0] == KO_A)) {
    //     DEBUG(DEBUG_WORMS, "lunch found for %1m at %1m\n", pos, lunch);
    //     worm[pos].lunch = lunch;
    //   }
    // else
    //   worm[pos].lunch = NO_MOVE;
    //
    //   propagate_worm(pos);
    // }
    //
    // if (!disable_threat_computation)
    //   find_worm_threats();
    //
    // /* Identify INESSENTIAL strings.
    //  *
    //  * These are defined as surrounded strings which have no life
    //  * potential unless part of their surrounding chain can be captured.
    //  * We give a conservative definition of inessential:
    //  *  - the genus must be zero
    //  *  - there can no second order liberties
    //  *  - there can be no more than two edge liberties
    //  *  - if it is removed from the board, the remaining cavity has
    //  *    border color the opposite color of the string
    //  *  - it contains at most two edge vertices.
    //  *
    //  * If we get serious about identifying seki, we might want to add:
    //  *
    //  *  - if it has fewer than 4 liberties it is tactically dead.
    //  *
    //  * The last condition is helpful in excluding strings which are
    //  * alive in seki.
    //  *
    //  * An inessential string can be thought of as residing inside the
    //  * opponent's eye space.
    //  */
    //
    // for (pos = BOARDMIN; pos < BOARDMAX; pos++) {
    //   if (IS_STONE(board[pos])
    //     && worm[pos].origin == pos
    //     && worm[pos].genus == 0
    //     && worm[pos].liberties2 == 0
    //     && !worm[pos].cutstone
    //     && worm[pos].lunch == NO_MOVE) {
    //     int edge;
    //     int border_color = examine_cavity(pos, &edge);
    //     if (border_color != GRAY && edge < 3) {
    //       DEBUG(DEBUG_WORMS, "Worm %1m identified as inessential.\n", pos);
    //       worm[pos].inessential = 1;
    //       propagate_worm(pos);
    //     }
    //   }
    // }
  },


  /*
   * Clear all worms and initialize the basic data fields:
   *   color, origin, size, liberties
   * This is a substep of make_worms().
   */
// 初始化Worms
  build_worms() {
    this.worm = []
    const b = this.board

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)){
        continue;
      }

      this.worm[pos] = new WormData({
        color : b.board[pos],
        origin : pos,
        inessential : 0,
        invincible : 0,
        unconditional_status : dragon_status.UNKNOWN,
        effective_size : 0.0,
      })

      if (b.IS_STONE(b.board[pos])) {
        // 当前位置所在棋串的气、棋子数
        this.worm[pos].liberties = b.countlib(pos);
        this.worm[pos].size = b.countstones(pos);
        this.propagate_worm(pos);
      }
    }
  },

  // 计算辐射影响，更新close_worms，close_black_worms，close_white_worms
  compute_effective_worm_sizes() {
    this.do_compute_effective_worm_sizes(colors.BLACK | colors.WHITE, this.close_worms,
      'number_close_worms', 3);
    this.do_compute_effective_worm_sizes(colors.BLACK, this.close_black_worms,
      'number_close_black_worms', 5);
    this.do_compute_effective_worm_sizes(colors.WHITE, this.close_white_worms,
      'number_close_white_worms', 5);
  },

  do_compute_effective_worm_sizes(color, cw, ncw, max_distance) {
    const b = this.board
    /* Distance to closest worm, -1 means unassigned, 0 that there is
     * a stone at the location, 1 a liberty of a stone, and so on.
     */
    const distance = [];
    /* Pointer to the origin of the closest worms. A very large number of
     * worms may potentially be equally close, but no more than
     * 2*(board_size-1).
     */
    // 距离最近的worm的origin指针，
    // 1维：pos
    // 2维： 距离相同的worm递增编号
    const worms = []
    const nworms = [];   /* number of equally close worms */

    let dist = 0; /* current distance */
    let found_one = 1;

    /* Initialize arrays. */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)) {
        continue;
      }

      worms[pos] = []

      for (let k = 0; k < 2 * (b.board_size - 1); k++) {
        worms[pos][k] = NO_MOVE;
      }

      nworms[pos] = 0;

      // 位运算，color与当前位置是否匹配
      // 距离=0, nworms=1 的棋串更新信息
      if (b.board[pos] & color) {
        distance[pos] = 0;
        worms[pos][0] = this.worm[pos].origin;
        nworms[pos]++;
      } else {
        // 空
        distance[pos] = -1;
      }
    }

    // max_distance = 3, 辐射距离为4
    while (found_one && dist <= max_distance) {
      found_one = 0;
      dist++;

      // 每次循环,dist+1
      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        // 未标记区域可继续
        if (!b.ON_BOARD(pos) || distance[pos] !== -1) {
          continue; /* already claimed */
        }

        // 当前位置为空的，4个方向判断
        for (let r = 0; r < 4; r++) {
          let pos2 = pos + b.delta[r];

          // 辐射距离判断, 周围有上一个距离位置pos2
          if (b.ON_BOARD(pos2) && distance[pos2] === dist - 1) {
            found_one = 1;
            distance[pos] = dist;

            // 距离如果相同，已添加的则忽略排重，否则加入列表
            /*
            *  * 1 1 1
            *  1 O O O
            *    1 1 1
            * --------
            *
            *  O * X
            * --------
            * */
            for (let k = 0; k < nworms[pos2]; k++) {
              let already_counted = 0;
              for (let l = 0; l < nworms[pos]; l++) {
                if (worms[pos][l] === worms[pos2][k]) {
                  already_counted = 1;
                  break;
                }
              }
              if (!already_counted) {
                // ASSERT1(nworms[pos] < 2*(board_size-1), pos);
                worms[pos][nworms[pos]] = worms[pos2][k];
                nworms[pos]++;
              }
            }
          }
        }
      }
    }

    /* Compute the effective sizes but only when all worms are considered. */
    if (color === (colors.BLACK | colors.WHITE)) {
      /* Distribute (fractional) contributions to the worms. */
      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (!b.ON_BOARD(pos)) {
          continue;
        }

        for (let k = 0; k < nworms[pos]; k++) {
          const w = worms[pos][k];
          if (b.board[pos] === colors.EMPTY) {
            // 为空，给每个相关棋串 + 0.5/同距离数
            this.worm[w].effective_size += 0.5 / nworms[pos];
          } else {
            // 有棋子，值+1
            this.worm[w].effective_size += 1.0;
          }
        }
      }

      /* Propagate the effective size values all over the worms. */
      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        if (b.IS_STONE(b.board[pos]) && this.is_worm_origin(pos, pos)) {
          this.propagate_worm(pos);
        }
      }
    }

    /* Fill in the appropriate close_*_worms (cw) and
     * number_close_*_worms (ncw) arrays.
     */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos)) {
        continue;
      }

      if(!cw[pos]){
        cw[pos] = []
      }

      if (nworms[pos] > MAX_CLOSE_WORMS) {
        this[ncw][pos] = 0;
      } else {
        this[ncw][pos] = nworms[pos];
      }

      for (let k = 0; k < this[ncw][pos]; k++) {
        cw[pos][k] = worms[pos][k];
      }
    }

    // this.test_print_worm(cw)
  },


  // 计算净杀、净活棋串
  // 更新worm: invincible, unconditional_status
  compute_unconditional_status() {
    let unconditional_territory = [];
    const b = this.board

    for (let color = colors.WHITE; color <= colors.BLACK; color++) {
      this.unconditional_life(unconditional_territory, color);
      if (this.get_level() >= 10){
        // 找到无意义着子范围
        this.find_unconditionally_meaningless_moves(unconditional_territory, color);
      }

      for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
        // 非判定区域忽略
        if (!b.ON_BOARD(pos) || !b.unconditional_territory[pos]){
          continue;
        }

        if (b.board[pos] === color) {
          // 标记： 净活
          this.worm[pos].unconditional_status = dragon_status.ALIVE;
          if (unconditional_territory[pos] === 1){
            this.worm[pos].invincible = 1;
          }
        }
        else if (b.board[pos] === colors.EMPTY) {
          // 标记：各方领土
          if (color === colors.WHITE)
            this.worm[pos].unconditional_status = dragon_status.WHITE_TERRITORY;
          else
            this.worm[pos].unconditional_status = dragon_status.BLACK_TERRITORY;
        }
        else
          this.worm[pos].unconditional_status = dragon_status.DEAD;
      }
    }
    // gg_assert(stackp == 0);
  },


  find_worm_attacks_and_defenses() {
    const b = this.board
    // const libs = [];
    const attack_point = [] //pointer
    const defense_point = [] //pointer

    /* 1. Start with finding attack points. */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++) {
      if (!b.IS_STONE(b.board[str]) || !this.is_worm_origin(str, str)){
        continue;
      }

      // TRACE("considering attack of %1m\n", str);
      /* Initialize all relevant fields at once. */
      for (let k = 0; k < MAX_TACTICAL_POINTS; k++) {
        this.worm[str].attack_codes[k]   = 0;
        this.worm[str].attack_points[k]  = 0;
        this.worm[str].defense_codes[k]  = 0;
        this.worm[str].defense_points[k] = 0;
      }
      this.propagate_worm(str);

      const acode = this.attack(str, attack_point);
      if (acode !== 0) {
        // DEBUG(DEBUG_WORMS, "worm at %1m can be attacked at %1m\n", str, attack_point);
        this.change_attack(str, attack_point[0], acode);
      }
    }

    console.log('nodes:', this.get_reading_node_counter())
    // gg_assert(stackp == 0);

    /* 2. Use pattern matching to find a few more attacks. */
    // this.find_attack_patterns();
    // gg_assert(stackp == 0);

    /* 3. Now find defense moves. */
    // for (let str = b.BOARDMIN; str < b.BOARDMAX; str++) {
    //   if (!b.IS_STONE(b.board[str]) || !this.is_worm_origin(str, str))
    //     continue;
    //
    //   if (this.worm[str].attack_codes[0] !== 0) {
    //
    //     // TRACE("considering defense of %1m\n", str);
    //     const dcode = this.find_defense(str, defense_point);
    //     if (dcode !== 0) {
    //       // TRACE("worm at %1m can be defended at %1m\n", str, defense_point);
    //       if (defense_point !== NO_MOVE){
    //         this.change_defense(str, defense_point[0], dcode);
    //       }
    //     }
    //     else {
    //       /* If the point of attack is not adjacent to the worm,
    //        * it is possible that this is an overlooked point of
    //        * defense, so we try and see if it defends.
    //        */
    //       attack_point[0] = this.worm[str].attack_points[0];
    //       if (!b.liberty_of_string(attack_point[0], str))
    //         if (b.trymove(attack_point[0], this.worm[str].color, "make_worms", NO_MOVE)) {
    //           const acode = this.attack(str, null);
    //           if (acode !== codes.WIN) {
    //             this.change_defense(str, attack_point[0], REVERSE_RESULT(acode));
    //             // TRACE("worm at %1m can be defended at %1m with code %d\n", str, attack_point, REVERSE_RESULT(acode));
    //           }
    //           b.popgo();
    //         }
    //     }
    //   }
    // }
    // // gg_assert(stackp == 0);
    //
    // /* 4. Use pattern matching to find a few more defense moves. */
    // this.find_defense_patterns();
    // gg_assert(stackp == 0);

    /*
     * 5. Find additional attacks and defenses by testing all immediate
     *    liberties. Further attacks and defenses are found by pattern
     *    matching and by trying whether each attack or defense point
     *    attacks or defends other strings.
     */
    // for (str = BOARDMIN; str < BOARDMAX; str++) {
    //   color = board[str];
    //   if (!IS_STONE(color) || !is_worm_origin(str, str))
    //     continue;
    //
    //   other = OTHER_COLOR(color);
    //
    //   if (worm[str].attack_codes[0] == 0)
    //     continue;
    //
    //   /* There is at least one attack on this group. Try the
    //    * liberties.
    //    */
    //   liberties = findlib(str, MAXLIBS, libs);
    //
    //   for (k = 0; k < liberties; k++) {
    //     int pos = libs[k];
    //     if (!attack_move_known(pos, str)) {
    //       /* Try to attack on the liberty. Don't consider
    //        * send-two-return-one moves.
    //        */
    //       if (!send_two_return_one(pos, other)
    //         && trymove(pos, other, "make_worms", str)) {
    //         if (board[str] == EMPTY || attack(str, NULL)) {
    //           if (board[str] == EMPTY)
    //             dcode = 0;
    //           else
    //             dcode = find_defense(str, NULL);
    //
    //           if (dcode != WIN)
    //             change_attack(str, pos, REVERSE_RESULT(dcode));
    //         }
    //         popgo();
    //       }
    //     }
    //     /* Try to defend at the liberty. */
    //     if (!defense_move_known(pos, str)) {
    //       if (worm[str].defense_codes[0] != 0)
    //         if (trymove(pos, color, "make_worms", NO_MOVE)) {
    //           acode = attack(str, NULL);
    //           if (acode != WIN)
    //             change_defense(str, pos, REVERSE_RESULT(acode));
    //           popgo();
    //         }
    //     }
    //   }
    // }
    // gg_assert(stackp == 0);
  },

  is_same_worm(w1, w2) {
    return this.worm[w1].origin === this.worm[w2].origin;
  },

  is_worm_origin(w, pos) {
    return this.worm[w] && this.worm[w].origin === pos;
  },


  /*
   * change_attack(str, move, acode) is used to add and remove attack
   * points. It can also be used to change the attack code. The meaning
   * of the call is that the string (str) can be attacked by (move) with
   * attack code (acode). If (acode) is zero, the move is removed from
   * the list of attack moves if it was previously listed.
   */
  change_attack(str, move, acode){
    str = this.worm[str].origin;
    // DEBUG(DEBUG_WORMS, "change_attack: %1m %1m %d\n", str, move, acode);
    this.change_tactical_point(str, move, acode, this.worm[str].attack_points, this.worm[str].attack_codes);
  },

  change_defense() {},
  change_attack_threat() {},
  change_defense_threat() {},

  attack_move_known() {},
  defense_move_known() {},
  attack_threat_move_known() {},
  defense_threat_move_known() {},
  /*
 * This function does the real work for change_attack(),
 * change_defense(), change_attack_threat(), and
 * change_defense_threat().
 */
  change_tactical_point(str, move, code, points, codes) {
  // ASSERT_ON_BOARD1(str);
  // ASSERT1(str == worm[str].origin, str);

    this.movelist_change_point(move, code, MAX_TACTICAL_POINTS, points, codes);
    this.propagate_worm2(str);
  },

  //  worm信息从一颗棋子复制到其他
  propagate_worm(pos) {
    const b = this.board
    const stones = [];
    // gg_assert(stackp == 0);
    // ASSERT1(IS_STONE(board[pos]), pos);

    const num_stones = b.findstones(pos, b.MAX_BOARD * b.MAX_BOARD, stones);
    for (let k = 0; k < num_stones; k++){
      if (stones[k] !== pos){
        this.worm[stones[k]] = this.worm[pos];
      }
    }
  },

  /*
 * propagate_worm2() is a relative to propagate_worm() which can be
 * used when stackp>0 but not for the initial construction of the
 * worms.
 */

  propagate_worm2(str){
    const b = this.board

    // ASSERT_ON_BOARD1(str);
    // ASSERT1(IS_STONE(worm[str].color), str);

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] === b.board[str] && this.is_same_worm(pos, str) && pos !== str){
        this.worm[pos] = this.worm[str];
      }
    }
  },

  worm_reasons() {},
  ping_cave() {},
  ping_recurse() {},
  touching() {},
  genus() {},
  markcomponent() {},
  examine_cavity() {},
  cavity_recurse() {},
  find_attack_patterns() {},
  attack_callback() {},
  find_defense_patterns() {},
  defense_callback() {},
  get_lively_stones() {},
  compute_worm_influence() {},

  ascii_report_worm() {},
  report_worm() {},


  //temp 临时测试辐射过程
  test_print_worm(worm){
    const list = []
    let counter = 0
    let pointer
    for(let i in worm){
      let val = worm[i][0] || 0
      if(val === 0){
        val = ' .'
      }

      if(counter %9 === 0){

        if(pointer){
          list.push(pointer.join(' '))
        }
        pointer = [val]
      }else{
        pointer.push(val)
      }
      counter++
    }
    list.push(pointer.join(' '))
    console.log(list.join('\n'))

  },

  //temp 临时测试辐射过程
  test_print_nworm(nworm){
    const list = []
    let counter = 0
    let pointer
    for(let i in nworm){
      let val = nworm[i]
      if(val === 0){
        val = '.'
      }

      if(counter %9 === 0){

        if(pointer){
          list.push(pointer.join(' '))
        }
        pointer = [val]
      }else{
        pointer.push(val)
      }
      counter++
    }
    list.push(pointer.join(' '))
    console.log(list.join('\n'))

  },

  test_print_effective(){
    const list = []
    let counter = 0
    let pointer
    for(let i in this.worm){
      let val = this.worm[i].effective_size
      if(val === 0){
        val = ' .'
      }else{
        val = val.toFixed(1)
      }

      if(counter %9 === 0){

        if(pointer){
          list.push(pointer.join(' '))
        }
        pointer = [val]
      }else{
        pointer.push(val)
      }
      counter++
    }
    list.push(pointer.join(' '))
    console.log(list.join('\n'))

  },

}