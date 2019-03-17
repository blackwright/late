const colors = [
  ['#0E9AA7', '#F6CD61', '#FE8A71'],
  ['#EE4540', '#801336', '#2D142C'],
  ['#8FB9A8', '#FDFBD4', '#FCD0BA'],
  ['#AC6D83', '#685D79', '#465C7A'],
  ['#F36E38', '#EF4648', '#582841'],
  ['#F1F1F1', '#9BD7D1', '#305D7A'],
  ['#DEA5B6', '#F3CD8C', '#F2E9C2'],
  ['#E27B47', '#EFCA58', '#46B29E'],
  ['#2E7345', '#2E9975', '#2DB3B3'],
  ['#52A3CC', '#7EA1E5', '#AAAAF2'],
  ['#CC5285', '#CC5285', '#F2BCAA'],
  ['#D8E0BB', '#B6CEC7', '#86A3C3']
];

export function getColors() {
  const colorCopy = [...colors[Math.floor(Math.random() * colors.length)]];
  if (Math.random() <= 0.5) {
    return colorCopy.reverse();
  } else {
    return colorCopy;
  }
}
