import { Renderer } from './renderer';

const WOOD_COLOR = '#122C2B';
const WOOD_DECORATION_COLOR = '#091c1b';

export class Dresser extends Renderer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  render() {
    super.render();

    const { ctx, canvasWidth, canvasHeight, windowFrameThickness } = this;

    const x = (canvasWidth * 2) / 3 + windowFrameThickness * 5;
    const y = (canvasHeight * 2) / 3;

    // dresser body
    ctx.fillStyle = WOOD_COLOR;
    ctx.fillRect(x, y, canvasWidth, canvasHeight);

    // dresser detail rectangle
    ctx.strokeStyle = WOOD_DECORATION_COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(
      x + windowFrameThickness,
      y + windowFrameThickness,
      canvasWidth,
      canvasHeight
    );
    ctx.stroke();

    // dresser top handle
    const dresserWidth = canvasWidth - (x + windowFrameThickness);
    const dresserHandleMidpoint =
      x + windowFrameThickness + (dresserWidth * 3) / 5;

    ctx.beginPath();
    ctx.moveTo(dresserHandleMidpoint, y + windowFrameThickness * 2.5);
    ctx.lineTo(canvasWidth, y + windowFrameThickness * 2.5);
    ctx.lineWidth = (windowFrameThickness * 2) / 3;
    ctx.stroke();

    // dresser horizontal detail line
    ctx.beginPath();
    ctx.moveTo(x + windowFrameThickness, y + windowFrameThickness * 6);
    ctx.lineTo(canvasWidth, y + windowFrameThickness * 6);
    ctx.lineWidth = 2;
    ctx.stroke();

    // dresser bottom handle
    ctx.beginPath();
    ctx.moveTo(dresserHandleMidpoint, y + windowFrameThickness * 7.5);
    ctx.lineTo(canvasWidth, y + windowFrameThickness * 7.5);
    ctx.lineWidth = (windowFrameThickness * 2) / 3;
    ctx.stroke();
  }
}
