import { WebGLRenderer } from 'three';

export function createRenderer() {
  const { innerWidth, innerHeight } = window;

  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(innerWidth, innerHeight);
  renderer.setClearColor(0x0000f, 1);

  return renderer;
}
