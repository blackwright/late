import { Renderer } from './renderer';
import { Wall } from './wall';
import { Window } from './window';
import { Dresser } from './dresser';
import { Pictures } from './pictures';
import { Table } from './table';
import { Clock } from './clock';
import { Lamp } from './lamp';

export { Cat } from './cat';

export class Home extends Renderer {
  wall: Wall;
  window: Window;
  dresser: Dresser;
  pictures: Pictures;
  table: Table;
  clock: Clock;
  lamp: Lamp;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    this.wall = new Wall(ctx);
    this.window = new Window(ctx);
    this.dresser = new Dresser(ctx);
    this.pictures = new Pictures(ctx);
    this.table = new Table(ctx);
    this.clock = new Clock(ctx);
    this.lamp = new Lamp(ctx);
  }

  render() {
    this.wall.render();
    this.window.render();
    this.dresser.render();
    this.pictures.render();
    this.table.render();
    this.clock.render();
    this.lamp.render();
  }
}
