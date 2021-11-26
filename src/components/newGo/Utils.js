import {
  NO_MOVE
} from './Constants'

const NUMBER_OF_TIMERS = 4
const timers = [];


export const Utils = {
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