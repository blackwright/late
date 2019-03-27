import React, { Component } from 'react';
import Loading from './components/Loading/Loading';
import Analyser from './components/Analyser/Analyser';

const AUDIO_SERVER_URL =
  process.env.REACT_APP_AUDIO_SERVER_URL || 'http://localhost:3001';

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
  private lastMouseDownTimestamp?: number;

  audioElement?: HTMLAudioElement;

  componentDidMount() {
    window.addEventListener('mousedown', this.onMouseDown);
    window.addEventListener('mouseup', this.onMouseUp);
  }

  componentWillUnmount() {
    this.removeAudioEventListeners();

    window.removeEventListener('mousedown', this.onMouseDown);
    window.removeEventListener('mouseup', this.onMouseUp);
  }

  initialize = () => {
    const audioElement = this.audioRef.current!;
    this.audioElement = audioElement;

    const context = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const source = context.createMediaElementSource(audioElement);

    this.addAudioEventListeners([
      { event: 'playing', listener: this.onPlay },
      { event: 'pause', listener: this.onPause },
      { event: 'error', listener: this.onError }
    ]);

    this.setState({ context, source });
  };

  onMouseDown = (event: MouseEvent) => {
    if (event.which === 1) {
      this.lastMouseDownTimestamp = Date.now();
    }
  };

  onMouseUp = () => {
    if (
      this.lastMouseDownTimestamp &&
      Date.now() - this.lastMouseDownTimestamp < 250
    ) {
      this.onClick();
    }
  };

  onClick = () => {
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

  onPlay = () => this.setState({ isPlaying: true });

  onPause = () => this.setState({ isPlaying: false });

  onError = console.error;

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
        {source && context && (
          <>
            <Analyser context={context} source={source} />
            {wantsToPlay && <Loading show={!isPlaying} />}
          </>
        )}
        {!wantsToPlay && <div id="play" />}
      </>
    );
  }
}
