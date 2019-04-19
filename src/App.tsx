import React, { useState, useRef, useEffect, useCallback } from 'react';
import Analyser from './components/Analyser';
import Controls from './components/Controls';
import NoWebAudioApi from './components/NoWebAudioApi';
import { useStateRef } from './utils/hooks';

const AUDIO_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_AUDIO_SERVER_URL
    : 'http://localhost:3002';

type Props = {};

const App: React.FC<Props> = props => {
  const [wantsToPlay, setWantsToPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [context, setContext, contextRef] = useStateRef<
    AudioContext | undefined
  >(undefined);
  const [source, setSource] = useState<MediaElementAudioSourceNode>();
  const [isContextUnavailable, setIsContextUnavailable] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  // disable if AudioContext is unavailable
  useEffect(() => {
    try {
      new window.AudioContext();
    } catch (err) {
      setIsContextUnavailable(true);
    }
  }, []);

  // attach audio event listeners
  useEffect(() => {
    const audioElement = audioRef.current!;

    const onAudioPlay = () => setIsPlaying(true);
    const onAudioPause = () => setIsPlaying(false);
    const onAudioError = console.error;

    audioElement.addEventListener('playing', onAudioPlay);
    audioElement.addEventListener('pause', onAudioPause);
    audioElement.addEventListener('error', onAudioError);

    return () => {
      audioElement.removeEventListener('playing', onAudioPlay);
      audioElement.removeEventListener('pause', onAudioPause);
      audioElement.removeEventListener('error', onAudioError);
    };
  }, []);

  const initializeAudioContext = useCallback(() => {
    const audioElement = audioRef.current!;
    const context = new window.AudioContext();
    const source = context.createMediaElementSource(audioElement);

    setContext(context);
    setSource(source);
  }, [audioRef.current]);

  const togglePlay = useCallback(() => {
    const audioElement = audioRef.current!;

    if (audioElement.paused) {
      setWantsToPlay(true);
      audioElement.play();

      if (!contextRef.current) {
        initializeAudioContext();
      }
    } else {
      setWantsToPlay(false);
      audioElement.pause();
    }
  }, [audioRef.current]);

  if (isContextUnavailable) {
    return <NoWebAudioApi />;
  }

  return (
    <>
      <audio
        ref={audioRef}
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
        togglePlay={togglePlay}
      />
    </>
  );
};

export default App;
