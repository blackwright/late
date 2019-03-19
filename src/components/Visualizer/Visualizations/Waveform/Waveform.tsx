import React from 'react';
import * as Visualization from '../Visualization';
import { getRandomColorTriple } from '../../../../utils/colors';
import './Waveform.scss';

const LINE_WIDTH = 10;
const LINE_X_OFFSET = 0;
const LINE_Y_OFFSET = 5;

class Waveform extends React.Component<Visualization.WrappedProps> {
  private ref: React.RefObject<HTMLCanvasElement> = React.createRef();
  private canvas?: HTMLCanvasElement;
  private ctx?: CanvasRenderingContext2D;
  private intervalId?: number;
  private resizeTimeoutId?: number;

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    this.canvas = this.ref.current!;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;

    this.intervalId = window.setInterval(this.fadeOut, 7);
  }

  componentDidUpdate() {
    this.paint();
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    window.clearTimeout(this.resizeTimeoutId);
    const canvas = this.canvas!;

    this.resizeTimeoutId = window.setTimeout(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, 500);
  };

  paint = () => {
    const { data } = this.props;
    const canvas = this.canvas!;
    const ctx = this.ctx!;

    const colors = getRandomColorTriple();

    ctx.lineWidth = LINE_WIDTH;
    ctx.lineCap = 'round';

    const sliceWidth = canvas.width / data.length;

    colors.forEach((color, i) => {
      ctx.strokeStyle = color;
      ctx.beginPath();

      let x = i * LINE_X_OFFSET;
      ctx.moveTo(x, canvas.height / 2);

      data.forEach(dataElement => {
        const y = (dataElement / 255.0) * canvas.height - (LINE_Y_OFFSET * colors.length) / 2;
        ctx.lineTo(x, y + i * ((LINE_Y_OFFSET * colors.length) / 2));
        x += sliceWidth;
      });

      ctx.lineTo(x, canvas.height / 2);
      ctx.stroke();
    });
  };

  fadeOut = () => {
    const ctx = this.ctx!;
    const canvas = this.canvas!;
    ctx.fillStyle = 'rgba(4, 4, 4, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  render() {
    const { style } = this.props;

    return (
      <div className="visualization waveform" style={style}>
        <div className="backdrop" />
        <canvas ref={this.ref} />;
      </div>
    );
  }
}

export default Visualization.wrap(Waveform);
