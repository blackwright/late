import { PointLight, Color } from 'three';

export function createLight(color: Color) {
  return new PointLight(color);
}
