import {
  Scene,
  PointsMaterial,
  BufferGeometry,
  BufferAttribute,
  Group,
  DirectionalLightHelper,
  Mesh,
  ShaderMaterial
} from 'three';
import { createRenderer } from './entities/renderer';
import { createCamera } from './entities/camera';
import { createStars, createCloud } from './entities/polys';
import { createAmbientLight, createDirectionalLight } from './entities/light';

const STAR_COUNT = 20 * 1000;
const MAX_STAR_ALPHA = 1.0;
const MIN_STAR_ALPHA = 0.2;
const STAR_ALPHA_DELTA = 0.005;

const CLOUD_COUNT = 65;

const ROTATE_Y = 0.0002;
const ROTATE_X = 0.000005;

export default function sceneManager(rendererContainer: HTMLDivElement) {
  let animationFrameId: number;

  const renderer = createRenderer();
  rendererContainer.appendChild(renderer.domElement);
  const camera = createCamera();
  const scene = new Scene();

  const stars = createStars(STAR_COUNT);
  scene.add(stars);

  const cloudCover = new Group();

  let cloudCount = 0;
  while (cloudCount <= CLOUD_COUNT) {
    const cloud = createCloud();
    cloudCover.add(cloud);
    cloudCount += 1;
  }

  scene.add(cloudCover);

  const aLight = createAmbientLight(0xffffff);
  scene.add(aLight);

  const dLight = createDirectionalLight(0xc70039);
  dLight.position.set(-1, 0, 1);
  scene.add(dLight);

  window.addEventListener('resize', onResize);

  // create a fixed array to track which direction to adjust each star alpha
  const starAlphas = (stars.geometry as BufferGeometry).attributes.alpha;
  const alphaDirection = new Float32Array(starAlphas.count);

  for (let i = 0; i < alphaDirection.length; i++) {
    // direction of 1 means alpha should increase
    // -1 means alpha should decrease
    alphaDirection[i] = Math.random() < 0.5 ? 1 : -1;
  }

  function animate() {
    stars.rotateX(ROTATE_X);
    stars.rotateY(ROTATE_Y);

    cloudCover.rotateX(ROTATE_X * 20);
    cloudCover.rotateY(ROTATE_Y * 2.5);

    cloudCover.children.forEach(cloud => {
      (cloud as Mesh).lookAt(camera.position);
    });

    // use alphaDirection to maintain alpha adjustment direction until we
    // reach a limit, then switch the direction
    for (let i = 0; i < starAlphas.count; i++) {
      if (alphaDirection[i] > 0) {
        (starAlphas.array as Float32Array)[i] *= 1 + STAR_ALPHA_DELTA;
        if ((starAlphas.array as Float32Array)[i] > MAX_STAR_ALPHA) {
          alphaDirection[i] = -1;
        }
      } else {
        (starAlphas.array as Float32Array)[i] *= 1 - STAR_ALPHA_DELTA;
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
    window.removeEventListener('resize', onResize);
    rendererContainer.removeChild(renderer.domElement);

    scene.remove(stars);

    stars.geometry.dispose();
    (stars.material as PointsMaterial).dispose();
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

  return {
    animate,
    cleanup,
    stars,
    camera
  };
}
