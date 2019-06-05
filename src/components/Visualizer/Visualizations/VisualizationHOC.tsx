import React, { useState, useEffect, useRef } from 'react';
import { Options } from './index';
import './Visualization.scss';

export type Props = {
  // array of frequency data with values 0-255
  data: Uint8Array;
  lowPassData: Uint8Array;
  options?: Options;
};

export type WrappedProps = {
  data: Uint8Array;
  lowPassData: Uint8Array;
  isBeat: boolean;
  intensity: number;
  lowPassIntensity: number;
};

const defaultProps: Props = {
  data: new Uint8Array(),
  lowPassData: new Uint8Array(),
  options: {}
};

// all visualization components should be wrapped with this HOC
export function wrap(
  WrappedComponent: React.ComponentType<WrappedProps>
): React.ComponentType<Props> {
  return function({ data, lowPassData, options }: Props = defaultProps) {
    const rawIntensitiesRef = useRef<number[]>([]);
    const lowPassIntensitiesRef = useRef<number[]>([]);
    const startingTimestampRef = useRef<number>(Date.now());

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

    // remove intensities older than 2 seconds
    if (Date.now() - startingTimestampRef.current > 2000) {
      rawIntensitiesRef.current.shift();
      lowPassIntensitiesRef.current.shift();
    }

    const isBeat = currentLowPassIntensity > recentLowPassAvgIntensity * 1.5;

    return (
      <WrappedComponent
        data={renderedData}
        lowPassData={lowPassData}
        isBeat={isBeat}
        intensity={currentRawIntensity}
        lowPassIntensity={currentLowPassIntensity}
      />
    );
  };
}
