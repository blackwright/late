import {
  Points,
  BufferAttribute,
  ShaderMaterial,
  Color,
  BufferGeometry,
  TextureLoader,
  SpriteMaterial,
  Sprite
} from 'three';
import { starVertexShader, starFragmentShader } from './shaders';
import { toRadians } from '../../../../../../utils';

export function createStars(starCount: number): Points {
  const geometry = new BufferGeometry();

  const positions = new Float32Array(starCount * 3);

  let i = 0;
  while (i < starCount) {
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

export function createCloud(): Sprite {
  const cloudMaterial = new SpriteMaterial({
    color: 0xffffff,
    map: new TextureLoader().load('assets/images/cloud.png'),
    transparent: true,
    opacity: 0.1,
    rotation: toRadians(Math.random() * 360)
  });

  const cloud = new Sprite(cloudMaterial);

  cloud.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() * 25 - 10
  );

  const scale = Math.random() * 20 + 10;
  cloud.scale.set(scale, scale, 1);

  return cloud;
}
