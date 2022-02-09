import {PatternDB, Pattern, ATTACK_MACRO } from "./Patterns";
import {AFFINE_TRANSFORM} from "../Liberty";
import { codes, NO_MOVE } from "../Constants";

const conn0 = [
  [648,1],	[686,2],	[723,0]
]

const conn1 = [
  [649,1],	[723,2],	[687,2],	[686,0],
  [724,0]
]

const conn2 = [
  [721,7],	[759,1],	[723,2],	[758,2],
  [686,0]
]

const conn3 = [
  [721,7],	[760,1],	[758,2],	[723,2],
  [759,0],	[686,0]
]

const conn4 = [
  [647,1]
]

const conn5 = [
  [723,7],	[685,7],	[759,1],	[721,1],
  [724,2],	[760,2],	[686,0]
]

const conn6 = [
  [685,7],	[759,7],	[721,1],	[758,2]
]

const conn7 = [
  [687,7],	[649,1],	[650,2],	[686,2]
]

const conn8 = [
  [685,7],	[721,7],	[758,2],	[686,2]
]

const conn9 = [
  [719,1],	[683,1],	[721,1],	[757,1],
  [758,2],	[759,0]
]

const conn10 = [
  [795,2],	[684,2],	[719,4],	[833,4],
  [649,4],	[834,4],	[647,4],	[756,4],
  [648,4],	[832,4],	[683,0],	[758,0],
  [721,0],	[685,0],	[722,0],	[759,0],
  [796,0],	[720,0],	[757,0],	[686,0],
  [723,0],	[760,0],	[797,0],	[794,0]
]

const conn11 = [
  [795,2],	[684,2],	[869,4],	[870,4],
  [610,4],	[611,4],	[612,4],	[871,4],
  [721,0],	[647,0],	[832,0],	[757,0],
  [683,0],	[648,0],	[685,0],	[720,0],
  [759,0],	[796,0],	[833,0],	[794,0],
  [758,0],	[649,0],	[686,0],	[723,0],
  [760,0],	[797,0],	[834,0],	[722,0]
]

const conn12 = [
  [758,2],	[684,2],	[650,4],	[796,4],
  [794,4],	[647,4],	[648,4],	[649,4],
  [646,4],	[795,4],	[798,4],	[797,4],
  [722,0],	[720,0],	[757,0],	[721,0],
  [686,0],	[723,0],	[760,0],	[685,0],
  [683,0],	[687,0],	[724,0],	[761,0],
  [759,0]
]

const conn13 = [
  [648,2],	[684,2],	[647,0],	[685,0]
]

const conn14 = [
  [684,2],	[795,2],	[756,4],	[719,4],
  [646,4],	[797,4],	[833,4],	[686,4],
  [723,4],	[831,4],	[647,4],	[682,4],
  [648,4],	[760,4],	[793,4],	[832,4],
  [721,0],	[685,0],	[722,0],	[759,0],
  [796,0],	[720,0],	[757,0],	[794,0],
  [758,0],	[683,0]
]

const conn15 = [
  [684,2],	[796,2],	[719,4],	[646,4],
  [724,4],	[761,4],	[798,4],	[794,4],
  [831,4],	[647,4],	[682,4],	[649,4],
  [686,4],	[834,4],	[832,4],	[648,4],
  [833,4],	[756,4],	[759,0],	[722,0],
  [685,0],	[721,0],	[758,0],	[723,0],
  [760,0],	[797,0],	[795,0],	[683,0],
  [720,0],	[757,0]
]

const conn16 = [
  [684,2],	[758,2],	[719,4],	[723,4],
  [760,4],	[682,4],	[686,4],	[756,4],
  [647,0],	[720,0],	[721,0],	[794,0],
  [795,0],	[648,0],	[685,0],	[722,0],
  [759,0],	[796,0],	[757,0],	[646,0],
  [683,0]
]

const conn17 = [
  [758,2],	[684,2],	[724,2],	[650,4],
  [798,4],	[648,4],	[797,4],	[649,4],
  [796,4],	[759,0],	[722,0],	[686,0],
  [723,0],	[760,0],	[685,0],	[647,0],
  [687,0],	[721,0],	[761,0],	[795,0]
]

const conn18 = [
  [758,2],	[684,2],	[687,2],	[761,2],
  [797,4],	[649,4],	[796,4],	[648,4],
  [795,0],	[647,0],	[721,0],	[686,0],
  [723,0],	[760,0],	[685,0],	[650,0],
  [759,0],	[724,0],	[722,0],	[798,0]
]

const conn19 = [
  [684,2],	[724,2],	[758,2],	[685,0],
  [722,0],	[759,0],	[686,0],	[723,0],
  [760,0],	[687,0],	[721,0],	[761,0]
]

const conn20 = [
  [684,2],	[724,2],	[758,4],	[795,4],
  [797,4],	[761,4],	[759,4],	[796,4],
  [798,4],	[760,4],	[723,0],	[685,0],
  [687,0],	[721,0],	[722,0],	[686,0]
]

const conn21 = [
  [686,2],	[684,2],	[722,2],	[685,0],
  [721,0],	[723,0]
]

const conn22 = [
  [649,1],	[723,2],	[687,2],	[684,2],
  [722,0],	[686,0],	[721,0],	[685,0],
  [724,0]
]

const conn23 = [
  [648,2],	[684,2],	[647,3],	[685,0]
]

const conn24 = [
  [684,2],	[648,2],	[685,0]
]

const conn25 = [
  [648,2],	[684,2],	[647,0],	[685,0]
]

const conn26 = [
  [684,2],	[686,2],	[685,0]
]

const conn27 = [
  [684,2],	[648,2],	[685,0]
]

const conn28 = [
  [648,2],	[684,2]
]

const conn29 = [
  [684,2],	[687,2],	[686,0],	[685,0]
]

const conn30 = [
  [687,2],	[684,2],	[722,4],	[721,0],
  [723,0],	[686,0],	[724,0]
]

const conn31 = [
  [684,2],	[723,2],	[721,3],	[686,3],
  [722,0],	[685,0]
]

const conn32 = [
  [723,2],	[684,2],	[686,3],	[685,0]
]

const conn33 = [
  [684,2],	[724,2],	[687,3],	[721,3],
  [686,0],	[723,0],	[685,0],	[722,0]
]

const conn34 = [
  [648,2],	[684,2],	[647,0],	[685,0]
]

const autohelperconn0 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(685, trans, move);
  const b = AFFINE_TRANSFORM(683, trans, move);

  return !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, move, a, b);
}

const autohelperconn1 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(685, trans, move);
  const b = AFFINE_TRANSFORM(682, trans, move);

  return !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, move, a, b);
}

const autohelperconn2 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(720, trans, move);
  const b = AFFINE_TRANSFORM(685, trans, move);

  return !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, move, a, b);
}

const autohelperconn3 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(720, trans, move);
  const b = AFFINE_TRANSFORM(685, trans, move);
  const c = AFFINE_TRANSFORM(646, trans, move);

  return !this.play_connect_n(color, 0, 0, a, c)
  && !this.play_connect_n(color, 0, 0, c, b)
  && !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, move, a, b);
}

const autohelperconn4 = function(trans, move, color, action)
{
  const  A = AFFINE_TRANSFORM(646, trans, move);
  return ATTACK_MACRO.call(this,A);
}

const autohelperconn5 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(758, trans, move);
  const b = AFFINE_TRANSFORM(682, trans, move);

  return !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, move, a, b);
}

const autohelperconn6 = function(trans, move, color, action)
{
  
  const a = AFFINE_TRANSFORM(648, trans, move);
  const b = AFFINE_TRANSFORM(722, trans, move);

  return !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, move, a, b);
}

const autohelperconn7 = function(trans, move, color, action)
{
 
  const a = AFFINE_TRANSFORM(683, trans, move);
  const b = AFFINE_TRANSFORM(649, trans, move);

  return this.play_connect_n(this.board.OTHER_COLOR(color), 1, 0, a, b)
   && !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, move, a, b);
}

const autohelperconn8 = function(trans, move, color, action)
{
  
  const a = AFFINE_TRANSFORM(720, trans, move);
  const b = AFFINE_TRANSFORM(648, trans, move);

  return !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 1, move, a, b);
}

const autohelperconn9 = function(trans, move, color, action)
{
  const b = AFFINE_TRANSFORM(645, trans, move);
  const c = AFFINE_TRANSFORM(647, trans, move);
  const d = AFFINE_TRANSFORM(683, trans, move);
  const A = AFFINE_TRANSFORM(646, trans, move);

  return this.play_attack_defend_n(this.board.OTHER_COLOR(color), 1, 1, move, A)< codes.WIN 
  && !this.play_connect_n(this.board.OTHER_COLOR(color), 1, 3, move, NO_MOVE, b, c, d);
}

const autohelperconn12 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(648, trans, move);

  return this.whose_moyo(this.OPPOSITE_INFLUENCE(color), a) === color
}

const autohelperconn13 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(610, trans, move);
  const b = AFFINE_TRANSFORM(648, trans, move);

  return !this.cut_possible(a, this.board.OTHER_COLOR(color)) && !this.cut_possible(b, this.board.OTHER_COLOR(color));
}

const autohelperconn19 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(721, trans, move);
  const b = AFFINE_TRANSFORM(685, trans, move);
  const c = AFFINE_TRANSFORM(722, trans, move);
  const d = AFFINE_TRANSFORM(759, trans, move);
  const e = AFFINE_TRANSFORM(686, trans, move);
  const f = AFFINE_TRANSFORM(723, trans, move);
  const g = AFFINE_TRANSFORM(760, trans, move);

  return (this.whose_moyo(this.OPPOSITE_INFLUENCE(color), a) === color) 
  && (this.whose_area(this.OPPOSITE_INFLUENCE(color), c) === color) 
  && (this.whose_area(this.OPPOSITE_INFLUENCE(color), f) === color)
  && (((this.whose_moyo(this.OPPOSITE_INFLUENCE(color), b) === color)
   + (this.whose_moyo(this.OPPOSITE_INFLUENCE(color), c) === color)
    + (this.whose_moyo(this.OPPOSITE_INFLUENCE(color), d) === color)
     + (this.whose_moyo(this.OPPOSITE_INFLUENCE(color), e) === color)
      + (this.whose_moyo(this.OPPOSITE_INFLUENCE(color), f) === color)
       +(this.whose_moyo(this.OPPOSITE_INFLUENCE(color), g) === color)) >= 3);
}

const autohelperconn20 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(722, trans, move);
  const b = AFFINE_TRANSFORM(723, trans, move);
  const c = AFFINE_TRANSFORM(684, trans, move);
  const d = AFFINE_TRANSFORM(724, trans, move);

  return (this.whose_moyo(this.OPPOSITE_INFLUENCE(color), a) === color) 
  && (this.whose_moyo(this.OPPOSITE_INFLUENCE(color), b) === color) 
  && this.board.countlib(c)>=4 && this.board.countlib(d)>=4;
}

const autohelperconn21 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(648, trans, move);
  const b = AFFINE_TRANSFORM(649, trans, move);
  const c = AFFINE_TRANSFORM(685, trans, move);
  const d = AFFINE_TRANSFORM(647, trans, move);

  if (!action){
    return this.cut_possible(a, this.board.OTHER_COLOR(color));
  }
  this.amalgamate_most_valuable_helper(b, c, d);;

  return 0;
}

const autohelperconn22 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(649, trans, move);
  const b = AFFINE_TRANSFORM(648, trans, move);
  const c = AFFINE_TRANSFORM(685, trans, move);
  const d = AFFINE_TRANSFORM(684, trans, move);
  const e = AFFINE_TRANSFORM(650, trans, move);
  const f = AFFINE_TRANSFORM(686, trans, move);
  const g = AFFINE_TRANSFORM(647, trans, move);

  if (!action){
    return this.cut_possible(a, this.board.OTHER_COLOR(color));
  }
  if (!this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 3, [b, c, d, b, d]) 
  || !this.play_attack_defend2_n(this.board.OTHER_COLOR(color), 1, 3, [c, b, a, c, a])) {
    this.join_dragons(e, f);
  }
  else {
    this.amalgamate_most_valuable_helper(e, f, g);;
  }

  return 0;
}

const autohelperconn23 = function(trans, move, color, action)
{
  const c = AFFINE_TRANSFORM(648, trans, move);

  return this.board.is_suicide(c, this.board.OTHER_COLOR(color));
}

const autohelperconn24 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(611, trans, move);
  const b = AFFINE_TRANSFORM(647, trans, move);
  const c = AFFINE_TRANSFORM(648, trans, move);
  const bd = this.board

  return bd.countlib(a)>1 && bd.countlib(b)>1 
  && !this.cut_possible(c, bd.OTHER_COLOR(color)) 
  && bd.accuratelib(c, bd.OTHER_COLOR(color), bd.MAX_LIBERTIES, null)===1 
  && this.play_attack_defend_n(bd.OTHER_COLOR(color), 1, 1, [c, c])=== codes.WIN;
}

const autohelperconn25 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(611, trans, move);
  const b = AFFINE_TRANSFORM(647, trans, move);
  const c = AFFINE_TRANSFORM(648, trans, move);
  const d = AFFINE_TRANSFORM(610, trans, move);
  const bd = this.board

  return bd.countlib(a)>1 && bd.countlib(b)>1 && 
  !this.cut_possible(c, bd.OTHER_COLOR(color)) 
  && !this.cut_possible(d, bd.OTHER_COLOR(color))
  && bd.accuratelib(c, bd.OTHER_COLOR(color), bd.MAX_LIBERTIES, null)=== 1 
  && this.play_attack_defend_n(bd.OTHER_COLOR(color), 1, 1, [c, c]);
}

const autohelperconn26 = function(trans, move, color, action)
{

  const a = AFFINE_TRANSFORM(685, trans, move);
  const b = AFFINE_TRANSFORM(686, trans, move);
  const c = AFFINE_TRANSFORM(684, trans, move);

  return !this.cut_possible(a, this.board.OTHER_COLOR(color)) && !this.disconnect_helper(b,c);
}

const autohelperconn27 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(648, trans, move);
  const b = AFFINE_TRANSFORM(647, trans, move);
  const c = AFFINE_TRANSFORM(611, trans, move);

  return !this.cut_possible(a, this.board.OTHER_COLOR(color)) && !this.disconnect_helper(b,c);
}

const autohelperconn28 = function(trans, move, color, action)
{
  const c = AFFINE_TRANSFORM(647, trans, move);
  const d = AFFINE_TRANSFORM(611, trans, move);
  const A = AFFINE_TRANSFORM(648, trans, move);
  const B = AFFINE_TRANSFORM(610, trans, move);

  return ((ATTACK_MACRO.call(this,A) && !this.distrust_tactics_helper(A)) 
  || (ATTACK_MACRO.call(this,B) && !this.distrust_tactics_helper(B))) && !this.disconnect_helper(c,d);
}

const autohelperconn29 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(685, trans, move);
  const b = AFFINE_TRANSFORM(686, trans, move);
  const c = AFFINE_TRANSFORM(684, trans, move);
  const d = AFFINE_TRANSFORM(687, trans, move);

  return !this.cut_possible(a, this.board.OTHER_COLOR(color)) 
  && !this.cut_possible(b, this.board.OTHER_COLOR(color)) 
  && !this.disconnect_helper(c,d);
}

const autohelperconn30 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(686, trans, move);
  const b = AFFINE_TRANSFORM(723, trans, move);
  const c = AFFINE_TRANSFORM(684, trans, move);
  const d = AFFINE_TRANSFORM(687, trans, move);
  const E = AFFINE_TRANSFORM(685, trans, move);

  return !this.cut_possible(a, this.board.OTHER_COLOR(color)) 
  && !this.cut_possible(b, this.board.OTHER_COLOR(color)) 
  && this.board.countlib(E)<=2 && !this.disconnect_helper(c,d);
}

const autohelperconn31 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(685, trans, move);
  const b = AFFINE_TRANSFORM(722, trans, move);
  const c = AFFINE_TRANSFORM(684, trans, move);
  const d = AFFINE_TRANSFORM(723, trans, move);

  return !this.cut_possible(a, this.board.OTHER_COLOR(color)) 
  && !this.cut_possible(b, this.board.OTHER_COLOR(color)) 
  && !this.disconnect_helper(c,d);
}

const autohelperconn32 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(685, trans, move);
  const b = AFFINE_TRANSFORM(684, trans, move);
  const c = AFFINE_TRANSFORM(723, trans, move);

  return !this.cut_possible(a, this.board.OTHER_COLOR(color)) && !this.disconnect_helper(b,c);
}

const autohelperconn33 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(685, trans, move);
  const b = AFFINE_TRANSFORM(722, trans, move);
  const c = AFFINE_TRANSFORM(686, trans, move);
  const d = AFFINE_TRANSFORM(723, trans, move);
  const e = AFFINE_TRANSFORM(684, trans, move);
  const f = AFFINE_TRANSFORM(724, trans, move);

  return !this.cut_possible(a, this.board.OTHER_COLOR(color)) 
  && !this.cut_possible(b, this.board.OTHER_COLOR(color)) 
  && !this.cut_possible(c, this.board.OTHER_COLOR(color)) 
  && !this.cut_possible(d, this.board.OTHER_COLOR(color)) 
  && !this.disconnect_helper(e,f);
}

const autohelperconn34 = function(trans, move, color, action)
{
  const a = AFFINE_TRANSFORM(611, trans, move);
  const b = AFFINE_TRANSFORM(647, trans, move);
  const c = AFFINE_TRANSFORM(648, trans, move);
  const d = AFFINE_TRANSFORM(610, trans, move);

  return ATTACK_MACRO.call(this,a) && ATTACK_MACRO.call(this,b) 
  && !this.cut_possible(c, this.board.OTHER_COLOR(color)) 
  && !this.cut_possible(d, this.board.OTHER_COLOR(color));
}


/*
 *  XO     aO
 *  O*     O*
 *
 * Increase the cutstone2 field if * is a potential cutting point,
 * i.e.  if it does work as a cutting point once 'a' has been
 * defended. This helper is expected to always return 0.
 */

const cutstone2_helper = function(ARGS)
{
  // int apos;
  // int bpos;
  // int cpos;
  // int dpos;
  // UNUSED(pattern);
  // UNUSED(color);

  // if (stackp > 0)
  //   return 0;
  
  // apos = OFFSET_BY(-1, -1);
  // bpos = OFFSET_BY(-1,  0);
  // cpos = OFFSET_BY( 0, -1);

  // if (worm[apos].defense_codes[0] == 0)
  //   return 0;
  
  // dpos = worm[apos].defense_points[0];

  // if (TRYMOVE(dpos, board[apos])) {
  //   if (!board[bpos] || attack(bpos, NULL)
	// || !board[cpos] || attack(cpos, NULL)
	// || safe_move(move, board[apos]) != 0) {
  //     popgo();
  //     worm[worm[apos].origin].cutstone2++;
  //     propagate_worm(worm[apos].origin);
  //     return 0;
  //   }
  //   popgo();
  // }

  // return 0;
}


const data = [
  [conn0,3,8, "CB1b",0,-1,2,1,2,2,0x0,685,
    [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
    [ 0x00108410, 0x80104000, 0x48100000, 0x04110800, 0x40108000, 0x84100000, 0x08110400, 0x00104810]
   , 0x200,0.000000,null,1,null,autohelperconn0,0,10.000000],
  [conn1,5,8, "CB2b",0,-1,3,1,3,2,0x0,686,
    [ 0x003c3cfc, 0x00f0f000, 0xf0f00000, 0x3f3f0300, 0xf0f00000, 0x3c3c0000, 0x033f3f00, 0x00f0f0fc],
    [ 0x00100084, 0x00100000, 0x00100000, 0x01100200, 0x00100000, 0x00100000, 0x02100100, 0x00100048]
   , 0x200,0.000000,null,1,null,autohelperconn1,0,10.000000],
  [conn2,5,8, "CB3b",0,0,2,2,2,2,0x0,722,
    [ 0x003f3f3c, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3c, 0x00f0f0f0],
    [ 0x00110204, 0x00100090, 0x00100000, 0x01100000, 0x00100000, 0x02110000, 0x00100118, 0x00100040]
   , 0x200,0.000000,null,1,null,autohelperconn2,0,10.000000],
  [conn3,6,8, "CB3c",0,0,2,2,2,2,0x0,722,
    [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
    [ 0x00110006, 0x00100010, 0x00100000, 0x01100000, 0x00100000, 0x00110000, 0x00100112, 0x00100040]
   , 0x200,0.000000,null,1,null,autohelperconn3,0,19.600000],
  [conn4,1,4, "CB7",0,-1,1,0,1,1,0x0,685,
    [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
    [ 0x00904000, 0x60100000, 0x04180000, 0x00102400, 0x00106000, 0x40900000, 0x24100000, 0x00180400]
   , 0x200,0.000000,null,1,cutstone2_helper,autohelperconn4,0,1.000000],
  [conn5,7,8, "CB11b",0,-1,3,2,3,3,0x0,686,
    [ 0x003cff3f, 0xc0f0f0c0, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xff3c0000, 0x0c3f3f0f, 0x00f0fcf0],
    [ 0x00184601, 0x40106080, 0x44900000, 0x24100400, 0x60104000, 0x46180000, 0x04102409, 0x00904400]
   , 0x200,0.000000,null,1,null,autohelperconn5,0,10.000000],
  [conn6,4,8, "CB15b",-1,0,1,2,2,2,0x0,720,
    [ 0x0c3f3f00, 0x00f0fcf0, 0xf0f0c000, 0xfc3c0000, 0xfcf00000, 0x3f3f0c00, 0x003cfc3c, 0xc0f0f000],
    [ 0x00190400, 0x00106010, 0x40900000, 0x24100000, 0x60100000, 0x04190000, 0x00102410, 0x00904000]
   , 0x200,0.000000,null,1,null,autohelperconn6,0,10.000000],
  [conn7,4,8, "CB16",0,-1,3,0,3,1,0x0,685,
    [ 0x003070f0, 0x40f00000, 0x34300000, 0x003f0700, 0x00f04000, 0x70300000, 0x073f0000, 0x0030343c],
    [ 0x00100090, 0x00100000, 0x00100000, 0x00110200, 0x00100000, 0x00100000, 0x02110000, 0x00100018]
   , 0x200,0.000000,null,1,null,autohelperconn7,0,16.000000],
  [conn8,4,4, "CB17",0,0,2,2,2,2,0x0,722,
    [ 0x003f3c30, 0x00f0f030, 0xf0f00000, 0x3c3f0000, 0xf0f00000, 0x3c3f0000, 0x003f3c30, 0x00f0f030],
    [ 0x00110010, 0x00100010, 0x00100000, 0x00110000, 0x00100000, 0x00110000, 0x00110010, 0x00100010]
   , 0x200,0.000000,null,1,null,autohelperconn8,0,10.000000],
  [conn9,6,8, "CB18",-2,0,1,2,3,2,0x0,759,
    [ 0x3f3f0f00, 0x003cfffc, 0xc0f0f0c0, 0xfcf00000, 0xff3c0000, 0x0f3f3f0c, 0x00f0fcfc, 0xf0f0c000],
    [ 0x22190400, 0x00186218, 0x40902080, 0x24900000, 0x62180000, 0x04192208, 0x00902490, 0x20904000]
   , 0x200,0.000000,null,1,null,autohelperconn9,0,7.000000],
  [conn10,24,4, "EC1",-2,-1,2,4,4,5,0x2,723,
    [ 0x3fbfbfbf, 0xa0fcfefe, 0xf8f8f080, 0xffff2a00, 0xfefca000, 0xbfbf3f0a, 0x2affffff, 0xf0f8f8f8],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
   , 0x80,0.000000,null,0,null,null,0,0.000000],
  [conn11,28,4, "EC1b",-1,-2,2,5,3,7,0x2,759,
    [ 0x3fffffff, 0xf0fcfcfc, 0xfefef000, 0xffff3f2a, 0xfcfcf0a0, 0xffff3f00, 0x3fffffff, 0xf0fefefe],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
   , 0x80,0.000000,null,0,null,null,0,0.000000],
  [conn12,25,8, "EC3a",-1,-1,3,3,4,4,0x2,722,
    [ 0xbfbfbfbf, 0xa8fcfcfc, 0xf8f8f800, 0xffffaa00, 0xfcfca800, 0xbfbfbf00, 0xaaffffff, 0xf8f8f8f8],
    [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
   , 0x80,0.000000,null,1,null,autohelperconn12,0,0.010000],
  [conn13,4,2, "CC101",0,-1,1,0,1,1,0x0,721,
    [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
    [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
   , 0x80,0.000000,null,1,null,autohelperconn13,0,0.016000],
  [conn14,26,2, "CC103",-2,-1,2,4,4,5,0x0,723,
    [ 0xbfbfbf2a, 0xa8fefefe, 0xf8f8f8a0, 0xfefea800, 0xfefea800, 0xbfbfbf2a, 0xa8fefefe, 0xf8f8f8a0],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
   , 0x80,0.000000,null,0,null,null,0,0.000000],
  [conn15,30,8, "CC104",-2,-1,3,4,5,5,0x0,723,
    [ 0xbfbfbfaf, 0xa8fefefe, 0xf8f8f8a0, 0xfffeaa00, 0xfefea800, 0xbfbfbf2a, 0xaafeffff, 0xf8f8f8e8],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
   , 0x80,0.000000,null,0,null,null,0,0.000000],
  [conn16,21,2, "CC105",-2,-1,2,3,4,4,0x0,723,
    [ 0xffffff2a, 0xfcfefefe, 0xfcfcfca0, 0xfefefc00, 0xfefefc00, 0xffffff2a, 0xfcfefefe, 0xfcfcfca0],
    [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
   , 0x80,0.000000,null,0,null,null,0,0.000000],
  [conn17,20,8, "CC106",0,-1,3,3,3,4,0x0,721,
    [ 0x00ffbfbf, 0xb0f0f0f0, 0xf8fc0000, 0x3f3f3a00, 0xf0f0b000, 0xbfff0000, 0x3a3f3f3f, 0x00fcf8f8],
    [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
   , 0x80,0.000000,null,0,null,null,0,0.000000],
  [conn18,20,8, "CC107",0,-1,3,3,3,4,0x0,721,
    [ 0x00ffbfbf, 0xb0f0f0f0, 0xf8fc0000, 0x3f3f3a00, 0xf0f0b000, 0xbfff0000, 0x3a3f3f3f, 0x00fcf8f8],
    [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
   , 0x80,0.000000,null,0,null,null,0,0.000000],
  [conn19,12,4, "CC108",0,0,3,2,3,2,0x0,684,
    [ 0x003f3f3f, 0x00f0f0f0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3f3f0000, 0x003f3f3f, 0x00f0f0f0],
    [ 0x00110000, 0x00100010, 0x00100000, 0x00100000, 0x00100000, 0x00110000, 0x00100010, 0x00100000]
   , 0x80,0.000000,null,1,null,autohelperconn19,0,0.024748],
  [conn20,16,8, "CC109",0,0,3,3,3,3,0x0,684,
    [ 0x003e3e3e, 0x00f0f0a0, 0xf0f00000, 0x3f3f0000, 0xf0f00000, 0x3e3e0000, 0x003f3f2a, 0x00f0f0f0],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
   , 0x80,0.000000,null,1,null,autohelperconn20,0,0.021760],
  [conn21,6,8, "CC401",0,-1,2,1,2,2,0x0,721,
    [ 0x003cfc3c, 0xc0f0f000, 0xfcf00000, 0x3f3f0c00, 0xf0f0c000, 0xfc3c0000, 0x0c3f3f00, 0x00f0fcf0],
    [ 0x00108410, 0x80104000, 0x48100000, 0x04110800, 0x40108000, 0x84100000, 0x08110400, 0x00104810]
   , 0x0,0.000000,null,3,null,autohelperconn21,0,0.010000],
  [conn22,9,8, "CC402",0,-1,3,1,3,2,0x0,721,
    [ 0x003c3cfc, 0x00f0f000, 0xf0f00000, 0x3f3f0300, 0xf0f00000, 0x3c3c0000, 0x033f3f00, 0x00f0f0fc],
    [ 0x00100084, 0x00100000, 0x00100000, 0x01100200, 0x00100000, 0x00100000, 0x02100100, 0x00100048]
   , 0x0,0.000000,null,3,null,autohelperconn22,0,0.010000],
  [conn23,4,4, "CC501",0,-1,1,0,1,1,0x0,721,
    [ 0x0070f000, 0xd0f00000, 0x3c340000, 0x003c1c00, 0x00f0d000, 0xf0700000, 0x1c3c0000, 0x00343c00],
    [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
   , 0x90,0.000000,null,1,null,autohelperconn23,0,0.050000],
  [conn24,3,4, "CC502",0,-1,1,0,1,1,0x0,721,
    [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
    [ 0x00904000, 0x60100000, 0x04180000, 0x00102400, 0x00106000, 0x40900000, 0x24100000, 0x00180400]
   , 0x90,0.000000,null,1,null,autohelperconn24,0,0.160000],
  [conn25,4,4, "CC502b",0,-1,1,0,1,1,0x0,721,
    [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
    [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
   , 0x90,0.000000,null,1,null,autohelperconn25,0,0.106000],
  [conn26,3,2, "CC503",0,0,2,0,2,0,0x0,684,
    [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
    [ 0x00100010, 0x00100000, 0x00100000, 0x00110000, 0x00100000, 0x00100000, 0x00110000, 0x00100010]
   , 0x80,0.000000,null,1,null,autohelperconn26,0,0.010000],
  [conn27,3,4, "CC504",0,-1,1,0,1,1,0x0,721,
    [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
    [ 0x00904000, 0x60100000, 0x04180000, 0x00102400, 0x00106000, 0x40900000, 0x24100000, 0x00180400]
   , 0x80,0.000000,null,1,null,autohelperconn27,0,0.010000],
  [conn28,2,2, "CC505",0,-1,1,0,1,1,0x0,721,
    [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
    [ 0x00906000, 0x60900000, 0x24180000, 0x00182400, 0x00906000, 0x60900000, 0x24180000, 0x00182400]
   , 0x80,0.000000,null,1,null,autohelperconn28,0,1.600000],
  [conn29,4,2, "CC506",0,0,3,0,3,0,0x0,684,
    [ 0x00303030, 0x00f00000, 0x30300000, 0x003f0000, 0x00f00000, 0x30300000, 0x003f0000, 0x00303030],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
   , 0x80,0.000000,null,1,null,autohelperconn29,0,0.016000],
  [conn30,7,8, "CC506b",0,0,3,1,3,1,0x0,684,
    [ 0x003c383c, 0x00f0b000, 0xb0f00000, 0x3b3f0000, 0xb0f00000, 0x383c0000, 0x003f3b00, 0x00f0b0f0],
    [ 0x00102000, 0x00900000, 0x20100000, 0x00180000, 0x00900000, 0x20100000, 0x00180000, 0x00102000]
   , 0x80,0.000000,null,1,null,autohelperconn30,0,0.019600],
  [conn31,6,5, "CC507",0,0,2,1,2,1,0x0,684,
    [ 0x00343c1c, 0x00f0d000, 0xf0700000, 0x1f3d0000, 0xd0f00000, 0x3c340000, 0x003d1f00, 0x0070f0d0],
    [ 0x00100004, 0x00100000, 0x00100000, 0x01100000, 0x00100000, 0x00100000, 0x00100100, 0x00100040]
   , 0x80,0.000000,null,1,null,autohelperconn31,0,0.016000],
  [conn32,4,8, "CC508",0,0,2,1,2,1,0x0,684,
    [ 0x00303c1c, 0x00f0c000, 0xf0300000, 0x0f3d0000, 0xc0f00000, 0x3c300000, 0x003d0f00, 0x0030f0d0],
    [ 0x00100804, 0x00108000, 0x80100000, 0x09100000, 0x80100000, 0x08100000, 0x00100900, 0x00108040]
   , 0x80,0.000000,null,1,null,autohelperconn32,0,0.010000],
  [conn33,8,5, "CC509",0,0,3,1,3,1,0x0,684,
    [ 0x00343c3c, 0x00f0d000, 0xf0700000, 0x1f3f0000, 0xd0f00000, 0x3c340000, 0x003f1f00, 0x0070f0f0],
    [ 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000, 0x00100000]
   , 0x80,0.000000,null,1,null,autohelperconn33,0,0.021760],
  [conn34,4,4, "CC511",0,-1,1,0,1,1,0x0,721,
    [ 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0x003c3c00],
    [ 0x00104000, 0x40100000, 0x04100000, 0x00100400, 0x00104000, 0x40100000, 0x04100000, 0x00100400]
   , 0x90,0.000000,null,1,null,autohelperconn34,0,1.605760],
  [null, 0,0,null,0,0,0,0,0,0,0,0,[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],0,0.0,null,0,null,null,0,0.0]
]

const conn = data.map(item => new Pattern(item))

export const conn_db = new PatternDB([-1, 0, conn, null])