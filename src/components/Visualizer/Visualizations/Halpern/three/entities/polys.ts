import {
  Mesh,
  Points,
  MeshLambertMaterial,
  PointsMaterial,
  SphereGeometry,
  BufferGeometry,
  BufferAttribute,
  Color,
  TextureLoader,
  Object3D,
  SpriteMaterial,
  AdditiveBlending,
  Sprite
} from 'three';

export function createPolygon(): Mesh {
  const geometry = new SphereGeometry(40, 50, 50);
  geometry.computeVertexNormals();

  const material = new MeshLambertMaterial({
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
    size: 0.4,
    map: new TextureLoader().load('assets/images/point.png'),
    alphaTest: 0.5,
    color: new Color('#FFF'),
    transparent: true
  });

  return new Points(geometry, material);
}

export function createSun(polygon: Mesh): any {
  const { parameters } = polygon.geometry as SphereGeometry;

  const spriteMaterial = new SpriteMaterial({
    map: new TextureLoader().load('assets/images/glow.png'),
    color: new Color('#FFF'),
    transparent: false,
    blending: AdditiveBlending
  });

  const sunSprite = new Sprite(spriteMaterial);
  const glowSize = parameters.radius * 2;
  sunSprite.scale.set(glowSize, glowSize, 1.0);

  return sunSprite;
}

export function createHalpernSphere({ polygon, points, sun }: { polygon: Mesh; points: Points; sun: Mesh }): Object3D {
  const sphere = new Object3D();
  sphere.add(polygon);
  sphere.add(points);
  sphere.add(sun);
  return sphere;
}
