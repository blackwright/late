import { Renderer } from './renderer';
import { roundedRect, CornerRadii } from '../utils';

const WOOD_COLOR = '#122C2B';
const TABLE_DECORATION_COLOR = '#06151A';
const BOWL_COLOR = '#3e3e3e';
const FRUIT_COLORS = ['#564837', '#713C3A'];
const FRUIT_STEM_COLOR = '#04070F';

export class Table extends Renderer {
  y: number;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    this.y = (this.canvasHeight * 5) / 6;
  }

  top() {
    const {
      ctx,
      y,
      windowFrameThickness,
      oneThirdCanvasWidth,
      roundedRadius
    } = this;

    const width = oneThirdCanvasWidth * 0.8;
    const thickness = windowFrameThickness * 1.35;

    const tableCornerRadii: CornerRadii = {
      tl: 0,
      tr: roundedRadius,
      br: 0,
      bl: 0
    };

    ctx.fillStyle = WOOD_COLOR;
    roundedRect(ctx, 0, y, width, thickness, tableCornerRadii);

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

  leg() {
    const {
      ctx,
      y,
      windowFrameThickness,
      canvasHeight,
      oneThirdCanvasWidth
    } = this;

    ctx.strokeStyle = WOOD_COLOR;
    ctx.lineWidth = windowFrameThickness * 1.5;
    ctx.beginPath();
    ctx.moveTo(oneThirdCanvasWidth * 0.6, y);
    ctx.lineTo(oneThirdCanvasWidth * 0.6, canvasHeight);
    ctx.stroke();
  }

  centerpiece() {
    const {
      ctx,
      y,
      windowFrameThickness,
      canvasWidth,
      oneThirdCanvasWidth
    } = this;

    const bowlCenterX = oneThirdCanvasWidth * 0.25;
    const bowlWidth = oneThirdCanvasWidth * 0.3;
    const bowlHeight = windowFrameThickness * 2;

    // fruit
    const fruits = [
      {
        xOffset: (bowlWidth - bowlWidth * 0.4) / 4,
        y: y - bowlHeight,
        radius: bowlWidth * 0.2,
        color: FRUIT_COLORS[0],
        stemAngle: Math.PI * 0.9
      },
      {
        xOffset: -(bowlWidth - bowlWidth * 0.4) / 4,
        y: y - bowlHeight + bowlHeight / 8,
        radius: bowlWidth * 0.2,
        color: FRUIT_COLORS[1],
        stemAngle: Math.PI * 1.1
      }
    ];

    for (const fruit of fruits) {
      ctx.fillStyle = fruit.color;
      ctx.beginPath();
      ctx.arc(
        bowlCenterX + fruit.xOffset,
        fruit.y,
        fruit.radius,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.strokeStyle = FRUIT_STEM_COLOR;
    ctx.lineCap = 'round';
    ctx.lineWidth = 2;

    for (const fruit of fruits) {
      ctx.save();
      ctx.translate(bowlCenterX + fruit.xOffset, fruit.y);
      const stemStart = {
        x: Math.sin(fruit.stemAngle) * fruits[1].radius * 0.9,
        y: Math.cos(fruit.stemAngle) * fruits[1].radius * 0.9
      };
      const stemEnd = {
        x: Math.sin(fruit.stemAngle) * fruits[1].radius * 1.1,
        y: Math.cos(fruit.stemAngle) * fruits[1].radius * 1.1
      };
      ctx.beginPath();
      ctx.moveTo(stemStart.x, stemStart.y);
      ctx.lineTo(stemEnd.x, stemEnd.y);
      ctx.stroke();
      ctx.restore();
    }

    // bowl
    const bowlCornerRadii: CornerRadii = {
      tl: 0,
      tr: 0,
      br: oneThirdCanvasWidth * 0.1,
      bl: oneThirdCanvasWidth * 0.1
    };

    ctx.fillStyle = BOWL_COLOR;
    roundedRect(
      ctx,
      bowlCenterX - bowlWidth / 2,
      y - bowlHeight,
      bowlWidth,
      bowlHeight,
      bowlCornerRadii
    );

    ctx.save();
    ctx.clip();
    ctx.lineWidth = 2;
    ctx.strokeStyle = TABLE_DECORATION_COLOR;
    const bowlDecorationY = y - bowlHeight + bowlHeight / 6;
    ctx.beginPath();
    ctx.moveTo(0, bowlDecorationY);
    ctx.lineTo(canvasWidth, bowlDecorationY);
    ctx.stroke();
    ctx.restore();
  }

  render() {
    super.render();

    this.leg();
    this.top();
    this.centerpiece();
  }
}
