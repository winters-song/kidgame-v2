import {
 codes
} from './Constants'
import {transformation, transformation2} from "./patterns/transform";

/* Routine names used by persistent and non-persistent caching schemes. */
export const routine_id ={
  OWL_ATTACK : 0,
  OWL_DEFEND : 1,
  SEMEAI : 2,
  FIND_DEFENSE : 3,
  ATTACK : 4,
  CONNECT : 5,
  DISCONNECT : 6,
  BREAK_IN : 7,
  BLOCK_OFF : 8,
  OWL_THREATEN_ATTACK : 9,
  OWL_THREATEN_DEFENSE : 10,
  OWL_DOES_DEFEND : 11,
  OWL_DOES_ATTACK : 12,
  OWL_CONNECTION_DEFENDS : 13,
  OWL_SUBSTANTIAL : 14,
  OWL_CONFIRM_SAFETY : 15,
  ANALYZE_SEMEAI : 16,
  NUM_CACHE_ROUTINES : 17
};

export const ROUTINE_COSTS = [3, 3, 4, 0, 0, 1, 1, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, -1]

export const dragon_status  = {
  DEAD : 0,
  ALIVE: 1,
  CRITICAL: 2,
  UNKNOWN: 3,
  UNCHECKED: 4,
  CAN_THREATEN_ATTACK:5,
  CAN_THREATEN_DEFENSE: 6,
  INESSENTIAL: 7,
  TACTICALLY_DEAD: 8,
  ALIVE_IN_SEKI: 9,
  STRONGLY_ALIVE: 10,
  INVINCIBLE: 11,
  INSUBSTANTIAL: 12,
  WHITE_TERRITORY: 13,
  BLACK_TERRITORY: 14,
  DAME: 15,
  NUM_DRAGON_STATUS: 16
};

export const MAX_CLOSE_WORMS  = 4

export const MAX_TACTICAL_POINTS = 10

// [0 - 1368]
// (19+18)*2 = 1369 绝对位置

// [0,0] => 684
// [0,1] =>
export function OFFSET(dx, dy, MAX_BOARD) {
  return (dy + MAX_BOARD - 1) * (2*MAX_BOARD - 1) + (dx + MAX_BOARD - 1)
}

export function REVERSE_RESULT(result){ return codes.WIN - result}

export function AFFINE_TRANSFORM(offset, trans, delta) {
  if(transformation[offset]){
    console.log(transformation)
    return transformation[offset][trans] + delta
  }
}

/*
* | 1 0 ||x| = |x'|
* | 0 1 ||y| = |y'|
* 坐标变换运算
* */
export function TRANSFORM2(x, y, tx, ty, trans) {
  tx[0] = transformation2[trans][0][0] * (x) + transformation2[trans][0][1] * (y);
  ty[0] = transformation2[trans][1][0] * (x) + transformation2[trans][1][1] * (y);
}