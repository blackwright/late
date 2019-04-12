import React, { useRef, useEffect } from 'react';
import { Points, Camera } from 'three';
import * as VisualizationHOC from '../VisualizationHOC';
import sceneManager from './three/sceneManager';
import './Stars.scss';

const Stars: React.FunctionComponent<VisualizationHOC.WrappedProps> = ({
  data,
  style
}) => {
  const rendererRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Points>();
  const cameraRef = useRef<Camera>();

  useEffect(() => {
    const rendererContainer = rendererRef.current!;
    const { clock, animate, cleanup, stars, camera } = sceneManager(
      rendererContainer
    );
    starsRef.current = stars;
    cameraRef.current = camera;

    clock.start();
    animate();

    return cleanup;
  }, []);

  useEffect(() => {}, [data]);

  return (
    <div className="visualization stars" ref={rendererRef} style={style} />
  );
};

export default VisualizationHOC.wrap(Stars);
