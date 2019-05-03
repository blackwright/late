const TICKS_TO_FALL = 100;
const RAINDROPS_HEIGHTWISE = 15;
const RAINDROP_COLOR = '#c6f1ff';

class Raindrop {
  private heightPerTick = 0;
  private raindropHeight = 0;

  constructor(
    public x: number,
    public y: number,
    private ctx: CanvasRenderingContext2D,
    private canvasHeight: number
  ) {
    this.heightPerTick = Math.floor(this.canvasHeight / TICKS_TO_FALL);
    this.raindropHeight = Math.floor(this.canvasHeight / RAINDROPS_HEIGHTWISE);
  }

  tick() {
    this.y += Math.floor(this.heightPerTick);
  }

  render() {
    const { ctx } = this;
    ctx.fillStyle = RAINDROP_COLOR;
    ctx.fillRect(this.x, this.y, 1, this.raindropHeight);
  }
}

export class Rainfall {
  private raindrops: Raindrop[] = [];
  private canvasWidth = 0;
  private canvasHeight = 0;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
  }

  tick() {
    const nextRaindrops: Raindrop[] = [];
    const { raindrops, canvasWidth, canvasHeight } = this;

    raindrops.forEach(raindrop => {
      raindrop.tick();

      if (raindrop.x < canvasWidth && raindrop.y < canvasHeight) {
        nextRaindrops.push(raindrop);
      }
    });

    this.raindrops = nextRaindrops;
  }

  add() {
    const { raindrops, ctx, canvasWidth, canvasHeight } = this;
    const startingX = Math.floor(Math.random() * (canvasWidth - 1) + 1);
    const startingY = -canvasHeight / RAINDROPS_HEIGHTWISE;

    raindrops.push(new Raindrop(startingX, startingY, ctx, canvasHeight));
  }

  render() {
    this.raindrops.forEach(raindrop => raindrop.render());
  }
}
