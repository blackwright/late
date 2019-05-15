import { Renderer } from './renderer';

const WALL_START_COLOR = '#181623';
const WALL_END_COLOR = '#111019';

export class Wall extends Renderer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  render() {
    super.render();

    const { ctx, canvasWidth, canvasHeight } = this;

    const linearGradient = this.ctx.createLinearGradient(0, 0, 0, canvasHeight);
    linearGradient.addColorStop(0, WALL_START_COLOR);
    linearGradient.addColorStop(1, WALL_END_COLOR);
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }
}
