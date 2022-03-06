import {AFFINE_TRANSFORM} from "./Liberty";

const maskMap = {
  0: '.',
  1: 'X',
  2: 'O',
  3: '?',
}

const map = ['.', 'X', 'O', 'x', 'o', ',', 'a','!']
 
export const Test = {

  mark_goal_in_sgf() {},
  
  // 模式特征码打印
  printMask(val) {
    let arr = []
    let mark
    for (let i = 0; i < 16; ++i) {
      mark = val & 3
      arr.push(mark)
      val = val>>2
    }
    arr.reverse()

    let res = [];

    for (let i = 0; i < 4; i++) {
      let temp = arr.slice(i* 4, (i+1) * 4 ).map(i => maskMap[i]).join(' ')

      let numbers = [646,683,720,757].map(j => i+j).join(' ')
      
      res.push(temp.concat(`    ${numbers}`));
    }
    console.log(res.join('\n'))
  },

  printPatn(list){
    let size = 7
    let arr = new Array(size*size).fill(' ')
    for (let i = 0; i < list.length; ++i) {
      const val = list[i][1]
      const index = list[i][0]
      const col = Math.floor(index/ 37) - 18 + 3
      const row = index%37 - 18 + 3

      if(col>=0 && col < 7 && row >=0 && row < 7){
        arr[row*7+col] = map[val]
      }

    }

    let res = [];

    for (let i = 0; i < size; i++) {
      let temp = arr.slice(i* size, (i+1) * size ).join(' ')
      res.push(temp);
    }
    console.log(res.join('\n'))
  },

  // 模式在当前棋盘的展示
  printPatnBoard(pattern, ll, anchor){
    const b = this.board
    const board = b.board.slice()

    for(let i in board){
      if(board[i] === 3){
        board[i] = '#'
      }else{
        board[i] = ' '
      }
    }
    for (let k = 0; k < pattern.patlen; ++k) { /* match each point */
      let att = pattern.patn[k][1];  /* what we are looking for */

      let pos = AFFINE_TRANSFORM(pattern.patn[k][0], ll, anchor);

      board[pos] = maskMap[att]
    }

    // print
    let lineNum = Math.floor( b.board.length / b.NS + 1 );
    let res = [];

    for (let i = 0; i < lineNum; i++) {
      let temp = board.slice(i* b.NS, (i+1) * b.NS ).join(' ')
      res.push(temp);
    }
    console.log(res.join('\n'))
  }
}