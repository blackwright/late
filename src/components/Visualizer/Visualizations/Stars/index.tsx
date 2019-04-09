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
    const { animate, cleanup, stars, camera } = sceneManager(rendererContainer);
    starsRef.current = stars;
    cameraRef.current = camera;

    animate();

    return cleanup;
  }, []);

  useEffect(() => {
    const camera = cameraRef.current!;
    const stars = starsRef.current!;

    stars.rotateY(0.0005);
    stars.rotateX(0.0000005);
    stars.rotateZ(0.0001);
  }, [data]);

  return (
    <div className="visualization stars" ref={rendererRef} style={style} />
  );
};

export default VisualizationHOC.wrap(Stars);
