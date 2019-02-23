import React, { Component } from 'react';
import Visualizer from '../Visualizer/Visualizer';

type Props = {
  context: AudioContext;
  source: MediaElementAudioSourceNode;
};

type State = {
  data: Uint8Array;
};

export default class Analyser extends Component<Props, State> {
  state = { data: new Uint8Array(0) };

  analyser = this.props.context.createAnalyser();
  dataArray = new Uint8Array(this.analyser.frequencyBinCount);

  requestAnimationId = 1;

  componentDidMount() {
    const { context, source } = this.props;

    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 0.3;

    source.connect(this.analyser);
    this.analyser.connect(context.destination);
    this.requestAnimationId = window.requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    const { source } = this.props;

    this.requestAnimationId != null && window.cancelAnimationFrame(this.requestAnimationId);
    this.analyser != null && this.analyser.disconnect();
    source && source.disconnect();
  }

  tick = () => {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ data: this.dataArray });
    this.requestAnimationId = window.requestAnimationFrame(this.tick);
  };

  render() {
    const { data } = this.state;

    return <Visualizer data={data} />;
  }
}
