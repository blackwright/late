import { Color, PointLight } from 'three';

export function createLight() {
  return new PointLight(new Color('#FFF'), 2.2);
}
