import {
 codes
} from './Constants'
import {transformation, transformation2} from "./patterns/transform";


// memcopy
export class Entity{
  // 将target属性复制过来
  copy(target){
    Object.keys(target).forEach(item => {
      const type = typeof target[item]
      if(type !== 'undefined' && type !=='function' && type !== 'object'){
        this[item] = target[item]
      }else if(Object.prototype.toString.call(target[item]) === '[object Array]'){
        // 基本类型数组的复制
        this[item] = target[item].slice()
      }
    })
    return this
  }
}

export const FALSE_EYE = 1
export const HALF_EYE = 1
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


export const DEFAULT_STRENGTH  = 100.0

export const MAX_CLOSE_WORMS  = 4

export const MAX_TACTICAL_POINTS = 10


export const ATTACK_STRING = 1
export const DEFEND_STRING = 2

/* These values are used to communicate whether stones are safe or
 * have been saved, when computing influence.
 */
export const INFLUENCE_SAFE_STONE	= 1
export const INFLUENCE_SAVED_STONE	= 2

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
    // console.log(transformation)
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


export class EyeValue {
  a=0; /* number of eyes if attacker plays first twice */
  b=0; /* number of eyes if attacker plays first */
  c=0; /* number of eyes if defender plays first */
  d=0; /* number of eyes if defender plays first twice */
  constructor(arr) {
    if(arr){
      this.set(arr)
    }
  }

  set(arr){
    this.a = arr[0]
    this.b = arr[1]
    this.c = arr[2]
    this.d = arr[3]
  }
};


export class HalfEyeData extends Entity{
  value;          /* Topological eye value. */
  type;   /* HALF_EYE or FALSE_EYE; */
  num_attacks;      /* number of attacking points */
  attack_point = [];  /* the moves to attack a topological halfeye */
  num_defenses;     /* number of defending points */
  defense_point = []; /* the moves to defend a topological halfeye */
  constructor(cfg) {
    super()
    Object.assign(this, cfg)
  }
}


export const MAX_EYE_ATTACKS = 3

export class EyeData extends Entity{
  color;             /* BLACK, WHITE, or GRAY                     */
  esize;             /* size of the eyespace                      */
  msize;             /* number of marginal vertices               */
  origin;            /* The origin                                */
  value; /* Number of eyes.                           */

  /* The above fields are constant on the whole eyespace.             */
  /* ---------------------------------------------------------------- */
  /* The below fields are not.                                        */
  marginal;             /* This vertex is marginal               */
  neighbors;            /* number of neighbors in eyespace       */
  marginal_neighbors;   /* number of marginal neighbors          */
};

export class VitalEyePoints {
  attack_points =[]
  defense_points =[]
};



