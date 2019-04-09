import { PerspectiveCamera, Vector3 } from 'three';

export function createCamera(startingY: number) {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, startingY, 0);
  camera.lookAt(new Vector3(0, 0, 0));

  return camera;
}
