import { Renderer } from './renderer';

const WOOD_COLOR = '#122C2B';

export class Pictures extends Renderer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
  }

  render() {
    super.render();

    const { ctx, oneThirdCanvasWidth, windowFrameThickness } = this;

    const x1 = (oneThirdCanvasWidth * 3) / 4 - windowFrameThickness * 4;
    const y1 = -windowFrameThickness;
    const width1 = windowFrameThickness * 4;
    const height1 = windowFrameThickness * 5;

    ctx.beginPath();
    ctx.rect(x1, y1, width1, height1);
    ctx.strokeStyle = WOOD_COLOR;
    const gradient1 = ctx.createLinearGradient(x1, y1, x1, y1 + height1);
    gradient1.addColorStop(0, '#52A3CC');
    gradient1.addColorStop(1, '#7EA1E5');
    ctx.fillStyle = gradient1;
    ctx.fill();
    ctx.stroke();

    const x2 = x1 - windowFrameThickness * 7;
    const y2 = windowFrameThickness * 2;
    const width2 = windowFrameThickness * 5;
    const height2 = windowFrameThickness * 4;

    ctx.beginPath();
    ctx.rect(x2, y2, width2, height2);
    const gradient2 = ctx.createLinearGradient(x2, y2, x2 + width2, y2);
    gradient2.addColorStop(0, '#F2E9C2');
    gradient2.addColorStop(1, '#EFCA58');
    ctx.fillStyle = gradient2;
    ctx.strokeStyle = '#465C7A';
    ctx.fill();
    ctx.stroke();

    const x3 = x2 + windowFrameThickness * 2;
    const y3 = y2 + height2 + windowFrameThickness * 1.5;
    const width3 = windowFrameThickness * 6;
    const height3 = windowFrameThickness * 10;

    // picture 3 - mountain

    // background
    ctx.beginPath();
    ctx.rect(x3, y3, width3, height3);
    const gradient3 = ctx.createLinearGradient(x3, y3, x3, y3 + height3);
    gradient3.addColorStop(0, '#09325E');
    gradient3.addColorStop(0.75, '#2A2A47');
    ctx.fillStyle = gradient3;
    ctx.clip();
    ctx.fill();

    // sky
    ctx.fillStyle = '#F5E7F8';
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
      const starX = Math.floor(Math.random() * width3 + x3);
      const starY = Math.floor(Math.random() * height3 + y3);
      const radius = Math.floor(Math.random() * 2 + 1);
      ctx.beginPath();
      ctx.arc(starX, starY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    ctx.strokeStyle = '#0D0B21';
    ctx.lineWidth = windowFrameThickness / 3;
    ctx.beginPath();
    ctx.rect(x3, y3, width3, height3);
    ctx.stroke();

    ctx.restore();
  }
}
