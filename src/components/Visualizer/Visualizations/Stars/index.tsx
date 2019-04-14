import React, { useRef, useEffect } from 'react';
import { DirectionalLight, Color } from 'three';
import * as VisualizationHOC from '../VisualizationHOC';
import sceneManager from './three/sceneManager';
import { getRandomColor } from '../../../../utils/colors';
import './Stars.scss';

const MIN_DELAY_BETWEEN_COLOR_CHANGE = 200;
const MIN_DELAY_BETWEEN_INTENSITY_CHANGE = 75;
const MAX_LIGHT_INTENSITY_DELTA = 1;
const MIN_LIGHT_INTENSITY = 1;

const Stars: React.FunctionComponent<VisualizationHOC.WrappedProps> = ({
  isBeat,
  lowPassIntensity,
  style
}) => {
  const rendererRef = useRef<HTMLDivElement>(null);
  const dLightRef = useRef<DirectionalLight>();
  const beatTimestampRef = useRef<number>(Date.now());
  const lightTimestampRef = useRef<number>(Date.now());

  useEffect(() => {
    const rendererContainer = rendererRef.current!;
    const { clock, animate, cleanup, dLight } = sceneManager(
      rendererContainer,
      MIN_LIGHT_INTENSITY
    );

    dLightRef.current = dLight;

    clock.start();
    animate();

    return cleanup;
  }, []);

  useEffect(() => {
    const now = Date.now();

    if (now - beatTimestampRef.current > MIN_DELAY_BETWEEN_COLOR_CHANGE) {
      const cloudColor = new Color(getRandomColor());
      dLightRef.current!.color.set(cloudColor);

      beatTimestampRef.current = now;
    }
  }, [isBeat]);

  useEffect(() => {
    const now = Date.now();
    const currentLightIntensity = dLightRef.current!.intensity;

    let newLightIntensity = lowPassIntensity / 8;

    if (now - lightTimestampRef.current > MIN_DELAY_BETWEEN_INTENSITY_CHANGE) {
      if (
        newLightIntensity - currentLightIntensity >
        MAX_LIGHT_INTENSITY_DELTA
      ) {
        newLightIntensity = currentLightIntensity + MAX_LIGHT_INTENSITY_DELTA;
      } else if (
        currentLightIntensity - newLightIntensity >
        MAX_LIGHT_INTENSITY_DELTA
      ) {
        newLightIntensity = currentLightIntensity - MAX_LIGHT_INTENSITY_DELTA;
      }

      dLightRef.current!.intensity = newLightIntensity;

      lightTimestampRef.current = now;
    }
  }, [lowPassIntensity]);

  return (
    <div className="visualization stars" ref={rendererRef} style={style} />
  );
};

export default VisualizationHOC.wrap(Stars);
