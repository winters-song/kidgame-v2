import {colors, NO_MOVE} from "../Constants";

export const Helpers = {
  jump_out_helper(){},
  jump_out_far_helper(){},
  high_handicap_helper(){},
  reinforce_helper(){},
  throw_in_atari_helper(){},
  seki_helper(){},
  cutstone2_helper(){},
  edge_double_sente_helper(){},
  threaten_to_save_helper(){},
  prevent_attack_threat_helper(){},
  defend_against_atari_helper(){},
  /*
   * This is intended for use in conn.db autohelpers.
   *
   * Amalgamate either a with b or c with b, depending on which of the
   * two dragons a and c is largest.
   *
   * If either of these pairs already have been amalgamated somehow,
   * do nothing.
   */
  amalgamate_most_valuable_helper(apos, bpos, cpos){
    if (!this.is_same_dragon(apos, bpos) && !this.is_same_dragon(bpos, cpos)) {
      if (this.dragon[apos].effective_size >= this.dragon[cpos].effective_size){
        this.join_dragons(apos, bpos);
      }
      else{
        this.join_dragons(bpos, cpos);
      }
    }
  },

  finish_ko_helper(){},
  squeeze_ko_helper(){},
  backfill_helper(){},

  owl_threatens_attack(){},

  /* Returns true if O needs to connect at c in the position below after
   * O at b and X at d, because X can cut at c. In general d is the
   * second liberty of A, which must have exactly two liberties.
   *
   * |.X   |dX
   * |XO	 |AO
   * |XO	 |Ae
   * |..	 |bc
   */
  connect_and_cut_helper(Apos, bpos, cpos){
    const b = this.board
    let dpos;
    let epos = NO_MOVE;
    const other = b.board[Apos];
    const color = b.OTHER_COLOR(other);
    let libs = []
    let liberties = b.findlib(Apos, 2, libs);
    let result = 0;

    b.ASSERT1(b.IS_STONE(color));
    b.ASSERT1(liberties === 2);

    if (libs[0] === bpos){
      dpos = libs[1];
    }
    else{
      dpos = libs[0];
    }

    for (let k = 0; k < 4; k++){
      if (b.board[cpos + b.delta[k]] === color
        && b.neighbor_of_string(cpos + b.delta[k], Apos)) {
        epos = cpos + b.delta[k];
        break;
      }
    }

    b.ASSERT1(epos !== NO_MOVE);

    if (b.trymove(bpos, color, 'helper')) {
      if (b.trymove(dpos, other, 'helper')) {
        if (b.trymove(cpos, other, 'helper')) {
          if (b.board[bpos] === colors.EMPTY
            || b.board[epos] === colors.EMPTY
            || !this.defend_both(bpos, epos)){
            result = 1;
          }
          b.popgo();
        }
        b.popgo();
      }
      b.popgo();
    }

    return result;
  },

  connect_and_cut_helper2(){},
  test_attack_either_move(){},

  /* True if str is adjacent to a stone in atari, which is tactically
   * attackable (to exclude pointless captures of snapback stones).
   */
  adjacent_to_stone_in_atari(str){
    const adjs =[];
    const adj = this.board.chainlinks2(str, adjs, 1);
    for (let k = 0; k < adj; k++){
      if (this.attack(adjs[k], null)){
        return 1;
      }
    }

    return 0;
  },

  adjacent_to_defendable_stone_in_atari(){},
  backfill_replace(){},
  thrash_around_helper(){},
  break_mirror_helper(){},

  /* This helper is intended to detect semeai kind of positions where
   * the tactical reading can't be trusted enough to allow amalgamation
   * over presumably tactically dead strings.
   *
   * It has turned out to be best not to trust tactical reading of three
   * and four liberty strings at all. Not trusting two liberty strings
   * leads to an underamalgamation and unnecessarily many dragons on the
   * board. Therefore we try to detect two liberty strings with an
   * enclosed nakade, which after capturing leads to an unreliable
   * reading at three or four liberties.
   *
   * More specifically we check whether the string has a neighbor with
   * the following properties:
   * 1. At least three stones in size.
   * 2. All its liberties are common liberties with the string.
   * 3. It has no second order liberties.
   * 4. Its liberties are adjacent to no other strings than itself and
   *    the primary string.
   *
   * If we find such a neighbor 1 is returned, otherwise 0.
   */
  distrust_tactics_helper(str){
    const b = this.board
    let color = b.board[str];
    let adjs = [];
    let lib = b.countlib(str);

    b.ASSERT1(b.IS_STONE(b.board[str]), str);

    if (lib > 2){
      return 1;
    }
    else if (lib === 1){
      return 0;
    }

    const adj = b.chainlinks3(str, adjs, lib);
    for (let r = 0; r < adj; r++) {
      let nakade = 1;
      if (b.countstones(adjs[r]) < 3){
        continue;
      }
      let adjlibs = [];
      let adjlib = b.findlib(adjs[r], 3, adjlibs);

      for (let s = 0; s < adjlib; s++) {
        let str_found = 0;
        for (let k = 0; k < 4; k++) {
          let pos = adjlibs[s] + b.delta[k];
          if (b.board[pos] === colors.EMPTY && !b.liberty_of_string(pos, adjs[r])){
            nakade = 0;
          }
          else if (b.board[pos] === color) {
            if (b.same_string(pos, str)){
              str_found = 1;
            }
            else{
              nakade = 0;
            }
          }
          else if (b.board[pos] === b.OTHER_COLOR(color) && !b.same_string(pos, adjs[r])){
            nakade = 0;
          }
        }
        if (!str_found){
          nakade = 0;
        }
      }
      if (nakade){
        return 1;
      }
    }

    return 0;
  }
}