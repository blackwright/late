import React from 'react';
import * as Visualization from '../Visualization';
import { getRandomColorTriple } from '../../../../utils/colors';

const LINE_WIDTH = 7;
const LINE_X_OFFSET = 0;
const LINE_Y_OFFSET = 7;

type Props = Pick<Visualization.Props, 'data'>;

export default class Canvas extends React.Component<Props> {
  private ref: React.RefObject<HTMLCanvasElement> = React.createRef();
  private canvas?: HTMLCanvasElement;

  componentDidMount() {
    const canvas = this.ref.current!;
    const canvasContext = canvas.getContext('2d') as CanvasRenderingContext2D;

    if (canvas == null || canvasContext == null) {
      return;
    }

    this.canvas = canvas;
    this.onResize();

    canvasContext.lineWidth = LINE_WIDTH;
    canvasContext.lineCap = 'round';

    const { data } = this.props;

    const colors = getRandomColorTriple();

    const sliceWidth = canvas.width / data.length;

    colors.forEach((color, i) => {
      canvasContext.strokeStyle = color;
      canvasContext.beginPath();

      let x = i * LINE_X_OFFSET;
      canvasContext.moveTo(x, canvas.height / 2);

      data.forEach(dataElement => {
        const y = (dataElement / 255.0) * canvas.height;
        canvasContext.lineTo(x, y + i * LINE_Y_OFFSET);
        x += sliceWidth;
      });

      canvasContext.lineTo(x, canvas.height / 2);
      canvasContext.stroke();
    });

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const canvas = this.canvas!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  };

  render() {
    return <canvas ref={this.ref} />;
  }
}
