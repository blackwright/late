import React, { useState, useEffect, useRef } from 'react';
import { TRANSITION_ANIMATION_LENGTH } from '../VisualizationSelector';
import { Options } from './index';
import { Quality } from '../../../store/types';
import './Visualization.scss';

export type Props = {
  // array of frequency data with values 0-255
  data: Uint8Array;
  lowPassData: Uint8Array;
  // length of CSS transitions
  timeout: number;
  isTransitioning: boolean;
  options?: Options;
  quality: Quality;
};

export type WrappedProps = {
  data: Uint8Array;
  isBeat: boolean;
  intensity: number;
  lowPassIntensity: number;
  style: { transition: string };
  isTransitioning: boolean;
  quality: Quality;
};

const defaultProps: Props = {
  data: new Uint8Array(),
  lowPassData: new Uint8Array(),
  timeout: TRANSITION_ANIMATION_LENGTH,
  isTransitioning: false,
  options: {},
  quality: 2
};

// all visualization components should be wrapped with this HOC
export function wrap(
  WrappedComponent: React.ComponentType<WrappedProps>
): React.ComponentType<Props> {
  return function({
    data,
    lowPassData,
    timeout,
    isTransitioning,
    options,
    quality
  }: Props = defaultProps) {
    const [isDelayedAfterReflow, setIsDelayedAfterReflow] = useState(false);

    useEffect(() => {
      window.setTimeout(() => setIsDelayedAfterReflow(true), 0);
    }, [isDelayedAfterReflow]);

    const rawIntensitiesRef = useRef<number[]>([]);
    const lowPassIntensitiesRef = useRef<number[]>([]);
    const startingTimestampRef = useRef<number>(Date.now());

    if (!isDelayedAfterReflow) {
      return null;
    }

    let totalDifferenceFromRawBaseline = 0;
    let totalDifferenceFromLowBaseline = 0;

    const renderedData = data.map((rawDataElement, i) => {
      totalDifferenceFromRawBaseline += Math.abs(rawDataElement - 128);

      const lowPassDataElement = lowPassData[i];
      totalDifferenceFromLowBaseline += Math.abs(lowPassDataElement - 128);

      if (options == null || !options.smoothing) {
        return rawDataElement;
      } else {
        // smooth out each data value using a range of values around it,
        // the range of this window is the value of options.smoothing
        let sum = 0;
        let count = 0;

        let rangeIndex = i - options.smoothing;

        while (rangeIndex < i + options.smoothing) {
          const rawDataAtRangeIndex = data[rangeIndex] || 128;
          sum += rawDataAtRangeIndex;
          count += 1;
          rangeIndex += 1;
        }

        return sum / count;
      }
    });

    let rawIntensityMax = 0;

    let lowPassIntensitySum = 0;
    let lowPassIntensityCount = 0;
    let lowPassIntensityMax = 0;

    rawIntensitiesRef.current.forEach((rawIntensity, i) => {
      if (rawIntensity > rawIntensityMax) {
        rawIntensityMax = rawIntensity;
      }

      const lowPassIntensity = lowPassIntensitiesRef.current[i];
      lowPassIntensitySum += lowPassIntensity;
      lowPassIntensityCount += 1;

      if (lowPassIntensity > lowPassIntensityMax) {
        lowPassIntensityMax = lowPassIntensity;
      }
    });

    const currentRawIntensity = totalDifferenceFromRawBaseline / data.length;
    const recentLowPassAvgIntensity =
      lowPassIntensitySum / lowPassIntensityCount || 0;

    const currentLowPassIntensity =
      totalDifferenceFromLowBaseline / lowPassData.length;

    rawIntensitiesRef.current = rawIntensitiesRef.current.concat(
      currentRawIntensity
    );
    lowPassIntensitiesRef.current = lowPassIntensitiesRef.current.concat(
      currentLowPassIntensity
    );

    // remove intensities older than 1 second
    if (Date.now() - startingTimestampRef.current > 2000) {
      rawIntensitiesRef.current.shift();
      lowPassIntensitiesRef.current.shift();
    }

    const isBeat = currentLowPassIntensity > recentLowPassAvgIntensity * 1.75;

    const transitionStyle = { transition: `transform ${timeout}ms linear` };

    return (
      <WrappedComponent
        data={renderedData}
        isBeat={isBeat}
        intensity={currentRawIntensity}
        lowPassIntensity={currentLowPassIntensity}
        style={transitionStyle}
        isTransitioning={isTransitioning}
        quality={quality}
      />
    );
  };
}
