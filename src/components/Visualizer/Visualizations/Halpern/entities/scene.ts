import { Scene } from 'three';
import { sphere } from './actors';
import light from './light';

const scene = new Scene();

scene.add(sphere);
scene.add(light);

export default scene;
