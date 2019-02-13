import React, { Component } from 'react';

type Props = {
  data: Uint8Array;
  colors?: string[];
};

const LINE_WIDTH = 3;

export default class Visualizer extends Component<Props> {

  static defaultProps: Props = {
    data: new Uint8Array(),
    colors: ['#000']
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
    const canvas = this.canvasRef.current!;

    const { width, height } = canvas;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.lineWidth = 3;
    context.lineCap = 'round';
    context.strokeStyle = '#000';
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.moveTo(0, height / 2);

    const sliceWidth = width * 1.0 / data.length;
    let x = 0;

    data.forEach((dataElement) => {
      const y = dataElement / 255.0 * height;
      context.lineTo(x, y);
      x += sliceWidth;
    });

    context.lineTo(x, height / 2);
    context.stroke();
  }

  render() {
    return (
      <canvas ref={this.canvasRef} className="visualizer" />
    );
  }
}
