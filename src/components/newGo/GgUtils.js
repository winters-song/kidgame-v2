
export const gg_interpolate = function (f, x) {
  if (x < f.range_lowerbound){
    return f.values[0];
  }
  else if (x > f.range_upperbound){
    return f.values[f.sections];
  }
  else {
    const ratio = f.sections * (x - f.range_lowerbound) / (f.range_upperbound - f.range_lowerbound);
    const i = parseInt(ratio);
    const diff = ratio - i;
    return ((1 - diff) * f.values[i] + diff * f.values[i+1]);
  }
}