import React, { useState, useRef, useEffect, useCallback } from 'react';
import Analyser from '../Analyser';
import Controls from '../Controls';
import { useStateRef } from '../../utils/hooks';
import { modulo } from '../../utils';
import { songs } from '../../songs';

const App: React.FC = () => {
  const [wantsToPlay, setWantsToPlay] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioContext, setAudioContext, audioContextRef] = useStateRef<
    AudioContext | undefined
  >(undefined);
  const [audioSource, setSource] = useState<MediaElementAudioSourceNode>();
  const [audioIndex, setAudioIndex, audioIndexRef] = useStateRef(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const nextTrack = useCallback(() => {
    const audioElement = audioRef.current!;
    const nextAudioIndex = modulo(audioIndex + 1, songs.length);
    audioElement.src = songs[nextAudioIndex].path;
    audioElement.play();
    setAudioIndex(nextAudioIndex);
  }, [audioIndex, audioRef.current]);

  const prevTrack = useCallback(() => {
    const audioElement = audioRef.current!;
    const prevAudioIndex = modulo(audioIndex - 1, songs.length);
    const shouldStayOnThisTrack = audioElement.currentTime > 5;
    audioElement.src =
      songs[shouldStayOnThisTrack ? audioIndex : prevAudioIndex].path;
    audioElement.play();
    setAudioIndex(prevAudioIndex);
  }, [audioIndex, audioRef.current]);

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

  // next track listener on track end
  useEffect(() => {
    const audioElement = audioRef.current!;

    audioElement.addEventListener('ended', nextTrack);
    return () => audioElement.removeEventListener('ended', nextTrack);
  }, [audioIndex, audioRef.current]);

  const initializeAudioContext = useCallback(() => {
    const audioElement = audioRef.current!;
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const audioSource = audioContext.createMediaElementSource(audioElement);

    setAudioContext(audioContext);
    setSource(audioSource);
  }, [audioRef.current]);

  const togglePlay = useCallback(() => {
    const audioElement = audioRef.current!;

    if (audioElement.paused) {
      setWantsToPlay(true);
      audioElement.play();

      if (!audioContextRef.current) {
        initializeAudioContext();
      }
    } else {
      setWantsToPlay(false);
      audioElement.pause();
    }
  }, [audioRef.current]);

  return (
    <>
      <audio
        ref={audioRef}
        id="audioElement"
        src={songs[0].path}
        preload="auto"
        crossOrigin="anonymous"
      />

      {audioContext && audioSource && (
        <Analyser audioContext={audioContext} audioSource={audioSource} />
      )}

      <Controls
        audioContext={audioContext}
        wantsToPlay={wantsToPlay}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        audioIndex={audioIndex}
        prevTrack={prevTrack}
        nextTrack={nextTrack}
      />
    </>
  );
};

export default App;
