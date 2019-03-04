import React from 'react';
import './Visualization.scss';

export type Props = {
  data: Uint8Array;
};

export class Component extends React.Component<Props> {
  public static defaultProps: Props = {
    data: new Uint8Array()
  };
}
