export function modulo(number1: number, number2: number): number {
  return ((number1 % number2) + number2) % number2;
}

export function avg(numbers: Uint8Array): number;
export function avg(numbers: number[]): number;
export function avg(numbers: Uint8Array | number[]) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum / numbers.length;
}

export function smooth(data: Uint8Array, range: number): Uint8Array {
  return data.map((dataElement, i) => {
    const diff = i - range;
    const startingIndex = diff < 0 ? 0 : diff;
    const endingIndex = i + range + 1;
    return Number(avg(data.slice(startingIndex, endingIndex)).toFixed(2));
  });
}
