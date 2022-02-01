

export const ATT_dot   = 0
export const ATT_X     = 1
export const ATT_O     = 2
export const ATT_x     = 3
export const ATT_o     = 4
export const ATT_comma = 5
export const ATT_a     = 6
export const ATT_not   = 7


/* Pattern classes. The semantics of these varies between different
 * databases. The descriptions here mostly relate to patterns in
 * patterns.db and other databases which are handled by shapes.c.
 */
export const CLASS_O =     0x0001   /* O stones must be alive or unknown */
export const CLASS_o =     0x0002   /* O stones must be dead or unknown */
export const CLASS_X =     0x0004   /* X stones must be alive or unknown */
export const CLASS_x =     0x0008   /* X stones must be dead or unknown */
export const CLASS_s =     0x0010   /* move is a sacrifice */
export const CLASS_n =     0x0020   /* X could also make this move if we do not */
export const CLASS_D =     0x0040   /* defense pattern */
export const CLASS_C =     0x0080   /* move connects two worms */
export const CLASS_c =     0x0100   /* move weakly connects two worms */
/* for owl databases: combinable pattern */
export const CLASS_B =     0x0200   /* move breaks connection between enemy worms */
export const CLASS_A =     0x0400   /* attack pattern */
export const CLASS_b =     0x0800   /* move is intended to block opponent */
export const CLASS_e =     0x1000   /* move is intended to expand territory */
export const CLASS_E =     0x2000   /* move is intended to expand moyo */
export const CLASS_a =     0x4000   /* strategical level attack */
export const CLASS_d =     0x8000   /* strategical level defense */
export const CLASS_I = 0x00010000   /* invasions patterns (influence.db) */
export const CLASS_J = 0x00020000   /* joseki standard move */
export const CLASS_j = 0x00040000   /* joseki move, slightly less urgent */
export const CLASS_t = 0x00080000   /* minor joseki move (tenuki OK) */
export const CLASS_U = 0x00100000   /* very urgent joseki move */
export const CLASS_T = 0x00200000   /* joseki trick move */
export const CLASS_W = 0x00400000   /* worthwhile threat move */
export const CLASS_F = 0x00800000   /* for joseki moves: a fuseki pattern */
export const CLASS_N = 0x01000000   /* antisuji move (do _not_ play) */
export const CLASS_Y = 0x80000000   /* used for experimental patterns */

export const NORTH_EDGE = 1
export const SOUTH_EDGE = 2
export const EAST_EDGE  = 4
export const WEST_EDGE  = 8

export const HAVE_CONSTRAINT = 1
export const HAVE_ACTION     = 2


export const INFLUENCE_CALLBACK =1
export const FOLLOWUP_INFLUENCE_CALLBACK =2

/**
 * patn: 额外限定条件数组
 * patlen: 数组元素个数
 * trfno: 变换方向index, 
 * value: 用于influence估值
 *
 * edge_constraints： 边角限定条件
 * move_offset: 目标结论位置
 */
const pattern_attrs = [
  'patn', 'patlen', 'trfno', 'name',
  'mini', 'minj', 'maxi', 'maxj', 'width', 'height', 'edge_constraints', 'move_offset',
  'and_mask', 'val_mask', 'class', 'value', 'attributes', 'autohelper_flag',
  'helper', 'autohelper', 'anchored_at_X', 'constraint_cost'
]
export class Pattern {
  constructor(arr) {
    for(let i in arr){
      this[pattern_attrs[i]] = arr[i]
    }
  }
};

const patterndb_attrs = ['fixed_for_size', 'fixed_anchor', 'patterns', 'pdfa']
export class PatternDB {
  constructor(arr) {
    for(let i in arr){
      this[patterndb_attrs[i]] = arr[i]
    }
  }
};