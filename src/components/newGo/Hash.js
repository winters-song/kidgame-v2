import {colors, NO_MOVE} from './Constants'

export const HashData = {
  /* There is no need to involve all bits in the remainder computation
  * as long as we only use it to compute a key into a hash table. 32
  * random bits are sufficient to get an even distribution within any
  * hashtable of reasonable size. By never using more than 32 bits we
  * also reduce the platform dependency of the GNU Go engine.
  */
  remainder(hd, num) {
    return (hd.hashval & 0xffffffff) % num
  },

  is_equal (hd1, hd2) {
    return hd1.hashval === hd2.hashval
  },
  is_smaller (hd1, hd2) {
    return hd1.hashval < hd2.hashval
  },
  xor (hd1, hd2) {
    hd1.hashval ^= hd2.hashval
  }
}

const random = () =>  Math.floor(Math.random() * 1000000000);  //再多一位就溢出了。。


export class Hash{
  constructor(BOARDMIN, BOARDMAX) {
    this.BOARDMIN = BOARDMIN
    this.BOARDMAX = BOARDMAX
    this.initialized = false
  }

  // hash_init
  init() {
    if(this.initialized){
      return
    }

    this.white_hash = Hash.INIT_ZOBRIST_ARRAY(this.BOARDMAX)
    this.black_hash = Hash.INIT_ZOBRIST_ARRAY(this.BOARDMAX)
    this.ko_hash = Hash.INIT_ZOBRIST_ARRAY(this.BOARDMAX)
    this.komaster_hash = Hash.INIT_ZOBRIST_ARRAY(colors.NUM_KOMASTER_STATES)
    this.kom_pos_hash = Hash.INIT_ZOBRIST_ARRAY(this.BOARDMAX)
    this.goal_hash = Hash.INIT_ZOBRIST_ARRAY(this.BOARDMAX)

    this.initialized = true
  }

  static INIT_ZOBRIST_ARRAY(size) {
    const array = []
    for(let i=0; i< size; i++){
      array[i] = {
        hashval: random()
      }
    }
    return array
  }

  // hashdata_recalc: 只记黑白
  recalc (hd, p, ko_pos) {
    hd.hashval = 0

    // console.log(this.BOARDMIN)
    for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++) {
      if (p[pos] === colors.WHITE) {
        HashData.xor(hd, this.white_hash[pos]);
      } else if (p[pos] === colors.BLACK){
        HashData.xor(hd, this.black_hash[pos]);
      }
    }

    if (ko_pos){
      HashData.xor(hd, this.ko_hash[ko_pos]);
    }
  }


  /* Set or remove ko in the hash value and hash position.  */
  invert_ko(hd, pos){
    HashData.xor(hd, this.ko_hash[pos]);
  }

  /* Set or remove a stone of COLOR at pos in a Hash_data.  */
  invert_stone(hd, pos, color){
    if (color === colors.BLACK)
      HashData.xor(hd, this.black_hash[pos]);
    else if (color === colors.WHITE)
      HashData.xor(hd, this.white_hash[pos]);
  }

  /* Set or remove the komaster value in the hash data. */
  invert_komaster(hd, komaster){
    HashData.xor(hd, this.komaster_hash[komaster]);
  }

  /* Set or remove the komaster position in the hash data. */
  invert_kom_pos(hd, kom_pos){
    HashData.xor(hd, this.kom_pos_hash[kom_pos]);
  }

  /* Calculate a transformation invariant hashvalue. */
  calc_orientation_invariant(board, hd, p, ko_pos){

    for (let rot = 0; rot < 8; rot++) {
      let hd_rot = { hashval: 0 }
      for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++) {
        if (p[pos] === colors.WHITE)
          HashData.xor(hd_rot, this.white_hash[board.rotate1(pos, rot)]);
        else if (p[pos] === colors.BLACK)
          HashData.xor(hd_rot, this.black_hash[board.rotate1(pos, rot)]);
      }

      if (ko_pos !== NO_MOVE)
        HashData.xor(hd_rot, this.ko_hash[board.rotate1(ko_pos, rot)]);

      if (rot === 0 || HashData.is_smaller(hd_rot, hd))
        hd = hd_rot;
    }
  }

  /* Compute hash value to identify the goal area. */
  goal_to_hashvalue(board, goal){
    const return_value = { hashval: 0}

    for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++){
      if (board.ON_BOARD(pos) && goal[pos]){
        HashData.xor(return_value, this.goal_hash[pos]);
      }
    }

    return return_value;
  }
}