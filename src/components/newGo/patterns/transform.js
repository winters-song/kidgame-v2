import {OFFSET, TRANSFORM2} from "../Liberty";

// transformation[MAX_OFFSET][8]
// MAX_OFFSET	:	(2*MAX_BOARD - 1) * (2*MAX_BOARD - 1)
export const transformation = []
  /* Matrix array for use by TRANSFORM2() macro. */
export const transformation2 = [
[[ 1,  0], [ 0,  1]], /* a - identity transformation matrix */
[[ 0,  1], [-1,  0]], /* g - rotate 90 clockwise */
[[-1,  0], [ 0, -1]], /* d - rotate 180 */
[[ 0, -1], [ 1,  0]], /* f - rotate 90 counter-clockwise */
[[ 0, -1], [-1,  0]], /* h - rotate 90 clockwise and flip on x axis */
[[-1,  0], [ 0,  1]], /* b - flip on x axis */
[[ 0,  1], [ 1,  0]], /* e - rotate 90 counter-clockwise and flip on x axis */
[[ 1,  0], [ 0, -1]]  /* c - flip on y axis */
];

export const transformation_init = (board) => {
  const MAX_BOARD = 19
  for (let k = 0; k < 8; k++) {
    for (let dy = -MAX_BOARD+1; dy <= MAX_BOARD-1; dy++) {
      for (let dx = -MAX_BOARD+1; dx <= MAX_BOARD-1; dx++) {
        let tx = [];
        let ty = [];

        // 获得变换后x,y
        TRANSFORM2(dx, dy, tx, ty, k);
        // 9路：0 - 288
        let offset = OFFSET(dx, dy, MAX_BOARD)
        if(!transformation[offset]){
          transformation[offset] = []
          // console.log(tx[0],ty[0])
        }
        // tx,ty: -8,-8 to 8,8
        transformation[offset][k] = board.DELTA(tx[0], ty[0], MAX_BOARD);
      }
    }
  }
}