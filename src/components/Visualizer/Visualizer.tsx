import React, { Component } from 'react';
import Waveform from './Waveform/Waveform';
import Drummer from './Drummer/Drummer';

type Props = {
  data: Uint8Array;
};

export default class Visualizer extends Component<Props> {
  render() {
    const { data } = this.props;

    // return <Waveform data={data} />;
    return <Drummer data={data} />;
  }
}
