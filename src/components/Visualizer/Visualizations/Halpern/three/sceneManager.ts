import { Scene, SphereGeometry, Vector3, Quaternion, Euler } from 'three';
import { createPolygon, createPoints, createSun, createHalpernSphere } from './entities/polys';
import { createRenderer } from './entities/renderer';
import { createCamera } from './entities/camera';
import { createLight } from './entities/light';

const DELAY_BEFORE_ROTATING_X = 1500;
const CAMERA_MAX_DISTANCE = 90;
const CAMERA_MIN_DISTANCE = 0;

export default function sceneManager(rendererContainer: HTMLDivElement) {
  let currentAnimationFrameId: number;
  let sceneInitializedTimestamp = Date.now();
  let isMouseDragging = false;
  let isCameraChanged = false;

  const mousePosition = {
    x: 0,
    y: 0
  };

  const polygon = createPolygon();
  const points = createPoints(polygon);
  const sun = createSun(polygon);
  const halpernSphere = createHalpernSphere({ polygon, points, sun });

  const camera = createCamera();
  camera.position.set(0, CAMERA_MAX_DISTANCE, 0);
  camera.lookAt(new Vector3(0, 0, 0));

  const light = createLight();
  light.position.set(0, CAMERA_MAX_DISTANCE, 0);

  const renderer = createRenderer();

  rendererContainer.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.add(halpernSphere);
  scene.add(light);

  addRotationControls();
  addZoomControls();

  window.addEventListener('resize', onResize);

  function animate() {
    if (!isCameraChanged) {
      halpernSphere.rotateY(-0.001);

      if (Date.now() - sceneInitializedTimestamp > DELAY_BEFORE_ROTATING_X) {
        halpernSphere.rotateX(0.0005);
      }
    }

    renderer.render(scene, camera);
    currentAnimationFrameId = window.requestAnimationFrame(animate);
  }

  function stop() {
    window.cancelAnimationFrame(currentAnimationFrameId);
    window.removeEventListener('resize', onResize);
    rendererContainer.removeChild(renderer.domElement);
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

  function addRotationControls() {
    renderer.domElement.addEventListener('mousedown', () => (isMouseDragging = true));
    renderer.domElement.addEventListener('mouseup', () => (isMouseDragging = false));
    renderer.domElement.addEventListener('mousemove', (event: MouseEvent) => {
      const moveDelta = {
        x: event.offsetX - mousePosition.x,
        y: event.offsetY - mousePosition.y
      };

      if (isMouseDragging) {
        const rotationDeltaQuaternion = new Quaternion().setFromEuler(
          new Euler(toRadians(moveDelta.y * 0.25), toRadians(moveDelta.x * 0.25), 0, 'XYZ')
        );

        halpernSphere.quaternion.multiplyQuaternions(rotationDeltaQuaternion, halpernSphere.quaternion);
        isCameraChanged = true;
      }

      mousePosition.x = event.offsetX;
      mousePosition.y = event.offsetY;
    });
  }

  function addZoomControls() {
    renderer.domElement.addEventListener('wheel', (event: WheelEvent) => {
      if (event.deltaY > 0) {
        camera.position.y = Math.min(camera.position.y + 2, CAMERA_MAX_DISTANCE);
      } else {
        camera.position.y = Math.max(camera.position.y - 2, CAMERA_MIN_DISTANCE);
      }
    });
  }

  return {
    animate,
    stop,
    getSphereGeometry
  };
}

function toRadians(angle: number) {
  return (angle * Math.PI) / 180;
}
