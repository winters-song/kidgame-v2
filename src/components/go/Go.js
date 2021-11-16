
/**
 * 不做停招处理
 * 不做落子次序校验（交给棋盘做）
 */

// Set 补充:批量添加，批量删除
Set.prototype.addAll = function (another) {
  let me = this;

  if(another.size){
    another.forEach(function(item){
      me.add(item);
    });
  }else if (another.length){
    for (let i in another){
      me.add(another[i]);
    }
  }

  return this;
}

Set.prototype.removeAll = function (another){
  let me = this;
  another.forEach(function(item){
    me.delete(item);
  });
  return this;
}

// 颜色
export const Color = {
  EMPTY : 0,
  BLACK : 1,
  WHITE : 2
}

// 大龙
export const Str = function(vertex){

  var me = this;
  //棋子
  me.vertexes = new Set();
  //气
  me.liberty = new Set();
  //撞气的对方棋子
  me.opposite = new Set();

  if(vertex){
    me.vertexes.add(vertex);
  }
};
Str.prototype = {
  merge: function(another){
    let me = this;
    me.vertexes.addAll(another.vertexes);
    me.liberty.addAll(another.liberty);
    me.opposite.addAll(another.opposite);

    return this;
  }
};

const neighbors = [[0,1],[0,-1],[1,0],[-1,0]]
const surround = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]

//noBoard: 不进行board二维数组初始化(MCTS使用)
export class Go {

  constructor(size, noBoard){
    let me = this;
    // 9，13，19
    me.size = size;
    me.blackStrs = new Set();
    me.whiteStrs = new Set();
    me.blackCaptures = new Map();
    me.whiteCaptures = new Map();
    me.addedStones = []

    if(noBoard){
      return
    }
    me.init()
  }

  init (){
    let me = this;

    me.history = []
    me.board = [...Array(me.size)].map(() => Array(me.size).fill(Color.EMPTY))
  }

  add (x, y, color, isAdd) {
    let me = this

    let move = [x, y, color]
    let eating = me.willEat(move)
    let eatedVertexes = new Set()
    if(isAdd){
      me.addedStones.push(move)
    }

    eating.forEach(function(str){
      eatedVertexes.addAll(str.vertexes)
    })

    me.doPlay(move, eating)
    me.history.push(move)

    me.board[y][x] = color

    return eatedVertexes
  }

  getVertex (x, y) {
    return x + "," + y
  }

  isOnBoard (x, y){
    return x >=0 && x < this.size && y >=0 && y < this.size
  }

  // 该坐标是否有落子, col=x, row=y
  isEmpty (x, y) {
    return this.board[y][x] === Color.EMPTY
  }

  isBadMove (x, y) {
    return y < 0 || x < 0 || y >= this.size || x >= this.size || this.board[y][x] != Color.EMPTY
  }

  // 此处可以落子
  // 此处无棋子，不是打劫，不是禁入点
  canPlay (x, y, color) {
    let me = this
    let move = [x, y, color]

    // 是否已经有子
    if (!me.isEmpty(x, y)) {
      return false;
    }
    // 是否有提子
    let eating = me.willEat(move)
    let eatedVertexes = new Set()
    // 把被吃掉的各块棋的棋子坐标全部加入集合
    eating.forEach(function(str){
      eatedVertexes.addAll(str.vertexes)
    })
    // 是否是打劫
    if(!me.checkCanKo(move, eating)){
      return false
    }
    // 没有吃子，禁入点
    if (!eating.size && me.willSuicide(move)) {
      return false
    }
    return true
  }

  getStep () {
    return this.history.length
  }

  // 是否是打劫
  checkCanKo (move, eating) {
    let me = this

    if (1 != eating.size) {
      return true
    }
    let eatVertex = null

    eating.forEach(function (str) {
      // 吃掉多个子则不是打劫
      if(str.vertexes.size != 1) {
        return true
      }
      str.vertexes.forEach(function (v) {
        eatVertex = v
      })
    })

    // 没有上一步，不是打劫
    let lastMove = me.getLastMove()
    if (undefined === lastMove) {
      return true
    }
    // 获得上一次提子
    let lastCaptureVertex = null
    let lastCaptures
    if(Color.BLACK === lastMove[2]) {
      lastCaptures = me.blackCaptures.get(me.history.length - 1)
    } else {
      lastCaptures = me.whiteCaptures.get(me.history.length - 1)
    }

    // 上一次无提子，或有多个提子，不算打劫
    if(null === lastCaptures || lastCaptures.size !== 1) {
      return true
    }

    lastCaptures.forEach(function (str) {
      // 吃掉多个子则不是打劫
      if(str.vertexes.size!=1) {
        return true
      }
      str.vertexes.forEach(function (v) {
        lastCaptureVertex = v
      })
    })

    // 上一步被提掉子=本次落子，本次要吃掉的子=上一步落子
    if(lastCaptureVertex === me.getVertex(move[0], move[1]) && eatVertex === me.getVertex(lastMove[0], lastMove[1])){
      return false
    }
    return true
  }

  // 禁入点
  willSuicide (move) {
    let me = this

    let strs = move[2] === Color.BLACK ? me.blackStrs : me.whiteStrs;
    let vertex = me.getVertex(move[0], move[1])
    // 该落子是否有气
    let hasLiberty = !!this.getLiberty(vertex).length;
    // 有多口气就忽略
    if (hasLiberty) {
      return false;
    }
    let result = true;
    strs.forEach(function(str){
      // 所有大龙有该气，并有多口气就忽略
      if (str.liberty.has(vertex) && str.liberty.size > 1) {
        result = false;
        return false;
      }
    });

    return result;
  }

  willEat (move) {
    let me = this;

    // 将被吃掉的多块棋
    let eatedStrs = new Set();
    // 当前落黑子，则遍历白棋各块棋， 反之亦然
    let strs = move[2] === Color.BLACK ? me.whiteStrs : me.blackStrs;
    //搜索对方每条龙是否是最后1口气
    strs.forEach(function(str){
      // 最后1口气，且坐标位置与落子相同
      if (str.liberty.size === 1 && str.liberty.has(me.getVertex(move[0], move[1]))) {
        eatedStrs.add(str);
      }
    });

    return eatedStrs;
  }

  oppositeColor(color){
    return 3 - color
  }

  doPlay (move, eating) {
    let me = this;
    let vertex = me.getVertex(move[0], move[1])
    // eat
    let myStr = move[2] === Color.BLACK ? me.blackStrs : me.whiteStrs;
    let oppositeStr = move[2] === Color.BLACK ? me.whiteStrs	: me.blackStrs;

    //移除吃掉的子
    eating.forEach(function(o){
      o.vertexes.forEach(function(v){
        // 清除board值
        var arr = v.split(',');
        me.board[arr[1]*1][arr[0]*1] = Color.EMPTY;

        myStr.forEach(function(m){
          // 对于所有撞气的位置，增加气，移除撞气
          if (m.opposite.has(v)) {
            // add liberty
            m.liberty.add(v);
            // remove adjacent opposite
            m.opposite.delete(v);
          }
        });
      });
    });
    // 记录提子（方便恢复）
    if (eating.size) {
      if (Color.BLACK === move[2]) {
        me.blackCaptures.set(me.history.length, eating);
      } else {
        me.whiteCaptures.set(me.history.length, eating);
      }
      // 对方大龙移除掉被吃的
      oppositeStr.removeAll(eating);
    }

    // 合并我方大龙
    // 合并主方
    var firstStr = null;
    // 合并客方
    var mergedStr = new Set();

    myStr.forEach(function(str){
      // 我方气有该位置
      if (str.liberty.has(vertex)) {
        if (null === firstStr) {
          // 记录要合并主方
          firstStr = str;
        } else {
          // 找到合并客方，合并
          firstStr.merge(str);
          mergedStr.add(str);
        }
      }
    });

    // 如果有合并动作，将合并客方删掉
    if (mergedStr.size){
      myStr.removeAll(mergedStr);
    }

    // 没有大龙相连，新建一块棋
    if (null === firstStr) {
      firstStr = new Str();
      firstStr.vertexes.add(vertex);
      myStr.add(firstStr);
    } else {
      // 延长大龙，减少当前位置的气
      firstStr.vertexes.add(vertex);
      firstStr.liberty.delete(vertex);
    }
    // 获得该点的气，加到大龙上
    firstStr.liberty.addAll(me.getLiberty(vertex));
    // 获得该点的撞气，加到大龙上
    firstStr.opposite.addAll(me.getOpposite(move));
    // 对方大龙相应减气，增加撞气
    oppositeStr.forEach(function(o){
      if (o.liberty.has(vertex)) {
        o.liberty.delete(vertex);
        o.opposite.add(vertex);
      }
    });
  }

  undo(n) {
    let me = this;

    let moveResult = {};

    if(n > me.history.length){
      return null;
    }

    me.blackStrs.clear();
    me.whiteStrs.clear();
    me.blackCaptures.clear();
    me.whiteCaptures.clear();

    let oldHistory = me.history;
    let oldBoard = me.board;

    me.history = [];
    me.init();

    //重新从第0步play到上一步
    for (let i = 0; i < oldHistory.length - n; i++) {
      let [x, y, color] = oldHistory[i]
      this.add(x, y, color);
    }

    moveResult.move = oldHistory.pop();

    var eated = new Set();
    for (var i = 0; i < me.size; i++) {
      for (var j = 0; j < me.size; j++) {
        //eated = board minus resultundo
        if(oldBoard[i][j] != me.board[i][j]) {

          //exclude current move
          if(i === moveResult.move[1] && j === moveResult.move[0]){

          }else{
            eated.add({
              row: i,
              col: j,
              color: me.board[i][j]
            });
          }
        }
      }
    }

    moveResult.eated = eated;
    return moveResult;
  }

  /**
   *	交替落子
    * @return []Vertex  返回被吃掉的子
    * @return null  不能落子（有效性校验、打劫或是禁入点）
    */
  play (x, y, color) {

    let me = this;
    // 检查有效性
    // 此处有子，不能落子
    if (!me.isOnBoard(x, y) || !me.isEmpty(x, y)) {
      return null;
    }

    let move = [x, y, color];

    // 是否有提子
    let eating = me.willEat(move);
    let eatedVertexes = new Set();

    // 把被吃掉的各块棋的棋子坐标全部加入集合
    eating.forEach(function(str){
      eatedVertexes.addAll(str.vertexes);
    });

    // 是否是打劫
    if(!me.checkCanKo(move, eating)){
      return null;
    }
    // 没有吃子，禁入点
    if (!eating.size && me.willSuicide(move)) {
      return null;
    }
    // 对双方受影响的大龙进行调整
    me.doPlay(move, eating);

    // 加入历史，改变该坐标值
    me.history.push(move);
    me.board[y][x] = color;

    // 返回被提掉的棋子，用于界面删除
    return eatedVertexes;
  }

  /**
   *	快速走子
    */
  forcePlay(x, y, color) {
    let me = this;

    let move = [x, y, color];
    // 是否有提子
    let eating = me.willEat(move);
    // 对双方受影响的大龙进行调整
    me.doPlay(move, eating);
    // 加入历史，改变该坐标值
    me.history.push(move);
    me.board[y][x] = color;
  }

  // 获得最后一次落子
  getLastMove(){
    return this.history[this.history.length - 1];
  }

  getNeighborByColor(x, y, color){
    let me = this
    let arr = []
    for (let i in neighbors){
      let x2 = neighbors[i][0] + x
      let y2 = neighbors[i][1] + y

      if(me.isOnBoard(x2, y2) && color === me.board[y2][x2]){
        arr.push(me.getVertex(x2, y2))
      }
    }
    return arr;
  }

  // 返回该位置上下左右没有棋子的顶点
  getLiberty(vertex) {
    let me = this;
    let arr = vertex.split(',')
    return me.getNeighborByColor(arr[0]*1, arr[1]*1, Color.EMPTY)
  }

  getOpposite(move) {
    let me = this;
    return me.getNeighborByColor(move[0], move[1], me.oppositeColor(move[2]))
  }

  // 获取某位置上下左右我方棋子
  getOurs (move) {
    let me = this;
    return me.getNeighborByColor(move[0], move[1], move[2]);
  }

  // 获取某位置周围8个位置的某种状态数（我方、敌方、空）
  getArounds (move) {
    let me = this;
    let arr = [];
    let color = move[2];

    for (let i in surround){
      let x = surround[i][0] + move[0]
      let y = surround[i][1] + move[1]

      if(me.isOnBoard(x, y) && color === me.board[y][x]){
        arr.push(me.getVertex(x, y))
      }
    }
    return arr;
  }

  // 获取与大龙相邻的敌方大龙
  getOppositeStrs (myStr, oppositeStrs) {
    let result = new Set();

    oppositeStrs.forEach(function (str) {
      str.vertexes.forEach(function (key) {
        if (myStr.opposite.has(key)) {
          if (!result.has(str)) {
            result.add(str);
          }
        }
      });
    });
    return result;
  }

  // startSgf: 带有AB,AW的sgf, 需要拼接
  getSgf (startSgf) {
    var me = this;

    let prefix, history
    if(startSgf){
      const key = "MULTIGOGM[1]"
      let index = startSgf.indexOf(key)
      prefix = startSgf.substr(0, index+ key.length)

      history = this.history.slice(this.addedStones.length)
      if(!history.length){
        return prefix + ')'
      }
    }else{
      prefix = '(;CA[gb2312]AP[MultiGo:4.4.4]SZ[' + me.size + ']'
      history = this.history
    }
    var s = '';

    function toGnuCo(x, y) {
      return String.fromCharCode(97 + x) + String.fromCharCode(97 + y);
    }

    history.forEach( move => {
      s += ";";
      if (Color.BLACK === move[2]) {
        s += "B";
      } else {
        s += "W";
      }
      s += "[";
      s += toGnuCo(move[0], move[1]);
      s += "]";
    });

    return prefix + s + ')';
  }

};

// exports.Str = Str
// exports.Color = Color
// exports.Go = Go
