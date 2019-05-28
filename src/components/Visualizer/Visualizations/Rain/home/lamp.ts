import { Renderer } from '../renderer';
import { radiansBetween } from '../utils';

const STEM_COLOR = '#8e8e8e';
const LIGHT_COLOR = 'rgba(252, 243, 126, 0.085)';

type ShadeCoords = { x: number; y: number };

export class Lamp extends Renderer {
  private stemX: number;
  private stemHeight: number;
  private lampWidth: number;
  private shadeTopLeft: ShadeCoords;
  private shadeTopRight: ShadeCoords;
  private shadeBottomRight: ShadeCoords;
  private shadeBottomLeft: ShadeCoords;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    const { canvasWidth, canvasHeight, windowFrameThickness } = this;

    this.stemX = (canvasWidth * 7) / 11;
    this.stemHeight = canvasHeight / 5;
    this.lampWidth = windowFrameThickness * 3.5;

    this.shadeTopLeft = {
      x: this.stemX - windowFrameThickness / 5,
      y: this.stemHeight + windowFrameThickness
    };
    this.shadeTopRight = {
      x: this.stemX + windowFrameThickness / 5,
      y: this.stemHeight + windowFrameThickness
    };
    this.shadeBottomRight = {
      x: this.stemX + this.lampWidth / 2,
      y: this.stemHeight + windowFrameThickness * 3
    };
    this.shadeBottomLeft = {
      x: this.stemX - this.lampWidth / 2,
      y: this.stemHeight + windowFrameThickness * 3
    };
  }

  stem() {
    const { ctx, windowFrameThickness, stemX, stemHeight } = this;

    ctx.strokeStyle = STEM_COLOR;
    ctx.fillStyle = STEM_COLOR;
    ctx.lineWidth = windowFrameThickness / 5;

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
  }

  lampshade() {
    const {
      ctx,
      shadeTopLeft,
      shadeTopRight,
      shadeBottomRight,
      shadeBottomLeft
    } = this;

    ctx.beginPath();
    ctx.moveTo(shadeTopLeft.x, shadeTopLeft.y);
    ctx.lineTo(shadeTopRight.x, shadeTopRight.y);
    ctx.lineTo(shadeBottomRight.x, shadeBottomRight.y);
    ctx.lineTo(shadeBottomLeft.x, shadeBottomLeft.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  light() {
    const {
      ctx,
      canvasHeight,
      windowFrameThickness,
      stemX,
      stemHeight,
      lampWidth,
      shadeTopLeft,
      shadeBottomRight,
      shadeBottomLeft
    } = this;

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

    const lightBottomLeftX = shadeBottomLeft.x - lightTriangleAdjacentWidth;
    const lightBottomRightX = shadeBottomRight.x + lightTriangleAdjacentWidth;

    ctx.beginPath();
    ctx.moveTo(stemX - lampWidth / 2, stemHeight + windowFrameThickness * 3);
    ctx.lineTo(stemX + lampWidth / 2, stemHeight + windowFrameThickness * 3);
    ctx.lineTo(lightBottomRightX, canvasHeight);
    ctx.lineTo(lightBottomLeftX, canvasHeight);
    ctx.fill();
  }

  render() {
    super.render();

    this.stem();
    this.lampshade();
    this.tick();
  }

  tick() {
    const {
      ctx,
      canvasWidth,
      canvasHeight,
      windowFrameThickness,
      stemHeight
    } = this;

    ctx.clearRect(
      0,
      stemHeight + windowFrameThickness * 3,
      canvasWidth,
      canvasHeight
    );

    this.light();
  }
}
