import { Scene, PointsMaterial, MeshLambertMaterial } from 'three';
import { createRenderer } from './entities/renderer';
import { createCamera } from './entities/camera';
import { createPolygon, createPoints } from './entities/polys';

const DELAY_BEFORE_ROTATING_X = 1500;
const CAMERA_MAX_DISTANCE = 200;
const CAMERA_DRIFT = 0.05;

export default function sceneManager(rendererContainer: HTMLDivElement) {
  let animationFrameId: number;
  let sceneInitializedTimestamp = Date.now();
  let t = 0;

  const polygon = createPolygon();
  const halpernSphere = createPoints(polygon);
  const camera = createCamera(CAMERA_MAX_DISTANCE);
  const renderer = createRenderer();
  rendererContainer.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.add(halpernSphere);

  window.addEventListener('resize', onResize, false);

  function animate() {
    halpernSphere.rotateY(-0.002);

    if (Date.now() - sceneInitializedTimestamp > DELAY_BEFORE_ROTATING_X) {
      halpernSphere.rotateX(0.002);
    }

    t += 0.005;

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
    rendererContainer.removeChild(renderer.domElement);

    scene.remove(halpernSphere);

    halpernSphere.geometry.dispose();
    (halpernSphere.material as PointsMaterial).dispose();
    polygon.geometry.dispose();
    (polygon.material as MeshLambertMaterial).dispose();
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }

  return {
    sphere: polygon,
    halpern: halpernSphere,
    animate,
    cleanup
  };
}

function toRadians(angle: number) {
  return (angle * Math.PI) / 180;
}
