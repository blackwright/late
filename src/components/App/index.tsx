import React, { useState, useRef, useEffect, useCallback } from 'react';
import Analyser from '../Analyser';
import Controls from '../Controls';
import NoWebAudioApi from '../NoWebAudioApi';
import { useStateRef } from '../../utils/hooks';
import { modulo } from '../../utils';
import { audioPaths } from './utils';

const App: React.FC = () => {
  const [wantsToPlay, setWantsToPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [context, setContext, contextRef] = useStateRef<
    AudioContext | undefined
  >(undefined);
  const [source, setSource] = useState<MediaElementAudioSourceNode>();
  const [isContextUnavailable, setIsContextUnavailable] = useState(false);
  const audioIndexRef = useRef(0);

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
    const onAudioEnded = () => {
      const nextAudioIndex = modulo(
        audioIndexRef.current + 1,
        audioPaths.length
      );
      audioElement.src = audioPaths[nextAudioIndex];
      audioElement.play();
      audioIndexRef.current = nextAudioIndex;
    };

    audioElement.addEventListener('playing', onAudioPlay);
    audioElement.addEventListener('pause', onAudioPause);
    audioElement.addEventListener('error', onAudioError);
    audioElement.addEventListener('ended', onAudioEnded);

    return () => {
      audioElement.removeEventListener('playing', onAudioPlay);
      audioElement.removeEventListener('pause', onAudioPause);
      audioElement.removeEventListener('error', onAudioError);
      audioElement.removeEventListener('ended', onAudioEnded);
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
        src={audioPaths[0]}
        preload="auto"
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
