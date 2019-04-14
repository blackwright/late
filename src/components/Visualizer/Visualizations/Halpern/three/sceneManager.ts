import { Scene, PointsMaterial, Clock } from 'three';
import { createRenderer } from './entities/renderer';
import { createCamera } from './entities/camera';
import { createSphereGeometry, createPoints } from './entities/polys';

const DELAY_BEFORE_ROTATING_X = 1500;
const CAMERA_MAX_DISTANCE = 200;
const CAMERA_DRIFT = 0.025;
const ROTATE_Y = -0.3;
const ROTATE_X = 0.3;

export default function sceneManager(rendererContainer: HTMLDivElement) {
  let animationFrameId: number;
  let sceneInitializedTimestamp = Date.now();
  let t = 0;

  const sphereGeometry = createSphereGeometry();
  const halpern = createPoints(sphereGeometry);
  const camera = createCamera(CAMERA_MAX_DISTANCE);
  const renderer = createRenderer();
  rendererContainer.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.add(halpern);

  // clock is started in Halpern component when the
  // animation loop is started
  const clock = new Clock();

  window.addEventListener('resize', onResize);
  document.addEventListener('visibilitychange', onVisibilityChange);

  function animate() {
    const delta = clock.getDelta();

    halpern.rotateY(ROTATE_Y * delta);

    if (Date.now() - sceneInitializedTimestamp > DELAY_BEFORE_ROTATING_X) {
      halpern.rotateX(ROTATE_X * delta);
    }

    t += delta;

    if (t >= Math.PI * 2) {
      t = 0;
    }

    camera.translateY(Math.cos(t) * CAMERA_DRIFT);
    camera.translateX(Math.cos(t) * CAMERA_DRIFT);
    camera.translateZ(Math.cos(t) * CAMERA_DRIFT * 5);

    renderer.render(scene, camera);
    animationFrameId = window.requestAnimationFrame(animate);
  }

  function cleanup() {
    window.cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', onResize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    rendererContainer.removeChild(renderer.domElement);

    scene.remove(halpern);

    halpern.geometry.dispose();
    (halpern.material as PointsMaterial).dispose();
    sphereGeometry.dispose();
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  function onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      clock.stop();
    } else {
      clock.start();
    }
  }

  return {
    clock,
    sphereGeometry,
    halpern,
    animate,
    cleanup
  };
}
