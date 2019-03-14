import { WebGLRenderer } from 'three';
import { gray } from './colors';

const { innerWidth, innerHeight, devicePixelRatio } = window;

const renderer = new WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.setClearColor(gray);

export default renderer;
