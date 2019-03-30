import React, { Component } from 'react';
import Analyser from './components/Analyser/Analyser';
import Controls from './components/Controls/Controls';

const AUDIO_SERVER_URL =
  process.env.REACT_APP_ENVIRONMENT === 'production'
    ? process.env.REACT_APP_AUDIO_SERVER_URL
    : 'http://localhost:3001';

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

  private audioRef: React.RefObject<HTMLAudioElement> = React.createRef();
  private audioEventListeners: AudioEventListeners = [];

  audioElement?: HTMLAudioElement;

  componentWillUnmount() {
    this.removeAudioEventListeners();
  }

  initialize = () => {
    const audioElement = this.audioRef.current!;
    this.audioElement = audioElement;

    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const source = context.createMediaElementSource(audioElement);

    this.addAudioEventListeners([
      { event: 'playing', listener: this.onAudioPlay },
      { event: 'pause', listener: this.onAudioPause },
      { event: 'error', listener: this.onAudioError }
    ]);

    this.setState({ context, source });
  };

  onTogglePlay = () => {
    if (this.audioElement == null) {
      this.initialize();
    }

    if (this.audioElement!.paused) {
      this.setState({ wantsToPlay: true });
      this.audioElement!.play();
    } else {
      this.setState({ wantsToPlay: false });
      this.audioElement!.pause();
    }
  };

  onAudioPlay = () => this.setState({ isPlaying: true });

  onAudioPause = () => this.setState({ isPlaying: false });

  onAudioError = console.error;

  addAudioEventListeners = (eventListeners: AudioEventListeners) => {
    for (const eventListener of eventListeners) {
      this.audioEventListeners.push(eventListener);
      this.audioElement!.addEventListener(
        eventListener.event,
        eventListener.listener
      );
    }
  };

  removeAudioEventListeners = () => {
    for (const eventListener of this.audioEventListeners) {
      this.audioElement!.removeEventListener(
        eventListener.event,
        eventListener.listener
      );
    }
    this.audioEventListeners = [];
  };

  render() {
    const { wantsToPlay, isPlaying, context, source } = this.state;

    return (
      <>
        <audio
          ref={this.audioRef}
          id="audioElement"
          src={AUDIO_SERVER_URL}
          preload={'auto'}
          crossOrigin="anonymous"
        />
        {source && context && <Analyser context={context} source={source} />}
        <Controls
          wantsToPlay={wantsToPlay}
          isPlaying={isPlaying}
          onTogglePlay={this.onTogglePlay}
        />
      </>
    );
  }
}
