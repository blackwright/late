import React from 'react';
import { TRANSITION_ANIMATION_LENGTH } from '../VisualizationSelector';
import { smooth } from '../../../utils';
import './Visualization.scss';

export type Props = {
  // array of frequency data with values 0-255
  data: Uint8Array;
  // length of CSS transitions
  timeout: number;
  isTransitioning: boolean;
};

export type WrappedProps = {
  data: Uint8Array;
  style: { transition: string };
  isTransitioning: boolean;
};

export type Options = {
  smoothing?: number;
};

// all visualization components should be wrapped with this HOC
export function wrap(
  WrappedComponent: React.ComponentType<WrappedProps>,
  options: Options = {}
) {
  return class extends React.Component<Props> {
    // bypass initial render because components that trigger
    // reflow in componentDidMount interrupt CSS transitions
    state = { delayedAfterReflow: false };

    static defaultProps: Props = {
      data: new Uint8Array(),
      timeout: TRANSITION_ANIMATION_LENGTH,
      isTransitioning: false
    };

    componentDidMount() {
      window.setTimeout(() => {
        this.setState({ delayedAfterReflow: true });
      }, 0);
    }

    render() {
      const { data, timeout, isTransitioning } = this.props;
      const { delayedAfterReflow } = this.state;

      const renderedData = options.smoothing
        ? smooth(data, options.smoothing)
        : data;

      return (
        delayedAfterReflow && (
          <WrappedComponent
            data={renderedData}
            style={{ transition: `transform ${timeout}ms linear` }}
            isTransitioning={isTransitioning}
          />
        )
      );
    }
  };
}
