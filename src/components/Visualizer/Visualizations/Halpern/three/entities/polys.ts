import {
  SphereGeometry,
  Mesh,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  MeshBasicMaterial,
  Color
} from 'three';

export function createPolygon(): Mesh {
  const geometry = new SphereGeometry(40, 50, 50);
  geometry.computeVertexNormals();
  const material = new MeshBasicMaterial({
    wireframe: true,
    color: new Color('#851E3E')
  });
  return new Mesh(geometry, material);
}

export function createPoints(polygon: Mesh): Points {
  const sphereGeometry = polygon.geometry as SphereGeometry;

  const pointGeometry = new SphereGeometry(
    sphereGeometry.parameters.radius,
    sphereGeometry.parameters.widthSegments / 2,
    sphereGeometry.parameters.heightSegments / 2
  );

  const { vertices } = pointGeometry;
  const positions = new Float32Array(vertices.length * 3);

  vertices.forEach((vertex, i) => {
    vertex.toArray(positions, i * 3);
  });

  const geometry = new BufferGeometry();
  geometry.addAttribute('position', new BufferAttribute(positions, 3));

  const material = new PointsMaterial({
    size: 0.3,
    color: new Color('#fff')
  });

  return new Points(geometry, material);
}
