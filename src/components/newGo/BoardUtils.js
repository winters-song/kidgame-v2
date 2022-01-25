import {colors} from "./Constants";

/* Incremental string data. */
// string_data
export class StringData {
  color = null
  size = 0
  origin = null
  liberties = 0
  neighbors = 0
  mark = null

  constructor(cfg) {
    Object.assign(this, cfg)
  }
};

// string_liberties_data + string_neighbors_data
export class StringPosData {
  list = []
}

export const Utils = {
  OTHER_COLOR (color) {
    return colors.WHITE + colors.BLACK - color
  },
  IS_STONE (arg) {
    return arg === colors.WHITE || arg === colors.BLACK
  },
  POS (i, j) {
    return (this.MAX_BOARD + 2) + i * (this.MAX_BOARD + 1) + j
  },
  DELTA (di, dj) {
    return di * (this.MAX_BOARD + 1) + dj
  },
  I (pos) {
    return Math.floor(pos / (this.MAX_BOARD + 1)) - 1
  },
  J (pos) {
    return pos % (this.MAX_BOARD + 1) - 1
  },
  SOUTH (pos) {
    return pos + this.NS
  },
  WEST (pos) {
    return pos - 1
  },
  NORTH (pos) {
    return pos - this.NS
  },
  EAST (pos) {
    return pos + 1
  },
  SW (pos) {
    return pos + this.NS - 1
  },
  NW (pos) {
    return pos - this.NS - 1
  },
  NE (pos) {
    return pos - this.NS + 1
  },
  SE (pos) {
    return pos + this.NS + 1
  },
  SS (pos) {
    return pos + 2 * this.NS
  },
  WW (pos) {
    return pos - 2
  },
  NN (pos) {
    return pos - 2 * this.NS
  },
  EE (pos) {
    return pos + 2
  },

  // 上下左右
  DIRECT_NEIGHBORS (pos1, pos2)	{
    return pos1 === this.SOUTH(pos2) || pos1 === this.WEST(pos2) || pos1 === this.NORTH(pos2) || pos1 === this.EAST(pos2)
  },
  DIAGONAL_NEIGHBORS (pos1, pos2)	{
    return pos1 === this.SW(pos2) || pos1 === this.NW(pos2) || pos1 === this.NE(pos2) || pos1 === this.SE(pos2)
  },
  BOARD (i, j) {
    return this.board[this.POS(i, j)]
  },
  MIRROR_MOVE  (pos) {
    return this.POS(this.board_size - 1 - this.I(pos), this.board_size - 1 - this.J(pos))
  },

  ON_BOARD2 (i, j) {
    return i>=0 && j>=0 && i < this.board_size && j < this.board_size
  },
  ON_BOARD1 (pos) {
    return pos < this.BOARDSIZE && this.board[pos] !== colors.GRAY
  },

  // 用于遍历数组中，无需判断index边界
  ON_BOARD (pos) {
    return this.board[pos] !== colors.GRAY
  },

  ASSERT_ON_BOARD1(pos) {
    this.ASSERT1(this.ON_BOARD1(pos), pos)
  },

  FIRST_STONE (s){
    return this.string[s].origin
  },

  NEXT_STONE (pos) {
    return this.next_stone[pos]
  },

  BACK_TO_FIRST_STONE (s, pos) {
    return pos === this.string[s].origin
  },

  LIBERTY (pos) {
    return this.board[pos] === colors.EMPTY
  },
  // 未标记的气
  UNMARKED_LIBERTY (pos) {
    return this.board[pos] === colors.EMPTY && this.ml[pos] !== this.liberty_mark
  },

  MARK_LIBERTY (pos) {
    this.ml[pos] = this.liberty_mark
  },

  UNMARKED_STRING (pos) {
    return this.string[this.string_number[pos]].mark !== this.string_mark
  },
  /* Note that these two macros are not complementary. Both return
   * false if board[pos] != color.
   */
  UNMARKED_COLOR_STRING (pos, color) {
    return this.board[pos] === color && this.string[this.string_number[pos]].mark !== this.string_mark
  },
  MARKED_COLOR_STRING (pos, color) {
    return this.board[pos] === color && this.string[this.string_number[pos]].mark === this.string_mark
  },

  MARK_STRING (pos) {
    this.string[this.string_number[pos]].mark = this.string_mark
  },

  STRING_AT_VERTEX (pos, s, color) {
    return this.board[pos] === color && this.string_number[pos] === s
  },
  NEIGHBOR_OF_STRING(pos, s, color) {
    return this.STRING_AT_VERTEX(this.SOUTH(pos), s, color)
      || this.STRING_AT_VERTEX(this.WEST(pos), s, color)
      || this.STRING_AT_VERTEX(this.NORTH(pos), s, color)
      || this.STRING_AT_VERTEX(this.EAST(pos), s, color)
  },

  /* These four macros have rather confusing names. It should be read as:
   * "(pos) is a neighbor of string (s) of (color) in any direction except
   * the specified one".
   * pos落子后，周围有唯一相邻我方棋串，气合并时，pos南面的气是不是已经是棋串的气（该气的南or西or东是s棋串的棋子, 北面是刚落子不需要判断）
   *
   *  .*O
   *  O.O
   *  OOO
   */
  NON_SOUTH_NEIGHBOR_OF_STRING(pos, s, color) {
    return this.STRING_AT_VERTEX(this.SOUTH(pos), s, color)
      || this.STRING_AT_VERTEX(this.WEST(pos), s, color)
      || this.STRING_AT_VERTEX(this.EAST(pos), s, color)
  },

  NON_WEST_NEIGHBOR_OF_STRING(pos, s, color) {
    return this.STRING_AT_VERTEX(this.WEST(pos), s, color)
      || this.STRING_AT_VERTEX(this.NORTH(pos), s, color)
      || this.STRING_AT_VERTEX(this.SOUTH(pos), s, color)
  },

  NON_NORTH_NEIGHBOR_OF_STRING(pos, s, color) {
    return this.STRING_AT_VERTEX(this.NORTH(pos), s, color)
      || this.STRING_AT_VERTEX(this.EAST(pos), s, color)
      || this.STRING_AT_VERTEX(this.WEST(pos), s, color)
  },

  NON_EAST_NEIGHBOR_OF_STRING(pos, s, color) {
    return this.STRING_AT_VERTEX(this.EAST(pos), s, color)
      || this.STRING_AT_VERTEX(this.SOUTH(pos), s, color)
      || this.STRING_AT_VERTEX(this.NORTH(pos), s, color)
  },

  LIBERTIES(pos) {
    return this.string[this.string_number[pos]].liberties
  },

  COUNTSTONES(pos) {
    return this.string[this.string_number[pos]].size
  },

  ADD_LIBERTY(s, pos) {
    if (this.string[s].liberties < this.MAX_LIBERTIES){
      if(!this.string_libs[s]){
        this.string_libs[s] = new StringPosData()
      }
      this.string_libs[s].list[this.string[s].liberties] = pos;
      this.string[s].liberties++;
    }
  },

  // 没有string_libs记录就创建新的，添加气并标记
  ADD_AND_MARK_LIBERTY(s, pos) {
    if (this.string[s].liberties < this.MAX_LIBERTIES) {
      if(!this.string_libs[s]){
        this.string_libs[s] = new StringPosData()
      }
      this.string_libs[s].list[this.string[s].liberties] = pos;
    }
    this.string[s].liberties++;
    this.ml[pos] = this.liberty_mark;
  },

  ADD_NEIGHBOR(s, pos){
    if(!this.string_neighbors[s]){
      this.string_neighbors[s] = new StringPosData()
    }
    this.string_neighbors[s].list[this.string[s].neighbors++] = this.string_number[pos]
  },

  // DO_ADD_STONE(pos, color) {},

  DO_REMOVE_STONE(pos) {
    this.PUSH_VERTEX(pos);
    this.hash.invert_stone(this.board_hash, pos, this.board[pos]);
    this.board[pos] = colors.EMPTY;
  },

  ASSERT1(x, pos){
    if(!x) {
      throw new Error(pos)
    }
  }
}