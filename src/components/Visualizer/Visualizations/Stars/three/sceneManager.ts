import { Scene, FogExp2, PointsMaterial } from 'three';
import { createRenderer } from './entities/renderer';
import { createCamera } from './entities/camera';
import { createStars } from './entities/polys';

export default function sceneManager(rendererContainer: HTMLDivElement) {
  let animationFrameId: number;

  const camera = createCamera();
  const renderer = createRenderer();
  const stars = createStars();
  rendererContainer.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.fog = new FogExp2(0x000000, 0.0003);
  scene.add(stars);

  function animate() {
    renderer.render(scene, camera);
    animationFrameId = window.requestAnimationFrame(animate);
  }

  function cleanup() {
    window.cancelAnimationFrame(animationFrameId);

    scene.remove(stars);

    stars.geometry.dispose();
    (stars.material as PointsMaterial).dispose();
  }

  return {
    animate,
    cleanup,
    stars,
    camera
  };
}
