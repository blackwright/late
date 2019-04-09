import {
  IcosahedronGeometry,
  PointsMaterial,
  Vector3,
  Points,
  TextureLoader
} from 'three';

const STAR_COUNT = 40000;

export function createStars() {
  const geometry = new IcosahedronGeometry(500, 1);
  const material = new PointsMaterial({
    size: 0.7,
    map: new TextureLoader().load('assets/images/point.png'),
    transparent: true,
    opacity: 0.8
  });

  let i = 0;
  while (i < STAR_COUNT) {
    const vertex = new Vector3();
    vertex.set(
      Math.random() * 1000 - 500,
      Math.random() * 1000 - 500,
      Math.random() * 1000 - 500
    );
    geometry.vertices.push(vertex);

    i += 1;
  }

  return new Points(geometry, material);
}
