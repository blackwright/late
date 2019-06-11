import React, { useRef, useEffect } from 'react';
import * as VisualizationHOC from '../VisualizationHOC';
import sceneManager from './three/sceneManager';
import './Stars.scss';

const MAX_LIGHT_INTENSITY_INCREASE_DELTA = 2.5;
const MIN_LIGHT_INTENSITY = 1;

const Stars: React.FC<VisualizationHOC.WrappedProps> = ({
  data,
  intensity
}) => {
  const rendererRef = useRef<HTMLDivElement>(null);
  const managedSceneRef = useRef<any>();
  const lightTimestampRef = useRef<number>(Date.now());

  useEffect(() => {
    const rendererContainer = rendererRef.current!;
    const managedScene = sceneManager(rendererContainer, MIN_LIGHT_INTENSITY);

    managedSceneRef.current = managedScene;

    managedScene.clock.start();
    managedScene.animate();

    return managedScene.cleanup;
  }, []);

  useEffect(() => {
    const now = Date.now();

    const { dLight } = managedSceneRef.current!;

    const currentLightIntensity = dLight.intensity;

    let newLightIntensity = intensity / 2 || MIN_LIGHT_INTENSITY;

    if (
      newLightIntensity - currentLightIntensity >
      MAX_LIGHT_INTENSITY_INCREASE_DELTA
    ) {
      newLightIntensity =
        currentLightIntensity + MAX_LIGHT_INTENSITY_INCREASE_DELTA;
    }

    dLight.intensity = newLightIntensity;

    lightTimestampRef.current = now;
  }, [data]);

  return <div className="stars" ref={rendererRef} />;
};

export default VisualizationHOC.wrap(Stars);
