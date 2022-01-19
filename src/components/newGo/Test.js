
const map = {
  0: '.',
  1: 'X',
  2: 'O',
  3: '#',
}
export const Test = {
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
      let temp = arr.slice(i* 4, (i+1) * 4 ).map(i => map[i]).join(' ')
      res.push(temp);
    }
    console.log(res.join('\n'))
  },

  printPatn(list){
    let origin = 684

    let size = 7
    let arr = new Array(size*size).fill(' ')
    for (let i = 0; i < list.length; ++i) {
      const val = list[i][1]
      const index = list[i][0]
      const col = Math.floor(index/ 37) - 18 + 3
      const row = index%37 - 18 + 3
      
      arr[row*7+col] = map[val]
    }

    let res = [];

    for (let i = 0; i < size; i++) {
      let temp = arr.slice(i* size, (i+1) * size ).join(' ')
      res.push(temp);
    }
    console.log(res.join('\n'))
  }
}