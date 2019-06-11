import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import LoadingAudio from '../LoadingAudio';
import * as Actions from '../../store/actions';
import * as versionInfo from '../../metadata/build-version.json';
import AudioControls from './AudioControls';
import './Controls.scss';

const CONTROLS_FADE_OUT_DELAY = 3000;
const TOUCH_WAS_CLICK_THRESHOLD = 250;
const TOUCH_WAS_SWIPE_THRESHOLD = 350;

type Props = {
  audioContext?: AudioContext;
  wantsToPlay: boolean;
  isPlaying: boolean;
  togglePlay: () => void;
  audioIndex: number;
  prevTrack: () => void;
  nextTrack: () => void;
} & ReturnType<typeof mapDispatchToProps>;

type Touch = {
  timestamp: number;
  x: number;
};

const Controls: React.FC<Props> = props => {
  const [isOverlayShown, setIsOverlayShown] = useState(true);
  const [isControlHovered, setIsControlHovered] = useState(false);

  const timeoutRef = useRef<number>();
  const touchRef = useRef<Touch>();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      switch (event.which) {
        case 37:
        case 38: {
          props.goToPrevVisualization();
          break;
        }
        case 39:
        case 40: {
          props.goToNextVisualization();
          break;
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const showOverlay = useCallback(() => {
    timeoutRef.current != null && window.clearTimeout(timeoutRef.current);

    setIsOverlayShown(true);
    timeoutRef.current = window.setTimeout(() => {
      if (!isControlHovered) {
        setIsOverlayShown(false);
      }
    }, CONTROLS_FADE_OUT_DELAY);
  }, [isControlHovered]);

  const togglePlay = useCallback(() => {
    props.audioContext && props.audioContext.resume();
    props.togglePlay();
    showOverlay();
  }, [props.audioContext, props.togglePlay]);

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    event.preventDefault();
    touchRef.current = { timestamp: Date.now(), x: event.touches[0].clientX };
  }, []);

  const goToRepo = () => window.open('https://github.com/blackwright/late');

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    if (event.nativeEvent.which === 1) {
      touchRef.current = { timestamp: Date.now(), x: event.clientX };
    }
  }, []);

  const onMouseUp = useCallback((event: React.MouseEvent) => {
    if (
      event.nativeEvent.which === 1 &&
      touchRef.current &&
      Date.now() - touchRef.current.timestamp < TOUCH_WAS_CLICK_THRESHOLD
    ) {
      togglePlay();
    }
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      event.preventDefault();
      if (
        touchRef.current &&
        Date.now() - touchRef.current.timestamp < TOUCH_WAS_CLICK_THRESHOLD
      ) {
        showOverlay();
      }

      if (
        touchRef.current &&
        Date.now() - touchRef.current.timestamp < TOUCH_WAS_SWIPE_THRESHOLD
      ) {
        const deltaX = event.changedTouches[0].clientX - touchRef.current.x;
        if (Math.abs(deltaX) > 50) {
          if (deltaX < 0) {
            props.goToPrevVisualization();
          } else {
            props.goToNextVisualization();
          }
        }
      }
    },
    [isControlHovered]
  );

  const onPrev = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      props.goToPrevVisualization();
      showOverlay();
    },
    [isControlHovered]
  );

  const onNext = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.preventDefault();
      props.goToNextVisualization();
      showOverlay();
    },
    [isControlHovered]
  );

  const onHover = useCallback(() => setIsControlHovered(true), []);

  const onHoverStop = useCallback(() => setIsControlHovered(false), []);

  const { wantsToPlay, isPlaying, audioIndex, prevTrack, nextTrack } = props;

  return (
    <>
      {wantsToPlay && !isPlaying && <LoadingAudio />}
      <div
        id="overlay"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onMouseMove={showOverlay}
        className={classNames({ show: isOverlayShown })}
      >
        <h1
          id="title"
          onClick={goToRepo}
          onTouchEnd={goToRepo}
          onMouseEnter={onHover}
          onMouseLeave={onHoverStop}
        >
          late
        </h1>
        <div id="version">build {versionInfo.version}</div>
        <div
          id="play-pause-container"
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchEnd={togglePlay}
          onMouseEnter={onHover}
          onMouseLeave={onHoverStop}
        >
          <div
            className={classNames({
              play: !wantsToPlay && !isPlaying,
              pause: wantsToPlay && isPlaying
            })}
          />
        </div>
        <div className="navigation">
          <div
            className="arrow-container"
            onTouchEnd={onPrev}
            onMouseUp={onPrev}
            onMouseEnter={onHover}
            onMouseLeave={onHoverStop}
          >
            <svg
              className="arrow"
              width="60px"
              height="80px"
              viewBox="0 0 50 80"
            >
              <polyline
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="45.63,75.8 0.375,38.087 45.63,0.375"
              />
            </svg>
          </div>
          <div
            className="arrow-container"
            onTouchEnd={onNext}
            onMouseUp={onNext}
            onMouseEnter={onHover}
            onMouseLeave={onHoverStop}
          >
            <svg
              className="arrow"
              width="60px"
              height="80px"
              viewBox="0 0 50 80"
            >
              <polyline
                fill="none"
                stroke="#FFF"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="0.375,0.375 45.63,38.087 0.375,75.8"
              />
            </svg>
          </div>
        </div>
        <AudioControls
          onHover={onHover}
          onHoverStop={onHoverStop}
          audioIndex={audioIndex}
          prevTrack={prevTrack}
          nextTrack={nextTrack}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goToNextVisualization: () => dispatch(Actions.goToNextVisualization()),
  goToPrevVisualization: () => dispatch(Actions.goToPrevVisualization())
});

export default connect(
  null,
  mapDispatchToProps
)(Controls);
