import {
 codes
} from './Constants'

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

export const REVERSE_RESULT = function(result){ return codes.WIN - result}	
