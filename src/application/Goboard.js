//题目详情（错题本） - 学生
import React, {useRef, useState, useEffect} from "react";

import GoboardPlayer from '../components/go/Goboard-puzzle.sgf'
import 'index.less'

function Puzzle (props){
  const [goboardPlayer, setGoboardPlayer] = useState()
  const goboardRef = useRef()

  function initGoboardPlayer () {
    if(goboardPlayer) {
      return
    }
    const player = new GoboardPlayer({
      el: goboardRef.current,
    });
    setGoboardPlayer(player)
  }

  useEffect(() => {
    initGoboardPlayer()
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
