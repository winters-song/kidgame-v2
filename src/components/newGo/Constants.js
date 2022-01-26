
export const DEFAULT_LEVEL = 10
/* Owl Node Limit */
export const OWL_NODE_LIMIT = 1000
/* Semeai Variations. 500 default */
export const SEMEAI_NODE_LIMIT = 500


export const colors  = {
  EMPTY : 0,
  BLACK: 1,
  WHITE: 2,
  GRAY: 3,
  GRAY_BLACK: 4,
  GRAY_WHITE: 5,
  WEAK_KO: 6,
  NUM_KOMASTER_STATES: 7
};


/* Used in matchpat.c. Have to be different from WHITE, BLACK. */
export const matchpat = {
  ANCHOR_COLOR : 6,
  ANCHOR_OTHER : 7
}

export const codes = {
  WIN : 5,
  KO_A: 4,
  GAIN: 3,
  LOSS: 2,
  KO_B: 1,
  LOSE: 0,
}


export const SURROUNDED = 1
export const WEAKLY_SURROUNDED = 2

export const PASS_MOVE = 0
export const NO_MOVE = PASS_MOVE

export const suicide_rules  = {
  FORBIDDEN : 0,
  ALLOWED: 1,
  ALL_ALLOWED: 2,
};

export const ko_rules = {
  SIMPLE : 0,
  NONE : 1,
  PSK : 2,
  SSK : 3
};

export class InterpolationData {
  sections = 0
  range_lowerbound = 0
  range_upperbound = 0
  values= null

  constructor(a,b,c,d) {
    this.sections = a
    this.range_lowerbound = b
    this.range_upperbound = c
    this.values = d
  }
};