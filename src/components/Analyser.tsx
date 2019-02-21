import React, { Component } from 'react';
import Visualizer from './Visualizer/Visualizer';

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

  rafId = 1;

  componentDidMount() {
    const { context, source } = this.props;
    source.connect(this.analyser);
    this.analyser.connect(context.destination);
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    const { source } = this.props;

    this.rafId != null && window.cancelAnimationFrame(this.rafId);
    this.analyser != null && this.analyser.disconnect();
    source.disconnect();
  }

  tick = () => {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ data: this.dataArray });
    this.rafId = window.requestAnimationFrame(this.tick);
  }

  render() {
    const { data } = this.state;

    return (
      <div style={{ height: '600px' }}>
        <Visualizer data={data} />
      </div>
    );
  }
}
