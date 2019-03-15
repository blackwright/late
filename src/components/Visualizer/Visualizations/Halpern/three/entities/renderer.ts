import { WebGLRenderer } from 'three';
import { gray } from './colors';

export function createRenderer() {
  const { innerWidth, innerHeight, devicePixelRatio } = window;

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setClearColor(gray);

  return renderer;
}
