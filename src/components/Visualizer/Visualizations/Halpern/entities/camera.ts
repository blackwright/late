import { PerspectiveCamera } from 'three';
import OrbitControls from '../../../../../utils/OrbitControls';

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

camera.position.z = 100;

const controls = new OrbitControls(camera);

export { camera, controls };
