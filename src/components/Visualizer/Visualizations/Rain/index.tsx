import React, { useRef, useEffect } from 'react';
import * as VisualizationHOC from '../VisualizationHOC';
import { City } from './city';
import { Rainfall } from './rain';
import { Home, Cat, Lamp } from './home';
import { useDebouncedResize } from '../../../../utils/hooks';
import './Rain.scss';

const MAX_RAINDROPS_PER_TICK = 8;

const Rain: React.FC<VisualizationHOC.WrappedProps> = ({
  data,
  isBeat,
  lowPassIntensity
}) => {
  // city
  const cityCanvasRef = useRef<HTMLCanvasElement>(null);
  const cityRef = useRef<City>();

  useDebouncedResize(() => {
    const cityCanvas = cityCanvasRef.current!;

    const createCity = (width: number, height: number, dpi: number) => {
      cityCanvas.width = width * dpi;
      cityCanvas.height = height * dpi;

      const ctx = cityCanvas.getContext('2d')!;
      const city = new City(ctx);
      cityRef.current = city;
      city.render();
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;
    createCity(innerWidth, innerHeight, devicePixelRatio);
  }, []);

  // rain
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const rainfallRef = useRef<Rainfall>();

  useDebouncedResize(() => {
    const rainCanvas = rainCanvasRef.current!;

    const createRain = (width: number, height: number, dpi: number) => {
      rainCanvas.width = width * dpi;
      rainCanvas.height = height * dpi;

      const ctx = rainCanvas.getContext('2d')!;
      let rainfall = rainfallRef.current;
      if (rainfall == null) {
        rainfallRef.current = new Rainfall(ctx);
      } else {
        rainfall = rainfallRef.current!;
        rainfall.canvasWidth = width * dpi;
        rainfall.canvasHeight = height * dpi;
      }
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;
    createRain(innerWidth, innerHeight, devicePixelRatio);

    return () => {
      if (rainfallRef.current) {
        rainfallRef.current = undefined;
      }
    };
  }, []);

  const homeCanvasRef = useRef<HTMLCanvasElement>(null);
  const homeRef = useRef<Home>();
  const clockIntervalRef = useRef<number>();

  // home
  useDebouncedResize(() => {
    const homeCanvas = homeCanvasRef.current!;

    const createHome = (width: number, height: number, dpi: number) => {
      homeCanvas.width = width * dpi;
      homeCanvas.height = height * dpi;

      const ctx = homeCanvas.getContext('2d')!;

      const home = new Home(ctx);
      homeRef.current = home;
      home.render();

      clockIntervalRef.current && window.clearTimeout(clockIntervalRef.current);
      clockIntervalRef.current = window.setInterval(
        () => home.clock.tick(),
        1000
      );
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;
    createHome(innerWidth, innerHeight, devicePixelRatio);
  }, []);

  // cat
  const catCanvasRef = useRef<HTMLCanvasElement>(null);
  const catRef = useRef<Cat>();

  useDebouncedResize(() => {
    const catCanvas = catCanvasRef.current!;

    const adoptCat = (width: number, height: number, dpi: number) => {
      catCanvas.width = width * dpi;
      catCanvas.height = height * dpi;

      const ctx = catCanvas.getContext('2d')!;

      const cat = new Cat(ctx);
      catRef.current = cat;
      cat.render();
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;
    adoptCat(innerWidth, innerHeight, devicePixelRatio);
  }, []);

  // lamp
  const lampCanvasRef = useRef<HTMLCanvasElement>(null);
  const lampRef = useRef<Lamp>();

  useDebouncedResize(() => {
    const lampCanvas = lampCanvasRef.current!;

    const createLamp = (width: number, height: number, dpi: number) => {
      lampCanvas.width = width * dpi;
      lampCanvas.height = height * dpi;

      const ctx = lampCanvas.getContext('2d')!;

      const lamp = new Lamp(ctx);
      lampRef.current = lamp;
      lamp.render();
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;
    createLamp(innerWidth, innerHeight, devicePixelRatio);
  }, []);

  // call animating effects on each data change
  useEffect(() => {
    const home = homeRef.current!;
    const rainfall = rainfallRef.current!;
    const cat = catRef.current!;
    const lamp = lampRef.current!;

    let raindropsToAdd = Math.floor(lowPassIntensity / 5);

    if (raindropsToAdd > MAX_RAINDROPS_PER_TICK) {
      raindropsToAdd = MAX_RAINDROPS_PER_TICK;
    }

    for (
      let raindropsAdded = 0;
      raindropsAdded < raindropsToAdd;
      raindropsAdded++
    ) {
      rainfall.add();
    }

    rainfall.tick();
    const { wasBeat } = home.dresser;
    home.dresser.tick(isBeat);
    // re-render lamp light since the dresser stereo
    // may have been repainted by changing isBeat
    if (wasBeat !== isBeat) {
      lamp.tick();
    }
    cat.tick();

    const rainCanvas = rainCanvasRef.current!;
    const rainCtx = rainCanvas.getContext('2d')!;

    rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

    rainfall.render();
  }, [data]);

  return (
    <div className="rain">
      <canvas ref={cityCanvasRef} />
      <canvas ref={rainCanvasRef} />
      <canvas ref={homeCanvasRef} />
      <canvas ref={catCanvasRef} />
      <canvas ref={lampCanvasRef} />
    </div>
  );
};

export default VisualizationHOC.wrap(Rain);
