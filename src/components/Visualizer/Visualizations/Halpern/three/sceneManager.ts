import { Scene, SphereGeometry } from 'three';
import { createPolygon, createPoints } from './entities/polys';
import { createCamera, createControls } from './entities/camera';
import { createRenderer } from './entities/renderer';

export default function sceneManager(rendererContainer: HTMLDivElement) {
  let currentAnimationFrameId: number;

  const polygon = createPolygon();
  const points = createPoints(polygon);

  const camera = createCamera();
  const controls = createControls(camera);
  const renderer = createRenderer();

  rendererContainer.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.add(polygon);
  scene.add(points);

  window.addEventListener('resize', onResize);

  function animate() {
    controls.update();
    renderer.render(scene, camera);
    currentAnimationFrameId = window.requestAnimationFrame(animate);
  }

  function stop() {
    window.cancelAnimationFrame(currentAnimationFrameId);
    rendererContainer.removeChild(renderer.domElement);
    window.removeEventListener('resize', onResize);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  function getSphereGeometry() {
    return polygon.geometry as SphereGeometry;
  }

  return {
    animate,
    stop,
    getSphereGeometry
  };
}
