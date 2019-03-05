import React from 'react';
import './Visualization.scss';

export type Props = {
  data: Uint8Array;
};

// all visualization components should extend this class
export abstract class Component extends React.Component<Props> {
  public static defaultProps: Props = {
    data: new Uint8Array()
  };
}
