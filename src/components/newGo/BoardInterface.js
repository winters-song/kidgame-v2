
export const BoardInterface = {
  add(col, row, color) {
    this.add_stone(this.POS(row, col), color)
  },

  canPlay(col, row, color){
    return this.is_allowed_move(this.POS(row, col), color)
  },

  play(col, row, color){
    const captured = this.play_move(this.POS(row, col), color)

    if(captured && captured.length){
      return captured.map(pos => ({
        row: this.I(pos),
        col: this.J(pos)
      }))
    }
  }
}