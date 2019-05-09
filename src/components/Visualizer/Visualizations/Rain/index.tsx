import React, { useRef, useEffect } from 'react';
import * as VisualizationHOC from '../VisualizationHOC';
import { Rainfall } from './rain';
import { Home } from './home';
import './Rain.scss';

const MIN_RAINDROPS_PER_TICK = 1;
const MAX_RAINDROPS_PER_TICK = 50;

const Rain: React.FC<VisualizationHOC.WrappedProps> = ({
  data,
  lowPassIntensity
}) => {
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const rainfallRef = useRef<Rainfall>();

  const homeCanvasRef = useRef<HTMLCanvasElement>(null);
  const homeRef = useRef<Home>();

  useEffect(() => {
    const rainCanvas = rainCanvasRef.current!;
    const homeCanvas = homeCanvasRef.current!;

    let clockInterval: number;

    const createHome = () => {
      const { innerWidth, innerHeight, devicePixelRatio = 1 } = window;

      const width = innerWidth * devicePixelRatio;
      const height = innerHeight * devicePixelRatio;

      rainCanvas.width = width;
      rainCanvas.height = height;

      homeCanvas.width = width;
      homeCanvas.height = height;

      const ctx = homeCanvas.getContext('2d')!;

      const home = new Home(ctx);
      homeRef.current = home;
      home.render();

      clockInterval && window.clearTimeout(clockInterval);
      clockInterval = window.setInterval(() => home.clockFace(), 1000);
    };

    const createRain = () => {
      const ctx = rainCanvas.getContext('2d')!;
      rainfallRef.current = new Rainfall(ctx);
    };

    const createScene = () => {
      createHome();
      createRain();
    };

    createScene();

    window.addEventListener('resize', createScene);
    return () => window.removeEventListener('resize', createScene);
  }, []);

  useEffect(() => {
    const rainfall = rainfallRef.current!;

    let newRaindropsAdded = 0;
    let raindropsToAdd = Math.floor(lowPassIntensity);

    if (raindropsToAdd < MIN_RAINDROPS_PER_TICK) {
      raindropsToAdd = MIN_RAINDROPS_PER_TICK;
    } else if (raindropsToAdd > MAX_RAINDROPS_PER_TICK) {
      raindropsToAdd = MAX_RAINDROPS_PER_TICK;
    }

    while (newRaindropsAdded < raindropsToAdd) {
      rainfall.add();
      newRaindropsAdded += 1;
    }

    rainfall.tick();

    const canvas = rainCanvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    rainfall.render();
  }, [data]);

  return (
    <div className="rain">
      <div className="backdrop" />
      <canvas ref={rainCanvasRef} />
      <canvas ref={homeCanvasRef} />
    </div>
  );
};

export default VisualizationHOC.wrap(Rain);
