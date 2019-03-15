import React from 'react';
import { TRANSITION_ANIMATION_LENGTH } from '../VisualizationSelector';
import './Visualization.scss';

export type Props = {
  data: Uint8Array;
  timeout: number;
};

export type WrappedProps = {
  data: Uint8Array;
  style: {
    transition: string;
  };
};

// all visualization components should be wrapped with this HOC
export function wrap(WrappedComponent: React.ComponentType<WrappedProps>) {
  return class extends React.Component<Props> {
    static defaultProps: Props = {
      data: new Uint8Array(),
      timeout: TRANSITION_ANIMATION_LENGTH
    };

    render() {
      const { data, timeout } = this.props;

      return <WrappedComponent data={data} style={{ transition: `transform ${timeout}ms linear` }} />;
    }
  };
}
