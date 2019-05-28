import { Renderer } from '../renderer';

const WOOD_COLOR = '#122C2B';
const WOOD_DECORATION_COLOR = '#091c1b';
const STEREO_COLOR = '#222';
const STEREO_DETAIL_COLOR = '#444';
const STEREO_DARK_COLOR = '#111';

export class Dresser extends Renderer {
  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);
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

  stereo() {
    const { ctx, canvasWidth, canvasHeight, windowFrameThickness } = this;

    const dresserX = (canvasWidth * 2) / 3 + windowFrameThickness * 5;
    const dresserY = (canvasHeight * 2) / 3;

    // speaker body
    const speakerWidth = windowFrameThickness * 3.5;
    const speakerHeight = canvasHeight * 0.2;
    const speakerX = dresserX + windowFrameThickness * 4;
    const speakerY = dresserY - speakerHeight;

    ctx.fillStyle = STEREO_COLOR;
    ctx.fillRect(speakerX, speakerY, speakerWidth, speakerHeight);

    // mid driver
    const driverRadius = Math.min(speakerWidth, speakerHeight) / 8;
    const driverCenterX = speakerX + speakerWidth / 2;
    const driverCenterY = speakerY + driverRadius * 2;

    ctx.fillStyle = STEREO_DARK_COLOR;
    ctx.beginPath();
    ctx.arc(driverCenterX, driverCenterY, driverRadius, 0, Math.PI * 2);
    ctx.fill();

    // dividers
    const dividerWidth = windowFrameThickness / 10;
    ctx.fillStyle = STEREO_DARK_COLOR;

    ctx.fillRect(
      speakerX - dividerWidth,
      speakerY,
      dividerWidth,
      speakerHeight
    );

    ctx.fillRect(
      speakerX + speakerWidth,
      speakerY,
      dividerWidth,
      speakerHeight
    );

    // deck
    const deckX = speakerX + speakerWidth + dividerWidth;
    const deckHeight = speakerHeight * 0.8;
    const deckY = speakerY + speakerHeight - deckHeight;

    ctx.fillStyle = STEREO_COLOR;
    ctx.fillRect(deckX, deckY, canvasWidth, deckHeight);

    const deckDetailX = deckX + windowFrameThickness / 2;

    ctx.fillStyle = STEREO_DETAIL_COLOR;
    ctx.strokeStyle = STEREO_DARK_COLOR;
    ctx.lineWidth = windowFrameThickness / 8;
    ctx.beginPath();
    ctx.rect(
      deckDetailX,
      deckY + windowFrameThickness * 1.5,
      canvasWidth,
      deckHeight * 0.25
    );
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = STEREO_DARK_COLOR;
    ctx.fillRect(
      deckDetailX,
      deckY + windowFrameThickness,
      canvasWidth,
      windowFrameThickness / 4
    );

    const bottomDetailY = deckY + deckHeight - windowFrameThickness * 0.8;
    ctx.fillRect(
      deckX + windowFrameThickness * 2,
      bottomDetailY,
      canvasWidth,
      windowFrameThickness / 4
    );

    ctx.fillStyle = STEREO_DETAIL_COLOR;
    const knobRadius = windowFrameThickness / 2;
    const knobX = deckX + windowFrameThickness;
    const knobY = bottomDetailY + windowFrameThickness / 8;
    ctx.beginPath();
    ctx.arc(knobX, knobY, knobRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.clip();
    ctx.save();

    ctx.translate(knobX, knobY);
    const knobMarkerAngle = Math.PI * 0.75;
    const knobMarkerStart = {
      x: Math.sin(knobMarkerAngle) * (knobRadius - windowFrameThickness / 4),
      y: Math.cos(knobMarkerAngle) * (knobRadius - windowFrameThickness / 4)
    };
    const knobMarkerEnd = {
      x: Math.sin(knobMarkerAngle) * knobRadius * 2,
      y: Math.cos(knobMarkerAngle) * knobRadius * 2
    };
    ctx.lineWidth = windowFrameThickness / 8;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(knobMarkerStart.x, knobMarkerStart.y);
    ctx.lineTo(knobMarkerEnd.x, knobMarkerEnd.y);
    ctx.stroke();
    ctx.restore();

    ctx.restore();
  }

  render() {
    super.render();

    this.dresser();
    this.stereo();
    this.tick();
  }

  tick(isBeat = false) {
    const { ctx, canvasWidth, canvasHeight, windowFrameThickness } = this;

    const dresserX = (canvasWidth * 2) / 3 + windowFrameThickness * 5;
    const dresserY = (canvasHeight * 2) / 3;

    // speaker body
    const speakerWidth = windowFrameThickness * 3.5;
    const speakerHeight = canvasHeight * 0.2;
    const speakerX = dresserX + windowFrameThickness * 4;
    const speakerY = dresserY - speakerHeight;

    // mid driver
    const driverRadius = Math.min(speakerWidth, speakerHeight) / 8;
    const driverCenterX = speakerX + speakerWidth / 2;

    // speaker woofer
    const wooferRadius = Math.min(speakerWidth, speakerHeight) / 2.5;
    const wooferCenterY = Math.max(
      speakerY + wooferRadius + driverRadius * 4,
      speakerY + speakerHeight - (wooferRadius + driverRadius * 2)
    );

    ctx.strokeStyle = STEREO_DETAIL_COLOR;
    ctx.fillStyle = STEREO_COLOR;
    ctx.lineWidth = windowFrameThickness / 8;
    ctx.beginPath();
    ctx.arc(driverCenterX, wooferCenterY, wooferRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = STEREO_DARK_COLOR;
    ctx.beginPath();
    ctx.arc(
      driverCenterX,
      wooferCenterY,
      isBeat ? wooferRadius * 0.63 : wooferRadius * 0.6,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
