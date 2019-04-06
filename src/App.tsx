import React, { Component } from 'react';
import Analyser from './components/Analyser';
import Controls from './components/Controls';
import NoWebAudioApi from './components/NoWebAudioApi';

const AUDIO_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_AUDIO_SERVER_URL
    : 'http://localhost:3002';

type Props = {};

type State = {
  wantsToPlay: boolean;
  isPlaying: boolean;
  context?: AudioContext;
  source?: MediaElementAudioSourceNode;
  isContextUnavailable: boolean;
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
    source: undefined,
    isContextUnavailable: false
  };

  private audioRef: React.RefObject<HTMLAudioElement> = React.createRef();
  private audioEventListeners: AudioEventListeners = [];

  audioElement?: HTMLAudioElement;

  componentDidMount() {
    this.audioElement = this.audioRef.current!;

    try {
      new window.AudioContext();
    } catch (err) {
      this.setState({ isContextUnavailable: true });
    }
  }

  componentWillUnmount() {
    this.removeAudioEventListeners();
  }

  initializeAudioContext = () => {
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

  togglePlay = () => {
    if (this.audioElement!.paused) {
      this.setState({ wantsToPlay: true });
      this.audioElement!.play();

      if (!this.state.context) {
        this.initializeAudioContext();
      }
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
    const {
      wantsToPlay,
      isPlaying,
      context,
      source,
      isContextUnavailable
    } = this.state;

    if (isContextUnavailable) {
      return <NoWebAudioApi />;
    }

    return (
      <>
        <audio
          ref={this.audioRef}
          id="audioElement"
          src={AUDIO_SERVER_URL}
          preload={'auto'}
          crossOrigin="anonymous"
        />
        {context && source && <Analyser context={context} source={source} />}
        <Controls
          context={context}
          wantsToPlay={wantsToPlay}
          isPlaying={isPlaying}
          togglePlay={this.togglePlay}
        />
      </>
    );
  }
}
