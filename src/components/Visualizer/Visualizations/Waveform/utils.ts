import {
  getRandomColorTriple,
  getRandomColors,
  getRandomColor
} from '../../../../utils/colors';

export function getColors(numColors: number) {
  switch (numColors) {
    case 3:
      return getRandomColorTriple();
    case 2:
      return getRandomColors(2, true);
    case 1:
      return [getRandomColor()];
    default:
      return getRandomColorTriple();
  }
}
