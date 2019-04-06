import React, { useState, useEffect } from 'react';
import { TRANSITION_ANIMATION_LENGTH } from '../VisualizationSelector';
import './Visualization.scss';
import { Options } from './index';
import { smooth } from '../../../utils';

export type Props = {
  // array of frequency data with values 0-255
  data: Uint8Array;
  // length of CSS transitions
  timeout: number;
  isTransitioning: boolean;
  options?: Options;
};

export type WrappedProps = {
  data: Uint8Array;
  style: { transition: string };
  isTransitioning: boolean;
};

const defaultProps: Props = {
  data: new Uint8Array(),
  timeout: TRANSITION_ANIMATION_LENGTH,
  isTransitioning: false,
  options: {}
};

// all visualization components should be wrapped with this HOC
export function wrap(
  WrappedComponent: React.ComponentType<WrappedProps>
): React.ComponentType<Props> {
  return function({
    data,
    timeout,
    isTransitioning,
    options
  }: Props = defaultProps) {
    const [isDelayedAfterReflow, setIsDelayedAfterReflow] = useState(false);

    useEffect(() => {
      window.setTimeout(() => setIsDelayedAfterReflow(true), 0);
    }, [isDelayedAfterReflow]);

    if (!isDelayedAfterReflow) {
      return null;
    }

    const transitionStyle = { transition: `transform ${timeout}ms linear` };

    const renderedData =
      options && options.smoothing ? smooth(data, options.smoothing) : data;

    return (
      <WrappedComponent
        data={renderedData}
        style={transitionStyle}
        isTransitioning={isTransitioning}
      />
    );
  };
}
