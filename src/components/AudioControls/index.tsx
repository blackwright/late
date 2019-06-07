import React from 'react';
import './AudioControls.scss';
import { songs } from '../../songs';

type Props = {
  audioIndex: number;
  prevTrack: () => void;
  nextTrack: () => void;
};

const AudioControls: React.FC<Props> = ({
  audioIndex,
  prevTrack,
  nextTrack
}) => {
  const currentSong = songs[audioIndex];

  return (
    <div id="audio-controls">
      {currentSong.artist} - {currentSong.title}
      <div id="track-controls">
        <button onClick={prevTrack}>&lt;</button>
        <button onClick={nextTrack}>&gt;</button>
      </div>
    </div>
  );
};

export default AudioControls;
