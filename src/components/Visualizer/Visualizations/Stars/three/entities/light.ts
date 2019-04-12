import { DirectionalLight, AmbientLight } from 'three';

export function createAmbientLight(color: number) {
  return new AmbientLight(color, 1);
}

export function createDirectionalLight(color: number) {
  return new DirectionalLight(color, 10);
}
