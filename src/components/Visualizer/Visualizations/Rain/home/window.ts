import { Renderer } from '../renderer';
import { roundedRect, CornerRadii } from '../utils';

const WINDOW_FRAME_COLOR = '#3D1A1E';
const WINDOW_DECORATION_COLOR = '#682634';

export class Window extends Renderer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  render() {
    super.render();

    const {
      ctx,
      oneThirdCanvasWidth,
      oneHalfCanvasHeight,
      windowFrameThickness
    } = this;

    ctx.fillStyle = WINDOW_FRAME_COLOR;

    // window trim
    ctx.fillRect(
      oneThirdCanvasWidth - windowFrameThickness,
      oneHalfCanvasHeight / 2 - windowFrameThickness,
      oneThirdCanvasWidth + windowFrameThickness * 2,
      oneHalfCanvasHeight + windowFrameThickness * 2
    );

    // make a hole
    ctx.clearRect(
      oneThirdCanvasWidth,
      oneHalfCanvasHeight / 2,
      oneThirdCanvasWidth,
      oneHalfCanvasHeight
    );

    // window muntin
    const muntinWidth = Math.floor(windowFrameThickness / 2);

    const topLeftX = (oneThirdCanvasWidth * 4) / 3 - (muntinWidth * 2) / 3;
    const topRightX = (oneThirdCanvasWidth * 5) / 3 - muntinWidth / 3;
    const topY = oneHalfCanvasHeight / 2 - windowFrameThickness;

    const leftX = oneThirdCanvasWidth - windowFrameThickness;
    const leftTopY = (oneHalfCanvasHeight * 5) / 6 - (muntinWidth * 2) / 3;
    const leftBottomY = (oneHalfCanvasHeight * 7) / 6 - muntinWidth / 3;

    ctx.fillRect(
      topLeftX,
      topY,
      muntinWidth,
      oneHalfCanvasHeight + windowFrameThickness * 2
    );

    ctx.fillRect(
      topRightX,
      topY,
      muntinWidth,
      oneHalfCanvasHeight + windowFrameThickness * 2
    );

    ctx.fillRect(
      leftX,
      leftTopY,
      oneThirdCanvasWidth + windowFrameThickness * 2,
      muntinWidth
    );

    ctx.fillRect(
      leftX,
      leftBottomY,
      oneThirdCanvasWidth + windowFrameThickness * 2,
      muntinWidth
    );

    ctx.fillStyle = WINDOW_DECORATION_COLOR;

    // window head
    ctx.fillRect(
      oneThirdCanvasWidth - windowFrameThickness * 2,
      oneHalfCanvasHeight / 2 - windowFrameThickness * 2,
      oneThirdCanvasWidth + windowFrameThickness * 4,
      windowFrameThickness - 1
    );

    // window stool
    const windowSillCornerRadii: CornerRadii = {
      tl: 0,
      tr: 0,
      bl: this.roundedRadius,
      br: this.roundedRadius
    };

    roundedRect(
      ctx,
      oneThirdCanvasWidth - windowFrameThickness * 2,
      (oneHalfCanvasHeight * 3) / 2 + windowFrameThickness + 1,
      oneThirdCanvasWidth + windowFrameThickness * 4,
      windowFrameThickness,
      windowSillCornerRadii
    );

    // trim decoration
    ctx.lineWidth = 2;
    ctx.strokeStyle = WINDOW_DECORATION_COLOR;
    ctx.rect(
      oneThirdCanvasWidth - (windowFrameThickness * 2) / 3,
      oneHalfCanvasHeight / 2 - (windowFrameThickness * 2) / 3,
      oneThirdCanvasWidth + (windowFrameThickness * 4) / 3,
      oneHalfCanvasHeight + (windowFrameThickness * 4) / 3
    );
    ctx.stroke();

    ctx.rect(
      oneThirdCanvasWidth - (windowFrameThickness * 5) / 9,
      oneHalfCanvasHeight / 2 - (windowFrameThickness * 5) / 9,
      oneThirdCanvasWidth + (windowFrameThickness * 10) / 9,
      oneHalfCanvasHeight + (windowFrameThickness * 10) / 9
    );
    ctx.stroke();
  }
}
