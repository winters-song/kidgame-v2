import {PatternDB, Pattern, ATTACK_MACRO, DEFEND_MACRO} from "./Patterns";
import {AFFINE_TRANSFORM} from "../Liberty";
import {codes, NO_MOVE} from "../Constants";

const owl_vital_apat0 = [
[646,1],	[720,1],	[648,1],	[722,1],
[684,1],	[758,3]
]

const owl_vital_apat1 = [
[609,1],	[610,1],	[722,1],	[723,1],
[686,1],	[648,1],	[684,1]
]

const owl_vital_apat2 = [
[756,1],	[719,1],	[647,1],	[720,1],
[684,1],	[683,3]
]

const owl_vital_apat3 = [
[646,1],	[683,1],	[760,1],	[684,1],
[759,1],	[722,1],	[721,3]
]

const owl_vital_apat4 = [
[648,1],	[722,1],	[684,1],	[720,3],
[757,3]
]

const owl_vital_apat5 = [
[758,1],	[721,1],	[684,1],	[648,1]
]

const owl_vital_apat6 = [
[649,1],	[686,1],	[720,1],	[684,1],
[722,1],	[721,3],	[723,3]
]

const owl_vital_apat7 = [
[648,1],	[722,1],	[647,1],	[684,1],
[686,1],	[723,3]
]

const owl_vital_apat8 = [
[684,1]
]

const owl_vital_apat9 = [
[684,1]
]

const owl_vital_apat10 = [
[611,7],	[683,1],	[610,1],	[758,1],
[685,1],	[721,1],	[646,1],	[795,3],
[796,3]
]

const owl_vital_apat11 = [
[685,1],	[723,1],	[648,1],	[684,1],
[720,3],	[612,3],	[611,3],	[683,3]
]

const owl_vital_apat12 = [
[686,7],	[720,1],	[722,1],	[684,1],
[647,1],	[648,1],	[683,1]
]

const owl_vital_apat13 = [
[721,7],	[720,1],	[685,1],	[684,1]
]

const owl_vital_apat14 = [
[647,1],	[686,1],	[684,1],	[722,1]
]

const owl_vital_apat15 = [
[649,1],	[722,1],	[684,1],	[720,1],
[683,3]
]

const owl_vital_apat16 = [
[683,7],	[647,1],	[722,1],	[649,1],
[686,1],	[721,1],	[720,3]
]

const owl_vital_apat17 = [
[647,7],	[648,1],	[649,1],	[722,1],
[723,1],	[684,1]
]

const owl_vital_apat18 = [
[686,1],	[684,1],	[648,1],	[649,1],
[758,3]
]

const owl_vital_apat19 = [
[682,1],	[646,1],	[686,1],	[720,1],
[722,1],	[684,1],	[648,1]
]

const owl_vital_apat20 = [
[647,1],	[722,1]
]

const owl_vital_apat21 = [
[684,1],	[649,3]
]

const owl_vital_apat22 = [
[648,1],	[759,3]
]

const owl_vital_apat23 = [
[684,1]
]

const owl_vital_apat24 = [
[723,1],	[648,1],	[722,1],	[684,1]
]

const owl_vital_apat25 = [
[720,7],	[719,1],	[646,1],	[686,1],
[682,1],	[757,1],	[610,1],	[722,1],
[684,1],	[611,1],	[758,1],	[649,1]
]

const owl_vital_apat26 = [
[682,1],	[719,1],	[646,1],	[686,1],
[722,1],	[757,1],	[610,1],	[611,1],
[684,1],	[649,1],	[758,1]
]

const owl_vital_apat27 = [
[647,1],	[684,1],	[686,1],	[759,1],
[722,3],	[760,3]
]

const owl_vital_apat28 = [
[646,1],	[683,1],	[685,1],	[758,1],
[721,3],	[759,3]
]

const owl_vital_apat29 = [
[721,7],	[683,1],	[646,1],	[720,1],
[685,1],	[610,1],	[611,3]
]

const owl_vital_apat30 = [
[686,7],	[685,1],	[684,1],	[720,1],
[759,1],	[758,1],	[723,1]
]

const owl_vital_apat31 = [
[648,7],	[647,1],	[686,1],	[722,1],
[684,1]
]

const owl_vital_apat32 = [
[721,7],	[686,1],	[648,1],	[684,1],
[649,1],	[722,1]
]

const owl_vital_apat33 = [
[721,7],	[684,1],	[759,1],	[648,1]
]

const owl_vital_apat34 = [
[648,7],	[647,1],	[722,1],	[721,1],
[683,1],	[686,1]
]

const owl_vital_apat35 = [
[720,1],	[757,1],	[684,1],	[759,1],
[686,1],	[685,1]
]

const owl_vital_apat36 = [
[758,1],	[759,1],	[760,1],	[720,1],
[684,1],	[611,1],	[723,1],	[683,1],
[648,1],	[612,1]
]

const owl_vital_apat37 = [
[759,7],	[722,1],	[758,1],	[684,1],
[720,1],	[683,3]
]

const owl_vital_apat38 = [
[648,7],	[684,1],	[649,3]
]

const owl_vital_apat39 = [
[683,7],	[720,1],	[685,1],	[646,1],
[684,1]
]

const owl_vital_apat40 = [
[610,1],	[722,1],	[647,1],	[684,1],
[723,3]
]

const owl_vital_apat41 = [
[649,7],	[647,1],	[684,1],	[723,1],
[722,1]
]

const owl_vital_apat42 = [
[720,1],	[686,1],	[646,1],	[648,1],
[684,1],	[649,1],	[722,1]
]

const owl_vital_apat43 = [
[647,1],	[684,1],	[721,1]
]

const owl_vital_apat44 = [
[684,1],	[686,1]
]

const owl_vital_apat45 = [
[684,1],	[722,1]
]

const owl_vital_apat46 = [
[646,1],	[610,1],	[648,1],	[684,1]
]

const owl_vital_apat47 = [
[685,1]
]

const owl_vital_apat48 = [
[685,1]
]

const owl_vital_apat49 = [
[647,7],	[684,1],	[721,1]
]

const owl_vital_apat50 = [
[684,1],	[722,1]
]

const owl_vital_apat51 = [
[684,1],	[648,1],	[721,1],	[645,3],
[683,3],	[758,3],	[682,3],	[759,3]
]

const owl_vital_apat52 = [
[758,1],	[720,1],	[722,1],	[684,1],
[759,3]
]

const owl_vital_apat53 = [
[723,1],	[760,1],	[684,1],	[724,1],
[720,1],	[758,1],	[759,1]
]

const owl_vital_apat54 = [
[758,1],	[723,1],	[760,1],	[759,1],
[719,1],	[684,1],	[724,1],	[720,1]
]

const owl_vital_apat55 = [
[719,1],	[682,1],	[645,1],	[647,1],
[648,1],	[646,1],	[721,1]
]

const owl_vital_apat56 = [
[646,1],	[684,1],	[720,1]
]

const owl_vital_apat57 = [
[682,1],	[646,1],	[684,1],	[720,1]
]

const owl_vital_apat58 = [
[648,1],	[646,1],	[684,1],	[610,1],
[609,3]
]


const autohelperowl_vital_apat0 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(646, trans, move);
  let c = AFFINE_TRANSFORM(682, trans, move);
  let d = AFFINE_TRANSFORM(721, trans, move);
  let A = AFFINE_TRANSFORM(719, trans, move);

  return  this.board.countlib(a)>2 && this.owl_topological_eye(b, this.board.board[A]) === 2 && this.owl_topological_eye(c, this.board.board[A]) === 2 && this.play_attack_defend_n(color, 1, 1, [move, d]);
}

const autohelperowl_vital_apat1 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(610, trans, move);
  let B = AFFINE_TRANSFORM(687, trans, move);

  return this.board.countlib(A) === 2 && this.board.countlib(B) === 2;
}

const autohelperowl_vital_apat5 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(832, trans, move);

  return this.board.countlib(a) === 2;
}

const autohelperowl_vital_apat7 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(647, trans, move);

  return this.board.countlib(A) === 2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>1;
}

const autohelperowl_vital_apat8 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A) === 2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>1 && this.owl_big_eyespace(move)&& (this.owl_eye_size(move) <= 8 || !this.play_attack_defend_n(color, 1, 1, [move, move]));
}

const autohelperowl_vital_apat9 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A) === 2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null) === 1 && this.owl_big_eyespace(move) && this.play_attack_defend_n(color, 1, 1, [move, move]) !== codes.WIN;
}

const autohelperowl_vital_apat10 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(609, trans, move);

  return ATTACK_MACRO.call(this,a) && !DEFEND_MACRO.call(this,a);
}

const autohelperowl_vital_apat12 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(649, trans, move);
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)<=3 && this.play_attack_defend_n(color, 1, 1, [a, a]);
}

const autohelperowl_vital_apat13 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(757, trans, move);
  let b = AFFINE_TRANSFORM(719, trans, move);
  let c = AFFINE_TRANSFORM(758, trans, move);
  let D = AFFINE_TRANSFORM(720, trans, move);

  return this.board.countlib(b)>1 && this.board.countlib(c)>1 && this.owl_eyespace(a) && !ATTACK_MACRO.call(this,D);
}

const autohelperowl_vital_apat14 = (trans, move, color, action) => {
  let b = AFFINE_TRANSFORM(720, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);
  let d = AFFINE_TRANSFORM(722, trans, move);
  let A = AFFINE_TRANSFORM(646, trans, move);

  return this.board.countlib(A)  ===  2 && this.board.countlib(b) > 1 && !this.play_attack_defend_n(color, 1, 3, [move, c, d, d]);
}

const autohelperowl_vital_apat15 = (trans, move, color, action) => {
  

  return this.owl_eyespace(move);
}

const autohelperowl_vital_apat16 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(682, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_vital_apat17 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(646, trans, move);

  return  this.play_attack_defend_n(color, 1, 2, [move, a, a]);
}

const autohelperowl_vital_apat18 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(610, trans, move);

  return this.board.countlib(A) === 2 && this.owl_big_eyespace(move);
}

const autohelperowl_vital_apat19 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(720, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let C = AFFINE_TRANSFORM(721, trans, move);

  return  this.owl_topological_eye(a, this.board.board[C])  ===  2 && this.owl_topological_eye(b, this.board.board[C])  ===  2;
}

const autohelperowl_vital_apat20 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(685, trans, move);

  return this.owl_big_eyespace(a);
}

const autohelperowl_vital_apat21 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(647, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_big_eyespace(move) && this.play_attack_defend_n(color, 1, 2, [move, a, B]);
}

const autohelperowl_vital_apat22 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(685, trans, move);
  let b = AFFINE_TRANSFORM(722, trans, move);
  let c = AFFINE_TRANSFORM(721, trans, move);

  return this.owl_big_eyespace(move) && this.play_attack_defend_n(color, 1, 4, [move, a, b, c, a]);
}

const autohelperowl_vital_apat23 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A) === 1 && this.owl_eyespace(move) && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null) > 1;
}

const autohelperowl_vital_apat27 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(759, trans, move);

  return this.somewhere(this.board.OTHER_COLOR(color), 0, 2, [A, B]);
}

const autohelperowl_vital_apat28 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(757, trans, move);
  let B = AFFINE_TRANSFORM(795, trans, move);

  return this.somewhere(this.board.OTHER_COLOR(color), 0, 2, [A, B]);
}

const autohelperowl_vital_apat30 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(648, trans, move);
  let C = AFFINE_TRANSFORM(720, trans, move);

  return this.board.countlib(C) === 2 && this.owl_eyespace(a) && this.play_attack_defend_n(color, 1, 3, [move, a, b, b]) !== codes.WIN;
}

const autohelperowl_vital_apat31 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(795, trans, move);
  let b = AFFINE_TRANSFORM(758, trans, move);

  return !this.play_attack_defend_n(color, 1, 3, [a, NO_MOVE, b, a]);
}

const autohelperowl_vital_apat32 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(687, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.board.countlib(a)>1 || !this.play_attack_defend_n(color, 1, 3, [move, NO_MOVE, b, move]) === codes.WIN;
}

const autohelperowl_vital_apat34 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(758, trans, move);

  return  this.play_attack_defend2_n(color, 0, 1, [move, A, move]);
}

const autohelperowl_vital_apat35 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(683, trans, move);

  return  this.board.accuratelib(A, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null) === 2;
}

const autohelperowl_vital_apat37 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(536, trans, move);

  return this.board.countlib(A) > 2;
}

const autohelperowl_vital_apat38 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(683, trans, move);

  return this.owl_big_eyespace(move) && !this.play_attack_defend_n(color, 0, 1, [move, A]);
}

const autohelperowl_vital_apat39 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(719, trans, move);
  let b = AFFINE_TRANSFORM(757, trans, move);

  return this.owl_eyespace(a) && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>1 && this.board.countlib(b)>1;
}

const autohelperowl_vital_apat40 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(682, trans, move);

  return  this.board.countlib(A)  ===  3;
}

const autohelperowl_vital_apat41 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(721, trans, move);
  let B = AFFINE_TRANSFORM(683, trans, move);

  return this.board.countlib(A)  === 2 || this.board.countlib(B)  ===  2;
}

const autohelperowl_vital_apat42 = (trans, move, color, action) => {
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(647, trans, move);
  let D = AFFINE_TRANSFORM(724, trans, move);

  return !ATTACK_MACRO.call(this,D) && this.play_attack_defend_n(color, 1, 1, [move, b]) && this.play_attack_defend_n(color, 1, 1, [move, c]);
}

const autohelperowl_vital_apat43 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(720, trans, move);

  return  !this.play_attack_defend_n(color, 1, 3, [move, a, b, b]) && !this.play_attack_defend_n(color, 1, 3, [move, b, a, a]);
}

const autohelperowl_vital_apat44 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(683, trans, move);
  let b = AFFINE_TRANSFORM(721, trans, move);
  let c = AFFINE_TRANSFORM(685, trans, move);

  return  this.owl_proper_eye(move) && (this.owl_proper_eye(a) + this.owl_proper_eye(b) + this.owl_proper_eye(c) > 2) && this.safe_move(move, this.board.OTHER_COLOR(color)) && ((this.owl_eye_size(move) <= 8 && this.owl_maxeye(move)>1) || !this.play_attack_defend_n(color, 1, 1, [move, move]));
}

const autohelperowl_vital_apat45 = (trans, move, color, action) => {
  

  return  !this.board.is_ko_point(move)
}

const autohelperowl_vital_apat46 = (trans, move, color, action) => {
  let b = AFFINE_TRANSFORM(572, trans, move);
  let A = AFFINE_TRANSFORM(610, trans, move);
  let C = AFFINE_TRANSFORM(535, trans, move);

  return  this.board.accuratelib(A, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null)  ===  1 && this.board.accuratelib(A, color, this.board.MAX_LIBERTIES, null)  ===  1 && this.owl_topological_eye(b, this.board.board[C]) < 4 && this.owl_topological_eye(b, this.board.board[C]) > 0;
}

const autohelperowl_vital_apat47 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.vital_chain(a) && this.vital_chain(b) && !this.board.is_ko_point(move)
}

const autohelperowl_vital_apat48 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(647, trans, move);
  let b = AFFINE_TRANSFORM(685, trans, move);

  return this.vital_chain(a) && this.vital_chain(b) && this.board.is_ko_point(move)
}

const autohelperowl_vital_apat50 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(648, trans, move);
  let B = AFFINE_TRANSFORM(685, trans, move);

  return  this.board.countlib(B) <= 2 && this.owl_eyespace(A);
}

const autohelperowl_vital_apat55 = (trans, move, color, action) => {
  let A = AFFINE_TRANSFORM(681, trans, move);

  return this.board.countlib(A) === 2;
}

const autohelperowl_vital_apat56 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(720, trans, move);
  let B = AFFINE_TRANSFORM(721, trans, move);

  return this.board.countlib(B) === 2 && this.board.accuratelib(move, color, this.board.MAX_LIBERTIES, null)>=2
    && this.owl_proper_eye(move) && this.owl_maxeye(a)>0;
}

const autohelperowl_vital_apat57 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(721, trans, move);
  let b = AFFINE_TRANSFORM(683, trans, move);

  return this.board.accuratelib(a, this.board.OTHER_COLOR(color), this.board.MAX_LIBERTIES, null) === 3
    && this.play_lib_n(color, 3, [move, a, b, b])>1;
}

const autohelperowl_vital_apat58 = (trans, move, color, action) => {
  let a = AFFINE_TRANSFORM(609, trans, move);

  return this.owl_mineye(a) === 1;
}

const data = [
[owl_vital_apat0,6,8, "VA1",-2,-1,1,2,3,3,0x0,685,
  [ 0xfcfdfc30, 0xfcfcfc10, 0xfcfcfc00, 0xfcfffc00, 0xfcfcfc00, 0xfcfdfc00, 0xfcfffc10, 0xfcfcfc30],
  [ 0x88208810, 0x88208800, 0x88208800, 0x88218800, 0x88208800, 0x88208800, 0x88218800, 0x88208810]
  , 0x0,75.000000,null,1,null,autohelperowl_vital_apat0,3,0.235600],
[owl_vital_apat1,7,8, "VA2",-2,-1,1,2,3,3,0xa,683,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xfffffffc, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xfffffffc],
  [ 0x00208868, 0x80208000, 0x89220200, 0x0a2209a4, 0x80208068, 0x88200000, 0x09220a00, 0x022289a4]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat1,3,0.016000],
[owl_vital_apat2,6,8, "VA3",-2,-2,1,2,3,4,0xa,610,
  [ 0x1fffff00, 0xf0f4ffff, 0xffffd3c0, 0xfc7c3cfc, 0xfff4f0fc, 0xffff1f0f, 0x3c7cfcfc, 0xd3ffff00],
  [ 0x09a10000, 0x20200a16, 0x00288180, 0x80202040, 0x0a202004, 0x00a1090a, 0x20208050, 0x81280000]
  , 0x0,45.000000,null,0,null,null,3,0.000000],
[owl_vital_apat3,7,8, "VA4",-1,-1,2,2,3,3,0xa,686,
  [ 0xf0f4ffff, 0xfcfcd0c0, 0xfc7c3c00, 0x1fffff00, 0xd0fcfc00, 0xfff4f000, 0xffff1f0f, 0x3c7cfcfc],
  [ 0xa0604a02, 0x58288080, 0x84242800, 0x08a09400, 0x80285800, 0x4a60a000, 0x94a0080a, 0x28248400]
  , 0x10,45.000000,null,0,null,null,3,0.000000],
[owl_vital_apat4,5,8, "VA5",-1,-1,2,1,3,2,0xa,685,
  [ 0x053eff00, 0xc0f0f4e4, 0xfcf04000, 0x7c3c0c00, 0xf4f0c000, 0xff3e0500, 0x0c3c7c6c, 0x40f0fc00],
  [ 0x00248900, 0x80209040, 0x88600000, 0x18200800, 0x90208000, 0x89240000, 0x08201804, 0x00608800]
  , 0x10,45.000000,null,0,null,null,3,0.000000],
[owl_vital_apat5,4,8, "VA6",0,-2,1,2,1,4,0x2,611,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfffc0000, 0x3c3c3c0c, 0xf0f0f0c0, 0xffff0000, 0x3c3c3c3c, 0x00fcff00],
  [ 0x006a9100, 0x90602060, 0x18a40000, 0x20241800, 0x20609000, 0x916a0000, 0x18242024, 0x00a41800]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat5,3,0.010000],
[owl_vital_apat6,7,8, "VA7",-2,-1,1,1,3,2,0xa,646,
  [ 0xfcf4fcf4, 0xfcfcdc00, 0xfc7cfc00, 0xddffff00, 0xdcfcfc00, 0xfcf4fc00, 0xffffdd00, 0xfc7cfc7c],
  [ 0x186048a0, 0x50248800, 0x84249000, 0x88621600, 0x88245000, 0x48601800, 0x16628800, 0x90248428]
  , 0x10,45.000000,null,0,null,null,3,0.000000],
[owl_vital_apat7,6,8, "VA8",-1,0,1,2,2,2,0x0,721,
  [ 0x00fcfcf4, 0xf0f0f000, 0xfcfc0000, 0x3d3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3d00, 0x00fcfc7c],
  [ 0x00a08860, 0xa0208000, 0x88280000, 0x08222900, 0x8020a000, 0x88a00000, 0x29220800, 0x00288824]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat7,3,0.040000],
[owl_vital_apat8,1,4, "VA9",0,0,0,1,0,1,0x0,685,
  [ 0x00303000, 0x00f00000, 0x30300000, 0x003c0000, 0x00f00000, 0x30300000, 0x003c0000, 0x00303000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat8,3,0.175360],
[owl_vital_apat9,1,4, "VA10",0,0,0,1,0,1,0x0,685,
  [ 0x00303000, 0x00f00000, 0x30300000, 0x003c0000, 0x00f00000, 0x30300000, 0x003c0000, 0x00303000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x10,35.000000,null,1,null,autohelperowl_vital_apat9,3,0.259600],
[owl_vital_apat10,9,8, "VA11",-1,-2,1,3,2,5,0x2,722,
  [ 0xf0ffff00, 0xfcfcf0f0, 0xffff3c00, 0x3cfcfc3c, 0xf0fcfcf0, 0xfffff000, 0xfcfc3c3c, 0x3cffff00],
  [ 0xa05a6000, 0x58982020, 0x24962800, 0x20989420, 0x20985820, 0x605aa000, 0x94982020, 0x28962400]
  , 0x10,65.000000,null,1,null,autohelperowl_vital_apat10,0,1.600000],
[owl_vital_apat11,8,8, "VA12",-1,-1,2,2,3,3,0xa,686,
  [ 0x143cfcfc, 0xc0f4f400, 0xfdf05000, 0x7f7f0f05, 0xf4f4c040, 0xfc3c1400, 0x0f7f7f00, 0x50f0fdfd],
  [ 0x0020a408, 0x80a04000, 0x68200000, 0x06280800, 0x40a08000, 0xa4200000, 0x08280600, 0x00206880]
  , 0x10,75.000000,null,0,null,null,3,0.000000],
[owl_vital_apat12,7,8, "VA13",-1,-1,2,1,3,2,0xa,721,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x28a09844, 0xa0688800, 0x9828a000, 0x89a42900, 0x8868a000, 0x98a02800, 0x29a48900, 0xa0289844]
  , 0x10,85.000000,null,1,null,autohelperowl_vital_apat12,3,0.610000],
[owl_vital_apat13,4,8, "VA14",-1,-1,1,1,2,2,0x2,648,
  [ 0x3cfcfc00, 0xf0fcfc00, 0xfcfcf000, 0xfcfc3c00, 0xfcfcf000, 0xfcfc3c00, 0x3cfcfc00, 0xf0fcfc00],
  [ 0x18602400, 0x10a44800, 0x60249000, 0x84681000, 0x48a41000, 0x24601800, 0x10688400, 0x90246000]
  , 0x0,35.000000,null,1,null,autohelperowl_vital_apat13,3,0.235600],
[owl_vital_apat14,4,8, "VA15",-1,0,1,2,2,2,0x0,685,
  [ 0x00fcfc3c, 0xf0f0f000, 0xfcfc0000, 0x3f3f3c00, 0xf0f0f000, 0xfcfc0000, 0x3c3f3f00, 0x00fcfcf0],
  [ 0x00a40820, 0x20209000, 0x80680000, 0x18222000, 0x90202000, 0x08a40000, 0x20221800, 0x00688020]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat14,3,0.376000],
[owl_vital_apat15,5,8, "VA16",-1,-2,1,1,2,3,0x1,685,
  [ 0x1cfcfcfc, 0xf0f4fc00, 0xfcfcd000, 0xff7f3f00, 0xfcf4f000, 0xfcfc1c00, 0x3f7fff00, 0xd0fcfcfc],
  [ 0x08200880, 0x00208800, 0x80208000, 0x88200200, 0x88200000, 0x08200800, 0x02208800, 0x80208008]
  , 0x0,46.000000,null,1,null,autohelperowl_vital_apat15,3,0.010000],
[owl_vital_apat16,7,8, "VA17",-1,-1,1,3,2,4,0x0,685,
  [ 0xf4fcfcfc, 0xfcfcf400, 0xfcfc7c00, 0x7fffff00, 0xf4fcfc00, 0xfcfcf400, 0xffff7f00, 0x7cfcfcfc],
  [ 0x009808a4, 0x2010a000, 0x80980000, 0x29122200, 0xa0102000, 0x08980000, 0x22122900, 0x00988068]
  , 0x10,35.000000,null,1,null,autohelperowl_vital_apat16,0,1.000000],
[owl_vital_apat17,6,8, "VA18",-1,-2,1,1,2,3,0x0,685,
  [ 0xc0fcfcfc, 0xfcf0f000, 0xfcfc0c00, 0x3f3fff00, 0xf0f0fc00, 0xfcfcc000, 0xff3f3f00, 0x0cfcfcfc],
  [ 0x40248888, 0x84209000, 0x88600400, 0x1a204a00, 0x90208400, 0x88244000, 0x4a201a00, 0x04608888]
  , 0x0,35.000000,null,1,null,autohelperowl_vital_apat17,3,1.000000],
[owl_vital_apat18,5,8, "VA19",0,-1,2,2,2,3,0x2,722,
  [ 0x00fdffff, 0xf0f0f0d0, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfffd0000, 0x3f3f3f1f, 0x00fcfcfc],
  [ 0x006080a0, 0x90200000, 0x08240000, 0x00221a00, 0x00209000, 0x80600000, 0x1a220000, 0x00240828]
  , 0x10,75.000000,null,1,null,autohelperowl_vital_apat18,3,0.016000],
[owl_vital_apat19,7,4, "VA20",-2,-1,2,1,4,2,0x0,647,
  [ 0xfcf0fc30, 0xfcffcc00, 0xfc3cfc30, 0xccfffc00, 0xccfffc00, 0xfcf0fc30, 0xfcffcc00, 0xfc3cfc30],
  [ 0x88208820, 0x88228800, 0x88208820, 0x88228800, 0x88228800, 0x88208820, 0x88228800, 0x88208820]
  , 0x0,75.000000,null,1,null,autohelperowl_vital_apat19,3,0.016000],
[owl_vital_apat20,2,8, "VA21",0,-1,2,1,2,2,0x2,685,
  [ 0x00f0fcfc, 0xf0f0c000, 0xfc3c0000, 0x0f3f3f00, 0xc0f0f000, 0xfcf00000, 0x3f3f0f00, 0x003cfcfc],
  [ 0x00900800, 0x20108000, 0x80180000, 0x08102000, 0x80102000, 0x08900000, 0x20100800, 0x00188000]
  , 0x0,75.000000,null,1,null,autohelperowl_vital_apat20,0,0.010000],
[owl_vital_apat21,2,8, "VA22",-1,-2,1,0,2,2,0x2,685,
  [ 0x00fcfc7c, 0xf0f0f000, 0xfcfc0000, 0x3f3f3d00, 0xf0f0f000, 0xfcfc0000, 0x3d3f3f00, 0x00fcfcf4],
  [ 0x00600000, 0x10200000, 0x00240000, 0x00201000, 0x00201000, 0x00600000, 0x10200000, 0x00240000]
  , 0x0,75.000000,null,1,null,autohelperowl_vital_apat21,3,0.610000],
[owl_vital_apat22,2,8, "VA23",0,-2,3,1,3,3,0x2,685,
  [ 0x0030fdff, 0xc0f0c040, 0xfc300000, 0x0f3f0f00, 0xc0f0c000, 0xfd300000, 0x0f3f0f07, 0x0030fcfc],
  [ 0x00108000, 0x80100000, 0x08100000, 0x00100800, 0x00108000, 0x80100000, 0x08100000, 0x00100800]
  , 0x0,75.000000,null,1,null,autohelperowl_vital_apat22,0,0.610000],
[owl_vital_apat23,1,4, "VA24",0,0,0,1,0,1,0x0,685,
  [ 0x00303000, 0x00f00000, 0x30300000, 0x003c0000, 0x00f00000, 0x30300000, 0x003c0000, 0x00303000],
  [ 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000, 0x00200000]
  , 0x0,76.000000,null,1,null,autohelperowl_vital_apat23,3,0.034000],
[owl_vital_apat24,4,8, "VA25",-1,-1,2,1,3,2,0x6,721,
  [ 0xf0fcfcfc, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0x3cfcfcfc],
  [ 0x50209818, 0x84648000, 0x98201400, 0x0a654800, 0x80648400, 0x98205000, 0x48650a00, 0x14209890]
  , 0x0,76.000000,null,0,null,null,3,0.000000],
[owl_vital_apat25,12,8, "VA26",-2,-2,2,2,4,4,0x0,647,
  [ 0xfffffcf0, 0xfcffff3c, 0xfffffcf0, 0xfcffff3c, 0xfffffcf0, 0xfcffff3c, 0xfffffcf0, 0xfcffff3c],
  [ 0x922618a0, 0x08669228, 0x926218a0, 0x18668228, 0x926608a0, 0x18269228, 0x826618a0, 0x18629228]
  , 0x10,70.000000,null,0,null,null,3,0.000000],
[owl_vital_apat26,11,8, "VA26b",-2,-2,2,2,4,4,0x0,648,
  [ 0xfffffcf0, 0xfcffff3c, 0xfffffcf0, 0xfcffff3c, 0xfffffcf0, 0xfcffff3c, 0xfffffcf0, 0xfcffff3c],
  [ 0x922618a0, 0x08669228, 0x926218a0, 0x18668228, 0x926608a0, 0x18269228, 0x826618a0, 0x18629228]
  , 0x10,0.000000,null,0,null,null,3,0.000000],
[owl_vital_apat27,6,8, "VA27",0,-1,2,2,2,3,0x2,685,
  [ 0x00f0f7fd, 0xf0f040c0, 0x7c3c0000, 0x073f3f00, 0x40f0f000, 0xf7f00000, 0x3f3f070d, 0x003c7cfc],
  [ 0x00a00264, 0x20200080, 0x00280000, 0x01222100, 0x00202000, 0x02a00000, 0x21220108, 0x00280064]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat27,3,0.010000],
[owl_vital_apat28,6,8, "VA28",-1,-1,1,2,2,3,0x2,648,
  [ 0xf0f7fd00, 0xfcfcd070, 0xfc7c3c00, 0x1cfcfc00, 0xd0fcfc00, 0xfdf7f000, 0xfcfc1c34, 0x3c7cfc00],
  [ 0xa0122400, 0x08984020, 0x60102800, 0x04988000, 0x40980800, 0x2412a000, 0x80980420, 0x28106000]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat28,0,0.010000],
[owl_vital_apat29,7,8, "VA29",-1,-1,1,2,2,3,0xa,648,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfdfffc00, 0xfcfcfc34, 0xfcfcfc70, 0xfcfcfc00, 0xfcfcfc00, 0xfcfffd00],
  [ 0xa8102400, 0x08984800, 0x6012a800, 0x84988020, 0x48980820, 0x2410a800, 0x80988400, 0xa8126000]
  , 0x10,45.000000,null,0,null,null,0,0.000000],
[owl_vital_apat30,7,8, "VA30",0,-1,2,2,2,3,0x0,722,
  [ 0x0c3f3f3c, 0x00f0fcf0, 0xf0f0c000, 0xff3f0000, 0xfcf00000, 0x3f3f0c00, 0x003fff3c, 0xc0f0f0f0],
  [ 0x08222208, 0x00a008a0, 0x20208000, 0x82280000, 0x08a00000, 0x22220800, 0x00288228, 0x80202080]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat30,3,0.376000],
[owl_vital_apat31,5,8, "VA31",-2,0,2,2,4,2,0x4,649,
  [ 0x00fcffff, 0xf0f0f0c0, 0xfcfc0000, 0x3f3f3f03, 0xf0f0f000, 0xfffc0000, 0x3f3f3f0f, 0x00fcfcff],
  [ 0x00a40920, 0x20209040, 0x80680000, 0x18222000, 0x90202000, 0x09a40000, 0x20221804, 0x00688020]
  , 0x10,76.000000,null,1,null,autohelperowl_vital_apat31,3,1.000000],
[owl_vital_apat32,6,8, "VA32",-1,-1,2,1,3,2,0x4,720,
  [ 0x3cfcfcfc, 0xf0fcfc00, 0xfcfcf000, 0xffff3f00, 0xfcfcf000, 0xfcfc3c00, 0x3fffff00, 0xf0fcfcfc],
  [ 0x106088a4, 0x90248000, 0x88241000, 0x09621a00, 0x80249000, 0x88601000, 0x1a620900, 0x10248868]
  , 0x10,76.000000,null,1,null,autohelperowl_vital_apat32,3,0.610000],
[owl_vital_apat33,4,8, "VA33",-1,0,2,1,3,1,0x4,758,
  [ 0x003fff00, 0xc0f0f0f0, 0xfcf00000, 0x3c3c0c00, 0xf0f0c000, 0xff3f0000, 0x0c3c3c3c, 0x00f0fc00],
  [ 0x00209600, 0x80604080, 0x58200000, 0x04240800, 0x40608000, 0x96200000, 0x08240408, 0x00205800]
  , 0x0,76.000000,null,0,null,null,3,0.000000],
[owl_vital_apat34,6,8, "VA34",-1,-1,2,1,3,2,0x0,649,
  [ 0x30fcfcfc, 0xf0fcf000, 0xfcfc3000, 0x3fff3f00, 0xf0fcf000, 0xfcfc3000, 0x3fff3f00, 0x30fcfcfc],
  [ 0x20981824, 0x2058a000, 0x90982000, 0x29962000, 0xa0582000, 0x18982000, 0x20962900, 0x20989060]
  , 0x0,76.000000,null,1,null,autohelperowl_vital_apat34,0,3.000000],
[owl_vital_apat35,6,8, "VA35",-1,0,2,2,3,2,0x6,722,
  [ 0x0f3f3f3f, 0x00f0fcfc, 0xf0f0c000, 0xff3f0000, 0xfcf00000, 0x3f3f0f00, 0x003fffff, 0xc0f0f0f0],
  [ 0x0a202224, 0x00a00888, 0x20208000, 0x812a0000, 0x08a00000, 0x22200a00, 0x002a8188, 0x80202060]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat35,3,0.050000],
[owl_vital_apat36,10,8, "VA36",-2,-1,2,2,4,3,0x4,685,
  [ 0x3cffffff, 0xf0fcfcf0, 0xfffcf000, 0xffff3f0f, 0xfcfcf0c0, 0xffff3c00, 0x3fffff3f, 0xf0fcffff],
  [ 0x2862861a, 0x902848a0, 0x4a24a000, 0x86a1180a, 0x48289080, 0x86622800, 0x18a1862a, 0xa0244a92]
  , 0x10,45.000000,null,0,null,null,3,0.000000],
[owl_vital_apat37,6,8, "VA37",-1,-1,1,3,2,4,0x2,796,
  [ 0x1f3fff00, 0xc0f4fcfc, 0xfcf0d000, 0xfc7c0c00, 0xfcf4c000, 0xff3f1f00, 0x0c7cfcfc, 0xd0f0fc00],
  [ 0x09224800, 0x40208824, 0x84208000, 0x88200400, 0x88204000, 0x48220900, 0x04208860, 0x80208400]
  , 0x0,45.000000,null,1,null,autohelperowl_vital_apat37,3,0.010000],
[owl_vital_apat38,3,8, "VA38",-2,-2,1,0,3,2,0x2,685,
  [ 0x00fcfc7c, 0xf0f0f000, 0xfcff0000, 0x3f3f3d30, 0xf0f0f030, 0xfcfc0000, 0x3d3f3f00, 0x00fffcf4],
  [ 0x00200000, 0x00200000, 0x00210000, 0x00200010, 0x00200010, 0x00200000, 0x00200000, 0x00210000]
  , 0x0,80.000000,null,1,null,autohelperowl_vital_apat38,3,0.610000],
[owl_vital_apat39,5,8, "VA39",-1,-1,1,1,2,2,0x4,648,
  [ 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00, 0xfcfcfc00],
  [ 0x88642400, 0x18a05800, 0x60648800, 0x94289000, 0x58a01800, 0x24648800, 0x90289400, 0x88646000]
  , 0x10,95.000000,null,1,null,autohelperowl_vital_apat39,3,0.043600],
[owl_vital_apat40,5,8, "VA40",-1,0,2,2,3,2,0x0,649,
  [ 0x00fcfcf4, 0xf0f0f000, 0xffff0000, 0x3d3f3f3f, 0xf0f0f0f0, 0xfcfc0000, 0x3f3f3d00, 0x00ffff7f],
  [ 0x00a40800, 0x20209000, 0x806a0000, 0x18202020, 0x90202020, 0x08a40000, 0x20201800, 0x006a8000]
  , 0x10,95.000000,null,1,null,autohelperowl_vital_apat40,3,0.010000],
[owl_vital_apat41,5,8, "VA41",0,-1,2,1,2,2,0x0,685,
  [ 0x00fcfcfc, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0xf0f0f000, 0xfcfc0000, 0x3f3f3f00, 0x00fcfcfc],
  [ 0x00a40808, 0x20209000, 0x80680000, 0x1a202000, 0x90202000, 0x08a40000, 0x20201a00, 0x00688080]
  , 0x10,95.000000,null,1,null,autohelperowl_vital_apat41,3,0.016000],
[owl_vital_apat42,7,8, "VA42",-1,-1,2,1,3,2,0x0,683,
  [ 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfc00, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc],
  [ 0x882088a4, 0x88208800, 0x88208800, 0x89228a00, 0x88208800, 0x88208800, 0x8a228900, 0x88208868]
  , 0x0,75.000000,null,1,null,autohelperowl_vital_apat42,3,1.960000],
[owl_vital_apat43,3,8, "VA43",0,-1,1,2,1,3,0x2,722,
  [ 0x00ffff00, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0x00fcfc00],
  [ 0x00a81000, 0x20602000, 0x10a80000, 0x20242000, 0x20602000, 0x10a80000, 0x20242000, 0x00a81000]
  , 0x10,50.000000,null,1,null,autohelperowl_vital_apat43,3,1.600000],
[owl_vital_apat44,2,4, "VA44",0,0,1,2,1,2,0x0,648,
  [ 0x00b0e0b0, 0xe0b00000, 0x2c380000, 0x003b2e00, 0x00b0e000, 0xe0b00000, 0x2e3b0000, 0x00382c38],
  [ 0x00200020, 0x00200000, 0x00200000, 0x00220000, 0x00200000, 0x00200000, 0x00220000, 0x00200020]
  , 0x10,57.000000,null,1,null,autohelperowl_vital_apat44,3,0.180598],
[owl_vital_apat45,2,8, "VA45",0,0,1,1,1,1,0x2,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00201800, 0x00608000, 0x90200000, 0x08240000, 0x80600000, 0x18200000, 0x00240800, 0x00209000]
  , 0x0,75.000000,null,1,null,autohelperowl_vital_apat45,3,0.010000],
[owl_vital_apat46,4,8, "VA46",-1,-2,1,2,2,4,0x0,759,
  [ 0xc0f0ff00, 0xfcf0c0c0, 0xfc3f0c00, 0x0c3cfc30, 0xc0f0fc30, 0xfff0c000, 0xfc3c0c0c, 0x0c3ffc00],
  [ 0x80208400, 0x88204000, 0x48220800, 0x04208820, 0x40208820, 0x84208000, 0x88200400, 0x08224800]
  , 0x0,75.000000,null,1,null,autohelperowl_vital_apat46,3,0.085760],
[owl_vital_apat47,1,4, "VA47a",0,0,1,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x0,95.000000,null,1,null,autohelperowl_vital_apat47,0,0.731600],
[owl_vital_apat48,1,4, "VA47b",0,0,1,1,1,1,0x0,721,
  [ 0x003c3c00, 0x00f0f000, 0xf0f00000, 0x3c3c0000, 0xf0f00000, 0x3c3c0000, 0x003c3c00, 0x00f0f000],
  [ 0x00102400, 0x00904000, 0x60100000, 0x04180000, 0x40900000, 0x24100000, 0x00180400, 0x00106000]
  , 0x0,65.000000,null,1,null,autohelperowl_vital_apat48,0,0.731600],
[owl_vital_apat49,3,8, "VA48",-1,-1,0,2,1,3,0x9,685,
  [ 0x00fcfc00, 0xf0f0f000, 0xffff0000, 0x3c3c3c3c, 0xf0f0f0f0, 0xfcfc0000, 0x3c3c3c00, 0x00ffff00],
  [ 0x00280000, 0x00202000, 0x00a10000, 0x20200010, 0x20200010, 0x00280000, 0x00202000, 0x00a10000]
  , 0x10,75.000000,null,0,null,null,3,0.000000],
[owl_vital_apat50,2,8, "VA49",0,0,1,1,1,1,0x0,721,
  [ 0x003c2c00, 0x00b0f000, 0xe0f00000, 0x3c380000, 0xf0b00000, 0x2c3c0000, 0x00383c00, 0x00f0e000],
  [ 0x00200800, 0x00208000, 0x80200000, 0x08200000, 0x80200000, 0x08200000, 0x00200800, 0x00208000]
  , 0x0,35.000000,null,1,null,autohelperowl_vital_apat50,3,0.016000],
[owl_vital_apat51,8,8, "VA50",-2,-1,1,2,3,3,0xa,685,
  [ 0xd0fdfd00, 0xfdf5f050, 0xfcfc1c14, 0x3c7cfc00, 0xf0f5fd00, 0xfdfdd050, 0xfc7c3c14, 0x1cfcfc00],
  [ 0x40688000, 0x94202000, 0x08a40400, 0x20205800, 0x20209400, 0x80684000, 0x58202000, 0x04a40800]
  , 0x10,45.000000,null,0,null,null,3,0.000000],
[owl_vital_apat52,5,8, "VA51",-2,0,2,2,4,2,0xa,682,
  [ 0x3f3f3d3f, 0x00ffff7e, 0xf0f0f0f0, 0xffff0000, 0xffff0000, 0x3d3f3f3e, 0x00fffff7, 0xf0f0f0f0],
  [ 0x09220804, 0x00208924, 0x80208040, 0x89200000, 0x89200000, 0x08220904, 0x00208960, 0x80208040]
  , 0x0,35.000000,null,0,null,null,3,0.000000],
[owl_vital_apat53,7,8, "VA52a",-2,0,3,2,5,2,0xa,682,
  [ 0x3f3f3f3f, 0x00fffffe, 0xf0f0f0f0, 0xffff0000, 0xffff0000, 0x3f3f3f3e, 0x00ffffff, 0xf0f0f0f0],
  [ 0x0922021a, 0x002009a4, 0x00208040, 0x82210000, 0x09200000, 0x02220904, 0x0021826a, 0x80200090]
  , 0x0,65.000000,null,0,null,null,3,0.000000],
[owl_vital_apat54,8,8, "VA52b",-3,0,3,2,6,2,0xa,681,
  [ 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0, 0xffff0000, 0xffff0000, 0x3f3f3f3f, 0x00ffffff, 0xf0f0f0f0],
  [ 0x0922021a, 0x00210aa5, 0x00208090, 0x82210000, 0x0a210000, 0x02220919, 0x0021826a, 0x80200090]
  , 0x0,65.000000,null,0,null,null,3,0.000000],
[owl_vital_apat55,7,8, "VA53",-2,-1,1,1,3,2,0xa,722,
  [ 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc, 0xfcfcfc00, 0xffffff00, 0xfcfcfcfc, 0xfcfcfc00, 0xfcfcfc00],
  [ 0x84989000, 0xaa522600, 0x189848a8, 0x6014a800, 0x2652aa00, 0x909884a8, 0xa8146000, 0x48981800]
  , 0x10,75.000000,null,1,null,autohelperowl_vital_apat55,0,0.010000],
[owl_vital_apat56,3,8, "VA54",-1,-1,0,1,1,2,0x0,647,
  [ 0xfcfc0000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0x3c3c3c00, 0x00fcfc00, 0xf0f0f000, 0xfcfc0000],
  [ 0x88240000, 0x08201800, 0x00608800, 0x90208000, 0x18200800, 0x00248800, 0x80209000, 0x88600000]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat56,3,0.045760],
[owl_vital_apat57,4,8, "VA55",-2,-1,1,1,3,2,0x2,648,
  [ 0xfcfcf000, 0xfcff3c00, 0x3cfcfc30, 0xf0fcfc00, 0x3cfffc00, 0xf0fcfc30, 0xfcfcf000, 0xfcfc3c00],
  [ 0x88240000, 0x08221800, 0x00608820, 0x90208000, 0x18220800, 0x00248820, 0x80209000, 0x88600000]
  , 0x10,45.000000,null,1,null,autohelperowl_vital_apat57,3,0.086000],
[owl_vital_apat58,5,8, "VA56",-1,-2,1,1,2,3,0x2,722,
  [ 0xf8fcfc00, 0xfcfcf800, 0xffffbd00, 0xbcfcfc7c, 0xf8fcfcf4, 0xfcfcf800, 0xfcfcbc00, 0xbdffff00],
  [ 0x90248000, 0x88241000, 0x09621800, 0x10608824, 0x10248860, 0x80249000, 0x88601000, 0x18620900]
  , 0x0,45.000000,null,1,null,autohelperowl_vital_apat58,3,0.010000],
[null, 0,0,null,0,0,0,0,0,0,0,0,[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],0,0.0,null,0,null,null,0,0.0]
] 


const owl_vital_apat = data.map(item => new Pattern(item))
// export const owl_vital_apat_db = new PatternDB([-1, 0, owl_vital_apat, dfa_owl_vital_apat])
export const owl_vital_apat_db = new PatternDB([-1, 0, owl_vital_apat, null])
