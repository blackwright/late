import { roundedRect, CornerRadii } from './utils';

const WALL_START_COLOR = '#181623';
const WALL_END_COLOR = '#111019';
const WOOD_COLOR = '#122C2B';
const WOOD_DECORATION_COLOR = '#091c1b';
const WINDOW_FRAME_COLOR = '#3D1A1E';
const WINDOW_DECORATION_COLOR = '#682634';
const WINDOW_FRAME_THICKNESS_DIVISOR = 50;
const CLOCK_INNER_COLOR = '#4B4721';
const CLOCK_HANDS_COLOR = '#192124';
const CLOCK_DECORATION_COLOR = '#06151A';
const LAMP_COLOR = '#FCF37E';

export class Home {
  private canvasWidth = 0;
  private canvasHeight = 0;
  private oneThirdCanvasWidth = 0;
  private oneHalfCanvasHeight = 0;
  private windowFrameThickness = 0;
  private roundedRadius = 0;
  private clockSize = 0;
  private clockCoords: { x: number; y: number } = { x: 0, y: 0 };

  constructor(private ctx: CanvasRenderingContext2D) {
    this.canvasWidth = ctx.canvas.width;
    this.canvasHeight = ctx.canvas.height;
    this.oneThirdCanvasWidth = this.canvasWidth / 3;
    this.oneHalfCanvasHeight = this.canvasHeight / 2;
    this.windowFrameThickness = Math.floor(
      Math.max(this.canvasWidth, this.canvasHeight) /
        WINDOW_FRAME_THICKNESS_DIVISOR
    );
    this.roundedRadius = Math.floor(this.windowFrameThickness / 3);
    this.clockSize = this.windowFrameThickness * 7;
    ctx.save();
  }

  wall() {
    const { ctx, canvasWidth, canvasHeight } = this;

    const linearGradient = this.ctx.createLinearGradient(0, 0, 0, canvasHeight);
    linearGradient.addColorStop(0, WALL_START_COLOR);
    linearGradient.addColorStop(1, WALL_END_COLOR);
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  }

  hole() {
    const { ctx, oneThirdCanvasWidth, oneHalfCanvasHeight } = this;

    ctx.clearRect(
      oneThirdCanvasWidth,
      oneHalfCanvasHeight / 2,
      oneThirdCanvasWidth,
      oneHalfCanvasHeight
    );
  }

  window() {
    const {
      ctx,
      oneThirdCanvasWidth,
      oneHalfCanvasHeight,
      windowFrameThickness
    } = this;

    ctx.fillStyle = WINDOW_FRAME_COLOR;

    // window trim
    ctx.fillRect(
      oneThirdCanvasWidth - windowFrameThickness,
      oneHalfCanvasHeight / 2 - windowFrameThickness,
      oneThirdCanvasWidth + windowFrameThickness * 2,
      oneHalfCanvasHeight + windowFrameThickness * 2
    );

    this.hole();

    // window muntin
    const muntinWidth = Math.floor(windowFrameThickness / 2);

    const topLeftX = (oneThirdCanvasWidth * 4) / 3 - (muntinWidth * 2) / 3;
    const topRightX = (oneThirdCanvasWidth * 5) / 3 - muntinWidth / 3;
    const topY = oneHalfCanvasHeight / 2 - windowFrameThickness;

    const leftX = oneThirdCanvasWidth - windowFrameThickness;
    const leftTopY = (oneHalfCanvasHeight * 5) / 6 - (muntinWidth * 2) / 3;
    const leftBottomY = (oneHalfCanvasHeight * 7) / 6 - muntinWidth / 3;

    ctx.fillRect(
      topLeftX,
      topY,
      muntinWidth,
      oneHalfCanvasHeight + windowFrameThickness * 2
    );

    ctx.fillRect(
      topRightX,
      topY,
      muntinWidth,
      oneHalfCanvasHeight + windowFrameThickness * 2
    );

    ctx.fillRect(
      leftX,
      leftTopY,
      oneThirdCanvasWidth + windowFrameThickness * 2,
      muntinWidth
    );

    ctx.fillRect(
      leftX,
      leftBottomY,
      oneThirdCanvasWidth + windowFrameThickness * 2,
      muntinWidth
    );

    ctx.fillStyle = WINDOW_DECORATION_COLOR;

    // window head
    ctx.fillRect(
      oneThirdCanvasWidth - windowFrameThickness * 2,
      oneHalfCanvasHeight / 2 - windowFrameThickness * 2,
      oneThirdCanvasWidth + windowFrameThickness * 4,
      windowFrameThickness - 1
    );

    // window stool
    const windowSillCornerRadii: CornerRadii = {
      tl: 0,
      tr: 0,
      bl: this.roundedRadius,
      br: this.roundedRadius
    };

    roundedRect(
      ctx,
      oneThirdCanvasWidth - windowFrameThickness * 2,
      (oneHalfCanvasHeight * 3) / 2 + windowFrameThickness + 1,
      oneThirdCanvasWidth + windowFrameThickness * 4,
      windowFrameThickness,
      windowSillCornerRadii
    );

    // trim decoration
    ctx.lineWidth = 2;
    ctx.strokeStyle = WINDOW_DECORATION_COLOR;
    ctx.rect(
      oneThirdCanvasWidth - (windowFrameThickness * 2) / 3,
      oneHalfCanvasHeight / 2 - (windowFrameThickness * 2) / 3,
      oneThirdCanvasWidth + (windowFrameThickness * 4) / 3,
      oneHalfCanvasHeight + (windowFrameThickness * 4) / 3
    );
    ctx.stroke();

    ctx.rect(
      oneThirdCanvasWidth - (windowFrameThickness * 5) / 9,
      oneHalfCanvasHeight / 2 - (windowFrameThickness * 5) / 9,
      oneThirdCanvasWidth + (windowFrameThickness * 10) / 9,
      oneHalfCanvasHeight + (windowFrameThickness * 10) / 9
    );
    ctx.stroke();
  }

  clockFrame() {
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

  clockFace() {
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

  dresser() {
    const { ctx, canvasWidth, canvasHeight, windowFrameThickness } = this;

    const x = (canvasWidth * 2) / 3 + windowFrameThickness * 5;
    const y = (canvasHeight * 2) / 3;

    // dresser body
    ctx.fillStyle = WOOD_COLOR;
    ctx.fillRect(x, y, canvasWidth, canvasHeight);

    // dresser detail rectangle
    ctx.strokeStyle = WOOD_DECORATION_COLOR;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.rect(
      x + windowFrameThickness,
      y + windowFrameThickness,
      canvasWidth,
      canvasHeight
    );
    ctx.stroke();

    // dresser top handle
    const dresserWidth = canvasWidth - (x + windowFrameThickness);
    const dresserHandleMidpoint =
      x + windowFrameThickness + (dresserWidth * 3) / 5;

    ctx.beginPath();
    ctx.moveTo(dresserHandleMidpoint, y + windowFrameThickness * 2.5);
    ctx.lineTo(canvasWidth, y + windowFrameThickness * 2.5);
    ctx.lineWidth = (windowFrameThickness * 2) / 3;
    ctx.stroke();

    // dresser horizontal detail line
    ctx.beginPath();
    ctx.moveTo(x + windowFrameThickness, y + windowFrameThickness * 6);
    ctx.lineTo(canvasWidth, y + windowFrameThickness * 6);
    ctx.lineWidth = 2;
    ctx.stroke();

    // dresser bottom handle
    ctx.beginPath();
    ctx.moveTo(dresserHandleMidpoint, y + windowFrameThickness * 7.5);
    ctx.lineTo(canvasWidth, y + windowFrameThickness * 7.5);
    ctx.lineWidth = (windowFrameThickness * 2) / 3;
    ctx.stroke();
  }

  pictureFrames() {
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

  table() {
    const {
      ctx,
      windowFrameThickness,
      canvasHeight,
      oneThirdCanvasWidth,
      roundedRadius
    } = this;

    // table top
    const width = oneThirdCanvasWidth * 1.1;
    const y = (canvasHeight * 5) / 6;
    const thickness = windowFrameThickness * 1.35;

    const tableCornerRadii: CornerRadii = {
      tl: 0,
      tr: roundedRadius,
      br: 0,
      bl: 0
    };

    ctx.fillStyle = WOOD_COLOR;
    roundedRect(ctx, 0, y, width, thickness, tableCornerRadii);

    // table leg
    ctx.strokeStyle = WOOD_COLOR;
    ctx.lineWidth = windowFrameThickness * 2;
    ctx.beginPath();
    ctx.moveTo((oneThirdCanvasWidth * 2) / 3, y);
    ctx.lineTo((oneThirdCanvasWidth * 2) / 3, canvasHeight);
    ctx.stroke();

    // decoration
    ctx.fillStyle = CLOCK_DECORATION_COLOR;
    ctx.beginPath();
    ctx.rect(
      0,
      y + thickness - windowFrameThickness / 4,
      width,
      windowFrameThickness / 4
    );
    ctx.fill();
  }

  hangingLamp() {
    const { ctx, canvasWidth, canvasHeight, windowFrameThickness } = this;

    const lampWidth = windowFrameThickness * 3.5;
    ctx.strokeStyle = LAMP_COLOR;
    ctx.fillStyle = LAMP_COLOR;
    ctx.lineWidth = windowFrameThickness / 5;
    ctx.save();

    const x1 = (canvasWidth * 7) / 11;
    const height1 = canvasHeight / 5;
    ctx.beginPath();
    ctx.moveTo(x1, 0);
    ctx.lineTo(x1, height1);
    ctx.stroke();

    ctx.lineWidth = 1;
    ctx.fillRect(
      x1 - windowFrameThickness / 5,
      height1 - 1,
      (windowFrameThickness * 2) / 5,
      windowFrameThickness
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x1 - windowFrameThickness / 5, height1 + windowFrameThickness);
    ctx.lineTo(x1 + windowFrameThickness / 5, height1 + windowFrameThickness);
    ctx.lineTo(x1 + lampWidth / 2, height1 + windowFrameThickness * 3);
    ctx.lineTo(x1 - lampWidth / 2, height1 + windowFrameThickness * 3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  render() {
    this.wall();
    this.window();
    this.clockFrame();
    this.clockFace();
    this.dresser();
    this.pictureFrames();
    this.table();
    this.hangingLamp();
  }
}
