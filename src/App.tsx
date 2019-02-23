import React, { Component } from 'react';
import Analyser from './components/Analyser/Analyser';

type Props = {};

type State = {
  audioElement: HTMLAudioElement | null;
  isPlaying: boolean;
  context?: AudioContext;
  source?: MediaElementAudioSourceNode;
};

export default class App extends Component<Props, State> {

  state: State = {
    audioElement: null,
    isPlaying: false,
    context: undefined,
    source: undefined
  };

  audioRef: React.RefObject<HTMLAudioElement> = React.createRef();

  componentDidMount() {
    const audioElement = this.audioRef.current!;
    audioElement.crossOrigin = 'anonymous';

    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = context.createMediaElementSource(audioElement);

    this.setState({
      audioElement,
      context,
      source
    }, () => {
      audioElement.addEventListener('play', this.onPlay);
      audioElement.addEventListener('pause', this.onPause);
      window.addEventListener('click', this.onClick);
    });
  }

  componentWillUnmount() {
    const audioElement = this.state.audioElement!;
    audioElement.removeEventListener('play', this.onPlay);
    audioElement.removeEventListener('pause', this.onPause);
    window.removeEventListener('click', this.onClick);
  }

  onClick = () => {
    const audioElement = this.state.audioElement!;
    if (audioElement.paused) {
      audioElement.play();
    } else {
      audioElement.pause();
    }
  };

  onPlay = () => this.setState({ isPlaying: true });

  onPause = () => this.setState({ isPlaying: false });

  render() {
    const {
      isPlaying,
      context,
      source
    } = this.state;

    return (
      <>
        <div id="play" />
        <audio
          ref={this.audioRef}
          id="audioElement"
          src="http://localhost:3001"
        />
        {source && context && isPlaying
          ? <Analyser
              context={context}
              source={source}
            />
          : null
        }
      </>
    );
  }
}
