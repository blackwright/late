export const starVertexShader = `
attribute float alpha;
varying float vAlpha;

void main() {
  vAlpha = alpha;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = 5.0 * alpha;
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const starFragmentShader = `
uniform vec3 color;
varying float vAlpha;

void main() {
  float r = 0.0;
  vec2 cxy = 2.0 * gl_PointCoord - 1.0;
  r = dot(cxy, cxy);
  if (r > 1.0) {
    discard;
  }

  gl_FragColor = vec4(color, vAlpha);
}
`;
