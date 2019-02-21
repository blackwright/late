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
    this.setState({ audioElement: this.audioRef.current }, () => {
      const audioElement = this.state.audioElement!;
      audioElement.addEventListener('play', this.onPlay);
      audioElement.addEventListener('pause', this.onPause);
    });
  }

  componentWillUnmount() {
    if (this.state.audioElement == null) {
      return;
    }

    const { audioElement } = this.state;
    audioElement.removeEventListener('play', this.onPlay);
    audioElement.removeEventListener('pause', this.onPause);
  }

  setSource = (source: MediaElementAudioSourceNode) => this.setState({ source });

  onPlay = () => {
    this.setState((prevState: State) => {
      const prevContext = prevState.context;
      const prevSource = prevState.source;

      const context = prevContext || new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = prevSource || context.createMediaElementSource(prevState.audioElement!);

      return {
        isPlaying: true,
        context,
        source
      };
    });
  }

  onPause = () => this.setState({ isPlaying: false });

  render() {
    const {
      isPlaying,
      context,
      source
    } = this.state;

    return (
      <>
        <audio
          ref={this.audioRef}
          id="audioElement"
          controls
        >
          <source
            src="/media/lackluster-so_youre_still_waiting.mp3"
            type="audio/mp3"
          />
        </audio>
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
