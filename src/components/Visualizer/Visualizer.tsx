import React, { Component } from 'react';
import './Visualizer.scss';

type Props = {
  data: Uint8Array;
  colors: string[];
};

const LINE_WIDTH = 7;
const LINE_X_OFFSET = 0;
const LINE_Y_OFFSET = -14;

export default class Visualizer extends Component<Props> {

  static defaultProps: Props = {
    data: new Uint8Array(),
    colors: ['#E300FF', '#FFF', '#22FFAC']
  };

  canvasRef: React.RefObject<HTMLCanvasElement> = React.createRef();

  componentDidMount() {
    const canvas = this.canvasRef.current!;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  componentDidUpdate() {
    this.drawWaveform(this.props.data);
  }

  drawWaveform(data: Uint8Array) {
    const { colors } = this.props;

    const canvas = this.canvasRef.current!;
    const { width, height } = canvas;

    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.lineWidth = LINE_WIDTH;
    context.lineCap = 'round';
    context.clearRect(0, 0, width, height);

    const startingXOffset = -100;
    const slicePadding = 5;
    const sliceWidth = width * 1.0 / data.length + slicePadding;

    colors.forEach((color, i) => {
      context.strokeStyle = color;
      context.beginPath();

      let x = LINE_X_OFFSET * i + startingXOffset;
      context.moveTo(x, height / 2);

      data.forEach((dataElement) => {
        const y = dataElement / 255.0 * height;
        context.lineTo(x, y + LINE_Y_OFFSET * i);
        x += sliceWidth;
      });

      context.lineTo(x, height / 2);
      context.stroke();
    });
  }

  render() {
    return (
      <canvas ref={this.canvasRef} className="visualizer" />
    );
  }
}
