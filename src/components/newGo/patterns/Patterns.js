

const ATT_dot   = 0
const ATT_X     = 1
const ATT_O     = 2
const ATT_x     = 3
const ATT_o     = 4
const ATT_comma = 5
const ATT_a     = 6
const ATT_not   = 7


class Patval {
  constructor() {
    this.offset = 0
    this.att = ''
  }
}

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