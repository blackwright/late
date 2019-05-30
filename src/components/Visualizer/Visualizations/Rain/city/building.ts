import { randomNumberBetween } from '../../../../../utils';

const LIGHT_COLOR = 'rgb(255, 255, 255)';
const MIN_LIGHT_HEIGHT_RATIO = 0.01;
const MAX_LIGHT_HEIGHT_RATIO = 0.025;
const MIN_LIGHTS_PER_FLOOR = 3;
const MAX_LIGHTS_PER_FLOOR = 10;
const MIN_GAP_WIDTH_RATIO = 0.01;
const MAX_GAP_WIDTH_RATIO = 0.05;
const MIN_LIGHT_PADDING_RATIO = 0.01;
const MAX_LIGHT_PADDING_RATIO = 0.03;
const MIN_BUILDING_X_PADDING_RATIO = 0.05;
const MAX_BUILDING_X_PADDING_RATIO = 0.1;

export type BuildingBlueprint = {
  ctx: CanvasRenderingContext2D;
  canvasHeight: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

type Light = {
  x: number;
  y: number;
  width: number;
  height: number;
  isOn: boolean;
};

export class Building {
  private ctx: CanvasRenderingContext2D;
  private canvasHeight: number;

  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public color: string;
  public lights: Light[] = [];

  constructor(blueprint: BuildingBlueprint) {
    this.ctx = blueprint.ctx;
    this.canvasHeight = blueprint.canvasHeight;
    this.x = blueprint.x;
    this.y = blueprint.y;
    this.width = blueprint.width;
    this.height = blueprint.height;
    this.color = blueprint.color;
  }

  // called externally so that buildings may be
  // repositioned before light positions are determined
  generateLights() {
    const { canvasHeight, width, height } = this;

    const lightHeight =
      randomNumberBetween(MIN_LIGHT_HEIGHT_RATIO, MAX_LIGHT_HEIGHT_RATIO) *
      height;

    const lightPadding =
      randomNumberBetween(MIN_LIGHT_PADDING_RATIO, MAX_LIGHT_PADDING_RATIO) *
      height;

    const lightsPerFloor = randomNumberBetween(
      MIN_LIGHTS_PER_FLOOR,
      MAX_LIGHTS_PER_FLOOR
    );

    const buildingXPadding =
      randomNumberBetween(
        MIN_BUILDING_X_PADDING_RATIO,
        MAX_BUILDING_X_PADDING_RATIO
      ) * width;

    const gapWidth =
      randomNumberBetween(MIN_GAP_WIDTH_RATIO, MAX_GAP_WIDTH_RATIO) * width;

    const lightWidth =
      (this.width - buildingXPadding * 2 - gapWidth * (lightsPerFloor - 1)) /
      lightsPerFloor;

    const lights: Light[] = [];
    let x = this.x + buildingXPadding;
    let y = this.y + lightPadding;

    while (y < canvasHeight * 0.98) {
      // each iteration generates a row of lights for the floor
      if (x >= this.x + this.width - buildingXPadding) {
        // start a new floor
        x = this.x + buildingXPadding;
        y += lightHeight + lightPadding;
      } else {
        lights.push({
          x,
          y,
          width: lightWidth,
          height: lightHeight,
          isOn: Math.random() > 0.4
        });

        x += lightWidth + gapWidth;
      }
    }

    this.lights = lights;
  }

  render() {
    const { ctx, x, y, width, height, color } = this;
    ctx.save();

    // render building
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);

    // render lights
    ctx.fillStyle = LIGHT_COLOR;
    for (const light of this.lights) {
      if (light.isOn) {
        ctx.fillRect(light.x, light.y, light.width, light.height);
      }
    }

    ctx.restore();
  }
}
