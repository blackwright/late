import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStepBackward,
  faStepForward
} from '@fortawesome/free-solid-svg-icons';
import './AudioControls.scss';
import { songs } from '../../../songs';

type Props = {
  onHover: () => void;
  onHoverStop: () => void;
  audioIndex: number;
  prevTrack: () => void;
  nextTrack: () => void;
};

const AudioControls: React.FC<Props> = ({
  onHover,
  onHoverStop,
  audioIndex,
  prevTrack,
  nextTrack
}) => {
  const currentSong = songs[audioIndex];

  return (
    <div id="audio-controls" onMouseEnter={onHover} onMouseLeave={onHoverStop}>
      {currentSong.artist.toLocaleLowerCase()}
      {' - '}
      {currentSong.title.toLocaleLowerCase()}
      <div id="track-controls">
        <button onTouchEnd={prevTrack} onMouseUp={prevTrack}>
          <FontAwesomeIcon icon={faStepBackward} size="xs" />
        </button>
        <button onTouchEnd={nextTrack} onMouseUp={nextTrack}>
          <FontAwesomeIcon icon={faStepForward} size="xs" />
        </button>
      </div>
    </div>
  );
};

export default AudioControls;
