import React, { Component } from 'react';
import VisualizationSelector from '../Visualizer/VisualizationSelector';

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
  currentAnimationFrameId?: number;

  componentDidMount() {
    const { context, source } = this.props;

    this.analyser.fftSize = 1024;
    this.analyser.smoothingTimeConstant = 1;

    source.connect(this.analyser);
    this.analyser.connect(context.destination);
    this.currentAnimationFrameId = window.requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    const { source } = this.props;

    this.currentAnimationFrameId != null && window.cancelAnimationFrame(this.currentAnimationFrameId);
    this.analyser != null && this.analyser.disconnect();
    source && source.disconnect();
  }

  tick = () => {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ data: this.dataArray });
    this.currentAnimationFrameId = window.requestAnimationFrame(this.tick);
  };

  render() {
    const { data } = this.state;

    return <VisualizationSelector data={data} />;
  }
}
