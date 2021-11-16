//题目详情（错题本） - 学生
import React, {useRef, useEffect} from "react";

import GoboardPlayer from '../components/go/Goboard-puzzle.sgf'
import {SgfTree} from "../components/go/SgfTree"

import './index.less'


// const sgf = '(;CA[gb2312]AP[MultiGo:4.4.4]SZ[9];B[fe];W[ee];B[ef];W[ff])'
// const sgf = '(;CA[gb2312]AB[fe][ef]AW[ee][ff]AP[MultiGo:4.4.4]SZ[9])'
const sgf = '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[7.5]SZ[9]DT[2021-11-16]AB[cc][dc][ec]AW[gc][ge])'

function Puzzle (props){
  const goboardRef = useRef()

  const changeData = (player, sgf, whoPlay) => {
    var sgfTree = new SgfTree(sgf);

    // 根据SGF,自动切换当前棋盘大小
    let boardSize = sgfTree.root.getProperty('SZ');
    if (boardSize && boardSize.length) {
      boardSize = boardSize[0]*1;
    } else {
      boardSize = 19
    }

    player.init({sgfTree, whoFirst: whoPlay, boardSize});
    player.toEnd()
  }

  useEffect(() => {
    const player = new GoboardPlayer({
      el: goboardRef.current,
    });
    changeData(player, sgf, 1)
  }, [])

  return (
    <div id="page" >
      <div className="puzzle-box">
        <div className="colomn">
          <div className="goboard" ref={goboardRef}></div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Puzzle)
