import {
  Scene,
  SphereGeometry,
  Vector3,
  Quaternion,
  Euler,
  BufferGeometry
} from 'three';
import { createPolygon, createPoints } from './entities/polys';
import { createRenderer } from './entities/renderer';
import { createCamera } from './entities/camera';

const DELAY_BEFORE_ROTATING_X = 1500;
const CAMERA_MAX_DISTANCE = 200;
const CAMERA_MIN_DISTANCE = 0;
const CAMERA_DRIFT = 0.05;

export default function sceneManager(rendererContainer: HTMLDivElement) {
  let currentAnimationFrameId: number;
  let sceneInitializedTimestamp = Date.now();
  let t = 0;
  let isMouseDragging = false;

  const mousePosition = {
    x: 0,
    y: 0
  };

  const polygon = createPolygon();
  const halpernSphere = createPoints(polygon);

  const camera = createCamera();
  camera.position.set(0, CAMERA_MAX_DISTANCE, 0);
  camera.lookAt(new Vector3(0, 0, 0));

  const renderer = createRenderer();

  rendererContainer.appendChild(renderer.domElement);

  const scene = new Scene();
  scene.add(halpernSphere);

  const removeRotationControls = addRotationControls();
  const removeZoomControls = addZoomControls();

  window.addEventListener('resize', onResize);

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
    currentAnimationFrameId = window.requestAnimationFrame(animate);
  }

  function stop() {
    window.cancelAnimationFrame(currentAnimationFrameId);
    window.removeEventListener('resize', onResize);
    rendererContainer.removeChild(renderer.domElement);

    removeRotationControls();
    removeZoomControls();

    scene.remove(halpernSphere);
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

  function getHalpernGeometry() {
    return halpernSphere.geometry as BufferGeometry;
  }

  function addRotationControls() {
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('mousemove', onMouseMove);

    function onMouseDown() {
      isMouseDragging = true;
    }

    function onMouseUp() {
      isMouseDragging = false;
    }

    function onMouseMove(event: MouseEvent) {
      const moveDelta = {
        x: event.offsetX - mousePosition.x,
        y: event.offsetY - mousePosition.y
      };

      if (isMouseDragging) {
        const rotationDeltaQuaternion = new Quaternion().setFromEuler(
          new Euler(
            toRadians(moveDelta.y * 0.25),
            toRadians(moveDelta.x * 0.25),
            0,
            'XYZ'
          )
        );

        halpernSphere.quaternion.multiplyQuaternions(
          rotationDeltaQuaternion,
          halpernSphere.quaternion
        );
      }

      mousePosition.x = event.offsetX;
      mousePosition.y = event.offsetY;
    }

    return function removeRotationControls() {
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
    };
  }

  function addZoomControls() {
    renderer.domElement.addEventListener('wheel', onMouseWheel);

    function onMouseWheel(event: WheelEvent) {
      if (event.deltaY > 0) {
        camera.position.y = Math.min(
          camera.position.y + 2,
          CAMERA_MAX_DISTANCE
        );
      } else {
        camera.position.y = Math.max(
          camera.position.y - 2,
          CAMERA_MIN_DISTANCE
        );
      }
    }

    return function removeZoomControls() {
      renderer.domElement.removeEventListener('wheel', onMouseWheel);
    };
  }

  return {
    animate,
    stop,
    getSphereGeometry,
    getHalpernGeometry
  };
}

function toRadians(angle: number) {
  return (angle * Math.PI) / 180;
}
