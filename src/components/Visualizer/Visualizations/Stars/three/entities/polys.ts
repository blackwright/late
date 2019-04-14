import {
  Points,
  BufferAttribute,
  ShaderMaterial,
  Color,
  BufferGeometry,
  TextureLoader,
  MeshLambertMaterial,
  Mesh,
  PlaneGeometry
} from 'three';
import { starVertexShader, starFragmentShader } from './shaders';

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
      color: { type: 'c', value: new Color(0xffffff) }
    },
    vertexShader: starVertexShader,
    fragmentShader: starFragmentShader,
    transparent: true
  });

  return new Points(geometry, shaderMaterial);
}

export function createCloud(): Mesh {
  const texture = Math.random() < 0.5 ? 'cloud.png' : 'smoke.png';

  const geometry = new PlaneGeometry(50, 50);

  const cloudMaterial = new MeshLambertMaterial({
    map: new TextureLoader().load(`assets/images/${texture}`),
    transparent: true,
    opacity: 0.15,
    depthTest: false
  });

  geometry.rotateZ(Math.random() * 360);

  const cloud = new Mesh(geometry, cloudMaterial);

  const zPosition = Math.random() * 15 + 10;

  cloud.position.set(
    Math.random() * 100 - 50,
    Math.random() * 100 - 50,
    Math.random() < 0.5 ? zPosition : -zPosition
  );

  return cloud;
}
