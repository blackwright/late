export function modulo(number1: number, number2: number): number {
  return ((number1 % number2) + number2) % number2;
}

export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

export function toRadians(angle: number) {
  return (angle * Math.PI) / 180;
}
