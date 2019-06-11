import { Renderer } from '../renderer';
import { Wall } from './wall';
import { Window } from './window';
import { Dresser } from './dresser';
import { Pictures } from './pictures';
import { Table } from './table';
import { Clock } from './clock';
export { Cat } from './cat';
export { Lamp } from './lamp';

export class Home extends Renderer {
  wall: Wall;
  window: Window;
  dresser: Dresser;
  pictures: Pictures;
  table: Table;
  clock: Clock;

  constructor(ctx: CanvasRenderingContext2D) {
    super(ctx);

    this.wall = new Wall(ctx);
    this.window = new Window(ctx);
    this.dresser = new Dresser(ctx);
    this.pictures = new Pictures(ctx);
    this.table = new Table(ctx);
    this.clock = new Clock(ctx);
  }

  render() {
    this.wall.render();
    this.window.render();
    this.dresser.render();
    this.pictures.render();
    this.table.render();
    this.clock.render();
  }
}
