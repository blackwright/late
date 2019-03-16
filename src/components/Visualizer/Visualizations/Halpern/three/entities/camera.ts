import { PerspectiveCamera } from 'three';

export function createCamera() {
  return new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
}
