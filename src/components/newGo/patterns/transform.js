
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
