import React, { useLayoutEffect, useRef } from 'react';
import * as VisualizationHOC from '../VisualizationHOC';
import { getRandomColorTriple } from '../../../../utils/colors';
import './Waveform.scss';

const LINE_WIDTH = 10;
const LINE_X_OFFSET = 0;
const LINE_Y_OFFSET = 5;

const Waveform: React.FunctionComponent<VisualizationHOC.WrappedProps> = ({
  data,
  style
}) => {
  const canvasEl = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const canvas = canvasEl.current!;

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // initial paint to match fade out color from rounding error
  useLayoutEffect(() => {
    const canvas = canvasEl.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.fillStyle = '#101010';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  useLayoutEffect(() => {
    const canvas = canvasEl.current!;
    const ctx = canvas.getContext('2d')!;

    const fadeOut = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const intervalId = window.setInterval(fadeOut, 7);
    return () => window.clearInterval(intervalId);
  }, []);

  // paint on every data update
  useLayoutEffect(() => {
    const canvas = canvasEl.current!;
    const ctx = canvas.getContext('2d')!;

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
        const y =
          (dataElement / 255.0) * canvas.height -
          (LINE_Y_OFFSET * colors.length) / 2;
        ctx.lineTo(x, y + i * ((LINE_Y_OFFSET * colors.length) / 2));
        x += sliceWidth;
      });

      ctx.lineTo(x, canvas.height / 2);
      ctx.stroke();
    });
  }, [data]);

  return (
    <div className="visualization waveform" style={style}>
      <div className="backdrop" />
      <canvas ref={canvasEl} />;
    </div>
  );
};

export default VisualizationHOC.wrap(Waveform);
