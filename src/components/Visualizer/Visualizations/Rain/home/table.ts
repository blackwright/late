import { Renderer } from './renderer';
import { roundedRect, CornerRadii } from '../utils';

const WOOD_COLOR = '#122C2B';
const TABLE_DECORATION_COLOR = '#06151A';

export class Table extends Renderer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  render() {
    super.render();

    const {
      ctx,
      windowFrameThickness,
      canvasHeight,
      oneThirdCanvasWidth,
      roundedRadius
    } = this;

    // table top
    const width = oneThirdCanvasWidth * 1.1;
    const y = (canvasHeight * 5) / 6;
    const thickness = windowFrameThickness * 1.35;

    const tableCornerRadii: CornerRadii = {
      tl: 0,
      tr: roundedRadius,
      br: 0,
      bl: 0
    };

    ctx.fillStyle = WOOD_COLOR;
    roundedRect(ctx, 0, y, width, thickness, tableCornerRadii);

    // table leg
    ctx.strokeStyle = WOOD_COLOR;
    ctx.lineWidth = windowFrameThickness * 2;
    ctx.beginPath();
    ctx.moveTo((oneThirdCanvasWidth * 2) / 3, y);
    ctx.lineTo((oneThirdCanvasWidth * 2) / 3, canvasHeight);
    ctx.stroke();

    // decoration
    ctx.fillStyle = TABLE_DECORATION_COLOR;
    ctx.beginPath();
    ctx.rect(
      0,
      y + thickness - windowFrameThickness / 4,
      width,
      windowFrameThickness / 4
    );
    ctx.fill();
  }
}
