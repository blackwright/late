import { Scene, PointsMaterial, BufferGeometry, BufferAttribute } from 'three';
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
  scene.add(stars);

  // create a fixed array to track which direction to adjust each star alpha
  const starAlphas = (stars.geometry as BufferGeometry).attributes.alpha;
  const alphaDirection = new Float32Array(starAlphas.count);

  for (let i = 0; i < alphaDirection.length; i++) {
    alphaDirection[i] = Math.random() < 0.5 ? 1 : -1;
  }

  function animate() {
    stars.rotateY(0.0005);
    stars.rotateX(0.0000005);
    stars.rotateZ(0.0001);

    // use alphaDirection to maintain alpha adjustment direction until we
    // reach a limit, then switch the direction
    for (let i = 0; i < starAlphas.count; i++) {
      if (alphaDirection[i] > 0) {
        (starAlphas.array as Float32Array)[i] *= 1.007;
        if ((starAlphas.array as Float32Array)[i] > 1) {
          alphaDirection[i] = -1;
        }
      } else {
        (starAlphas.array as Float32Array)[i] *= 0.993;
        if ((starAlphas.array as Float32Array)[i] < 0.3) {
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
