import { PerspectiveCamera } from 'three';

export function createCamera() {
  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.z = -5;

  return camera;
}
