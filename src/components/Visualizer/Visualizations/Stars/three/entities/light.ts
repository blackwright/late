import { DirectionalLight, AmbientLight } from 'three';

export function createAmbientLight(color: number, intensity: number) {
  return new AmbientLight(color, intensity);
}

export function createDirectionalLight(color: number, intensity: number) {
  return new DirectionalLight(color, intensity);
}
