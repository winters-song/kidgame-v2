import {
  colors, NO_MOVE,
  suicide_rules,
  ko_rules
} from './Constants'
import Hash from './Hash'
import {StringData, Utils} from './BoardUtils'
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

class Board {

  constructor(boardSize) {
    Object.assign(this, Utils)

    this.initConstants(boardSize)
    this.initParams()
    this.clear_board()
  }

  initConstants(boardSize) {

    // this.MIN_BOARD = 1
    this.MAX_BOARD = boardSize
    // this.MAX_HANDICAP = 9
    this.MAX_MOVE_HISTORY = 500

    this.DEFAULT_BOARD_SIZE = this.MAX_BOARD

    // n子棋串最多有2(n+1)口气，N^2棋盘上气的上限是 2/3 (N^2+1)
    // this.MAXLIBS = 2*(this.MAX_BOARD * this.MAX_BOARD + 1)/3
    this.MAX_LIBERTIES = 8
    // this.MAX_STRINGS = 4 * this.MAX_BOARD * this.MAX_BOARD / 5
    // this.MAXSTACK = this.MAX_BOARD * this.MAX_BOARD
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
    // this.shadow = new Array(this.BOARDSIZE)
    this.board_hash = {}
    this.hash = new Hash(this.BOARDMIN, this.BOARDMAX)
    this.hash.init()

    this.position_number = 0
    this.stackp = 0

    //static data structures
    // 棋串字典 ：BOARDMAX, 位置pos映射棋串index
    this.string_number = {}
    // 棋串内棋子（循环链表)
    this.next_stone = {}
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
    // new_position();

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


  // trymove(pos, color, message, str) {
  //   return do_trymove(pos, color, 0)
  // }

  // tryko(pos, color, message) {
  //   return do_trymove(pos, color, 1)
  // }

  // do_trymove(pos, color, ignore_ko) {
  //   if (pos !== PASS_MOVE) {
  //     /* Update the reading tree shadow. */
  //     // shadow[pos] = 1;

  //     /* 3. The location must be empty. */
  //     if (board[pos] !== colors.EMPTY){
  //       return 0;
  //     }

  //     /* 4. The location must not be the ko point, unless ignore_ko == 1. */
  //     if (!ignore_ko && pos === this.board_ko_pos) {
  //       if (this.board[WEST(pos)] === OTHER_COLOR(color) || this.board[EAST(pos)] == OTHER_COLOR(color)) {
  //         return 0;
  //       }
  //     }

  //     /* 5. Test for suicide. */
  //     if (this.is_suicide(pos, color)){
  //       return 0;
  //     }
  //   }

    /* Check for stack overflow. */
    // if (stackp >= MAXSTACK-2) {
    //   fprintf(stderr,
    //     "gnugo: Truncating search. This is beyond my reading ability!\n");
    //   /* FIXME: Perhaps it's best to just assert here and be done with it? */
    //   if (0) {
    //     ASSERT1(0 && "trymove stack overflow", pos);
    //   }
    //   #if 0
    //   if (verbose > 0) {
    //     showboard(0);
    //     dump_stack();
    //   }
    //   #endif
    //   fflush(stderr);
    //   return 0;
    // }


  //   /* Only count trymove when we do create a new position. */
  //   trymove_counter++;

  //   /* So far, so good. Now push the move on the move stack. These are
  //    * needed for dump_stack().
  //    */
  //   stack[stackp] = pos;
  //   move_color[stackp] = color;

  //   this.really_do_trymove(pos, color);

  //   return 1;
  // }

  popgo() {
    // undo_trymove();
  }

  undo_trymove() {
    // POP_MOVE();
    // POP_VERTICES();

    // stackp--;
    // memcpy(&board_hash, &(board_hash_stack[stackp]), sizeof(board_hash));
  }

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
    this.next_string = 0;
    this.liberty_mark = 0;
    this.string_mark = 0;
    // CLEAR_STACKS();

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

  // 建立棋串的气、相邻
  find_liberties_and_neighbors (s) {
    const other = this.OTHER_COLOR(this.string[s].color);

    /* Clear the marks. */
    // 本次遍历的mark值， 保证遍历气或撞气时不会重复添加
    this.liberty_mark++;
    this.string_mark++;

    /* Traverse the stones of the string, by following the cyclic chain. */
    let pos = this.FIRST_STONE(s);

    const directions = ['SOUTH', 'WEST', 'NORTH', 'EAST']
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
  if (this.is_superko_violation(pos, color, this.ko_rule))
    return 0;
  
  return 1;
}
}


export default Board