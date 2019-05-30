import {
  Scene,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  Group,
  Mesh,
  ShaderMaterial,
  Clock
} from 'three';
import { createRenderer } from './entities/renderer';
import { createCamera } from './entities/camera';
import { createStars, createCloud } from './entities/polys';
import { createAmbientLight, createDirectionalLight } from './entities/light';
import { QualitySettings } from '../../index';
import { debounced } from '../../../../../utils';

const MAX_STAR_ALPHA = 1.0;
const MIN_STAR_ALPHA = 0.2;
const STAR_ALPHA_DELTA = 0.75;
const ROTATE_Y = 0.025;
const ROTATE_X = 0.001;
const STATIC_LIGHT_COLOR = 0x00c4b6;
const VARIABLE_LIGHT_COLOR = 0xd10022;

const QUALITY: QualitySettings = {
  0: {
    STAR_COUNT: 5 * 1000,
    CLOUD_COUNT: 20
  },
  1: {
    STAR_COUNT: 10 * 1000,
    CLOUD_COUNT: 40
  },
  2: {
    STAR_COUNT: 20 * 1000,
    CLOUD_COUNT: 65
  }
};

export default function sceneManager(
  rendererContainer: HTMLDivElement,
  quality: number,
  lightIntensity: number
) {
  let animationFrameId: number;

  const renderer = createRenderer();
  rendererContainer.appendChild(renderer.domElement);
  const camera = createCamera();
  const scene = new Scene();

  const stars = createStars(QUALITY[quality].STAR_COUNT);
  scene.add(stars);

  const cloudCover = new Group();

  let cloudCount = 0;
  while (cloudCount <= QUALITY[quality].CLOUD_COUNT) {
    const cloud = createCloud();
    cloudCover.add(cloud);
    cloudCount += 1;
  }

  scene.add(cloudCover);

  const aLight = createAmbientLight(0xffffff, lightIntensity);
  scene.add(aLight);

  const fixedDLight = createDirectionalLight(STATIC_LIGHT_COLOR, 2);
  fixedDLight.position.set(0, 0, 1);
  scene.add(fixedDLight);

  const dLight = createDirectionalLight(VARIABLE_LIGHT_COLOR, lightIntensity);
  dLight.position.set(0, 0, 1);
  scene.add(dLight);

  // create a fixed array to track which direction to adjust each star alpha
  const starAlphas = (stars.geometry as BufferGeometry).attributes.alpha;
  const alphaDirection = new Float32Array(starAlphas.count);

  for (let i = 0; i < alphaDirection.length; i++) {
    // direction of 1 means alpha should increase
    // -1 means alpha should decrease
    alphaDirection[i] = Math.random() < 0.5 ? 1 : -1;
  }

  // clock is started in Stars component when
  // the animation loop is first triggered
  const clock = new Clock();

  const debouncedResize = debounced(onResize);
  window.addEventListener('resize', debouncedResize);
  document.addEventListener('visibilitychange', onVisibilityChange);

  function animate() {
    const delta = clock.getDelta();

    stars.rotateX(ROTATE_X * delta);
    stars.rotateY(ROTATE_Y * delta);

    cloudCover.rotateX(ROTATE_X * 24 * delta);
    cloudCover.rotateY(ROTATE_Y * 2 * delta);
    cloudCover.rotateZ(ROTATE_X * 3 * delta);

    cloudCover.children.forEach(cloud => {
      (cloud as Mesh).lookAt(camera.position);
    });

    // use alphaDirection to maintain alpha adjustment direction until we
    // reach a limit, then switch the direction
    for (let i = 0; i < starAlphas.count; i++) {
      if (alphaDirection[i] > 0) {
        (starAlphas.array as Float32Array)[i] *= 1 + STAR_ALPHA_DELTA * delta;
        if ((starAlphas.array as Float32Array)[i] > MAX_STAR_ALPHA) {
          alphaDirection[i] = -1;
        }
      } else {
        (starAlphas.array as Float32Array)[i] *= 1 - STAR_ALPHA_DELTA * delta;
        if ((starAlphas.array as Float32Array)[i] < MIN_STAR_ALPHA) {
          alphaDirection[i] = 1;
        }
      }
    }

    (starAlphas as BufferAttribute).needsUpdate = true;

    renderer.render(scene, camera);
    animationFrameId = window.requestAnimationFrame(animate);
  }

  function cleanup() {
    window.cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', debouncedResize);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    rendererContainer.removeChild(renderer.domElement);

    scene.remove(stars);
    stars.geometry.dispose();
    (stars.material as PointsMaterial).dispose();

    scene.remove(cloudCover);
    cloudCover.children.forEach(cloud => {
      (cloud as Mesh).geometry.dispose();
      ((cloud as Mesh).material as ShaderMaterial).dispose();
    });
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
    animate,
    cleanup,
    dLight
  };
}
