import { PerspectiveCamera } from 'three';
import OrbitControls from '../../../../../../utils/OrbitControls';

export function createCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 100;
  return camera;
}

export function createControls(camera: PerspectiveCamera) {
  return new OrbitControls(camera);
}
