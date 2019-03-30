import { WebGLRenderer } from 'three';

export function createRenderer() {
  const { innerWidth, innerHeight } = window;

  const renderer = new WebGLRenderer({ alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x000000, 0);

  return renderer;
}
