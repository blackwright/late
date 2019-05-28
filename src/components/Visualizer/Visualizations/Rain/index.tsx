import React, { useRef, useEffect } from 'react';
import * as VisualizationHOC from '../VisualizationHOC';
import { QualitySettings } from '../index';
import { Rainfall } from './rain';
import { Home, Cat, Lamp } from './home';
import './Rain.scss';

const MIN_RAINDROPS_PER_TICK = 1;

const QUALITY: QualitySettings = {
  0: { MAX_RAINDROPS_PER_TICK: 10 },
  1: { MAX_RAINDROPS_PER_TICK: 33 },
  2: { MAX_RAINDROPS_PER_TICK: 100 }
};

const Rain: React.FC<VisualizationHOC.WrappedProps> = ({
  data,
  isBeat,
  lowPassIntensity,
  quality
}) => {
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const rainfallRef = useRef<Rainfall>();

  const homeCanvasRef = useRef<HTMLCanvasElement>(null);
  const homeRef = useRef<Home>();

  const catCanvasRef = useRef<HTMLCanvasElement>(null);
  const catRef = useRef<Cat>();

  const lampCanvasRef = useRef<HTMLCanvasElement>(null);
  const lampRef = useRef<Lamp>();

  useEffect(() => {
    const rainCanvas = rainCanvasRef.current!;
    const homeCanvas = homeCanvasRef.current!;
    const catCanvas = catCanvasRef.current!;
    const lampCanvas = lampCanvasRef.current!;

    let clockInterval: number;

    const createHome = (width: number, height: number, dpi: number) => {
      homeCanvas.width = width * dpi;
      homeCanvas.height = height * dpi;

      const ctx = homeCanvas.getContext('2d')!;

      const home = new Home(ctx);
      homeRef.current = home;
      home.render();

      clockInterval && window.clearTimeout(clockInterval);
      clockInterval = window.setInterval(() => home.clock.tick(), 1000);
    };

    const createRain = (width: number, height: number, dpi: number) => {
      rainCanvas.width = width * dpi;
      rainCanvas.height = height * dpi;

      const ctx = rainCanvas.getContext('2d')!;
      let rainfall = rainfallRef.current;
      if (rainfall == null) {
        rainfallRef.current = new Rainfall(ctx);
      } else {
        rainfall = rainfallRef.current!;
        rainfall.canvasWidth = width;
        rainfall.canvasHeight = height;
      }
    };

    const adoptCat = (width: number, height: number, dpi: number) => {
      catCanvas.width = width * dpi;
      catCanvas.height = height * dpi;

      const ctx = catCanvas.getContext('2d')!;

      const cat = new Cat(ctx);
      catRef.current = cat;
      cat.render();
    };

    const createLamp = (width: number, height: number, dpi: number) => {
      lampCanvas.width = width * dpi;
      lampCanvas.height = height * dpi;

      const ctx = lampCanvas.getContext('2d')!;

      const lamp = new Lamp(ctx);
      lampRef.current = lamp;
      lamp.render();
    };

    const resizeScene = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      createHome(innerWidth, innerHeight, devicePixelRatio);
      createRain(innerWidth, innerHeight, devicePixelRatio);
      adoptCat(innerWidth, innerHeight, devicePixelRatio);
      createLamp(innerWidth, innerHeight, devicePixelRatio);
    };

    resizeScene();

    window.addEventListener('resize', resizeScene);
    return () => window.removeEventListener('resize', resizeScene);
  }, []);

  useEffect(() => {
    const home = homeRef.current!;
    const rainfall = rainfallRef.current!;
    const cat = catRef.current!;
    const lamp = lampRef.current!;

    let newRaindropsAdded = 0;
    let raindropsToAdd = Math.floor(
      lowPassIntensity / Math.max(1, 4 - quality)
    );

    if (raindropsToAdd < MIN_RAINDROPS_PER_TICK) {
      raindropsToAdd = MIN_RAINDROPS_PER_TICK;
    } else if (raindropsToAdd > QUALITY[quality].MAX_RAINDROPS_PER_TICK) {
      raindropsToAdd = QUALITY[quality].MAX_RAINDROPS_PER_TICK;
    }

    while (newRaindropsAdded < raindropsToAdd) {
      rainfall.add();
      newRaindropsAdded += 1;
    }

    rainfall.tick();
    home.dresser.tick(isBeat);
    // re-render lamp light since the dresser stereo
    // may have been repainted by changing isBeat
    lamp.tick();
    cat.tick();

    const rainCanvas = rainCanvasRef.current!;
    const rainCtx = rainCanvas.getContext('2d')!;

    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

    rainfall.render();
  }, [data, isBeat]);

  return (
    <div className="rain">
      <div className="backdrop" />
      <canvas ref={rainCanvasRef} />
      <canvas ref={homeCanvasRef} />
      <canvas ref={catCanvasRef} />
      <canvas ref={lampCanvasRef} />
    </div>
  );
};

export default VisualizationHOC.wrap(Rain);