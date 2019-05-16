import { Renderer } from './renderer';
import { radiansBetween } from '../utils';

const STEM_COLOR = '#8e8e8e';
const LIGHT_COLOR = 'rgba(252, 243, 126, 0.15)';

export class Lamp extends Renderer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  render() {
    super.render();

    const { ctx, canvasWidth, canvasHeight, windowFrameThickness } = this;

    // stem
    const lampWidth = windowFrameThickness * 3.5;
    ctx.strokeStyle = STEM_COLOR;
    ctx.fillStyle = STEM_COLOR;
    ctx.lineWidth = windowFrameThickness / 5;
    ctx.save();

    const stemX = (canvasWidth * 7) / 11;
    const stemHeight = canvasHeight / 5;
    ctx.beginPath();
    ctx.moveTo(stemX, 0);
    ctx.lineTo(stemX, stemHeight);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillRect(
      stemX - windowFrameThickness / 5,
      stemHeight - 1,
      (windowFrameThickness * 2) / 5,
      windowFrameThickness
    );
    ctx.stroke();

    // lampshade
    const shadeTopLeft = {
      x: stemX - windowFrameThickness / 5,
      y: stemHeight + windowFrameThickness
    };
    const shadeTopRight = {
      x: stemX + windowFrameThickness / 5,
      y: stemHeight + windowFrameThickness
    };
    const shadeBottomRight = {
      x: stemX + lampWidth / 2,
      y: stemHeight + windowFrameThickness * 3
    };
    const shadeBottomLeft = {
      x: stemX - lampWidth / 2,
      y: stemHeight + windowFrameThickness * 3
    };

    ctx.beginPath();
    ctx.moveTo(shadeTopLeft.x, shadeTopLeft.y);
    ctx.lineTo(shadeTopRight.x, shadeTopRight.y);
    ctx.lineTo(shadeBottomRight.x, shadeBottomRight.y);
    ctx.lineTo(shadeBottomLeft.x, shadeBottomLeft.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // light
    ctx.fillStyle = LIGHT_COLOR;
    const lightHeight = canvasHeight - shadeBottomLeft.y;
    // compensate for inverted canvas y-coords when
    // getting angle between lampshade corners
    const lightAngle = radiansBetween(shadeBottomLeft, {
      x: shadeTopLeft.x,
      y: shadeBottomLeft.y + shadeBottomLeft.y - shadeTopLeft.y
    });

    // light makes a right triangle with bottom of canvas so
    // we can calculate its adjacent width using height and
    // the angle of the lampshade
    // tan θ = opposite (height) / adjacent (width)
    const lightTriangleAdjacentWidth = lightHeight / Math.tan(lightAngle);
    console.log('lightTriangleAdjacentWidth', lightTriangleAdjacentWidth);

    const lightBottomLeftX = shadeBottomLeft.x - lightTriangleAdjacentWidth;
    const lightBottomRightX = shadeBottomRight.x + lightTriangleAdjacentWidth;

    ctx.beginPath();
    ctx.moveTo(stemX - lampWidth / 2, stemHeight + windowFrameThickness * 3);
    ctx.lineTo(stemX + lampWidth / 2, stemHeight + windowFrameThickness * 3);
    ctx.lineTo(lightBottomRightX, canvasHeight);
    ctx.lineTo(lightBottomLeftX, canvasHeight);
    ctx.fill();
  }
}
