import {
  Mesh,
  Points,
  MeshLambertMaterial,
  PointsMaterial,
  SphereGeometry,
  BufferGeometry,
  BufferAttribute,
  TextureLoader
} from 'three';
import { pointColor } from './colors';

export function createPolygon(): Mesh {
  const geometry = new SphereGeometry(40, 100, 100);
  geometry.computeVertexNormals();

  const material = new MeshLambertMaterial({
    wireframe: true
  });

  return new Mesh(geometry, material);
}

export function createPoints(polygon: Mesh): Points {
  const sphereGeometry = polygon.geometry as SphereGeometry;

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

  const material = new PointsMaterial({
    size: 0.6,
    map: new TextureLoader().load('assets/images/point.png'),
    alphaTest: 0.5,
    color: pointColor,
    transparent: true
  });

  return new Points(geometry, material);
}
