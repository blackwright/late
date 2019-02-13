import React, { Component } from 'react';

type Props = {
  audioNode: HTMLMediaElement;
}

type State = {
  data: Uint8Array;
};

export default class AudioAnalyzer extends Component<Props, State> {

  state = { data: new Uint8Array(0) };

  audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  analyser = this.audioContext.createAnalyser();
  dataArray = new Uint8Array(this.analyser.frequencyBinCount);

  source?: MediaElementAudioSourceNode;
  rafId = 1;

  componentDidMount() {
    const { audioNode } = this.props;

    this.source = this.audioContext.createMediaElementSource(audioNode);
    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    this.rafId != null && window.cancelAnimationFrame(this.rafId);
    this.analyser != null && this.analyser.disconnect();
    this.source != null && this.source.disconnect();
  }

  tick = () => {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ data: this.dataArray });
    this.rafId = window.requestAnimationFrame(this.tick);
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <textarea
          value={String(data)}
          rows={45}
          cols={100}
          readOnly
        />
      </div>
    );
  }
}
