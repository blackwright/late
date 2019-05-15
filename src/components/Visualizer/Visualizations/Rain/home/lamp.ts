import { Renderer } from './renderer';

const LAMP_COLOR = '#FCF37E';

export class Lamp extends Renderer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  render() {
    super.render();

    const { ctx, canvasWidth, canvasHeight, windowFrameThickness } = this;

    const lampWidth = windowFrameThickness * 3.5;
    ctx.strokeStyle = LAMP_COLOR;
    ctx.fillStyle = LAMP_COLOR;
    ctx.lineWidth = windowFrameThickness / 5;
    ctx.save();

    const x1 = (canvasWidth * 7) / 11;
    const height1 = canvasHeight / 5;
    ctx.beginPath();
    ctx.moveTo(x1, 0);
    ctx.lineTo(x1, height1);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillRect(
      x1 - windowFrameThickness / 5,
      height1 - 1,
      (windowFrameThickness * 2) / 5,
      windowFrameThickness
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x1 - windowFrameThickness / 5, height1 + windowFrameThickness);
    ctx.lineTo(x1 + windowFrameThickness / 5, height1 + windowFrameThickness);
    ctx.lineTo(x1 + lampWidth / 2, height1 + windowFrameThickness * 3);
    ctx.lineTo(x1 - lampWidth / 2, height1 + windowFrameThickness * 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}
