import { NO_MOVE } from './Constants'
class Data {
  thrashing_dragon  = NO_MOVE /* Dead opponent's dragon trying to live. */
  thrashing_stone  = [] /* All thrashing stones. */
  potential_moves = []

  depth              /* deep reading cut off */
  backfill_depth     /* deep reading cut off */
  backfill2_depth    /* deep reading cut off */
  break_chain_depth  /* deep reading cut off */
  superstring_depth  /* deep reading cut off */
  fourlib_depth      /* deep reading cut off */
  ko_depth           /* deep reading cut off */
  branch_depth       /* deep reading cut off */
  aa_depth
  depth_offset       /* keeps track of temporary depth changes */
  owl_distrust_depth   /* below this owl trusts the optics code */
  owl_branch_depth     /* below this owl tries only one variation */
  owl_reading_depth    /* owl does not read below this depth */
  owl_node_limit       /* maximum number of nodes considered */
  semeai_branch_depth
  semeai_branch_depth2
  semeai_node_limit
  connect_depth	/* Used by Tristan Cazenave's connection reader. */
  connect_depth2     /* Used by alternater connection reader. */
  connection_node_limit 
  breakin_node_limit /* Reading limits for break_in/block_off reading */
  breakin_depth  
  /* Mandated values for deep reading cutoffs. */
  mandated_depth = -1
  mandated_backfill_depth = -1
  mandated_backfill2_depth = -1
  mandated_break_chain_depth = -1
  mandated_superstring_depth = -1
  mandated_fourlib_depth = -1
  mandated_ko_depth = -1
  mandated_branch_depth = -1
  mandated_aa_depth = -1
  mandated_owl_distrust_depth = -1
  mandated_owl_branch_depth = -1
  mandated_owl_reading_depth = -1
  mandated_owl_node_limit = -1
  mandated_semeai_node_limit = -1


  /* Miscellaneous. */
  quiet             = 0  /* minimal output */
  showstatistics    = 0  /* print statistics */
  profile_patterns  = 0  /* print statistics of pattern usage */
  allpats           = 0  /* generate all patterns, even small ones */
  printworms        = 0  /* print full data on each string */
  printmoyo         = 0  /* print moyo board each move */
  printboard        = 0  /* print board each move */
  fusekidb          = 1  /* use fuseki database */
  disable_fuseki    = 0  /* do not generate fuseki moves */
  josekidb          = 1  /* use joseki database */
  showtime          = 0  /* print time to find move */
  showscore         = 0  /* print estimated score */
  debug             = 0  /* controls debug output */
  verbose           = 0  /* trace level */
   // outfilename[128] = """, /* output file (-o option) */
  // output_flags      = OTPUT_DEFAULT, /* amount of output to outfile */
  metamachine       = 0  /* use metamachine_genmove */
  oracle_exists     = 0  /* oracle is available for consultation   */
  autolevel_on      = 0  /* Adjust level in GMP or ASCII mode. */

  disable_threat_computation = 0
  disable_endgame_patterns   = 0
  doing_scoring              = 0

  // int chinese_rules = CHINESE_RULES; /* ruleset choice for GMP connection */
  /* use experimental connection module */
  // int experimental_connections = EXPERIMENTAL_CONNECTIONS;
  /* use alternate connection reading algorithm */
  // int alternate_connections = ALTERNATE_CONNECTIONS;
  /* compute owl threats */
  // int owl_threats = OWL_THREATS;
  /* use experimental owl extension (GAIN/LOSS) */
  experimental_owl_ext = 0 //EXPERIMENTAL_OWL_EXT;
  /* use experimental territory break-in module */
  // int experimental_break_in = USE_BREAK_IN;
  /* use central oriented influence */
  // int cosmic_gnugo = COSMIC_GNUGO;
  /* search for large scale owl moves */
  // int large_scale = LARGE_SCALE;

  // int capture_all_dead    = 0;    /* capture all dead opponent stones */
  // int play_out_aftermath  = 0;    /* make everything unconditionally settled */
  // int resign_allowed = RESIGNATION_ALLOWED; /* resign hopeless games */

  play_mirror_go      = 0    /* try to play mirror go if possible */
  mirror_stones_limit = -1   /* but stop at this number of stones */

  gtp_version         = 2    /* Use GTP version 2 by default. */
  use_monte_carlo_genmove = 0
  mc_games_per_level = 8000

  best_move_values= []
  best_moves= []
  white_score
  black_score

  close_worms= []
  number_close_worms = []
  close_black_worms = []
  number_close_black_worms = []
  close_white_worms = []
  number_close_white_worms = []

  false_eye_territory=[]
  forced_backfilling_moves=[]

  worm=[]
  dragon=[]
  number_of_dragons= 0
  dragon2 = null
  half_eye=[]
  black_eye=[]
  white_eye=[]
  black_vital_points=[]
  white_vital_points=[]
  surroundings= []
  surround_pointer= null

  cutting_points=[]

  slowest_time = 0.0
  slowest_move = NO_MOVE
  slowest_movenum = 0
  total_time = 0.0

  minimum_value_weight  = 1.0
  maximum_value_weight  = 1.0
  invasion_malus_weight = 1.0
  territorial_weight    = 1.0
  strategical_weight    = 1.0
  attack_dragon_weight  = 1.0
  followup_weight       = 1.0

  position_number= 0
}

export const Globals = new Data()