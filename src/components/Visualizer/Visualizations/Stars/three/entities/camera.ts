import { PerspectiveCamera } from 'three';

export function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );

  camera.position.z = -100;

  return camera;
}
