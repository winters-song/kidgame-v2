import {
  NO_MOVE, OWL_NODE_LIMIT, SEMEAI_NODE_LIMIT
} from './Constants'

const NUMBER_OF_TIMERS = 4
const timers = [];

/* Tactical reading using C functions */
const DEPTH               = 16
const BRANCH_DEPTH        = 13
const BACKFILL_DEPTH      = 12
const BACKFILL2_DEPTH     =  5
const BREAK_CHAIN_DEPTH   =  7
const SUPERSTRING_DEPTH   =  7
const FOURLIB_DEPTH       =  7
const KO_DEPTH            =  8

const AA_DEPTH              = 6

/* Pattern based reading */
const OWL_DISTRUST_DEPTH    = 6
const OWL_BRANCH_DEPTH      = 8
const OWL_READING_DEPTH    = 20
const SEMEAI_BRANCH_DEPTH  = 12
const SEMEAI_BRANCH_DEPTH2  = 6

/* Connecton reading */
const CONNECT_NODE_LIMIT = 2000
const CONNECT_DEPTH        = 64
const CONNECT_DEPTH2       = 20

const BREAKIN_NODE_LIMIT  = 400
const BREAKIN_DEPTH	     = 14


export const Utils = {


  /* Set the various reading depth parameters. If mandated_depth_value
   * is not -1 that value is used; otherwise the depth values are
   * set as a function of level. The parameter mandated_depth_value
   * can be set at the command line to force a particular value of
   * depth; normally it is -1.
   */
  // 设置全局变量： depth...
  set_depth_values(level, report_levels) {
    const node_limits = [500, 500, 450, 400, 400, 325, 275, 200, 150, 100, 75, 50]
    let depth_level;

    /*
     * Other policies depending on level:
     * owl.c:         >=  9: use vital attack pattern database
     *                >=  8: increase depth values in owl_substantial
     *                >=  8: don't turn off owl_phase in semeai reading
     * reading.c:     >=  8: Use superstrings and do more backfilling.
     * value_moves.c: >=  6: try to find more owl attacks/defenses
     * breakin.c:     >= 10: try to find break-ins. (*)
     * worm.c:        >= 10: detect unconditionally meaningless moves
     *
     * The break-in code (*) is particularly expensive.
     *
     * Speedups between levels 9 and 10 and between levels 7 and 8
     * are obtained by turning off services, and between these
     * levels no changes are made in the depths. The parameter
     * depth_level is the correction compared to the default settings at level
     * 10 for most reading depths.
     */
    if (level >= 10){
      depth_level = level - 10;
    }
    else if (level === 9){
      depth_level = 0;
    }
    else if (level === 8){
      depth_level = -1;
    }
    else{
      depth_level = level - 8;
    }

    this.depth                = Math.max(6, DEPTH 	    + depth_level);
    this.branch_depth         = Math.max(3, BRANCH_DEPTH	    + depth_level);
    this.backfill_depth       = Math.max(2, BACKFILL_DEPTH    + depth_level);
    this.backfill2_depth      = Math.max(1, BACKFILL2_DEPTH   + depth_level);
    this.break_chain_depth    = Math.max(2, BREAK_CHAIN_DEPTH + depth_level);
    if (level >= 8)
      this.owl_distrust_depth = Math.max(1, (2 * OWL_DISTRUST_DEPTH + depth_level) / 2);
    else
      this.owl_distrust_depth = Math.max(1, (2 * OWL_DISTRUST_DEPTH - 1 + depth_level) / 2);
    this.owl_branch_depth     = Math.max(2, (2 * OWL_BRANCH_DEPTH   + depth_level) / 2);
    this.owl_reading_depth    = Math.max(5, (2 * OWL_READING_DEPTH  + depth_level) / 2);

    /* Atari-atari depth levels are unchanged only between levels 7/8, 9/10: */
    if (level >= 10)
      this.aa_depth = Math.max(0, AA_DEPTH + (level - 10));
    else if (level === 9)
      this.aa_depth = Math.max(0, AA_DEPTH);
    else if (level >= 7)
      this.aa_depth = Math.max(0, AA_DEPTH - 1);
    else
      this.aa_depth = Math.max(0, AA_DEPTH - (8 - level));

    /* Exceptions:
     * fourlib_depth: This is constant from levels 7 to 10.
     * superstring_depth: set to 0 below level 8.
     */
    if (level >= 10)
      this.ko_depth          = Math.max(1, KO_DEPTH + (level - 10));
    else if (level === 9)
      this.ko_depth          = Math.max(1, KO_DEPTH);
    else if (level >= 7)
      this.ko_depth          = Math.max(1, KO_DEPTH - 1);
    else
      this.ko_depth          = Math.max(1, KO_DEPTH + (level - 8));

    if (level >= 10)
      this.fourlib_depth     = Math.max(1, FOURLIB_DEPTH + (level - 10));
    else if (level >= 7)
      this.fourlib_depth     = Math.max(1, FOURLIB_DEPTH);
    else
      this.fourlib_depth     = Math.max(1, FOURLIB_DEPTH + (level - 7));

    if (level >= 8)
      this.superstring_depth = Math.max(1, SUPERSTRING_DEPTH);
    else
      this.superstring_depth = 0;

    if (level >= 10)
      this.owl_node_limit    = OWL_NODE_LIMIT * Math.pow(1.5, depth_level);
    else {
      this.owl_node_limit    = (OWL_NODE_LIMIT * node_limits[10 - level] / node_limits[0]);
      this.owl_node_limit    = Math.max(20, this.owl_node_limit);
    }

    this.semeai_branch_depth  = Math.max(2, (2*SEMEAI_BRANCH_DEPTH  + depth_level) / 2);
    this.semeai_branch_depth2 = Math.max(2, (2*SEMEAI_BRANCH_DEPTH2 + depth_level) / 2);
    this.semeai_node_limit    = SEMEAI_NODE_LIMIT * Math.pow(1.5, depth_level);
    this.connect_depth         = Math.max(2, CONNECT_DEPTH  + 2 * depth_level);
    this.connect_depth2        = Math.max(2, CONNECT_DEPTH2 + 2 * depth_level);
    this.connection_node_limit = CONNECT_NODE_LIMIT * Math.pow(1.45, depth_level);
    this.breakin_depth 	      = Math.max(2, BREAKIN_DEPTH + 2 * depth_level);
    this.breakin_node_limit 	= BREAKIN_NODE_LIMIT * Math.pow(1.5, depth_level);

    if (this.mandated_depth !== -1)
      this.depth = this.mandated_depth;
    if (this.mandated_backfill_depth !== -1)
      this.backfill_depth = this.mandated_backfill_depth;
    if (this.mandated_backfill2_depth !== -1)
      this.backfill2_depth = this.mandated_backfill2_depth;
    if (this.mandated_break_chain_depth !== -1)
      this.break_chain_depth = this.mandated_break_chain_depth;
    if (this.mandated_superstring_depth !== -1)
      this.superstring_depth = this.mandated_superstring_depth;
    if (this.mandated_branch_depth !== -1)
      this.branch_depth = this.mandated_branch_depth;
    if (this.mandated_fourlib_depth !== -1)
      this.fourlib_depth = this.mandated_fourlib_depth;
    if (this.mandated_ko_depth !== -1)
      this.ko_depth = this.mandated_ko_depth;
    if (this.mandated_aa_depth !== -1)
      this.aa_depth = this.mandated_aa_depth;
    if (this.mandated_owl_distrust_depth !== -1)
      this.owl_distrust_depth = this.mandated_owl_distrust_depth;
    if (this.mandated_owl_branch_depth !== -1)
      this.owl_branch_depth = this.mandated_owl_branch_depth;
    if (this.mandated_owl_reading_depth !== -1)
      this.owl_reading_depth = this.mandated_owl_reading_depth;
    if (this.mandated_owl_node_limit !== -1)
      this.owl_node_limit = this.mandated_owl_node_limit;
    if (this.mandated_semeai_node_limit !== -1)
      this.semeai_node_limit = this.mandated_semeai_node_limit;

    this.depth_offset = 0;

    if (report_levels) {
      // print depth
    }
  },

  start_timer(n) {
    if(n >= 0 && n < NUMBER_OF_TIMERS){
      if (!this.showtime)
        return;

      timers[n] = Date.now();
    }
  },

  time_report(n, occupation, move, minTime){
    if(n >= 0 && n < NUMBER_OF_TIMERS) {
      if (!this.showtime) {
        return 0.0;
      }

      const now = Date.now();
      const dt = now - timers[n];
      if (dt > minTime) {
        console.log(`${occupation}${move !== NO_MOVE?move: ''}: ${dt} ms`)
      }
      timers[n] = now;
      return dt;
    }
  }
}