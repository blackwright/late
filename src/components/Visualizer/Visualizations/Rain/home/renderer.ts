const WINDOW_FRAME_THICKNESS_DIVISOR = 50;

export abstract class Renderer {
  protected canvasWidth: number;
  protected canvasHeight: number;
  protected oneThirdCanvasWidth: number;
  protected oneHalfCanvasHeight: number;
  protected windowFrameThickness: number;
  protected roundedRadius: number;

  constructor(protected ctx: CanvasRenderingContext2D) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.oneThirdCanvasWidth = this.canvasWidth / 3;
    this.oneHalfCanvasHeight = this.canvasHeight / 2;
    this.windowFrameThickness = Math.floor(
      Math.max(this.canvasWidth, this.canvasHeight) /
        WINDOW_FRAME_THICKNESS_DIVISOR
    );
    this.roundedRadius = Math.floor(this.windowFrameThickness / 3);
    ctx.save();
  }

  // for initial paint - subclasses should call super.render()
  render(): void {
    this.ctx.restore();
  }

  // for animation
  tick(): void {}
}
