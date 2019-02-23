import React, { Component } from 'react';
import Loading from './components/Loading/Loading';
import Analyser from './components/Analyser/Analyser';

type Props = {};

type State = {
  wantsToPlay: boolean;
  isPlaying: boolean;
  context?: AudioContext;
  source?: MediaElementAudioSourceNode;
};

type AudioEventListeners = Array<{
  event: string;
  listener: () => void;
}>;

export default class App extends Component<Props, State> {
  state: State = {
    wantsToPlay: false,
    isPlaying: false,
    context: undefined,
    source: undefined
  };

  audioRef: React.RefObject<HTMLAudioElement> = React.createRef();
  audioElement?: HTMLAudioElement;
  audioEventListeners: AudioEventListeners = [];

  componentDidMount() {
    const audioElement = this.audioRef.current!;
    audioElement.crossOrigin = 'anonymous';
    this.audioElement = audioElement;

    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = context.createMediaElementSource(audioElement);

    this.setState(
      {
        context,
        source
      },
      () => {
        this.addAudioEventListeners([
          { event: 'playing', listener: this.onPlay },
          { event: 'pause', listener: this.onPause },
          { event: 'error', listener: this.onError }
        ]);
        window.addEventListener('click', this.onClick);
      }
    );
  }

  componentWillUnmount() {
    this.removeAudioEventListeners();
    window.removeEventListener('click', this.onClick);
  }

  onClick = () => {
    const audioElement = this.audioElement!;
    if (audioElement.paused) {
      this.setState({ wantsToPlay: true });
      audioElement.play();
    } else {
      this.setState({ wantsToPlay: false });
      audioElement.pause();
    }
  };

  onPlay = () => this.setState({ isPlaying: true });

  onPause = () => this.setState({ isPlaying: false });

  onError = console.error;

  addAudioEventListeners = (eventListeners: AudioEventListeners) => {
    for (const eventListener of eventListeners) {
      this.audioEventListeners.push(eventListener);
      this.audioElement!.addEventListener(eventListener.event, eventListener.listener);
    }
  };

  removeAudioEventListeners = () => {
    for (const eventListener of this.audioEventListeners) {
      this.audioElement!.removeEventListener(eventListener.event, eventListener.listener);
    }
    this.audioEventListeners = [];
  };

  render() {
    const { wantsToPlay, isPlaying, context, source } = this.state;

    return (
      <>
        <audio ref={this.audioRef} id="audioElement" src="http://localhost:3001" />
        {wantsToPlay ? (
          <>
            {source && context && isPlaying ? (
              <Analyser context={context} source={source} />
            ) : (
              <Loading />
            )}
          </>
        ) : (
          <div id="play" />
        )}
      </>
    );
  }
}