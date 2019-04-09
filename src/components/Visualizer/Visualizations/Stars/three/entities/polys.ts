import {
  Points,
  BufferAttribute,
  ShaderMaterial,
  Color,
  BufferGeometry
} from 'three';
import { starVertexShader, starFragmentShader } from './shaders';

const STAR_COUNT = 20000;

export function createStars() {
  const geometry = new BufferGeometry();

  const positions = new Float32Array(STAR_COUNT * 3);

  let i = 0;
  while (i < STAR_COUNT) {
    // add random x, y, and z vector positions
    positions[i++] = Math.random() * 100 - 50;
    positions[i++] = Math.random() * 100 - 50;
    positions[i++] = Math.random() * 100 - 50;
  }

  geometry.addAttribute('position', new BufferAttribute(positions, 3));

  const alphas = new Float32Array(geometry.attributes.position.count * 1);

  let j = 0;
  while (j < alphas.length) {
    alphas[j] = Math.random();
    j += 1;
  }

  geometry.addAttribute('alpha', new BufferAttribute(alphas, 1));

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      color: {
        value: new Color(0xffffff)
      }
    },
    vertexShader: starVertexShader,
    fragmentShader: starFragmentShader,
    transparent: true
  });

  return new Points(geometry, shaderMaterial);
}
