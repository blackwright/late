import { WebGLRenderer, Color } from 'three';

export function createRenderer() {
  const { innerWidth, innerHeight, devicePixelRatio } = window;

  const renderer = new WebGLRenderer();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setClearColor(new Color('#061E3E'));

  return renderer;
}
