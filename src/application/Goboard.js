//题目详情（错题本） - 学生
import React, {useRef, useEffect} from "react";

import GoboardPlayer from '../components/go/Goboard.sgf'
import {SgfTree} from "../components/go/SgfTree"

import './index.less'

//matchpat
const map = {
 'Attack1': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-08]AB[dd][ee]AW[de][df][ed][fd])',
 'Attack2': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-12]AW[dh][eg][fg]AB[dg][eh][cg])',
 'Attack4':'(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-19]AW[dd][ee]AB[de][ed])',
 'Attack5': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-15]AB[bc][ad][bf]AW[bd]MA[ae])',
 'Attack6': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-19]AB[dd][cf]AW[ce][dc]CR[ce][cf][dc][df]MA[de])',
 'Attack10': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[7.5]SZ[9]DT[2022-01-24]AB[dc][cd][ce]AW[dd])',
 'Attack11': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-24]PW[GnuGo10]AB[dd][de]AW[cc][ef]CR[cb][db][dd][de][ef][fc][fd]MA[ec])',
  'Attack14': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-25]AB[dd]AW[ec][ed][de][cd]MA[cc]CR[db][dd])',
 'Attack15': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-24]PW[GnuGo10]AW[dh][di][fh]AB[eh]MA[fi])',
 'Attack15-2': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-24]PW[GnuGo10]AW[dh][di][fh][gh]AB[eh][dg][ch][ci]MA[fi])',
  'Attack16': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-25]AB[dd][ee][df][cf]MA[cd]AW[de][be])',
  'Attack16-2': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-25]AB[dd][ee][df][cf]AW[de][be][bf][bg][cg][dg][ef][eg]CR[be][cf][dd][df][ee]MA[cd])',
  'Attack18': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-25]AW[dg][ci]AB[cg][ch]CR[ci][dg]MA[di])',
  'Attack19': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-25]AB[dd]AW[dc][de][bd]MA[bc]CR[bd][be][dd])',
  'Attack19-2': '(;GM[1]FF[4]CA[UTF-8]AP[Sabaki:0.51.1]KM[5]SZ[9]DT[2022-01-25]AB[dd]AW[dc][de][bd][ed]MA[bc]CR[bd][be][dd])',
}

const sgf = map['Attack19-2']

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
