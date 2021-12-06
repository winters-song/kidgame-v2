//题目详情（错题本） - 学生
import React, {useRef, useEffect} from "react";

import GoboardPlayer from '../components/go/Goboard.sgf'
import {SgfTree} from "../components/go/SgfTree"

import './index.less'


// attack1
// const sgf = '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[7.5]SZ[9]DT[2021-12-01]AB[ed][de][fe]AW[ee][df][ff][eg];B[ef])'

// set_up_snapback_moves
const sgf = '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[7.5]SZ[9]DT[2021-12-06]AB[bi][bh][bg][bf][be][ce][de][ee][fe][ff][eg][dh]AW[cf][cg][ch][ci][df][ef][fg][fh][eh])'

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
