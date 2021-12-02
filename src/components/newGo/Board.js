import {
  colors, NO_MOVE, PASS_MOVE,
  suicide_rules,
  ko_rules
} from './Constants'
import {Hash, HashData} from './Hash'
import {StringData, StringPosData, Utils} from './BoardUtils'
import {BoardInterface} from './BoardInterface'
const boardParams = [
  'board_size',
  'board_ko_pos',
  'white_captured',
  'black_captured',
  'initial_board_ko_pos',
  'initial_white_captured',
  'initial_black_captured',
  'move_history_pointer',
  'komi',
  'handicap',
  'movenum'
]

// 方向（方法）遍历
const directions = ['SOUTH', 'WEST', 'NORTH', 'EAST']

class BoardCacheEntry {
  constructor() {
    this.threshold = 0
    this.liberties = 0
    this.position_hash = {
      hashval: 0
    }
  }
}

const accuratelib_cache = []


// struct board_cache_entry {
//   int threshold;
//   int liberties;
//   Hash_data position_hash;
// };

class Board {

  constructor(boardSize) {
    Object.assign(this, Utils, BoardInterface)

    this.initConstants(boardSize)
    this.initParams()
    this.clear_board()
  }

  initConstants(boardSize) {

    // this.MIN_BOARD = 1
    this.MAX_BOARD = boardSize
    this.MAXSTACK = this.MAX_BOARD * this.MAX_BOARD
    // this.MAX_HANDICAP = 9
    this.MAX_MOVE_HISTORY = 500

    this.DEFAULT_BOARD_SIZE = this.MAX_BOARD

    // n子棋串最多有2(n+1)口气，N^2棋盘上气的上限是 2/3 (N^2+1)
    this.MAXLIBS = 2*(this.MAX_BOARD * this.MAX_BOARD + 1)/3
    this.MAX_LIBERTIES = 8
    this.MAX_STRINGS = 4 * this.MAX_BOARD * this.MAX_BOARD / 5
    // this.MAXCHAIN = 160
    this.BOARDSIZE =  (this.MAX_BOARD + 2) * (this.MAX_BOARD + 1) + 1
    this.BOARDMIN  =  this.MAX_BOARD + 2
    this.BOARDMAX  =  (this.MAX_BOARD + 1) * (this.MAX_BOARD + 1)


    this.NS = this.MAX_BOARD + 1
    this.WE = 1

    this.deltai = [ 1,  0, -1,  0,  1, -1, -1, 1];
    this.deltaj = [ 0, -1,  0,  1, -1, -1,  1, 1];
    this.delta  = [ this.NS, -1, -this.NS, 1, this.NS-1, -this.NS-1, -this.NS+1, this.NS+1];
  }

  initParams() {
    this.board_size = this.DEFAULT_BOARD_SIZE
    this.board = new Array(this.BOARDSIZE)
    this.initial_board = new Array(this.BOARDSIZE)


    this.move_history_color = new Array(this.MAX_MOVE_HISTORY)
    this.move_history_pos = new Array(this.MAX_MOVE_HISTORY)
    this.move_history_hash = new Array(this.MAX_MOVE_HISTORY)

    this.komi = 0.0
    this.handicap = 0
    this.ko_rule = ko_rules.SIMPLE
    this.suicide_rule = suicide_rules.FORBIDDEN
    this.shadow = []
    this.board_hash = {}
    this.hash = new Hash(this.BOARDMIN, this.BOARDMAX)
    this.hash.init()

    this.approxlib_cache = []

    this.position_number = 0
    this.stackp = 0

    // trymove
    this.stack = []
    this.move_color = [];
    this.board_hash_stack = []
    this.trymove_counter = 0

    //stones count
    this.stone_count_for_position = -1;
    this.white_stones = 0;
    this.black_stones = 0;

    this.initData()

  }

  /* ================================================================ */
  /*                      static data structures                      */
  /* ================================================================ */
  initData() {
    this.string = {}
    this.string_libs = {}
    this.string_neighbors = {}

    /* Stacks and stack pointers. */
    this.change_stack = []
    this.vertex_stack = []

    // 棋串字典 ：BOARDMAX, 位置pos映射棋串index
    this.string_number = {}
    // 棋串内棋子（循环链表)
    this.next_stone = {}
  }

  pushValue(ref, name){
    this.change_stack.push({
      ref,
      name,
      value: ref[name]
    })
  }

  pushVertex(pos){
    this.vertex_stack.push({
      pos,
      value: this.board[pos]
    })
  }

  popMove() {
    const cs = this.change_stack
    // POP_MOVE
    while(cs.length && cs[cs.length - 1]){
      const stack = cs.pop()
      stack.ref[stack.name] = stack.value
    }

    if(cs.length && cs[cs.length - 1] === null){
      cs.pop()
    }
  }

  popVertices() {
    const vs = this.vertex_stack

    while(vs.length && vs[vs.length - 1]){
      const stack = vs.pop()
      this.board[stack.pos] = stack.value
    }
    if(vs.length && vs[vs.length - 1] === null){
      vs.pop()
    }
  }

  store_board(state) {

    boardParams.forEach(item => state[item] = this[item])

    state.board = this.board.slice()
    state.initial_board = this.initial_board.slice()

    for (let k = 0; k < this.move_history_pointer; k++) {
      state.move_history_color[k] = this.move_history_color[k];
      state.move_history_pos[k] = this.move_history_pos[k];
      state.move_history_hash[k] = this.move_history_hash[k];
    }
  }

  restore_board(state){
    boardParams.forEach(item => this[item] = state[item])

    this.board = state.board.slice()
    this.initial_board = state.initial_board.slice()

    for (let k = 0; k < this.move_history_pointer; k++) {
      this.move_history_color[k] = state.move_history_color[k];
      this.move_history_pos[k] = state.move_history_pos[k];
      this.move_history_hash[k] = state.move_history_hash[k];
    }

    this.hash.recalc(this.board_hash, this.board, this.board_ko_pos);
    this.new_position();

  }

  clear_board() {
    this.board.fill(colors.EMPTY)
    this.initial_board.fill(colors.EMPTY)
    for (let k = 0; k < this.BOARDSIZE; k++) {
      if (!this.ON_BOARD2(this.I(k), this.J(k))) {
        this.board[k] = colors.GRAY;
        this.initial_board[k] = colors.GRAY;
      }
    }

    this.board_ko_pos = NO_MOVE;
    this.white_captured = 0;
    this.black_captured = 0;

    this.komaster = colors.EMPTY;
    this.kom_pos = NO_MOVE;

    this.initial_board_ko_pos = NO_MOVE;
    this.initial_white_captured = 0;
    this.initial_black_captured = 0;

    this.move_history_pointer = 0;
    this.movenum = 0;
    this.handicap = 0;

    this.hash.recalc(this.board_hash, this.board, this.board_ko_pos);
    this.new_position();
  }

  /* ================================================================ */
  /*                      Temporary moves   (临时落子)                  */
  /* ================================================================ */

  trymove(pos, color, message) {
    return this.do_trymove(pos, color, 0)
  }

  tryko(pos, color, message) {
    return this.do_trymove(pos, color, 1)
  }

  /* Really, really make a temporary move. It is assumed that all
   * necessary checks have already been made and likewise that various
   * administrative bookkeeping outside of the actual board logic has
   * either been done or is not needed.
   */
  really_do_trymove(pos, color) {
    this.change_stack.push(null)
    this.vertex_stack.push(null)
    this.pushValue(this, 'board_ko_pos');

    if(!this.board_hash_stack[this.stackp]){
      this.board_hash_stack[this.stackp] = {}
    }
    this.board_hash_stack[this.stackp].hashval = this.board_hash.hashval

    if (this.board_ko_pos !== NO_MOVE){
      this.hash.invert_ko(this.board_hash, this.board_ko_pos)
    }

    this.board_ko_pos = NO_MOVE;
    this.stackp++;

    if (pos !== PASS_MOVE) {
      this.pushValue(this, 'black_captured');
      this.pushValue(this, 'white_captured');
      this.do_play_move(pos, color);
    }
  }

  do_trymove(pos, color, ignore_ko) {
    if (pos !== PASS_MOVE) {
      /* Update the reading tree shadow. */
      // shadow[pos] = 1;

      /* 3. The location must be empty. */
      if (this.board[pos] !== colors.EMPTY){
        return 0;
      }

      /* 4. The location must not be the ko point, unless ignore_ko === 1. */
      if (!ignore_ko && pos === this.board_ko_pos) {
        if (this.board[this.WEST(pos)] === this.OTHER_COLOR(color)
          || this.board[this.EAST(pos)] === this.OTHER_COLOR(color)) {
          return 0;
        }
      }

      /* 5. Test for suicide. */
      if (this.is_suicide(pos, color)){
        return 0;
      }
    }

    /* Check for stack overflow. */
    if (this.stackp >= this.MAXSTACK - 2) {
      console.error("gnugo: Truncating search. This is beyond my reading ability!");
      return 0;
    }


    /* Only count trymove when we do create a new position. */
    this.trymove_counter++;

    /* So far, so good. Now push the move on the move stack. These are
     * needed for dump_stack().
     */
    this.stack[this.stackp] = pos;
    this.move_color[this.stackp] = color;

    this.really_do_trymove(pos, color);

    return 1;
  }

  popgo() {
    this.undo_trymove();
  }

  undo_trymove() {
    this.popMove()
    this.popVertices()

    this.stackp--;
    this.board_hash.hashval = this.board_hash_stack[this.stackp].hashval
  }


  /* ================================================================ */
  /*                     Permanent moves （持久化落子）                  */
  /* ================================================================ */

  reset_move_history() {
    this.initial_board = this.board.slice()
    this.initial_board_ko_pos = this.board_ko_pos;
    this.initial_white_captured = this.white_captured;
    this.initial_black_captured = this.black_captured;
    this.move_history_pointer = 0;
  }

  // 默认放置棋子
  add_stone(pos, color) {
    this.board[pos] = color;
    this.hash.invert_stone(this.board_hash, pos, color);
    this.reset_move_history();
    this.new_position();
  }

  remove_stone(pos) {
    // 断言： stackp = 0， pos在棋盘内，pos上有棋子
    this.hash.invert_stone(this.board_hash, pos, this.board[pos]);
    this.board[pos] = colors.EMPTY;
    this.reset_move_history();
    this.new_position();
  }

  /* Play a move. Basically the same as play_move() below, but doesn't store
   * the move in history list.
   *
   * Set `update_internals' to zero if you want to play several moves in a
   * row to avoid overhead caused by new_position(). Don't forget to call
   * it yourself after all the moves have been played.
   */
  play_move_no_history( pos,  color, update_internals) {
    let captured
    if (this.board_ko_pos !== NO_MOVE){
      this.hash.invert_ko(this.board_hash, this.board_ko_pos);
    }
    this.board_ko_pos = NO_MOVE;

    /* If the move is a pass, we can skip some steps. */
    if (pos !== PASS_MOVE) {
      // 断言： pos在棋盘上， pos是空
      /* Do play the move. */
      captured = this.do_play_move(pos, color);
    }

    if (update_internals || this.next_string === this.MAX_STRINGS) {
      this.new_position();
    } else{
      this.change_stack = []
      this.vertex_stack = []
    }
    return captured
  }

  /* Load the initial position and replay the first n moves. */
  replay_move_history(n) {
    this.board_ko_pos = this.initial_board_ko_pos;
    this.white_captured = this.initial_white_captured;
    this.black_captured = this.initial_black_captured;
    this.new_position();

    for (let k = 0; k < n; k++){
      this.play_move_no_history(this.move_history_pos[k], this.move_history_color[k], 0);
    }

    this.new_position();
  }

  /* Play a move. If you want to test for legality you should first call
   * is_legal(). This function strictly follows the algorithm:
   * 1. Place a stone of given color on the board.
   * 2. If there are any adjacent opponent strings without liberties,
   *    remove them and increase the prisoner count.
   * 3. If the newly placed stone is part of a string without liberties,
   *    remove it and increase the prisoner count.
   *
   * In spite of the name "permanent move", this move can (usually) be
   * unplayed by undo_move(), but it is significantly more costly than
   * unplaying a temporary move. There are limitations on the available
   * move history, so under certain circumstances the move may not be
   * possible to unplay at a later time.
   */
  play_move(pos,  color) {
    // 断言： 栈为空 stackp === 0
    // color是黑棋、白棋
    // pos为pass或者棋盘范围内
    // pass或者pos位置是空
    // pos不是打劫禁入点

    let captured
    //  color, pos, hash分别记录
    this.move_history_color[this.move_history_pointer] = color;
    this.move_history_pos[this.move_history_pointer] = pos;
    this.move_history_hash[this.move_history_pointer] = this.board_hash;
    if (this.board_ko_pos !== NO_MOVE){
      this.hash.invert_ko(this.move_history_hash[this.move_history_pointer], this.board_ko_pos);
    }
    this.move_history_pointer++;
    captured = this.play_move_no_history(pos, color, 1);
    this.movenum++;
    return captured
  }

  // 打印棋盘
  print_board(){
    let lineNum = Math.floor( this.board.length / this.NS + 1 );
    let res = [];

    const map = {
      '0': '.',
      '1': 'O',
      '2': 'X',
      '3': '#',
    }
    for (let i = 0; i < lineNum; i++) {
      let temp = this.board.slice(i* this.NS, (i+1) * this.NS ).map(i => map[i]).join(' ')
      res.push(temp);
    }
    console.log(res.join('\n'))
  }

  /*
   * is_suicide(pos, color) determines whether the move (color) at
   * (pos) would be a suicide.
   *
   * This is the case if
   * 1. There is no neighboring empty intersection.
   * 2. There is no neighboring opponent string with exactly one liberty.
   * 3. There is no neighboring friendly string with more than one liberty.

   */
  is_suicide(pos, color) {
    // 已知前提： pos在棋盘上，&& pos为空
    const me = this
    /* Check for suicide. */
    // 南面有气 或 是敌方棋串且1气，是我方棋子且1气以上， 则不是自杀
    for(let i in directions){
      const p = me[directions[i]](pos)

      if (me.LIBERTY(p) || (me.ON_BOARD(p) && ((me.board[p] === color) ^ (me.LIBERTIES(p) === 1))))
        return 0;
    }
    return 1;
  }

  /*
   * is_allowed_move(int pos, int color) determines whether a move is
   * legal with respect to the suicide and ko rules in play.
   *
   * This function is only valid when stackp == 0 since there is no
   * tracking of superko for trymoves.
   */
  // 合法落子检查
  is_allowed_move(pos, color){

    /* 1. A pass move is always legal, no matter what. */
    if (pos === colors.PASS_MOVE)
      return 1;

    /* 2. The move must be inside the board. */
    if(!this.ON_BOARD1(pos))
      return 0

    /* 3. The location must be empty. */
    if (this.board[pos] !== colors.EMPTY)
      return 0;

    /* 4. Simple ko repetition is only allowed if no ko rule is in use.
     *    For superko rules this check is redundant.
     *
     *    The ko position is guaranteed to have all neighbors of the
     *    same color, or off board. If that color is the same as the
     *    move the ko is being filled, which is always allowed. This
     *    could be tested with has_neighbor() but here a faster test
     *    suffices.
     */
    if (this.ko_rule !== colors.NONE && pos === this.board_ko_pos &&
      (this.board[this.WEST(pos)] === this.OTHER_COLOR(color)
        || this.board[this.EAST(pos)] === this.OTHER_COLOR(color)))
      return 0;

    /* 5. Check for suicide. Suicide rule options:
     *    FORBIDDEN   - No suicides allowed.
     *    ALLOWED     - Suicide of more than one stone allowed.
     *    ALL_ALLOWED - All suicides allowed.
     */
    if (this.is_suicide(pos, color))
      if (this.suicide_rule === suicide_rules.FORBIDDEN
        || (this.suicide_rule === suicide_rules.ALLOWED && !this.has_neighbor(pos, color)))
        return 0;

    /* 6. Check for whole board repetitions. The superko options are
     *    SIMPLE, NONE - No superko restrictions.
     *    PSK          - Repetition of a previous position forbidden.
     *    SSK          - Repetition of a previous position with the same
     *                   player to move forbidden.
     */
    // if (this.is_superko_violation(pos, color, this.ko_rule))
    //   return 0;

    return 1;
  }

  // 获得棋串气数
  countlib(str) {
    // ASSERT1(IS_STONE(board[str]), str);
    /* We already know the number of liberties. Just look it up. */
    return this.string[this.string_number[str]].liberties;
  }

  // 获得棋串气的列表，元素个数最大为maxlib
  // maxlib< 缓存最大值时，从缓存读取； 否则遍历+标记获取
  findlib(str, maxlib, libs) {
    let s = this.string_number[str];
    let liberties = this.string[s].liberties;

    if (liberties <= this.MAX_LIBERTIES || maxlib <= this.MAX_LIBERTIES) {
      for (let k = 0; k < maxlib && k < liberties; k++){
        libs[k] = this.string_libs[s].list[k];
      }
    } else {
      this.liberty_mark++;
      for (let k = 0, pos = this.FIRST_STONE(s); k < maxlib && k < liberties; pos = this.NEXT_STONE(pos)) {
        for(let i in directions){
          const p = this[directions[i]](pos)

          if (this.UNMARKED_LIBERTY(p)) {
            libs[k++] = p;
            this.MARK_LIBERTY(p);
            if (k >= maxlib){
              break;
            }
          }
        }
      }
    }

    return liberties;
  }


  /* Count the liberties a stone of the given color would get if played
   * at (pos). The location (pos) must be empty.
   *
   * The intent of this function is to be as fast as possible, not
   * necessarily complete. But if it returns a positive value (meaning
   * it has succeeded), the value is guaranteed to be correct.
   *
   * Captures are ignored based on the ignore_capture flag.  The function
   * fails if there are more than two neighbor strings of the same
   * color.  In this case, the return value is -1.  Captures are handled
   * in a very limited way, so if ignore_capture is 0, and a capture is
   * required, it will often return -1.
   *
   * Note well, that it relies on incremental data.
   */
  fastlib(pos, color, ignore_captures) {
    let ally1 = -1;
    let ally2 = -1;
    let fast_liberties = 0;

    // ASSERT1(board[pos] == EMPTY, pos);
    // ASSERT1(IS_STONE(color), pos);

    /* Find neighboring strings of the same color. If there are more than two of
     * them, we give up (it's too difficult to count their common liberties).
     */
    if (this.board[this.SOUTH(pos)] === color) {
      ally1 = this.string_number[this.SOUTH(pos)];

      if (this.board[this.WEST(pos)] === color && this.string_number[this.WEST(pos)] !== ally1) {
        ally2 = this.string_number[this.WEST(pos)];

        if (this.board[this.NORTH(pos)] === color
          && this.string_number[this.NORTH(pos)] !== ally1
          && this.string_number[this.NORTH(pos)] !== ally2){
          return -1;
        }
      }
      else if (this.board[this.NORTH(pos)] === color && this.string_number[this.NORTH(pos)] !== ally1){
        ally2 = this.string_number[this.NORTH(pos)];
      }

      if (this.board[this.EAST(pos)] === color && this.string_number[this.EAST(pos)] !== ally1) {
        if (ally2 < 0)
          ally2 = this.string_number[this.EAST(pos)];
        else if (this.string_number[this.EAST(pos)] !== ally2)
          return -1;
      }
    }
    else if (this.board[this.WEST(pos)] === color) {
      ally1 = this.string_number[this.WEST(pos)];

      if (this.board[this.NORTH(pos)] === color && this.string_number[this.NORTH(pos)] !== ally1) {
        ally2 = this.string_number[this.NORTH(pos)];

        if (this.board[this.EAST(pos)] === color
          && this.string_number[this.EAST(pos)] !== ally1
          && this.string_number[this.EAST(pos)] !== ally2)
          return -1;
      }
      else if (this.board[this.EAST(pos)] === color
        && this.string_number[this.EAST(pos)] !== ally1)
        ally2 = this.string_number[this.EAST(pos)];
    }
    else if (this.board[this.NORTH(pos)] === color) {
      ally1 = this.string_number[this.NORTH(pos)];

      if (this.board[this.EAST(pos)] === color && this.string_number[this.EAST(pos)] !== ally1)
        ally2 = this.string_number[this.EAST(pos)];
    }
    else if (this.board[this.EAST(pos)] === color)
      ally1 = this.string_number[this.EAST(pos)];

    /* If we are to ignore captures, the things are very easy. */
    if (ignore_captures) {
      if (ally1 < 0) {			/* No allies */
        if (this.LIBERTY(this.SOUTH(pos)))
          fast_liberties++;
        if (this.LIBERTY(this.WEST(pos)))
          fast_liberties++;
        if (this.LIBERTY(this.NORTH(pos)))
          fast_liberties++;
        if (this.LIBERTY(this.EAST(pos)))
          fast_liberties++;
      }
      else if (ally2 < 0) {		/* One ally */
        if (this.LIBERTY(this.SOUTH(pos))
          && !this.NON_SOUTH_NEIGHBOR_OF_STRING(this.SOUTH(pos), ally1, color))
          fast_liberties++;
        if (this.LIBERTY(this.WEST(pos))
          && !this.NON_WEST_NEIGHBOR_OF_STRING(this.WEST(pos), ally1, color))
          fast_liberties++;
        if (this.LIBERTY(this.NORTH(pos))
          && !this.NON_NORTH_NEIGHBOR_OF_STRING(this.NORTH(pos), ally1, color))
          fast_liberties++;
        if (this.LIBERTY(this.EAST(pos))
          && !this.NON_EAST_NEIGHBOR_OF_STRING(this.EAST(pos), ally1, color))
          fast_liberties++;

        fast_liberties += this.string[ally1].liberties - 1;
      }
      else {				/* Two allies */
        if (this.LIBERTY(this.SOUTH(pos))
          && !this.NON_SOUTH_NEIGHBOR_OF_STRING(this.SOUTH(pos), ally1, color)
          && !this.NON_SOUTH_NEIGHBOR_OF_STRING(this.SOUTH(pos), ally2, color))
          fast_liberties++;
        if (this.LIBERTY(this.WEST(pos))
          && !this.NON_WEST_NEIGHBOR_OF_STRING(this.WEST(pos), ally1, color)
          && !this.NON_WEST_NEIGHBOR_OF_STRING(this.WEST(pos), ally2, color))
          fast_liberties++;
        if (this.LIBERTY(this.NORTH(pos))
          && !this.NON_NORTH_NEIGHBOR_OF_STRING(this.NORTH(pos), ally1, color)
          && !this.NON_NORTH_NEIGHBOR_OF_STRING(this.NORTH(pos), ally2, color))
          fast_liberties++;
        if (this.LIBERTY(this.EAST(pos))
          && !this.NON_EAST_NEIGHBOR_OF_STRING(this.EAST(pos), ally1, color)
          && !this.NON_EAST_NEIGHBOR_OF_STRING(this.EAST(pos), ally2, color))
          fast_liberties++;

        fast_liberties += this.string[ally1].liberties + this.string[ally2].liberties
          - this.count_common_libs(this.string[ally1].origin, this.string[ally2].origin) - 1;
      }
    }
    /* We are to take captures into account. This case is much more rare, so
     * it is not optimized much.
     */
    else {
      for (let k = 0; k < 4; k++) {
        let neighbor = pos + this.delta[k];

        if (this.LIBERTY(neighbor)
          && (ally1 < 0 || !this.NEIGHBOR_OF_STRING(neighbor, ally1, color))
          && (ally2 < 0 || !this.NEIGHBOR_OF_STRING(neighbor, ally2, color)))
          fast_liberties++;
        else if (this.board[neighbor] === this.OTHER_COLOR(color)	/* A capture */
          && this.LIBERTIES(neighbor) === 1) {
          const neighbor_size = this.COUNTSTONES(neighbor);

          if (neighbor_size === 1 || (neighbor_size === 2 && ally1 < 0))
            fast_liberties++;
          else
            return -1;
        }
      }

      if (ally1 >= 0) {
        fast_liberties += this.string[ally1].liberties - 1;
        if (ally2 >= 0)
          fast_liberties += this.string[ally2].liberties
            - this.count_common_libs(this.string[ally1].origin, this.string[ally2].origin);
      }
    }

    return fast_liberties;
  }



/* Find the liberties a stone of the given color would get if played
 * at (pos), ignoring possible captures of opponent stones. (pos)
 * must be empty. If libs != NULL, the locations of up to maxlib
 * liberties are written into libs[]. The counting of liberties may
 * or may not be halted when maxlib is reached. The number of liberties
 * found is returned.
 *
 * If you want the number or the locations of all liberties, however
 * many they are, you should pass MAXLIBS as the value for maxlib and
 * allocate space for libs[] accordingly.
 */

  getApproxLib(pos, color){
    const entry = {
      threshold: 0,
      liberties: 0,
      position_hash: {
        hashval: 0
      }
    }
    if(this.approxlib_cache[pos]){
      if(!this.approxlib_cache[pos][color]){
        this.approxlib_cache[pos][color] = entry
      }
    }else{
      this.approxlib_cache[pos] = {
        [color]: entry
      }
    }
    return this.approxlib_cache[pos][color]
  }
// 给定颜色在pos落子，获得气信息
  approxlib(pos, color, maxlib, libs) {
    let liberties;

    let entry = this.getApproxLib(pos, color - 1)
    // ASSERT1(board[pos] == EMPTY, pos);
    // ASSERT1(IS_STONE(color), pos);

    if (!libs) {
      /* First see if this result is cached. */
      if (this.hash.is_equal(this.board_hash, entry.position_hash) && maxlib <= entry.threshold) {
        return entry.liberties;
      }

      liberties = this.fastlib(pos, color, 1);
      if (liberties >= 0) {
        /* Since fastlib() always returns precise result and doesn't take
         * `maxlib' into account, we set threshold to MAXLIBS so that this
         * result is used regardless of any `maxlib' passed.
         */
        entry.threshold = this.MAXLIBS;
        entry.liberties = liberties;
        entry.position_hash = this.board_hash;

        return liberties;
      }
    }

    /* We initialize the cache entry threshold to `maxlib'. If do_approxlib()
     * or slow_approxlib() finds all the liberties (that is, they don't use
     * `maxlib' value for an early return), they will set threshold to
     * MAXLIBS themselves.
     */
    entry.threshold = maxlib;

    if (maxlib <= this.MAX_LIBERTIES) {
      liberties = this.do_approxlib(pos, color, maxlib, libs);
    }else {
      liberties = this.slow_approxlib(pos, color, maxlib, libs);
    }
    entry.liberties = liberties;
    entry.position_hash = this.board_hash;

    return liberties;
  }

  /* Does the real work of approxlib(). */
  // 在pos位置落子后气数，上下左右四个方向有气加气，有我方棋串则累加气
  do_approxlib(pos, color, maxlib, libs) {
    let liberties = 0;

    /* Look for empty neighbors and the liberties of the adjacent
     * strings of the given color. The algorithm below won't work
     * correctly if any of the adjacent strings have more than
     * MAX_LIBERTIES liberties AND maxlib is larger than MAX_LIBERTIES.
     * therefore approxlib() calls more robust slow_approxlib() if
     * this might be the case.
     */

    /* Start by marking pos itself so it isn't counted among its own
     * liberties.
     */
    this.liberty_mark++;
    this.MARK_LIBERTY(pos);

    for(let i in directions) {
      const p = this[directions[i]](pos)

      if (this.UNMARKED_LIBERTY(p)) {
        if (libs !== null){
          libs[liberties] = p;
        }
        liberties++;
        /* Stop counting if we reach maxlib. */
        if (liberties >= maxlib){
          return liberties;
        }
        this.MARK_LIBERTY(p);
      }else if (this.board[p] === color) {
        let s = this.string_number[p];
        for (let k = 0; k < this.string[s].liberties; k++) {
          let lib = this.string_libs[s].list[k];
          if (this.UNMARKED_LIBERTY(lib)) {
            if (libs !== null){
              libs[liberties] = lib;
            }
            liberties++;
            if (liberties >= maxlib){
              return liberties;
            }
            this.MARK_LIBERTY(lib);
          }
        }
      }
    }

    /* If we reach here, then we have counted _all_ the liberties, so
     * we set threshold to MAXLIBS (the result is the same regardless
     * of `maxlib' value).
     */
    // if (!libs){
    //   this.approxlib_cache[pos][color - 1].threshold = this.MAXLIBS;
    // }
    return liberties;
  }

  slow_approxlib() {}

  /* Find the liberties a stone of the given color would get if played
   * at (pos). This function takes into consideration all captures. Its
   * return value is exact in that sense it counts all the liberties,
   * unless (maxlib) allows it to stop earlier. (pos) must be empty. If
   * libs != NULL, the locations of up to maxlib liberties are written
   * into libs[]. The counting of liberties may or may not be halted
   * when maxlib is reached. The number of found liberties is returned.
   *
   * This function guarantees that liberties which are not results of
   * captures come first in libs[] array. To find whether all the
   * liberties starting from a given one are results of captures, one
   * may use  if (board[libs[k]] != EMPTY)  construction.
   *
   * If you want the number or the locations of all liberties, however
   * many they are, you should pass MAXLIBS as the value for maxlib and
   * allocate space for libs[] accordingly.
   */
  accuratelib(pos, color, maxlib, libs) {
    let liberties;

    if(!accuratelib_cache[pos]){
      accuratelib_cache[pos] = []
    }
    if(!accuratelib_cache[pos][color - 1]){
      accuratelib_cache[pos][color - 1] = new BoardCacheEntry()
    }
    let entry = accuratelib_cache[pos][color - 1];
    // ASSERT1(board[pos] == EMPTY, pos);
    // ASSERT1(IS_STONE(color), pos);

    if (!libs) {
      /* First see if this result is cached. */
      if (HashData.is_equal(this.board_hash, entry.position_hash) && maxlib <= entry.threshold) {
        return entry.liberties;
      }

      liberties = this.fastlib(pos, color, 0);
      if (liberties >= 0) {
        /* Since fastlib() always returns precise result and doesn't take
         * `maxlib' into account, we set threshold to MAXLIBS so that this
         * result is used regardless of any `maxlib' passed.
         */
        entry.threshold = this.MAXLIBS;
        entry.liberties = liberties;
        entry.position_hash[0] = this.board_hash[0];

        return liberties;
      }
    }

    liberties = this.do_accuratelib(pos, color, maxlib, libs);

    /* If accuratelib() found less than `maxlib' liberties, then its
     * result is certainly independent of `maxlib' and we set threshold
     * to MAXLIBS.
     */
    entry.threshold = liberties < maxlib ? this.MAXLIBS : maxlib;
    entry.liberties = liberties;
    entry.position_hash[0] = this.board_hash[0];

    return liberties;
  }


  /* Does the real work of accuratelib(). */
  do_accuratelib(pos, color, maxlib, libs) {
    let liberties = 0;
    let captured = [];
    let captures = 0;

    this.string_mark++;
    this.liberty_mark++;
    this.MARK_LIBERTY(pos);

    for (let k = 0; k < 4; k++) {
      let pos2 = pos + this.delta[k];
      if (this.UNMARKED_LIBERTY(pos2)) {
        /* A trivial liberty */
        if (libs)
          libs[liberties] = pos2;
        liberties++;
        if (liberties >= maxlib)
          return liberties;

        this.MARK_LIBERTY(pos2);
      }
      else if (this.UNMARKED_COLOR_STRING(pos2, color)) {
        /* An own neighbor string */
        const s = this.string[this.string_number[pos2]];
        const sl = this.string_libs[this.string_number[pos2]];

        if (s.liberties <= this.MAX_LIBERTIES || maxlib <= this.MAX_LIBERTIES - 1) {
          /* The easy case - we already have all (necessary) liberties of
           * the string listed
           */
          for (let l = 0; l < s.liberties; l++) {
            let lib = sl.list[l];
            if (this.UNMARKED_LIBERTY(lib)) {
              if (libs)
                libs[liberties] = lib;
              liberties++;
              if (liberties >= maxlib)
                return liberties;

              this.MARK_LIBERTY(lib);
            }
          }
        }
        else {
          /* The harder case - we need to find all the liberties of the
           * string by traversing its stones. We stop as soon as we have
           * traversed all the stones or have reached maxlib. Unfortunately,
           * we cannot use the trick from findlib() since some of the
           * liberties may already have been marked.
           */
          let stone = pos2;
          do {
            if (this.UNMARKED_LIBERTY(this.SOUTH(stone))) {
              if (libs)
                libs[liberties] = this.SOUTH(stone);
              liberties++;
              if (liberties >= maxlib)
                return liberties;

              this.MARK_LIBERTY(this.SOUTH(stone));
            }

            if (this.UNMARKED_LIBERTY(this.WEST(stone))) {
              if (libs)
                libs[liberties] = this.WEST(stone);
              liberties++;
              if (liberties >= maxlib)
                return liberties;

              this.MARK_LIBERTY(this.WEST(stone));
            }

            if (this.UNMARKED_LIBERTY(this.NORTH(stone))) {
              if (libs)
                libs[liberties] = this.NORTH(stone);
              liberties++;
              if (liberties >= maxlib)
                return liberties;

              this.MARK_LIBERTY(this.NORTH(stone));
            }

            if (this.UNMARKED_LIBERTY(this.EAST(stone))) {
              if (libs)
                libs[liberties] = this.EAST(stone);
              liberties++;
              if (liberties >= maxlib)
                return liberties;

              this.MARK_LIBERTY(this.EAST(stone));
            }

            stone = this.NEXT_STONE(stone);
          } while (stone !== pos2);
        }

        this.MARK_STRING(pos2);
      }
      else if (this.board[pos2] === this.OTHER_COLOR(color)
        && this.string[this.string_number[pos2]].liberties === 1) {
        /* A capture. */
        captured[captures++] = pos2;
      }
    }

    /* Now we look at all the captures found in the previous step */
    for (let k = 0; k < captures; k++) {
      let lib = captured[k];

      /* Add the stone adjacent to (pos) to the list of liberties if
       * it is not also adjacent to an own marked string (otherwise,
       * it will be added later).
       */
      if (!this.MARKED_COLOR_STRING(this.SOUTH(lib), color)
        && !this.MARKED_COLOR_STRING(this.WEST(lib), color)
        && !this.MARKED_COLOR_STRING(this.NORTH(lib), color)
        && !this.MARKED_COLOR_STRING(this.EAST(lib), color)) {
        if (libs)
          libs[liberties] = lib;
        liberties++;
        if (liberties >= maxlib)
          return liberties;
      }

      let l
      /* Check if we already know of this capture. */
      for (l = 0; l < k; l++)
        if (this.string_number[captured[l]] === this.string_number[lib])
          break;

      if (l === k) {
        /* Traverse all the stones of the capture and add to the list
         * of liberties those, which are adjacent to at least one own
         * marked string.
         */
        do {
          if (this.MARKED_COLOR_STRING(this.SOUTH(lib), color)
            || this.MARKED_COLOR_STRING(this.WEST(lib), color)
            || this.MARKED_COLOR_STRING(this.NORTH(lib), color)
            || this.MARKED_COLOR_STRING(this.EAST(lib), color)) {
            if (libs)
              libs[liberties] = lib;
            liberties++;
            if (liberties >= maxlib)
              return liberties;
          }

          lib = this.NEXT_STONE(lib);
        } while (lib !== captured[k]);
      }
    }

    return liberties;
  }


  /* Find the number of common liberties of the two strings at str1 and str2.
   */
  count_common_libs(str1, str2) {
    let libs1;
    let all_libs1 = []
    let commonlibs = 0

    // ASSERT_ON_BOARD1(str1);
    // ASSERT_ON_BOARD1(str2);
    // ASSERT1(IS_STONE(board[str1]), str1);
    // ASSERT1(IS_STONE(board[str2]), str2);

    let n = this.string_number[str1];
    let liberties1 = this.string[n].liberties;

    if (liberties1 > this.string[this.string_number[str2]].liberties) {
      n = this.string_number[str2];
      liberties1 = this.string[n].liberties;
      let tmp = str1;
      str1 = str2;
      str2 = tmp;
    }

    if (liberties1 <= this.MAX_LIBERTIES) {
      /* Speed optimization: don't copy liberties with findlib */
      libs1 = this.string_libs[n].list;
      n = this.string_number[str2];
      let liberties2 = this.string[n].liberties;

      if (liberties2 <= this.MAX_LIBERTIES) {
        /* Speed optimization: NEIGHBOR_OF_STRING is quite expensive */
        this.liberty_mark++;

        for (let k = 0; k < liberties1; k++)
          this.MARK_LIBERTY(libs1[k]);

        libs1 = this.string_libs[n].list;
        for (let k = 0; k < liberties2; k++)
          if (!this.UNMARKED_LIBERTY(libs1[k]))
            commonlibs++;

        return commonlibs;
      }
    }
    else {
      this.findlib(str1, this.MAXLIBS, all_libs1);
      libs1 = all_libs1;
    }

    for (let k = 0; k < liberties1; k++)
      if (this.NEIGHBOR_OF_STRING(libs1[k], this.string_number[str2], this.board[str2]))
        commonlibs++;

    return commonlibs;
  }

  countstones(str) {
    // ASSERT_ON_BOARD1(str);
    // ASSERT1(IS_STONE(board[str]), str);
    return this.COUNTSTONES(str);
  }

  /* Find the stones of the string at str. str must not be
   * empty. The locations of up to maxstones stones are written into
   * stones[]. The full number of stones is returned.
   */
  findstones(str, maxstones, stones) {
    // ASSERT_ON_BOARD1(str);
    // ASSERT1(IS_STONE(board[str]), str);

    const s = this.string_number[str];
    const size = this.string[s].size;

    /* Traverse the stones of the string, by following the cyclic chain. */
    let pos = this.FIRST_STONE(s);
    for (let k = 0; k < maxstones && k < size; k++) {
      stones[k] = pos;
      pos = this.NEXT_STONE(pos);
    }

    return size;
  }

  count_adjacent_stones(str1, str2, maxstones){
    let count = 0;

    // ASSERT_ON_BOARD1(str1);
    // ASSERT1(IS_STONE(board[str1]), str1);
    // ASSERT_ON_BOARD1(str2);
    // ASSERT1(IS_STONE(board[str2]), str2);

    const s1 = this.string_number[str1];
    const s2 = this.string_number[str2];
    const size = this.string[s1].size;

    /* Traverse the stones of the string, by following the cyclic chain. */
    let pos = this.FIRST_STONE(s1);
    for (let k = 0; k < size && count < maxstones; k++) {
      if (this.NEIGHBOR_OF_STRING(pos, s2, this.board[str2]))
        count++;
      pos = this.NEXT_STONE(pos);
    }

    return count;
  }

  // 获取棋串相邻的棋串数量
  chainlinks(str, adj) {
    // ASSERT1(IS_STONE(board[str]), str);

    /* We already have the list ready, just copy it and fill in the
     * desired information.
     */
    const s = this.string[this.string_number[str]];
    const sn = this.string_neighbors[this.string_number[str]];
    for (let k = 0; k < s.neighbors; k++){
      adj[k] = this.string[sn.list[k]].origin;
    }

    return s.neighbors;
  }

  // 获取棋串相邻的具有指定气数的棋串数量
  chainlinks2(str, adj, lib) {
    // ASSERT1(IS_STONE(board[str]), str);

    /* We already have the list ready, just copy the strings with the
     * right number of liberties.
     */
    let neighbors = 0;
    const s = this.string[this.string_number[str]];
    const sn = this.string_neighbors[this.string_number[str]];
    for (let k = 0; k < s.neighbors; k++) {
      let t = this.string[sn.list[k]];
      if (t.liberties === lib){
        adj[neighbors++] = t.origin;
      }
    }
    return neighbors;
  }

  chainlinks3() {}

  extended_chainlinks() {}

  send_two_return_one() {}

  find_origin(str) {
    return this.string[this.string_number[str]].origin;
  }

  // 是否是自紧气到自杀
  is_self_atari(pos, color) {
    const other = this.OTHER_COLOR(color);
    /* number of empty neighbors */
    let trivial_liberties = 0;
    /* number of captured opponent strings */
    let captures = 0;
    /* Whether there is a friendly neighbor with a spare liberty. If it
     * has more than one spare liberty we immediately return 0.
     */
    let far_liberties = 0;

    // ASSERT_ON_BOARD1(pos);
    // ASSERT1(board[pos] == EMPTY, pos);
    // ASSERT1(IS_STONE(color), pos);

    /* 1. Try first to solve the problem without much work. */
    this.string_mark++;


    for(let i in directions) {
      const p = this[directions[i]](pos)

      if (this.LIBERTY(p)){
        trivial_liberties++;
      }
      else if (this.board[p] === color) {
        if (this.LIBERTIES(p) > 2){
          // 气足够多
          return 0;
        }
        if (this.LIBERTIES(p) === 2){
          far_liberties++;
        }
      }
      else if (this.board[p] === other && this.LIBERTIES(p) === 1 && this.UNMARKED_STRING(p)) {
        captures++;
        this.MARK_STRING(p);
      }
    }

    /* Each captured string is guaranteed to produce at least one
     * liberty. These are disjoint from both trivial liberties and far
     * liberties. The two latter may however coincide.
     */
    if (trivial_liberties + captures >= 2){
      return 0;
    }

    //
    if (far_liberties > 0 && far_liberties + captures >= 2){
      return 0;
    }

    if (captures === 0 && far_liberties + trivial_liberties <= 1){
      return 1;
    }

    /* 2. It was not so easy.  We use accuratelib() in this case. */
    return this.accuratelib(pos, color, 2, null) <= 1;
  }


  liberty_of_string(pos, str) {
    if (this.IS_STONE(this.board[pos])){
      return 0;
    }

    return this.NEIGHBOR_OF_STRING(pos, this.string_number[str], this.board[str]);
  }

  second_order_liberty_of_string(pos, str) {
    for (let k = 0; k < 4; k++){
      if (this.board[pos + this.delta[k]] === colors.EMPTY
       && this.NEIGHBOR_OF_STRING(pos + this.delta[k], this.string_number[str], this.board[str])){
        return 1;
      }
    }
    return 0;
  }

  neighbor_of_string(pos, str) {
    const color = this.board[str];
    return this.NEIGHBOR_OF_STRING(pos, this.string_number[str], color);
  }

  has_neighbor(pos, color) {
    return (this.board[this.SOUTH(pos)] === color
    || this.board[this.WEST(pos)] === color
    || this.board[this.NORTH(pos)] === color
    || this.board[this.EAST(pos)] === color);
  }

  same_string(str1, str2) {
    return this.string_number[str1] === this.string_number[str2];
  }

  adjacent_strings() {}

  is_ko() {}

  is_ko_point() {}

  is_superko_violation() {}

  does_capture_something() {}

  mark_string() {}

  move_in_stack() {}

  get_move_from_stack() {}

  stones_on_board(color) {
    // gg_assert(stackp == 0);

    if (this.stone_count_for_position !== this.position_number) {
      this.white_stones = 0;
      this.black_stones = 0;
      for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++) {
        if (this.board[pos] === colors.WHITE){
          this.white_stones++;
        }
        else if (this.board[pos] === colors.BLACK){
          this.black_stones++;
        }
      }

      this.stone_count_for_position = this.position_number;
    }

    return ((color & colors.BLACK ? this.black_stones : 0) + (color & colors.WHITE ? this.white_stones : 0));
  }


  /* This function should be called if the board is modified by other
 * means than do_play_move() or undo_trymove().
 *
 * We have reached a new position. Increase the position counter and
 * re-initialize the incremental strings.
 *
 * Set up incremental board structures and populate them with the
 * strings available in the position given by board[]. Clear the stacks
 * and start the mark numbers from zero. All undo information is lost
 * by calling this function.
 */
  new_position() {
    this.position_number++;
    // next_string： 生成string的string_number自增序号
    this.next_string = 0;
    this.liberty_mark = 0;
    this.string_mark = 0;
    // CLEAR_STACKS();
    this.change_stack = []
    this.vertex_stack = []

    this.string = {}
    this.string_libs = {}
    this.string_neighbors = {}
    this.ml = {}

    // 初始化： 未赋值棋子 string_number = -1.
    for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++){
      if (this.ON_BOARD(pos)){
        this.string_number[pos] = -1;
      }
    }

    /* Find the existing strings. */
    for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++) {
      if (!this.ON_BOARD(pos)){
        continue;
      }
      if (this.IS_STONE(this.board[pos]) && this.string_number[pos] === -1) {
        this.string_number[pos] = this.next_string;

        this.string[this.next_string] = new StringData({
          size: this.propagate_string(pos, pos),
          color : this.board[pos],
          origin: pos,
          mark: 0
        })

        this.next_string++;
      }
    }

    /* Fill in liberty and neighbor info. */
    for (let s = 0; s < this.next_string; s++) {
      this.find_liberties_and_neighbors(s);
    }
  }

  // 递归：棋串size、位置
  propagate_string(stone, str) {
    let size = 1;

    if (stone === str) {
      /* Start a new string. */
      this.next_stone[stone] = stone;
    } else {
      /* Link the stone at (stone) to the string including (str) */
      this.string_number[stone] = this.string_number[str];
      this.next_stone[stone] = this.next_stone[str];
      this.next_stone[str] = stone;
    }

    /* Look in all four directions for more stones to add. */
    for (let k = 0; k < 4; k++) {
      let d = this.delta[k];
      if (this.ON_BOARD(stone + d) && this.board[stone + d] === this.board[stone] && this.string_number[stone + d] === -1){
        size += this.propagate_string(stone + d, str);
      }
    }

    return size;
  }

  // 建立棋串的气、撞气信息
  find_liberties_and_neighbors (s) {
    const other = this.OTHER_COLOR(this.string[s].color);

    /* Clear the marks. */
    // 本次遍历的mark值， 保证遍历气或撞气时不会重复添加
    this.liberty_mark++;
    this.string_mark++;

    /* Traverse the stones of the string, by following the cyclic chain. */
    let pos = this.FIRST_STONE(s);

    do {
      /* Look in each direction for new liberties or new neighbors. Mark
       * already visited liberties and neighbors.
       */
      for(let i in directions){
        const p = this[directions[i]](pos)
        if(this.UNMARKED_LIBERTY(p)){
          this.ADD_AND_MARK_LIBERTY(s, p);
        }else if (this.UNMARKED_COLOR_STRING(p, other)){
          // 撞气
          this.ADD_NEIGHBOR(s, p);
          this.MARK_STRING(p);
        }
      }

      pos = this.NEXT_STONE(pos);
    } while (!this.BACK_TO_FIRST_STONE(s, pos));
  }

  /* Update the liberties of a string from scratch, first pushing the
   * old information.
   */
  update_liberties(s) {
    /* Push the old information. */
    this.pushValue(this.string[s], 'liberties')
    for (let k = 0; k < this.string[s].liberties && k < this.MAX_LIBERTIES; k++) {
      this.pushValue(this.string_libs[s].list, k)
    }
    this.string[s].liberties = 0;

    /* Clear the liberty mark. */
    this.liberty_mark++;

    /* Traverse the stones of the string, by following the cyclic chain. */
    let pos = this.FIRST_STONE(s);
    do {
      /* Look in each direction for new liberties. Mark already visited
       * liberties.
       */
      for(let i in directions){
        const p = this[directions[i]](pos)
        if(this.UNMARKED_LIBERTY(p)){
          this.ADD_AND_MARK_LIBERTY(s, p);
        }
      }

      pos = this.NEXT_STONE(pos);
    } while (!this.BACK_TO_FIRST_STONE(s, pos));
  }


  /* Remove a string from the list of neighbors and push the changed
   * information.
   */
  remove_neighbor(str_number, n) {
    let s = this.string[str_number];
    let sn = this.string_neighbors[str_number];
    for (let k = 0; k < s.neighbors; k++){
      if (sn.list[k] === n) {
        /* We need to push the last entry too because it may become
         * destroyed later.
         */
        this.pushValue(sn.list, s.neighbors - 1)
        this.pushValue(sn.list, k)
        this.pushValue(s, 'neighbors')
        sn.list[k] = sn.list[s.neighbors - 1];
        s.neighbors--;
        break;
      }
    }
  }


  /* Remove one liberty from the list of liberties, pushing changed
   * information. If the string had more liberties than the size of the
   * list, rebuild the list from scratch.
   */
  remove_liberty(str_number, pos) {
    let s = this.string[str_number];
    let sl = this.string_libs[str_number];

    if (s.liberties > this.MAX_LIBERTIES){
      this.update_liberties(str_number);
    } else {
      for (let k = 0; k < s.liberties; k++) {
        if (sl.list[k] === pos) {
          /* We need to push the last entry too because it may become
           * destroyed later.
           */
          this.pushValue(sl.list, s.liberties - 1)
          this.pushValue(sl.list, k)
          this.pushValue(sl, 'liberties')

          sl.list[k] = sl.list[s.liberties - 1];
          s.liberties--;
          break;
        }
      }
    }
  }

  /* Remove a string from the board, pushing necessary information to
   * restore it. Return the number of removed stones.
   */
  // 两子以内，简单更新撞气信息；否则重新计算撞气信息
  do_remove_string(s, captured) {
    const size = this.string[s].size;

    /* Traverse the stones of the string, by following the cyclic chain. */
    let pos = this.FIRST_STONE(s);
    do {
      /* Push color, string number and cyclic chain pointers. */
      this.pushValue(this.string_number, pos);
      this.pushValue(this.next_stone, pos);
      this.DO_REMOVE_STONE(pos);
      captured.push(pos)
      pos = this.NEXT_STONE(pos);
    } while (!this.BACK_TO_FIRST_STONE(s, pos));

    /* The neighboring strings have obtained some new liberties and lost
     * a neighbor.  For speed reasons we handle two most common cases
     * when string size is 1 or 2 stones here instead of calling
     * update_liberties().
     */
    if (size === 1) {
      for (let k = 0; k < this.string[s].neighbors; k++) {
        const neighbor = this.string_neighbors[s].list[k];

        this.remove_neighbor(neighbor, s);
        this.pushValue(this.string[neighbor], 'liberties');

        if (this.string[neighbor].liberties < this.MAX_LIBERTIES){
          this.string_libs[neighbor].list[this.string[neighbor].liberties] = pos;
        }
        this.string[neighbor].liberties++;
      }
    } else if (size === 2) {
      let other = this.OTHER_COLOR(this.string[s].color);
      let pos2 = this.NEXT_STONE(pos);

      for (let k = 0; k < this.string[s].neighbors; k++) {
        const neighbor = this.string_neighbors[s].list[k];

        this.remove_neighbor(neighbor, s);
        this.pushValue(this.string[neighbor], 'liberties');

        //相邻是撞气
        if (this.NEIGHBOR_OF_STRING(pos, neighbor, other)) {
          if (this.string[neighbor].liberties < this.MAX_LIBERTIES)
            this.string_libs[neighbor].list[this.string[neighbor].liberties] = pos;
          this.string[neighbor].liberties++;
        }

        if (this.NEIGHBOR_OF_STRING(pos2, neighbor, other)) {
          if (this.string[neighbor].liberties < this.MAX_LIBERTIES)
            this.string_libs[neighbor].list[this.string[neighbor].liberties] = pos2;
          this.string[neighbor].liberties++;
        }
      }
    }
    else {
      for (let k = 0; k < this.string[s].neighbors; k++) {
        this.remove_neighbor(this.string_neighbors[s].list[k], s);
        this.update_liberties(this.string_neighbors[s].list[k]);
      }
    }

    /* Update the number of captured stones. These are assumed to
     * already have been pushed.
     */
    if (this.string[s].color === colors.WHITE){
      this.white_captured += size;
    } else {
      this.black_captured += size;
    }

    return size;
  }

  /* We have played an isolated new stone and need to create a new
   * string for it.
   */
  create_new_string(pos) {
    const color = this.board[pos];
    const other = this.OTHER_COLOR(color);

    /* Get the next free string number. */
    this.pushValue(this, 'next_string');
    let s = this.next_string++;
    // 断言：s < MAX_STRINGS
    this.string_number[pos] = s;
    /* Set up a size one cycle for the string. */
    this.next_stone[pos] = pos;

    /* Set trivially known values and initialize the rest to zero. */
    this.string[s] = new StringData({
      size: 1,
      color,
      origin: pos,
      mark: 0
    })

    /* Clear the string mark. */
    this.string_mark++;

    /* In each direction, look for a liberty or a nonmarked opponent
     * neighbor. Mark visited neighbors. There is no need to mark the
     * liberties since we can't find them twice. */

    for(let i in directions){
      const p = this[directions[i]](pos)
      if(this.LIBERTY(p)){
        this.ADD_LIBERTY(s, p);
      }else if (this.UNMARKED_COLOR_STRING(p, other)){
        const s2 = this.string_number[p];
        /* Add the neighbor to our list. */
        this.ADD_NEIGHBOR(s, p);
        /* Add us to our neighbor's list. */
        this.pushValue(this.string[s2], 'neighbors');
        this.ADD_NEIGHBOR(s2, pos);
        this.MARK_STRING(p);
      }
    }
  }

  /* We have played a stone with exactly one friendly neighbor. Add the
   * new stone to that string.
   */
  // pos落子周边有唯一我方棋串
  extend_neighbor_string(pos, s) {
    let liberties_updated = 0;
    const color = this.board[pos];
    const other = this.OTHER_COLOR(color);

    /* Link in the stone in the cyclic list. */
    // 更新棋子循环列表
    const pos2 = this.string[s].origin;
    this.next_stone[pos] = this.next_stone[pos2];
    this.pushValue(this.next_stone, pos2);
    this.next_stone[pos2] = pos;

    /* Do we need to update the origin? */
    // 更新origin，保持pos为当前棋串棋子最小
    if (pos < pos2) {
      this.pushValue(this.string[s], 'origin');
      this.string[s].origin = pos;
    }

    this.string_number[pos] = s;

    /* The size of the string has increased by one. */
    this.pushValue(this.string[s], 'size');
    this.string[s].size++;

    /* If s has too many liberties, we don't know where they all are and
     * can't update the liberties with the algorithm we otherwise
     * use. In that case we can only recompute the liberties from
     * scratch.
     */
    if (this.string[s].liberties > this.MAX_LIBERTIES) {
      this.update_liberties(s);
      liberties_updated = 1;
    } else {
      /* The place of the new stone is no longer a liberty. */
      this.remove_liberty(s, pos);
    }

    /* Mark old neighbors of the string. */
    this.string_mark++;
    for (let k = 0; k < this.string[s].neighbors; k++)
      this.string[this.string_neighbors[s].list[k]].mark = this.string_mark;

    /* Look at the neighbor locations of pos for new liberties and/or
     * neighbor strings.
     */

    /* If we find a liberty, look two steps away to determine whether
     * this already is a liberty of s.
     */
    for(let i in directions){
      const p = this[directions[i]](pos)
      const func = this[`NON_${directions[i]}_NEIGHBOR_OF_STRING`]
      // pos南边是气， 合并棋串气<=8,
      if (this.LIBERTY(p)) {
        if (!liberties_updated && !func.call(this, p, s, color))  {
          this.ADD_LIBERTY(s, p);
        }
      } else if (this.UNMARKED_COLOR_STRING(p, other)) {
        // 我方、敌方棋串增加撞气
        const s2 = this.string_number[p];
        this.pushValue(this.string[s], 'neighbors');
        this.ADD_NEIGHBOR(s, p);
        this.pushValue(this.string[s2], 'neighbors');
        this.ADD_NEIGHBOR(s2, pos);
        this.MARK_STRING(p);
      }
    }
  }



  /* Incorporate the string at pos with the string s.
   */
  assimilate_string(s, pos) {
    let last;
    const s2 = this.string_number[pos];
    this.string[s].size += this.string[s2].size;

    /* Walk through the s2 stones and change string number. Also pick up
     * the last stone in the cycle for later use.
     */
    pos = this.FIRST_STONE(s2);
    do {
      this.pushValue(this.string_number, pos);
      this.string_number[pos] = s;
      last = pos;
      pos = this.NEXT_STONE(pos);
    } while (!this.BACK_TO_FIRST_STONE(s2, pos));

    /* Link the two cycles together. */
    let pos2 = this.string[s].origin;
    this.pushValue(this.next_stone, 'last');
    this.pushValue(this.next_stone,'pos2');
    this.next_stone[last] = this.next_stone[pos2];
    this.next_stone[pos2] = this.string[s2].origin;

    /* Do we need to update the origin? */
    if (this.string[s2].origin < pos2){
      this.string[s].origin = this.string[s2].origin;
    }

    /* Pick up the liberties of s2 that we don't already have.
     * It is assumed that the liberties of s have been marked before
     * this function is called.
     */
    if (this.string[s2].liberties <= this.MAX_LIBERTIES) {
      for (let k = 0; k < this.string[s2].liberties; k++) {
        pos2 = this.string_libs[s2].list[k];
        if (this.UNMARKED_LIBERTY(pos2)) {
          this.ADD_AND_MARK_LIBERTY(s, pos2);
        }
      }
    } else {
      /* If s2 had too many liberties the above strategy wouldn't be
       * effective, since not all liberties are listed in
       * libs[] the chain of stones for s2 is no
       * longer available (it has already been merged with s) so we
       * can't reconstruct the s2 liberties. Instead we capitulate and
       * rebuild the list of liberties for s (including the neighbor
       * strings assimilated so far) from scratch.
       */
      this.liberty_mark++;          /* Reset the mark. */
      this.string[s].liberties = 0; /* To avoid pushing the current list. */
      this.update_liberties(s);
    }

    /* Remove s2 as neighbor to the neighbors of s2 and instead add s if
     * they don't already have added it. Also add the neighbors of s2 as
     * neighbors of s, unless they already have been added. The already
     * known neighbors of s are assumed to have been marked before this
     * function is called.
     */
    for (let k = 0; k < this.string[s2].neighbors; k++) {
      const t = this.string_neighbors[s2].list[k];
      this.remove_neighbor(t, s2);
      if (this.string[t].mark !== this.string_mark) {
        this.pushValue(this.string[t], 'neighbors');
        this.string_neighbors[t].list[this.string[t].neighbors++] = s;

        if(!this.string_neighbors[s]){
          this.string_neighbors[s] = new StringPosData()
        }
        this.string_neighbors[s].list[this.string[s].neighbors++] = t;
        this.string[t].mark = this.string_mark;
      }
    }
  }


  /* Create a new string for the stone at pos and assimilate all
   * friendly neighbor strings.
   */
  assimilate_neighbor_strings(pos) {
    const color = this.board[pos];
    const other = this.OTHER_COLOR(color);

    /* Get the next free string number. */
    this.pushValue(this, 'next_string');
    let s = this.next_string++;
    // PARANOID1(s < MAX_STRINGS, pos);
    this.string_number[pos] = s;
    /* Set up a size one cycle for the string. */
    this.next_stone[pos] = pos;

    /* Set trivially known values and initialize the rest to zero. */
    this.string[s] = new StringData({
      size: 1,
      color,
      origin: pos,
      mark: 0
    })

    /* Clear the marks. */
    this.liberty_mark++;
    this.string_mark++;

    /* Mark ourselves. */
    this.string[s].mark = this.string_mark;

    /* Look in each direction for
     *
     * 1. liberty: Add if not already visited.
     * 2. opponent string: Add it among our neighbors and us among its
     *    neighbors, unless already visited.
     * 3. friendly string: Assimilate.
     */
    for(let i in directions) {
      const p = this[directions[i]](pos)

      if (this.UNMARKED_LIBERTY(p)) {
        this.ADD_AND_MARK_LIBERTY(s, p);
      } else if (this.UNMARKED_COLOR_STRING(p, other)) {
        this.ADD_NEIGHBOR(s, p);
        this.pushValue(this.string[this.string_number[p]], 'neighbors');
        this.ADD_NEIGHBOR(this.string_number[p], pos);
        this.MARK_STRING(p);
      } else if (this.UNMARKED_COLOR_STRING(p, color)) {
        this.assimilate_string(s, p);
      }
    }
  }


  /* Play a move without legality checking. This is a low-level function,
  * it assumes that the move is not a suicide. Such cases must be handled
  * where the function is called.
  */
  do_play_move(pos, color) {
    const other = this.OTHER_COLOR(color);
    let captured_stones = [];
    let neighbor_allies = 0;
    let s = -1;

    /* Clear string mark. */
    this.string_mark++;

    /* Put down the stone.  We also set its string number to -1 for a while
     * so that NEIGHBOR_OF_STRING() and friends don't get confused with the
     * stone.
     */
    this.pushVertex(pos)
    this.board[pos] = color;
    this.hash.invert_stone(this.board_hash, pos, color)

    this.string_number[pos] = -1;

    /* Look in all directions. Count the number of neighbor strings of the same
     * color, remove captured strings and remove `pos' as liberty for opponent
     * strings that are not captured.
     */

    for(let i in directions){
      const p = this[directions[i]](pos)

      const judge1 = i === 0 ? this.board[p] === color : this.UNMARKED_COLOR_STRING(p, color)
      const judge2 = i === 0 ? this.board[p] === other : this.UNMARKED_COLOR_STRING(p, other)

      if (judge1) {
        neighbor_allies++;
        s = this.string_number[p];
        this.MARK_STRING(p);
      } else if (judge2) {
        if (this.LIBERTIES(p) > 1) {
          this.remove_liberty(this.string_number[p], pos);
          this.MARK_STRING(p);
        } else{
          this.do_remove_string(this.string_number[p], captured_stones);
        }
      }
    }

    /* Choose strategy depending on the number of friendly neighbors. */
    if (neighbor_allies === 0){
      this.create_new_string(pos);
    } else if (neighbor_allies === 1) {
      // gg_assert(s >= 0);
      this.extend_neighbor_string(pos, s);
      return captured_stones; /* can't be a ko, we're done */
    } else {
      // 我方棋串合并
      this.assimilate_neighbor_strings(pos);
      return captured_stones; /* can't be a ko, we're done */
    }

    /* Check whether this move was a ko capture and if so set
     * board_ko_pos.
     *
     * No need to push board_ko_pos on the stack,
     * because this has been done earlier.
     */
    // 打劫： 1口气，1个子，吃了1个子， 记录 board_ko_pos
    s = this.string_number[pos];
    if (this.string[s].liberties === 1 && this.string[s].size === 1 && captured_stones.length === 1) {
      /* In case of a double ko: clear old ko position first. */
      if (this.board_ko_pos !== NO_MOVE){
        this.hash.invert_ko(this.board_hash, this.board_ko_pos)
      }
      this.board_ko_pos = this.string_libs[s].list[0];
      this.hash.invert_ko(this.board_hash, this.board_ko_pos);
    }

    return captured_stones
  }
}


export default Board