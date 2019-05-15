export type CornerRadii = {
  tl: number;
  tr: number;
  br: number;
  bl: number;
};

const defaultCornerRadii = {
  tl: 0,
  tr: 0,
  br: 0,
  bl: 0
};

export function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: CornerRadii = defaultCornerRadii,
  stroke = false
) {
  ctx.beginPath();

  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);

  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height
  );

  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);

  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);

  ctx.closePath();
  ctx.fill();
  stroke && ctx.stroke();
}

export function distanceBetween(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
) {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
}
