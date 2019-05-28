import { Renderer } from '../renderer';
import { distanceBetween } from '../utils';

const WOOD_COLOR = '#122C2B';

type Picture = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export class Pictures extends Renderer {
  pictures: Picture[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    const { oneThirdCanvasWidth, windowFrameThickness } = this;

    // X & Y coords and dimensions for each picture
    this.pictures.push({
      x: (oneThirdCanvasWidth * 3) / 4 - windowFrameThickness * 4,
      y: -windowFrameThickness,
      width: windowFrameThickness * 4,
      height: windowFrameThickness * 5
    });

    this.pictures.push({
      x: this.pictures[0].x - windowFrameThickness * 7,
      y: windowFrameThickness * 2,
      width: windowFrameThickness * 5,
      height: windowFrameThickness * 4
    });

    this.pictures.push({
      x: this.pictures[1].x + windowFrameThickness * 2,
      y:
        this.pictures[1].y +
        this.pictures[1].height +
        windowFrameThickness * 1.5,
      width: windowFrameThickness * 6,
      height: windowFrameThickness * 8
    });
  }

  graph() {
    const { ctx, windowFrameThickness } = this;
    const { x, y, width, height } = this.pictures[0];

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    const gradient1 = ctx.createLinearGradient(x, y, x, y + height);
    gradient1.addColorStop(0, '#24131f');
    gradient1.addColorStop(1, '#051b1f');
    ctx.fillStyle = gradient1;
    ctx.clip();
    ctx.fill();

    const nodes: Array<{ x: number; y: number }> = [];
    const nodeSize = windowFrameThickness / 6;

    for (let i = 0; i < 20; i++) {
      nodes.push({
        x: Math.floor(Math.random() * width + x),
        y: Math.floor(Math.random() * height + y)
      });
    }

    const nodeColor = '#703c3a';
    ctx.fillStyle = nodeColor;
    ctx.strokeStyle = nodeColor;
    ctx.lineWidth = 1;

    while (nodes.length) {
      const currentNode = nodes.pop()!;
      ctx.beginPath();
      ctx.arc(currentNode.x, currentNode.y, nodeSize / 2, 0, Math.PI * 2);
      ctx.fill();

      for (const otherNode of nodes) {
        if (distanceBetween(currentNode, otherNode) < height / 4) {
          ctx.beginPath();
          ctx.moveTo(currentNode.x, currentNode.y);
          ctx.lineTo(otherNode.x, otherNode.y);
          ctx.stroke();
        }
      }
    }

    ctx.strokeStyle = WOOD_COLOR;
    ctx.lineWidth = windowFrameThickness / 1.5;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();

    ctx.restore();
  }

  orbits() {
    const { ctx, windowFrameThickness } = this;
    const { x, y, width, height } = this.pictures[1];

    ctx.beginPath();
    ctx.rect(x, y, width, height);
    const gradient2 = ctx.createLinearGradient(x, y, x, y + height);
    gradient2.addColorStop(0, '#556e53');
    gradient2.addColorStop(1, '#29435c');
    ctx.fillStyle = gradient2;
    ctx.clip();
    ctx.fill();

    // sun
    const color = '#879591';
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(x + width / 2, y + height / 2, height / 14, 0, Math.PI * 2);
    ctx.fill();

    // orbits
    for (
      let radius = Math.floor(height / 6);
      radius <= height / 2;
      radius += windowFrameThickness / 4
    ) {
      ctx.beginPath();
      ctx.arc(x + width / 2, y + height / 2, radius, 0, Math.PI * 2);
      ctx.stroke();

      const randomAngle = Math.random() * Math.PI * 2;
      const planetX = x + width / 2 + Math.cos(randomAngle) * radius;
      const planetY = y + height / 2 + Math.sin(randomAngle) * radius;
      const randomRadius = Math.random() * (width / 64) + width / 192;
      ctx.beginPath();
      ctx.arc(planetX, planetY, randomRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = '#152a38';
    ctx.lineWidth = windowFrameThickness / 1.2;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();

    ctx.restore();
  }

  stars() {
    const { ctx, windowFrameThickness } = this;
    const { x, y, width, height } = this.pictures[2];

    // background
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    const gradient3 = ctx.createLinearGradient(x, y, x, y + height);
    gradient3.addColorStop(0, '#09325E');
    gradient3.addColorStop(0.75, '#2A2A47');
    ctx.fillStyle = gradient3;
    ctx.clip();
    ctx.fill();

    // sky
    ctx.fillStyle = '#F5E7F8';
    const starCount = 60;

    for (let i = 0; i < starCount; i++) {
      const starX = Math.floor(Math.random() * width + x);
      const starY = Math.floor(Math.random() * height + y);
      const radius = Math.floor(Math.random() * 2 + 1);
      ctx.beginPath();
      ctx.arc(starX, starY, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    ctx.strokeStyle = '#0D0B21';
    ctx.lineWidth = windowFrameThickness / 3;
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.stroke();

    ctx.restore();
  }

  render() {
    super.render();

    this.graph();
    this.orbits();
    this.stars();
  }
}
