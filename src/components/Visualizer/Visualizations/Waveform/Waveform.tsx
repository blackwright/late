import React from 'react';
import * as Visualization from '../Visualization';
import './Waveform.scss';

const LINE_WIDTH = 7;
const LINE_X_OFFSET = 0;
const LINE_Y_OFFSET = -14;

export default class Waveform extends Visualization.Component {
  state = {
    colors: ['#E300FF', '#FFF', '#22FFAC']
  };

  public static defaultProps: Visualization.Props = {
    data: new Uint8Array()
  };

  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
    this.onResize();
  }

  componentDidUpdate() {
    this.drawWaveform(this.props.data);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const canvas = this.canvasRef.current!;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  drawWaveform(data: Uint8Array) {
    const { colors } = this.state;

    const canvas = this.canvasRef.current!;
    const { width, height } = canvas;

    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'round';
    context.clearRect(0, 0, width, height);

    const startingXOffset = -100;
    const slicePadding = 5;
    const sliceWidth = (width * 1.0) / data.length + slicePadding;

    colors.forEach((color, i) => {
      context.strokeStyle = color;
      context.beginPath();

      let x = LINE_X_OFFSET * i + startingXOffset;
      context.moveTo(x, height / 2);

      data.forEach(dataElement => {
        const y = (dataElement / 255.0) * height;
        context.lineTo(x, y + LINE_Y_OFFSET * i);
        x += sliceWidth;
      });

      context.lineTo(x, height / 2);
      context.stroke();
    });
  }

  render() {
    return <canvas ref={this.canvasRef} className="visualization waveform" />;
  }
}
