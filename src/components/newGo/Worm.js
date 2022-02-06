import {
  codes,
  colors, matchpat, NO_MOVE
} from './Constants'
import {AFFINE_TRANSFORM, dragon_status, MAX_CLOSE_WORMS, MAX_TACTICAL_POINTS, REVERSE_RESULT} from "./Liberty";
import {ATT_X, HAVE_CONSTRAINT} from "./patterns/Patterns";
import {attpat_db} from "./patterns/apatterns"
import {initial_black_influence, initial_white_influence} from "./Influence";


class WormData{
  color;         /* its color */
  size;          /* its cardinality */
  effective_size; /* stones and surrounding spaces */
  origin;        /* the origin of the string. Two vertices are in the same worm iff they have same origin. */
  liberties;     /* number of liberties */
  liberties2;    /* number of second order liberties */
  liberties3;    /* third order liberties (empty vertices at distance 3) */
  liberties4;    /* fourth order liberties */
  lunch;         /* if lunch != 0 then lunch points to a boundary worm which can be captured easily. */
  cutstone;      /* 1=potential cutting stone; 2=cutting stone */
  cutstone2;     /* Number of potential cuts involving the worm. */
  genus;         /* number of connected components of the complement, less one */
  inessential;   /* 1=inessential worm */
  invincible;    /* 1=strongly unconditionally non-capturable */
  unconditional_status; /* ALIVE, DEAD, WHITE_TERRITORY */
  attack_points = []
  attack_codes = []
  defense_points = []
  defense_codes = []
  attack_threat_points = []
  attack_threat_codes = []
  defense_threat_points = []
  defense_threat_codes = []
  
  constructor(cfg) {
    Object.assign(this, cfg)
  }
}


export const Worm = {
  make_worms() {
    const b = this.board
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

    b.ASSERT1(b.stackp === 0, null);

    /* Count liberties of different orders and initialize cutstone fields. */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.IS_STONE(b.board[pos]) && this.is_worm_origin(pos, pos)) {
        let lib1 = [], 
          lib2 = [], 
          lib3 = [], 
          lib4 = [];
    
        this.ping_cave(pos, lib1, lib2, lib3, lib4);
        b.ASSERT1(this.worm[pos].liberties === lib1[0], pos);
        this.worm[pos].liberties2 = lib2[0];
        this.worm[pos].liberties3 = lib3[0];
        this.worm[pos].liberties4 = lib4[0];
        this.worm[pos].cutstone = 0;
        this.worm[pos].cutstone2 = 0;
        this.propagate_worm(pos);
      }
    }
    b.ASSERT1(b.stackp === 0, null);
    
    /*
     * There are two concepts of cutting stones in the worm array.
     *
     * worm.cutstone:
     *
     *     A CUTTING STONE is one adjacent to two enemy strings,
     *     which do not have a liberty in common. The most common
     *     type of cutting string is in this situation.
     *
     *     XO
     *     OX
     *
     *     A POTENTIAL CUTTING STONE is adjacent to two enemy
     *     strings which do share a liberty. For example, X in:
     *
     *     XO
     *     O.
     *
     *     For cutting strings we set worm[m][n].cutstone=2. For potential
     *     cutting strings we set worm[m][n].cutstone=1. For other strings,
     *     worm[m][n].cutstone=0.
     *
     * worm.cutstone2:
     *
     *     Cutting points are identified by the patterns in the
     *     connections database. Proper cuts are handled by the fact
     *     that attacking and defending moves also count as moves
     *     cutting or connecting the surrounding dragons.
     *
     * The cutstone field will now be set. The cutstone2 field is set
     * later, during find_cuts(), called from make_dragons().
     *
     * We maintain both fields because the historically older cutstone
     * field is needed to deal with the fact that e.g. in the position
     *
     *
     *    OXX.O
     *    .OOXO
     *    OXX.O
     *
     * the X stones are amalgamated into one dragon because neither cut
     * works as long as the two O stones are in atari. Therefore we add
     * one to the cutstone field for each potential cutting point,
     * indicating that these O stones are indeed worth rescuing.
     *
     * For the time being we use both concepts in parallel. It's
     * possible we also need the old concept for correct handling of lunches.
     *
     * cutstone：切断状态
     * cutstone2: 在收集大龙信息时设置，
     */
    
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      let w1 = NO_MOVE;
      let w2 = NO_MOVE;
    
      /* Only work on each worm once. This is easiest done if we only
       * work with the origin of each worm.
       */
      if (!b.IS_STONE(b.board[pos]) || !this.is_worm_origin(pos, pos))
        continue;
    
      /* Try to find two adjacent worms (w1) and (w2)
       * of opposite colour from (pos).
       */
      for (let pos2 = b.BOARDMIN; pos2 < b.BOARDMAX; pos2++) {
        /* Work only with the opposite color from (pos). */
        if (b.board[pos2] !== b.OTHER_COLOR(b.board[pos]))
          continue;
    
        for (let k = 0; k < 4; k++) {
          if (!b.ON_BOARD(pos2 + b.delta[k])
            || this.worm[pos2 + b.delta[k]].origin !== pos)
            continue;
    
          b.ASSERT1(b.board[pos2 + b.delta[k]] === b.board[pos], pos);
    
          /* If we have not already found a worm which meets the criteria,
           * store it into (w1), otherwise store it into (w2).
           */
          if (w1 === NO_MOVE)
            w1 = this.worm[pos2].origin;
          else if (!this.is_same_worm(pos2, w1))
            w2 = this.worm[pos2].origin;
        }
      }
    
      /*
       *  We now verify the definition of cutting stones. We have
       *  verified that the string at (pos) is adjacent to two enemy
       *  strings at (w1) and (w2). We need to know if these
       *  strings share a liberty.
       */
    
      /* Only do this if we really found something. */
      if (w2 !== NO_MOVE) {
        this.worm[pos].cutstone = 2;
        if (b.count_common_libs(w1, w2) > 0)
          this.worm[pos].cutstone = 1;
    
        // DEBUG(DEBUG_WORMS, "Worm at %1m has w1 %1m and w2 %1m, cutstone %d\n", pos, w1, w2, worm[pos].cutstone);
      }
    }
    
    b.ASSERT1(b.stackp === 0, null);

    
    /* Set the genus of all worms. */
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.IS_STONE(b.board[pos]) && this.is_worm_origin(pos, pos)) {
        this.worm[pos].genus = this.genus(pos);
        this.propagate_worm(pos);
      }
    }

    b.ASSERT1(b.stackp === 0, null);
    
    /* Now we try to improve the values of worm.attack and worm.defend.
     * If we find that capturing the string at str also defends the
     * string at str2, or attacks it, then we add points of attack and
     * defense. We don't add attacking point for strings that can't be
     * defended.
     */
    // 攻防兼备
    // {
    // let color;
    // let str;
    // let moves_to_try = [];
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


    /* Find adjacent worms that can be easily captured, aka lunches. */
    // 一定能提子成功的叫lunch
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      let lunch = [];

      if (!b.IS_STONE(b.board[pos]) || !this.is_worm_origin(pos, pos))
        continue;

      if (this.find_lunch(pos, lunch)
        && (this.worm[lunch[0]].attack_codes[0] === codes.WIN
        || this.worm[lunch[0]].attack_codes[0] === codes.KO_A)) {
        // DEBUG(DEBUG_WORMS, "lunch found for %1m at %1m\n", pos, lunch);
        this.worm[pos].lunch = lunch[0];
      }
      else {
        this.worm[pos].lunch = NO_MOVE;
      }

      this.propagate_worm(pos);
    }

    //
    // if (!this.disable_threat_computation){
    //   this.find_worm_threats();
    // }
    
    /* Identify INESSENTIAL strings.
     *
     * These are defined as surrounded strings which have no life
     * potential unless part of their surrounding chain can be captured.
     * We give a conservative definition of inessential:
     *  - the genus must be zero
     *  - there can no second order liberties
     *  - there can be no more than two edge liberties
     *  - if it is removed from the board, the remaining cavity has
     *    border color the opposite color of the string
     *  - it contains at most two edge vertices.
     *
     * If we get serious about identifying seki, we might want to add:
     *
     *  - if it has fewer than 4 liberties it is tactically dead.
     *
     * The last condition is helpful in excluding strings which are
     * alive in seki.
     *
     * An inessential string can be thought of as residing inside the
     * opponent's eye space.
     */
    // 无关紧要的棋串： 驻留在对手眼位中
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.IS_STONE(b.board[pos])
        && this.worm[pos].origin === pos
        && this.worm[pos].genus === 0
        && this.worm[pos].liberties2 === 0
        && !this.worm[pos].cutstone
        && this.worm[pos].lunch === NO_MOVE) {
        let edge = [];
        let border_color = this.examine_cavity(pos, edge);
        if (border_color !== colors.GRAY && edge[0] < 3) {
          // DEBUG(DEBUG_WORMS, "Worm %1m identified as inessential.\n", pos);
          this.worm[pos].inessential = 1;
          this.propagate_worm(pos);
        }
      }
    }
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
        console.log(`worm at ${str} can be attacked at ${attack_point}`);
        this.change_attack(str, attack_point[0], acode);
      }
    }

    console.log('nodes:', this.get_reading_node_counter())
    b.ASSERT1(b.stackp === 0, null);

    /* 2. Use pattern matching to find a few more attacks. */
    this.find_attack_patterns();
    b.ASSERT1(b.stackp === 0, null);

    return


    /* 3. Now find defense moves. */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++) {

      if (!b.IS_STONE(b.board[str]) || !this.is_worm_origin(str, str))
        continue;
    
      if (this.worm[str].attack_codes[0] !== 0) {
    
        // TRACE("considering defense of %1m\n", str);
        const dcode = this.find_defense(str, defense_point);
        if (dcode !== 0) {
          // TRACE("worm at %1m can be defended at %1m\n", str, defense_point);
          if (defense_point !== NO_MOVE){
            this.change_defense(str, defense_point[0], dcode);
          }
        }
        else {
          /* If the point of attack is not adjacent to the worm,
           * it is possible that this is an overlooked point of
           * defense, so we try and see if it defends.
           */
          attack_point[0] = this.worm[str].attack_points[0];
          if (!b.liberty_of_string(attack_point[0], str))
            if (b.trymove(attack_point[0], this.worm[str].color, "make_worms", NO_MOVE)) {
              const acode = this.attack(str, null);
              if (acode !== codes.WIN) {
                this.change_defense(str, attack_point[0], REVERSE_RESULT(acode));
                // TRACE("worm at %1m can be defended at %1m with code %d\n", str, attack_point, REVERSE_RESULT(acode));
              }
              b.popgo();
            }
        }
      }
    }
    b.ASSERT1(b.stackp === 0, null);

    //
    // /* 4. Use pattern matching to find a few more defense moves. */
    this.find_defense_patterns();
    b.ASSERT1(b.stackp === 0, null);


    /*
     * 5. Find additional attacks and defenses by testing all immediate
     *    liberties. Further attacks and defenses are found by pattern
     *    matching and by trying whether each attack or defense point
     *    attacks or defends other strings.
     */
    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++) {
      const color = b.board[str];
      const other = b.OTHER_COLOR(color);
      if (!b.IS_STONE(color) || !this.is_worm_origin(str, str))
        continue;
    
      if (this.worm[str].attack_codes[0] === 0)
        continue;
    
      /* There is at least one attack on this group. Try the
       * liberties.
       */
      const libs = [];
      let liberties = b.findlib(str, b.MAXLIBS, libs);
    
      for (let k = 0; k < liberties; k++) {
        let pos = libs[k];
        if (!this.attack_move_known(pos, str)) {
          /* Try to attack on the liberty. Don't consider
           * send-two-return-one moves.
           */
          let dcode
          if (!b.send_two_return_one(pos, other) && b.trymove(pos, other, "make_worms", str)) {
            if (b.board[str] === colors.EMPTY || this.attack(str, null)) {
              if (b.board[str] === colors.EMPTY)
                dcode = 0;
              else
                dcode = this.find_defense(str, null);
    
              if (dcode !== codes.WIN)
                this.change_attack(str, pos, REVERSE_RESULT(dcode));
            }
            b.popgo();
          }
        }
        /* Try to defend at the liberty. */
        if (!this.defense_move_known(pos, str)) {
          if (this.worm[str].defense_codes[0] !== 0)
            if (b.trymove(pos, color, "make_worms", NO_MOVE)) {
              let acode = this.attack(str, null);
              if (acode !== codes.WIN)
                this.change_defense(str, pos, REVERSE_RESULT(acode));
              b.popgo();
            }
        }
      }
    }
    b.ASSERT1(b.stackp === 0, null);

  },

  /*
   * Find moves threatening to attack or save all worms.
   */
  find_worm_threats() {
    const b = this.board
    const libs = []

    for (let str = b.BOARDMIN; str < b.BOARDMAX; str++) {
      let color = b.board[str];
      if (!b.IS_STONE(color) || !this.is_worm_origin(str, str))
        continue;

      /* 1. Start with finding attack threats. */
      /* Only try those worms that have no attack. */
      if (this.worm[str].attack_codes[0] === 0) {
        this.attack_threats(str, MAX_TACTICAL_POINTS,
          this.worm[str].attack_threat_points,
          this.worm[str].attack_threat_codes);

        /* FIXME: Try other moves also (patterns?). */
      }

      /* 2. Continue with finding defense threats. */
      /* Only try those worms that have an attack. */
      if (this.worm[str].attack_codes[0] !== 0
        && this.worm[str].defense_codes[0] === 0) {

        let liberties = b.findlib(str, b.MAXLIBS, libs);

        for (let k = 0; k < liberties; k++) {
          let aa = libs[k];

          /* Try to threaten on the liberty. */
          if (b.trymove(aa, color, "threaten defense", NO_MOVE)) {
            if (this.attack(str, null) === codes.WIN) {
              let dcode = this.find_defense(str, null);
              if (dcode !== 0){
                this.change_defense_threat(str, aa, dcode);
              }
            }
            b.popgo();
          }

          /* Try to threaten on second order liberties. */
          for (let l = 0; l < 4; l++) {
            let bb = libs[k] + b.delta[l];

            if (!b.ON_BOARD(bb)
              || b.IS_STONE(b.board[bb])
              || b.liberty_of_string(bb, str))
              continue;

            if (b.trymove(bb, color, "threaten defense", str)) {
              if (this.attack(str, null) === codes.WIN) {
                const dcode = this.find_defense(str, null);
                if (dcode !== 0){
                  this.change_defense_threat(str, bb, dcode);
                }
              }
              b.popgo();
            }
          }
        }

        /* It might be interesting to look for defense threats by
         * attacking weak neighbors, similar to threatening attack by
         * defending a weak neighbor. However, in this case it seems
         * probable that if there is such an attack, it's a real
         * defense, not only a threat.
         */

        /* FIXME: Try other moves also (patterns?). */
      }
    }
  },


  /* find_lunch(str, &worm) looks for a worm adjoining the
   * string at (str) which can be easily captured. Whether or not it can
   * be defended doesn't matter.
   *
   * Returns the location of the string in (*lunch).
   */
  // 寻找str棋串相邻的可被简单提子的棋串，找到最香的那个
  find_lunch(str, lunch) {
    const b = this.board

    b.ASSERT1(b.IS_STONE(b.board[str]), str);
    b.ASSERT1(b.stackp === 0, str);

    lunch[0] = NO_MOVE;
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] !== b.OTHER_COLOR(b.board[str]))
        continue;
      for (let k = 0; k < 8; k++) {
        let apos = pos + b.delta[k];
        if (b.ON_BOARD(apos) && this.is_same_worm(apos, str)) {
          if (this.worm[pos].attack_codes[0] !== 0 && !b.is_ko_point(pos)) {
            /*
             * If several adjacent lunches are found, we pick the
             * juiciest. First maximize cutstone, then minimize liberties.
             * We can only do this if the worm data is available,
             * i.e. if stackp==0.
             */
            // 断点越多越好，气越少越好
            if (lunch[0] === NO_MOVE
            || this.worm[pos].cutstone > this.worm[lunch[0]].cutstone
            || (this.worm[pos].cutstone === this.worm[lunch[0]].cutstone
            && this.worm[pos].liberties < this.worm[lunch[0]].liberties)) {
              lunch[0] = this.worm[pos].origin;
            }
          }
          break;
        }
      }
    }

    if (lunch[0] !== NO_MOVE){
      return 1;
    }

    return 0;
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

  attack_move_known(move, str) {
    return this.movelist_move_known(move, MAX_TACTICAL_POINTS,
      this.worm[str].attack_points,
      this.worm[str].attack_codes);
  },
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

    b.ASSERT_ON_BOARD1(str);
    b.ASSERT1(b.IS_STONE(this.worm[str].color), str);

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] === b.board[str] && this.is_same_worm(pos, str) && pos !== str){
        this.worm[pos] = this.worm[str];
      }
    }
  },


  /* Report all known attack, defense, attack threat, and defense threat
   * moves. But limit this to the moves which can be made by (color).
   */
  // 只报告AI的着手: 敌方棋串添加进攻理由，我方棋串添加防守理由
  worm_reasons(color) {
    const b = this.board

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (!b.ON_BOARD(pos) || b.board[pos] === colors.EMPTY)
        continue;

      if (!this.is_worm_origin(pos, pos))
        continue;

      if (b.board[pos] === b.OTHER_COLOR(color)) {
        for (let k = 0; k < MAX_TACTICAL_POINTS; k++) {
          if (this.worm[pos].attack_codes[k] !== 0)
            this.add_attack_move(this.worm[pos].attack_points[k], pos, this.worm[pos].attack_codes[k]);
          if (this.worm[pos].attack_threat_codes[k] !== 0)
            this.add_attack_threat_move(this.worm[pos].attack_threat_points[k], pos, this.worm[pos].attack_threat_codes[k]);
        }
      }

      if (b.board[pos] === color) {
        for (let k = 0; k < MAX_TACTICAL_POINTS; k++) {
          if (this.worm[pos].defense_codes[k] !== 0)
            this.add_defense_move(this.worm[pos].defense_points[k], pos,
              this.worm[pos].defense_codes[k]);

          if (this.worm[pos].defense_threat_codes[k] !== 0)
            this.add_defense_threat_move(this.worm[pos].defense_threat_points[k], pos,
              this.worm[pos].defense_threat_codes[k]);
        }
      }
    }
  },


  /* ping_cave(str, *lib1, ...) is applied when (str) points to a string.
   * It computes the vector (*lib1, *lib2, *lib3, *lib4),
   * where *lib1 is the number of liberties of the string,
   * *lib2 is the number of second order liberties (empty vertices
   * at distance two) and so forth.
   *
   * The definition of liberties of order >1 is adapted to the problem
   * of detecting the shape of the surrounding cavity. In particular
   * we want to be able to see if a group is loosely surrounded.
   *
   * A liberty of order n is an empty space which may be connected
   * to the string by placing n stones of the same color on the board,
   * but no fewer. The path of connection may pass through an intervening group
   * of the same color. The stones placed at distance >1 may not touch a
   * group of the opposite color. At the edge, also diagonal neighbors
   * count as touching. The path may also not pass through a liberty at distance
   * 1 if that liberty is flanked by two stones of the opposing color. This
   * reflects the fact that the O stone is blocked from expansion to the
   * left by the two X stones in the following situation:
   *
   *          X.
   *          .O
   *          X.
   *
   * On the edge, one stone is sufficient to block expansion:
   *
   *          X.
   *          .O
   *          --
   *
   *
   * 计算气序（气序一到四），判断被包围的状态
   */
  ping_cave(str, lib1, lib2, lib3, lib4) {
    const b = this.board
    const color = b.board[str];
    const other = b.OTHER_COLOR(color);
    let libs = [];
    let mrc = [];
    let mse = [];
  
  /* Find and mark the first order liberties. */
    lib1[0] = b.findlib(str, b.MAXLIBS, libs);
    for (let k = 0; k < lib1[0]; k++){
      mse[libs[k]] = 1;
    }

    /* Reset mse at liberties which are flanked by two stones of the
    * opposite color, or one stone and the edge.
    */
    // 左右或上下被对方棋子夹住，或边线上被夹到
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      if (b.ON_BOARD(pos) && mse[pos]
        && ((( !b.ON_BOARD(b.SOUTH(pos)) || b.board[b.SOUTH(pos)] === other) && (!b.ON_BOARD(b.NORTH(pos)) || b.board[b.NORTH(pos)] === other))
        || ((  !b.ON_BOARD(b.WEST(pos))  || b.board[b.WEST(pos)]  === other) && (!b.ON_BOARD(b.EAST(pos))  || b.board[b.EAST(pos)]  === other)))) {
        mse[pos] = 0;
      }
    }

    lib2[0] = 0;
    mrc = []
    this.ping_recurse(str, lib2, mse, mrc, color);

    lib3[0] = 0;
    mrc = []
    this.ping_recurse(str, lib3, mse, mrc, color);

    lib4[0] = 0;
    mrc = []
    this.ping_recurse(str, lib4, mse, mrc, color);
  },

  ping_recurse(pos, counter, mx, mr, color) {
    const b = this.board
    mr[pos] = 1;
  
    for (let k = 0; k < 4; k++) {
      let apos = pos + b.delta[k];
      // 为空，未标记
      if (b.board[apos] === colors.EMPTY && mx[apos] === 0 && mr[apos] === 0 && !this.touching(apos, b.OTHER_COLOR(color))) {
        counter[0]++;
        mr[apos] = 1;
        mx[apos] = 1;
      }
    }
    
    if (!b.is_ko_point(pos)) {
      for (let k = 0; k < 4; k++) {
        let apos = pos + b.delta[k];
        // 下一个棋子或下一个已标记的气
        if (b.ON_BOARD(apos) && mr[apos] === 0 && (mx[apos] === 1 || b.board[apos] === color))
          this.ping_recurse(apos, counter, mx, mr, color);
      }
    }
  },

  /* touching(pos, color) returns true if the vertex at (pos) is
   * touching any stone of (color).
   */
  touching(pos, color) {
    const b = this.board
    return b.board[b.SOUTH(pos)] === color
      || b.board[b.WEST(pos)] === color
      || b.board[b.NORTH(pos)] === color
      || b.board[b.EAST(pos)] === color
  },


  /* The GENUS of a string is the number of connected components of
   * its complement, minus one. It is an approximation to the number of
   * eyes of the string.
   */
  // str是棋串id
  genus(str) {
    const b = this.board
    let gen = -1;
    const mg = []
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      // pos为空，或者不在棋串str内的棋子
      if (b.ON_BOARD(pos) && !mg[pos] && (b.board[pos] === colors.EMPTY || !this.is_same_worm(pos, str))) {
        this.markcomponent(str, pos, mg);
        gen++;
      }
    }

    return gen;
  },

  /* This recursive function marks the component at (pos) of
   * the complement of the string with origin (str)
   */
  markcomponent(str, pos, mg) {
    const b = this.board
    mg[pos] = 1;
    for (let k = 0; k < 4; k++) {
      const apos = pos + b.delta[k];
      if (b.ON_BOARD(apos) && mg[apos] === 0 && (b.board[apos] === colors.EMPTY || !this.is_same_worm(apos, str))){
        this.markcomponent(str, apos, mg);
      }
    }
  },

  examine_cavity() {},
  cavity_recurse() {},

  /* Find attacking moves by pattern matching, for both colors. */
  find_attack_patterns() {
    this.matchpat(this.attack_callback, matchpat.ANCHOR_OTHER, attpat_db, null, null);
  },

  /* Try to attack every X string in the pattern, whether there is an attack
   * before or not. Only exclude already known attacking moves.
   */
  attack_callback(anchor, color, pattern, ll) {
    const b = this.board

    // anchor对应找到target move着手位置
    let move = AFFINE_TRANSFORM(pattern.move_offset, ll, anchor);

    console.log('match pattern', {anchor, color, pattern, ll, move})
    /* If the pattern has a constraint, call the autohelper to see
     * if the pattern must be rejected.
     */
    if (pattern.autohelper_flag & HAVE_CONSTRAINT) {
      if (!pattern.autohelper.call(this, ll, move, color, 0)){
        return;
      }
    }

    /* If the pattern has a helper, call it to see if the pattern must
   * be rejected.
   */
    if (pattern.helper) {
      if (!pattern.helper(pattern, ll, move, color)) {
        // DEBUG(DEBUG_WORMS,  "Attack pattern %s+%d rejected by helper at %1m\n", pattern.name, ll, move);
        return;
      }
    }

    /* Loop through pattern elements in search of X strings to attack. */
    for (let k = 0; k < pattern.patlen; ++k) { /* match each point */
      if (pattern.patn[k][1] === ATT_X) {
        /* transform pattern real coordinate */
        let pos = AFFINE_TRANSFORM(pattern.patn[k][0], ll, anchor);
        let str = this.worm[pos].origin;

        /* A string with 5 liberties or more is considered tactically alive. */
        if (b.countlib(str) > 4)
          continue;

        if (this.attack_move_known(move, str))
          continue;

        /* FIXME: Don't attack the same string more than once.
         * Play (move) and see if there is a defense.
         */
        if (b.trymove(move, color, "attack_callback", str)) {
          let dcode;
          if (!b.board[str]){
            dcode = 0;
          }
          else if (!this.attack(str, null)){
            dcode = codes.WIN;
          }
          else{
            dcode = this.find_defense(str, null);
          }

          b.popgo();

          /* Do not pick up suboptimal attacks at this time. Since we
                 * don't know whether the string can be defended it's quite
                 * possible that it only has a ko defense and then we would
                 * risk to find an irrelevant move to attack with ko.
           */
          if (dcode !== codes.WIN && REVERSE_RESULT(dcode) >= this.worm[str].attack_codes[0]) {
            this.change_attack(str, move, REVERSE_RESULT(dcode));
            // DEBUG(DEBUG_WORMS, "Attack pattern %s+%d found attack on %1m at %1m with code %d\n", pattern.name, ll, str, move, REVERSE_RESULT(dcode));
          }
        }
      }
    }
  },

  find_defense_patterns() {},
  defense_callback() {},

  // 标记所有活棋串, color判断守方是否能防守成功
  get_lively_stones(color, safe_stones) {
    const b = this.board
    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++){
      // pos是棋串id
      if (b.IS_STONE(b.board[pos]) && b.find_origin(pos) === pos) {
        // 进攻失败或者防守不失败
        if ((b.stackp === 0 && this.worm[pos].attack_codes[0] === 0) || !this.attack(pos, null)
          || (b.board[pos] === color && ((b.stackp === 0 && this.worm[pos].defense_codes[0] !== 0) || this.find_defense(pos, null)))) {
          b.mark_string(pos, safe_stones, 1);
        }
      }
    }
  },

  compute_worm_influence() {
    const safe_stones = [];

    this.get_lively_stones(colors.BLACK, safe_stones);
    // color_to_move = Black, => initial_black_influence
    this.compute_influence(colors.BLACK, safe_stones, null, initial_black_influence, NO_MOVE, "initial black influence");
    this.get_lively_stones(colors.WHITE, safe_stones);
    // color_to_move = White, => initial_white_influence
    this.compute_influence(colors.WHITE, safe_stones, null, initial_white_influence, NO_MOVE, "initial white influence");
    // console.log(safe_stones)
    this.print_influence(initial_black_influence)
  },

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