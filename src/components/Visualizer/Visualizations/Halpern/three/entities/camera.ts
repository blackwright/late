import { PerspectiveCamera } from 'three';
import OrbitControls from '../../../../../../utils/OrbitControls';

export function createCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 85;
  return camera;
}

export function createControls(camera: PerspectiveCamera) {
  const controls = new OrbitControls(camera);
  controls.enablePan = false;
  controls.rotateSpeed = 0.75;
  controls.zoomSpeed = 0.75;
  controls.minDistance = 10;
  controls.maxDistance = 200;
  return controls;
}
