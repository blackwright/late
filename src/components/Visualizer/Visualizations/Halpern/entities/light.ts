import { PointLight } from 'three';
import { white } from './colors';

const light = new PointLight(white);

light.position.set(0, 50, 75);

export default light;
