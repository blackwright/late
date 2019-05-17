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
    const x = Math.max(
      this.canvasWidth * 0.9,
      (this.canvasWidth * 2) / 3 + this.windowFrameThickness * 12
    );
    const y = this.canvasHeight / 5;
    this.clockCoords = { x, y };
  }

  face() {
    const { ctx, clockSize, clockCoords } = this;
    const { x, y } = clockCoords;

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

    ctx.beginPath();
    ctx.arc(x, y, clockSize / 2, 0, Math.PI * 2, true);
    ctx.fillStyle = CLOCK_INNER_COLOR;
    ctx.fill();

    // markings
    ctx.lineWidth = 2;
    ctx.strokeStyle = CLOCK_HANDS_COLOR;

    ctx.save();
    ctx.translate(x, y);

    for (let i = 1; i <= 60; i++) {
      const angle = (i * Math.PI) / 30;

      const start = {
        x: Math.sin(angle) * (clockSize / 2 - clockSize / 20),
        y: Math.cos(angle) * (clockSize / 2 - clockSize / 20)
      };
      const end = {
        x: Math.sin(angle) * (clockSize / 2 - clockSize / 15),
        y: Math.cos(angle) * (clockSize / 2 - clockSize / 15)
      };

      ctx.beginPath();
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
    }

    ctx.restore();
  }

  hands() {
    const { ctx, clockSize, clockCoords } = this;
    const { x, y } = clockCoords;

    // fill in hands area so we can redraw them
    ctx.beginPath();
    ctx.arc(x, y, clockSize / 2 - clockSize / 15, 0, Math.PI * 2, true);
    ctx.fillStyle = CLOCK_INNER_COLOR;
    ctx.fill();

    ctx.lineWidth = clockSize / 40;
    ctx.lineCap = 'round';
    ctx.strokeStyle = CLOCK_HANDS_COLOR;

    ctx.save();
    ctx.translate(x, y);

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // hour hand
    ctx.save();
    ctx.rotate((Math.PI / 6) * (hours + minutes / 60 + seconds / 3600));
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -clockSize / 4);
    ctx.stroke();
    ctx.restore();

    // minute hand
    ctx.save();
    ctx.rotate((Math.PI / 30) * (minutes + seconds / 60));
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -clockSize / 2.75);
    ctx.stroke();
    ctx.restore();

    // second hand
    ctx.lineWidth = clockSize / 100;
    ctx.save();
    ctx.rotate((Math.PI / 30) * seconds);
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(0, -clockSize / 2.7);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  render() {
    super.render();
    this.face();
    this.hands();
  }

  tick() {
    this.hands();
  }
}
