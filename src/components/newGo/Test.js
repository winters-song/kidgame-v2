
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
  }
}