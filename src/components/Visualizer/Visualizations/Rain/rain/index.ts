const TIME_TO_FALL = 300;
const RAINDROPS_HEIGHTWISE = 10;
const RAINDROP_COLOR = '#788';

class Raindrop {
  private createdDate: number;
  public y = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private canvasHeight: number,
    public x: number,
    public height: number
  ) {
    this.createdDate = Date.now();
  }

  tick(now: number) {
    const timeDelta = now - this.createdDate;
    this.y = Math.floor(
      (timeDelta / TIME_TO_FALL) * this.canvasHeight * 0.75 +
        this.canvasHeight * 0.25
    );
  }

  render() {
    const { ctx, x, y, height } = this;

    ctx.strokeStyle = RAINDROP_COLOR;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + height);
    ctx.stroke();
  }
}

export class Rainfall {
  private raindrops: Raindrop[] = [];
  private raindropHeight: number;
  public canvasWidth: number;
  public canvasHeight: number;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.raindropHeight = Math.floor(
      (this.canvasHeight * 0.5) / RAINDROPS_HEIGHTWISE
    );
  }

  tick() {
    const { raindrops, canvasHeight } = this;

    const now = Date.now();

    for (let i = raindrops.length - 1; i >= 0; i--) {
      const raindrop = raindrops[i];
      raindrop.tick(now);

      // remove raindrops that have fallen out of view
      if (raindrop.y >= canvasHeight * 0.75) {
        raindrops.splice(i, 1);
      }
    }
  }

  add() {
    const { ctx, canvasWidth, canvasHeight, raindrops, raindropHeight } = this;

    const startingX = Math.random() * (canvasWidth / 3 - 1) + canvasWidth / 3;

    raindrops.push(new Raindrop(ctx, canvasHeight, startingX, raindropHeight));
  }

  render() {
    this.raindrops.forEach(raindrop => raindrop.render());
  }
}
