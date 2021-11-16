import {colors, NO_MOVE} from './Constants'

export default class Hash{
  constructor(BOARDMIN, BOARDMAX) {
    this.BOARDMIN = BOARDMIN
    this.BOARDMAX = BOARDMAX
    this.white_hash = this.init_zobrist_array(BOARDMAX)
    this.black_hash = this.init_zobrist_array(BOARDMAX)
    this.ko_hash = this.init_zobrist_array(BOARDMAX)
    this.komaster_hash = this.init_zobrist_array(colors.NUM_KOMASTER_STATES)
    this.kom_pos_hash = this.init_zobrist_array(BOARDMAX)
    this.goal_hash = this.init_zobrist_array(BOARDMAX)

    this.initialized = false
  }

  // hash_init
  init() {
    if(this.initialized){
      return
    }

    this.init_zobrist_array(this.black_hash);
    this.init_zobrist_array(this.white_hash);
    this.init_zobrist_array(this.ko_hash);
    this.init_zobrist_array(this.komaster_hash);
    this.init_zobrist_array(this.kom_pos_hash);
    this.init_zobrist_array(this.goal_hash);

    this.initialized = true
  }

  init_zobrist_array(size) {
    const array = []
    for(let i=0; i< size; i++){
      array[i] = {
        hashval: this.random()
      }
    }
    return array
  }

  random(){
    return Math.floor(Math.random() * 1000000000);  //再多一位就溢出了。。
  }

  // hashdata_recalc: 只记黑白
  recalc (hd, p, ko_pos) {
    hd.hashval = 0

    console.log(this.BOARDMIN)
    for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++) {
      if (p[pos] === colors.WHITE) {
        this.xor(hd, this.white_hash[pos]);
      } else if (p[pos] === colors.BLACK){
        this.xor(hd, this.black_hash[pos]);
      }
    }

    if (ko_pos){
      this.xor(hd, this.ko_hash[ko_pos]);
    }
  }


  /* Set or remove ko in the hash value and hash position.  */
  // hashdata_invert_ko
  invert_ko(hd, pos){
    this.xor(hd, this.ko_hash[pos]);
  }

  /* Set or remove a stone of COLOR at pos in a Hash_data.  */
  // hashdata_invert_stone
  invert_stone(hd, pos, color){
    if (color === colors.BLACK)
      this.xor(hd, this.black_hash[pos]);
    else if (color === colors.WHITE)
      this.xor(hd, this.white_hash[pos]);
  }

  /* Set or remove the komaster value in the hash data. */
  // hashdata_invert_komaster
  invert_komaster(hd, komaster){
    this.xor(hd, this.komaster_hash[komaster]);
  }

  /* Set or remove the komaster position in the hash data. */
  //hashdata_invert_kom_pos
  invert_kom_pos(hd, kom_pos){
    this.xor(hd, this.kom_pos_hash[kom_pos]);
  }

  /* Calculate a transformation invariant hashvalue. */
  // hashdata_calc_orientation_invariant
  calc_orientation_invariant(board, hd, p, ko_pos){

    for (let rot = 0; rot < 8; rot++) {
      let hd_rot = { hashval: 0 }
      for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++) {
        if (p[pos] === colors.WHITE)
          this.xor(hd_rot, this.white_hash[board.rotate1(pos, rot)]);
        else if (p[pos] === colors.BLACK)
          this.xor(hd_rot, this.black_hash[board.rotate1(pos, rot)]);
      }

      if (ko_pos !== NO_MOVE)
        this.xor(hd_rot, this.ko_hash[board.rotate1(ko_pos, rot)]);

      if (rot === 0 || this.hashdata_is_smaller(hd_rot, hd))
        hd = hd_rot;
    }
  }

  /* Compute hash value to identify the goal area. */
  goal_to_hashvalue(board, goal){
    const return_value = { hashval: 0}

    for (let pos = this.BOARDMIN; pos < this.BOARDMAX; pos++)
      if (board.ON_BOARD(pos) && goal[pos])
        this.xor(return_value, this.goal_hash[pos]);

    return return_value;
  }

  // hashdata_is_equal
  is_equal (hd1, hd2) {
    return hd1.hashval === hd2.hashval
  }
  
  //hashdata_is_smaller
  is_smaller (hd1, hd2) {
    return hd1.hashval < hd2.hashval
  }

  xor (hd1, hd2) {
    hd1.hashval ^= hd2.hashval
  }
}