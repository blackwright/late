const TIME_TO_FALL = 400;
const RAINDROPS_HEIGHTWISE = 15;
const RAINDROP_COLOR = '#161B1D';

class Raindrop {
  private raindropHeight = 0;
  private createdDate = 0;

  constructor(
    public x: number,
    public y: number,
    private ctx: CanvasRenderingContext2D,
    private canvasHeight: number
  ) {
    this.raindropHeight = Math.floor(this.canvasHeight / RAINDROPS_HEIGHTWISE);
    this.createdDate = Date.now();
  }

  tick(now: number) {
    const timeDelta = now - this.createdDate;
    this.y = Math.floor((timeDelta / TIME_TO_FALL) * this.canvasHeight);
  }

  render() {
    const { ctx } = this;
    ctx.fillStyle = RAINDROP_COLOR;
    ctx.fillRect(this.x, this.y, 1, this.raindropHeight);
  }
}

export class Rainfall {
  private raindrops: Raindrop[] = [];
  public canvasWidth = 0;
  public canvasHeight = 0;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
  }

  tick() {
    const nextRaindrops: Raindrop[] = [];
    const { raindrops, canvasHeight } = this;
    const now = Date.now();

    raindrops.forEach(raindrop => {
      raindrop.tick(now);

      if (raindrop.y < canvasHeight) {
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
