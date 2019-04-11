import {
  Points,
  PointsMaterial,
  SphereGeometry,
  BufferGeometry,
  BufferAttribute,
  TextureLoader
} from 'three';

export function createSphereGeometry(): SphereGeometry {
  return new SphereGeometry(48, 96, 96);
}

export function createPoints(sphereGeometry: SphereGeometry): Points {
  const pointGeometry = new SphereGeometry(
    sphereGeometry.parameters.radius,
    sphereGeometry.parameters.widthSegments,
    sphereGeometry.parameters.heightSegments
  );

  const { vertices } = pointGeometry;
  const positions = new Float32Array(vertices.length * 3);

  vertices.forEach((vertex, i) => {
    vertex.toArray(positions, i * 3);
  });

  const geometry = new BufferGeometry();
  geometry.addAttribute('position', new BufferAttribute(positions, 3));
  (geometry.attributes.position as BufferAttribute).dynamic = true;

  const material = new PointsMaterial({
    size: 0.25,
    map: new TextureLoader().load('assets/images/point.png'),
    alphaTest: 0.5,
    color: 0x666666,
    transparent: true
  });

  return new Points(geometry, material);
}
