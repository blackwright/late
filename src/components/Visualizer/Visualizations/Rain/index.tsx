import React, { useRef, useEffect } from 'react';
import * as VisualizationHOC from '../VisualizationHOC';
import { QualitySettings } from '../index';
import { City } from './city';
import { Rainfall } from './rain';
import { Home, Cat, Lamp } from './home';
import { debounced } from '../../../../utils';
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
  // city
  const cityCanvasRef = useRef<HTMLCanvasElement>(null);
  const cityRef = useRef<City>();

  useEffect(() => {
    const cityCanvas = cityCanvasRef.current!;

    const createCity = (width: number, height: number, dpi: number) => {
      cityCanvas.width = width * dpi;
      cityCanvas.height = height * dpi;

      const ctx = cityCanvas.getContext('2d')!;
      const city = new City(ctx);
      cityRef.current = city;
      city.render();
    };

    const resizeCity = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      createCity(innerWidth, innerHeight, devicePixelRatio);
    };

    resizeCity();

    const debouncedResize = debounced(resizeCity);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // rain
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const rainfallRef = useRef<Rainfall>();

  useEffect(() => {
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
        rainfall.canvasWidth = width;
        rainfall.canvasHeight = height;
      }
    };

    const resizeRain = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      createRain(innerWidth, innerHeight, devicePixelRatio);
    };

    resizeRain();

    const debouncedResize = debounced(resizeRain);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  const homeCanvasRef = useRef<HTMLCanvasElement>(null);
  const homeRef = useRef<Home>();

  // home
  useEffect(() => {
    const homeCanvas = homeCanvasRef.current!;

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

    const resizeHome = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      createHome(innerWidth, innerHeight, devicePixelRatio);
    };

    resizeHome();

    const debouncedResize = debounced(resizeHome);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // cat
  const catCanvasRef = useRef<HTMLCanvasElement>(null);
  const catRef = useRef<Cat>();

  useEffect(() => {
    const catCanvas = catCanvasRef.current!;

    const adoptCat = (width: number, height: number, dpi: number) => {
      catCanvas.width = width * dpi;
      catCanvas.height = height * dpi;

      const ctx = catCanvas.getContext('2d')!;

      const cat = new Cat(ctx);
      catRef.current = cat;
      cat.render();
    };

    const resizeCat = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      adoptCat(innerWidth, innerHeight, devicePixelRatio);
    };

    resizeCat();

    const debouncedResize = debounced(resizeCat);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // lamp
  const lampCanvasRef = useRef<HTMLCanvasElement>(null);
  const lampRef = useRef<Lamp>();

  useEffect(() => {
    const lampCanvas = lampCanvasRef.current!;

    const createLamp = (width: number, height: number, dpi: number) => {
      lampCanvas.width = width * dpi;
      lampCanvas.height = height * dpi;

      const ctx = lampCanvas.getContext('2d')!;

      const lamp = new Lamp(ctx);
      lampRef.current = lamp;
      lamp.render();
    };

    const resizeLamp = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;
      createLamp(innerWidth, innerHeight, devicePixelRatio);
    };

    resizeLamp();

    const debouncedResize = debounced(resizeLamp);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // call animating effects on each data and isBeat change
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
      <canvas ref={cityCanvasRef} />
      <canvas ref={rainCanvasRef} />
      <canvas ref={homeCanvasRef} />
      <canvas ref={catCanvasRef} />
      <canvas ref={lampCanvasRef} />
    </div>
  );
};

export default VisualizationHOC.wrap(Rain);
