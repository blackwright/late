import React from 'react';
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

// all visualization components should be wrapped with this HOC
export function wrap(
  WrappedComponent: React.ComponentType<WrappedProps>
): React.ComponentType<Props> {
  return class extends React.Component<Props> {
    // bypass initial render because components that trigger
    // reflow in componentDidMount interrupt CSS transitions
    state = { delayedAfterReflow: false };

    static defaultProps: Props = {
      data: new Uint8Array(),
      timeout: TRANSITION_ANIMATION_LENGTH,
      isTransitioning: false,
      options: {}
    };

    componentDidMount() {
      window.setTimeout(() => {
        this.setState({ delayedAfterReflow: true });
      }, 0);
    }

    render() {
      const { delayedAfterReflow } = this.state;

      if (!delayedAfterReflow) {
        return null;
      }

      const { data, timeout, isTransitioning, options = {} } = this.props;
      const transitionStyle = { transition: `transform ${timeout}ms linear` };

      const renderedData = options.smoothing
        ? smooth(data, options.smoothing)
        : data;

      return (
        <WrappedComponent
          data={renderedData}
          style={transitionStyle}
          isTransitioning={isTransitioning}
        />
      );
    }
  };
}
