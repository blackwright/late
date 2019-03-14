import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Object3D,
  Points
} from 'three';
import { darkgray, white } from './colors';

function createPolygon(): Mesh {
  const geometry = new SphereGeometry(40, 40, 40);
  geometry.computeVertexNormals();
  const material = new MeshBasicMaterial({
    color: darkgray,
    wireframe: true
  });
  return new Mesh(geometry, material);
}

export const polygon = createPolygon();

function createPoints(polygon: Mesh): Points {
  const { vertices } = polygon.geometry as SphereGeometry;
  const positions = new Float32Array(vertices.length * 3);

  vertices.forEach((vertex, i) => {
    vertex.toArray(positions, i * 3);
  });

  const geometry = new BufferGeometry();
  geometry.addAttribute('position', new BufferAttribute(positions, 3));

  const material = new PointsMaterial({
    size: 1,
    color: white,
    transparent: true
  });

  return new Points(geometry, material);
}

export const points = createPoints(polygon);

function createSphere({ polygon, points }: { polygon: Mesh; points: Points }): Object3D {
  const sphere = new Object3D();
  sphere.add(polygon);
  sphere.add(points);
  return sphere;
}

export const sphere = createSphere({ polygon, points });
