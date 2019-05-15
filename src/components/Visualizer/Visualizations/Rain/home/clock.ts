import { Renderer } from './renderer';

const WOOD_COLOR = '#122C2B';
const CLOCK_INNER_COLOR = '#4B4721';
const CLOCK_HANDS_COLOR = '#192124';
const CLOCK_DECORATION_COLOR = '#06151A';

export class Clock extends Renderer {
  private clockSize = 0;
  private clockCoords: { x: number; y: number } = { x: 0, y: 0 };

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
    this.clockSize = this.windowFrameThickness * 7;
  }

  frame() {
    const { ctx, clockSize } = this;

    const x = (this.canvasWidth * 2) / 3 + this.windowFrameThickness * 10;
    const y = this.canvasHeight / 5;
    this.clockCoords = { x, y };
    ctx.strokeStyle = WOOD_COLOR;

    // clock frame
    ctx.lineWidth = this.windowFrameThickness / 2;
    ctx.beginPath();
    ctx.arc(x, y, clockSize / 1.75, 0, Math.PI * 2, true);
    ctx.stroke();

    ctx.strokeStyle = CLOCK_DECORATION_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, clockSize / 2, 0, Math.PI * 2, true);
    ctx.stroke();
  }

  face() {
    const { ctx, clockSize, clockCoords } = this;
    const { x, y } = clockCoords;
    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, clockSize / 2, 0, Math.PI * 2, true);
    ctx.fillStyle = CLOCK_INNER_COLOR;
    ctx.fill();

    // clock hands
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.strokeStyle = CLOCK_HANDS_COLOR;
    ctx.translate(x, y);
    ctx.save();

    // hour hand
    ctx.rotate((Math.PI / 6) * (hours + minutes / 60 + seconds / 3600));
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -clockSize / 3);
    ctx.stroke();
    ctx.restore();
    ctx.save();

    // minute hand
    ctx.rotate((Math.PI / 30) * (minutes + seconds / 60));
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -clockSize / 2.5);
    ctx.stroke();
    ctx.restore();
    ctx.save();

    // second hand
    ctx.lineWidth = 5;
    ctx.rotate((Math.PI / 30) * seconds);
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -clockSize / 2.5);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  render() {
    super.render();
    this.frame();
    this.face();
  }

  tick() {
    this.face();
  }
}
