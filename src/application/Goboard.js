//题目详情（错题本） - 学生
import React, {useRef, useEffect} from "react";

import GoboardPlayer from '../components/go/Goboard.sgf'
import {SgfTree} from "../components/go/SgfTree"

import './index.less'

//matchpat
const map = {
  'test': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-02-21]AB[dd][de][df][ef][ff][ge][gf]AW[ee][fe])',
 'Barriers3': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-02-01]AW[dd][fd])'
}

const sgf = map['test']

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
    window.player = player
    player.genmove()
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
