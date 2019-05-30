export function modulo(number1: number, number2: number): number {
  return ((number1 % number2) + number2) % number2;
}

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

function isInteger(number: number) {
  return modulo(number, 1) === 0;
}

export function randomNumberBetween(
  min: number,
  max: number,
  decimalPrecision = 1
) {
  if (isInteger(min) && isInteger(max)) {
    return min + Math.floor(Math.random() * (max - min));
  }
  const randomFloat = min + Math.random() * (max - min);
  return Number(randomFloat.toPrecision(decimalPrecision));
}
