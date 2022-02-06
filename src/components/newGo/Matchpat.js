import {colors, matchpat} from "./Constants";
import {CLASS_o, CLASS_O, CLASS_x, CLASS_X, EAST_EDGE, NORTH_EDGE, SOUTH_EDGE, WEST_EDGE} from "./patterns/Patterns";
import {AFFINE_TRANSFORM, dragon_status, TRANSFORM2} from "./Liberty";


/* Precomputed tables to allow rapid checks on the piece at
 * the board. This table relies on the fact that color is
 * 1 or 2.
 *
 * For pattern element i,  require  (board[pos] & andmask[i]) == valmask[i]
 *
 * .XO) For i=0,1,2, board[pos] & 3 is a no-op(无操作), so we check board[pos]
 *	== valmask
 * x)   For i=3, we are checking that board[pos] is not color, so AND
 *	color and we get 0 for either empty or OTHER_COLOR, but color
 *	if it contains color
 * o)   Works the other way round for checking it is not X.
 *
 *
 *  gcc allows the entries to be computed at run-time, but that is not ANSI.
 */
// 
/**
 * i=3: 掩码为黑，结果为白或空， i=4: 掩码为白，结果为黑或空
 * patn中：O - 白棋， X - 黑棋
 * 用法：
 * and_mask[color-1][att]:
 * 
 * color为当前视角。黑视角：and_mask[0]; 白视角：取and_mask[1]
 * 白视角下： board[pos]=1(黑棋) & 3 = val_mask[1][1], board[pos]=2(白棋) & 3 = val_mask[1][2]
 * 黑视角下：board[pos]=1(黑棋) & 3 = val_mask[0][2], board[pos]=2(白棋) & 3 = val_mask[1][1] （对模式的黑白互换了）
 */
const and_mask = [
/* .   O   X  o             x             ,   a   !      color */
  [3,  3,  3, colors.BLACK, colors.WHITE,  3,  3,  3], /* BLACK */
  [3,  3,  3, colors.WHITE, colors.BLACK,  3,  3,  3]  /* WHITE */
];

const val_mask = [
  [ colors.EMPTY, colors.WHITE, colors.BLACK,  0, 0,  colors.EMPTY, colors.EMPTY, colors.EMPTY],  /* BLACK */
  [ colors.EMPTY, colors.BLACK, colors.WHITE,  0, 0,  colors.EMPTY, colors.EMPTY, colors.EMPTY]   /* WHITE */
];

/* and a table for checking classes quickly
 * class_mask[status][color] contains the mask to look for in class.
 * ie. if  pat[r].class & class_mask[dragon[pos].status][board[pos]]
 * is not zero then we reject it
 * Most elements if class_mask[] are zero - it is a sparse
 * matrix containing
 *  CLASS_O in [DEAD][color]
 *  CLASS_O in [CRITICAL][color]
 *  CLASS_o in [ALIVE][color]
 *  CLASS_X in [DEAD][other]
 *  CLASS_x in [ALIVE][other]
 *
 * so eg. if we have a dead white dragon, and we
 * are checking a pattern for black, then
 *  class_mask[DEAD][other]  will contain CLASS_X
 * Then we reject any patterns which have CLASS_X
 * set in the class bits.
 *
 * Making it static guarantees that all fields are
 * initially set to 0, and we overwrite the ones
 * we care about each time.
 */
let class_mask = []

export const Matchpat = {
  /* In the current implementation, the edge constraints depend on
   * the board size, because we pad width or height out to the
   * board size. (This is because it is easy to find the corners
   * of the rotated pattern, but it is harder to transform the
   * bitmask of edge constraints.)
   *
   * But since version 1.103, board size is variable. Thus we
   * make a first pass through the table once we know the board
   * size.
   *
   * This should be called once for each pattern database.
   *
   * 角部：
   * 9 = 1+8 (north+west)代表棋盘左上角
   */
  fixup_patterns_for_board_size(patterns) {
    const board_size = this.board.board_size

    for (let i =0; i < patterns.length; i++){
      let pattern = patterns[i]
        if (pattern.edge_constraints !== 0) {

          /* If the patterns have been fixed up for a different board size
           * earlier, we need to undo the modifications that were done
           * below before we do them anew. The first time this function is
           * called, this step is effectively a no-op.
           */
          if (pattern.edge_constraints & NORTH_EDGE){
            pattern.maxi = pattern.mini + pattern.height;
          }

          if (pattern.edge_constraints & SOUTH_EDGE){
            pattern.mini = pattern.maxi - pattern.height;
          }

          if (pattern.edge_constraints & WEST_EDGE){
            pattern.maxj = pattern.minj + pattern.width;
          }

          if (pattern.edge_constraints & EAST_EDGE){
            pattern.minj = pattern.maxj - pattern.width;
          }

          /* we extend the pattern in the direction opposite the constraint,
           * such that maxi (+ve) - mini (-ve) = board_size-1
           * Note : the pattern may be wider than the board, so
           * we need to be a bit careful !
           */

          if (pattern.edge_constraints & NORTH_EDGE)
            if (pattern.maxi < (board_size-1) + pattern.mini){
              pattern.maxi = (board_size-1) + pattern.mini;
            }

          if (pattern.edge_constraints & SOUTH_EDGE)
            if (pattern.mini > pattern.maxi - (board_size-1)){
              pattern.mini = pattern.maxi - (board_size-1);
            }

          if (pattern.edge_constraints & WEST_EDGE)
            if (pattern.maxj <  (board_size-1) + pattern.minj){
              pattern.maxj = (board_size-1) + pattern.minj;
            }

          if (pattern.edge_constraints & EAST_EDGE)
            if (pattern.minj > pattern.maxj - (board_size-1)){
              pattern.minj = pattern.maxj - (board_size-1);
            }
      }
    }
  },

  /**
   * 预设class_mask的我方、敌方颜色
   */
  prepare_for_match(color) {
    const other = this.board.OTHER_COLOR(color);

    /* Basic sanity checks. */
    this.board.ASSERT1(color !== colors.EMPTY);

    class_mask = new Array(17).fill({0:0, 1: 0, 2: 0})

    /* If we set one of class_mask[XXX][color] and
     * class_mask[XXX][other], we have to explicitly set or reset the
     * other as well, since 'color' may change between calls.
     */
    class_mask[dragon_status.DEAD] = {
      [color]: CLASS_O,
      [other]: CLASS_X
    }
    class_mask[dragon_status.CRITICAL] = {
      [color]: CLASS_O,
      [other]: 0 /* Need to reset this. */
    }
    class_mask[dragon_status.ALIVE] = {
      [color]: CLASS_o,
      [other]: CLASS_x
    }
  },

  /*
   * Try all the patterns in the given array at (anchor). Invoke the
   * callback for any that matches. Classes X,O,x,o are checked here. It
   * is up to the callback to process the other classes, and any helper
   * or autohelper functions.
   *
   * If the support of goal[BOARDMAX] is a subset of the board, patterns
   * are rejected which do not involve this dragon. If goal is a null
   * pointer, this parameter is ignored.
   */
  do_matchpat( anchor, callback,  color, patterns, callback_data, goal) {
    const b = this.board
    const anchor_test = b.board[anchor] ^ color;  /* see below */
    let m = b.I(anchor);
    let n = b.J(anchor);
    /* Basic sanity checks. */
    b.ASSERT_ON_BOARD1(anchor);

    // debugger;
    // let pos = AFFINE_TRANSFORM(649, 2, 44)

    /* calculate the merged value around [m][n] for the grid opt */
    /* FIXME: Convert this to 2D (using delta[]) but be aware that you'll
     *	      also need to make corresponding changes in mkpat.c!
     */
    let shift = 30;

    let merged_val = 0;
    // 从ancher左上[-1,-1]点到[2,2]计算特征码
    for (let i = m-1; i <= m+2; ++i){
      for (let j = n-1; j <= n+2; shift -= 2, ++j) {
        let _this;
        if (!b.ON_BOARD2(i, j)){
          _this = 3;
        }
        // _this赋值
        else if ((_this = b.BOARD(i, j)) === 0){
          continue;
        }
        else if (color === 2){
          _this = b.OTHER_COLOR(_this);
        }
        merged_val |= (_this << shift);
      }
    }

    for(let i= 0; i< patterns.length; i++){
      let pattern = patterns[i]
      if(!pattern.patn){
        break;
      }
      /*
       * These days we always match all patterns.
       */
      /* We can check the color of the anchor stone now.
       * Roughly half the patterns are anchored at each
       * color, and since the anchor stone is invariant under
       * rotation, we can reject all rotations of a wrongly-anchored
       * pattern in one go.
       *
       * Patterns are always drawn from O perspective in .db,
       * so board[pos] is 'color' if the pattern is anchored
       * at O, or 'other' for X.
       * Since we require that this flag contains 3 for
       * anchored_at_X, we can check that
       *   board[pos] == (color ^ anchored_at_X)
       * which is equivalent to
       *   (board[pos] ^ color) == anchored_at_X)
       * and the LHS is something we precomputed.
       */
      let ll = 0;   /* Iterate over transformations (rotations or reflections)  */

      // 颜色校验
      if (anchor_test !== pattern.anchored_at_X) {
        continue;  /* does not match the anchor */
      }

      let end_transformation = pattern.trfno;

      /* Ugly trick for dealing with 'O' symmetry. */
      // 对称
      if (pattern.trfno === 5) {
        ll = 2;
        end_transformation = 6;
      }

      /* try each orientation transformation. Assume at least 1 */

      do {
        /* We first perform the grid check : this checks up to 16
         * elements in one go, and allows us to rapidly reject
         * patterns which do not match.  While this check invokes a
         * necessary condition, it is not a sufficient test, so more
         * careful checks are still required, but this allows rapid
         * rejection. merged_val should contain a combination of
         * 16 board positions around m, n.  The colours have been fixed
         * up so that stones which are 'O' in the pattern are
         * bit-pattern %01.
         */
        if ((merged_val & pattern.and_mask[ll]) !== pattern.val_mask[ll]){
          continue;  /* large-scale match failed */
        }

        /* Next, we do the range check. This applies the edge
         * constraints implicitly.
         */
        let mi = [], mj = [], xi = [], xj = [];
        // 获得模式串最小最大范围（变换后）
        TRANSFORM2(pattern.mini, pattern.minj, mi, mj, ll);
        TRANSFORM2(pattern.maxi, pattern.maxj, xi, xj, ll);

        /* {min,max}{i,j} are the appropriate corners of the original
         * pattern, Once we transform, {m,x}{i,j} are still corners,
         * but we don't know *which* corners.
         * We could sort them, but it turns out to be cheaper
         * to just test enough cases to be safe.
         */

        /* now do the range-check */
        if (!b.ON_BOARD2(m + mi[0], n + mj[0]) || !b.ON_BOARD2(m + xi[0], n + xj[0]))
          continue;  /* out of range */

        // console.log(m + mi[0], n + mj[0], m + xi[0], n + xj[0])
        /* Now iterate over the elements of the pattern. */
        let found_goal = 0;
        // goto mark
        let matchFailed = 0
        /* Iterate over elements of pattern */
        // 循环 patn列表每个元素是否符合条件
        for (let k = 0; k < pattern.patlen; ++k) { /* match each point */
          // 特征中k元素的value(黑、白、空)
          let att = pattern.patn[k][1];  /* what we are looking for */

          /* Work out the position on the board of this pattern element. */

          /* pos: absolute coords of (transformed) pattern element */
          /* transform pattern real coordinate... */
          // 元素pattern.patn[k][0]以anchor为基准点，变换ll下的绝对位置
          let pos = AFFINE_TRANSFORM(pattern.patn[k][0], ll, anchor);

          b.ASSERT_ON_BOARD1(pos);

          /* ...and check that board[pos] matches (see above). */
          if ((b.board[pos] & and_mask[color-1][att]) !== val_mask[color-1][att]){
            // console.log('match_failed')
            matchFailed = 1
            break;
          }

          if (goal && b.board[pos] !== colors.EMPTY && goal[pos]){
            found_goal = 1;
          }

          /* Check out the class_X, class_O, class_x, class_o
           * attributes - see patterns.db and above.
           */
          if (this.dragon.length && this.dragon[pos] && (pattern.class & class_mask[this.dragon[pos].status][b.board[pos]]) !== 0){
            // console.log('match_failed')
            matchFailed = 1
            break;
          }

        } /* loop over elements */

        if(matchFailed){
          break;
        }

        /* Make it here ==> We have matched all the elements to the board. */
        if ((goal !== null) && !found_goal){
          // console.log('match_failed')
          break;
        }


        /* A match!  - Call back to the invoker to let it know. */
        callback.call(this, anchor, color, pattern, ll, callback_data);

        /* We jump to here as soon as we discover a pattern has failed. */
        // match_failed:
        //   DEBUG(DEBUG_MATCHER,
        //     "end of pattern '%s', rotation %d at %1m\n---\n",
        //     pattern->name, ll, anchor);

      } while (++ll < end_transformation); /* ll loop over symmetries */
    }
  },


  /*
   * Scan the board to get patterns anchored by anchor from color
   * point of view.
   * the board must be prepared by dfa_prepare_for_match(color) !
   */
  // color: 当前视角
  // anchor: 锚点颜色， 当前位置必须和锚点颜色一致
  matchpat_loop(callback, color, anchor, pdb, callback_data, goal, anchor_in_goal) {
    const b = this.board

    for (let pos = b.BOARDMIN; pos < b.BOARDMAX; pos++) {
      if (b.board[pos] === anchor && (!anchor_in_goal || (goal && goal[pos] !== 0))){
        this.do_matchpat(pos, callback, color, pdb.patterns, callback_data, goal);
      }
    }
  },


  dfa_match_init() {},
  dfa_prepare_for_match() {},
  scan_for_patterns() {},
  do_dfa_matchpat() {},
  check_pattern_light() {},
  dfa_matchpat_loop() {},

  /* same as the old matchpat but for all the board with
   * preparation.
   *
   * 4 possible values for color argument:
   * WHITE or BLACK: matchpat is called from this color point of view.
   * ANCHOR_COLOR  : matchpat is called from the anchor's point of view.
   * ANCHOR_OTHER  : matchpat is called from the opposite color of the
   *                 anchor's point of view.
   */
  // pdb: patternDB
  matchpat(callback, color, pdb, callback_data, goal) {
    this.matchpat_goal_anchor(callback, color, pdb, callback_data, goal, pdb.fixed_anchor);
  },
  matchpat_goal_anchor(callback, color, pdb, callback_data, goal, anchor_in_goal) {
    const b = this.board
    let loop = this.matchpat_loop;
    let prepare = this.prepare_for_match;

    /* check board size */
    if (pdb.fixed_for_size !== b.board_size) {
      this.fixup_patterns_for_board_size(pdb.patterns);
      pdb.fixed_for_size = b.board_size;
    }

    /* select pattern matching strategy */
    if (pdb.pdfa !== null) {
      loop = this.dfa_matchpat_loop;
      prepare = this.dfa_prepare_for_match;
    }

    /* select strategy */
    switch (color) {
      /* match pattern for the color of their anchor */
      case matchpat.ANCHOR_COLOR:
        prepare.call(this, colors.WHITE);
        loop.call(this, callback, colors.WHITE, colors.WHITE, pdb, callback_data, goal, anchor_in_goal);
        prepare.call(this, colors.BLACK);
        loop.call(this, callback, colors.BLACK, colors.BLACK, pdb, callback_data, goal, anchor_in_goal);
        break;
      /* match pattern for the opposite color of their anchor */
      case matchpat.ANCHOR_OTHER:
        prepare.call(this, colors.WHITE);
        loop.call(this, callback, colors.WHITE, colors.BLACK, pdb, callback_data, goal, anchor_in_goal);
        prepare.call(this, colors.BLACK);
        loop.call(this, callback, colors.BLACK, colors.WHITE, pdb, callback_data, goal, anchor_in_goal);

        break;
      default:
       /* match all patterns for color */
        prepare.call(this, color);
        loop.call(this, callback, color, colors.WHITE, pdb, callback_data, goal, anchor_in_goal);
        loop.call(this, callback, color, colors.BLACK, pdb, callback_data, goal, anchor_in_goal);
    }
  },
  fullboard_transform() {},
  fullboard_matchpat() {},

  do_corner_matchpat() {},
  corner_matchpat() {},
}