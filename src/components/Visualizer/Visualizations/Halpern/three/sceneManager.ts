import { Color, Scene } from 'three';
import { createLight } from './entities/light';
import { createPolygon, createPoints, createSphere } from './entities/actors';
import { createCamera, createControls } from './entities/camera';
import { createRenderer } from './entities/renderer';

export default function sceneManager(rendererContainer: HTMLDivElement) {
  let currentAnimationFrameId: number;

  const pointLight = createLight(new Color('#fff'));

  const polygon = createPolygon();
  const points = createPoints(polygon);
  const sphere = createSphere({ polygon, points });
  const camera = createCamera();
  const controls = createControls(camera);
  const renderer = createRenderer();

  rendererContainer.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.add(sphere);
  scene.add(pointLight);

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

  return {
    animate,
    stop,
    sphere
  };
}
