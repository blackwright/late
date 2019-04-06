import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Loading from '../Loading';
import * as Actions from '../../store/actions';
import * as versionInfo from '../../metadata/build-version.json';
import './Controls.scss';

const CONTROLS_FADE_OUT_DELAY = 1500;
const TOUCH_WAS_CLICK_THRESHOLD = 250;

type Props = ReturnType<typeof mapDispatchToProps> & {
  context?: AudioContext;
  wantsToPlay: boolean;
  isPlaying: boolean;
  togglePlay: () => void;
};

const Controls: React.FunctionComponent<Props> = props => {
  const [isOverlayShown, setIsOverlayShown] = useState(false);
  const [isArrowHovered, setIsArrowHovered] = useState(false);

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

  const timeoutRef = useRef<number>();

  const touchTimestampRef = useRef<number>();

  const showOverlay = useCallback(() => {
    timeoutRef.current != null && window.clearTimeout(timeoutRef.current);

    setIsOverlayShown(true);
    timeoutRef.current = window.setTimeout(() => {
      if (!isArrowHovered) {
        setIsOverlayShown(false);
      }
    }, CONTROLS_FADE_OUT_DELAY);
  }, [isArrowHovered]);

  const togglePlay = useCallback(() => {
    props.context && props.context.resume();
    props.togglePlay();
  }, [props.context, props.togglePlay]);

  const recordTouchTimestamp = useCallback((event: React.TouchEvent) => {
    event.preventDefault();
    touchTimestampRef.current = Date.now();
  }, []);

  const onMouseDown = useCallback((event: React.MouseEvent) => {
    if (event.nativeEvent.which === 1) {
      touchTimestampRef.current = Date.now();
    }
  }, []);

  const onMouseUp = useCallback((event: React.MouseEvent) => {
    if (
      event.nativeEvent.which === 1 &&
      touchTimestampRef.current &&
      Date.now() - touchTimestampRef.current < TOUCH_WAS_CLICK_THRESHOLD
    ) {
      togglePlay();
    }
  }, []);

  const onTouchEnd = useCallback((event: React.TouchEvent) => {
    event.preventDefault();
    if (
      touchTimestampRef.current &&
      Date.now() - touchTimestampRef.current < TOUCH_WAS_CLICK_THRESHOLD
    ) {
      showOverlay();
    }
  }, []);

  const onPrev = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.stopPropagation();
      props.goToPrevVisualization();
      showOverlay();
    },
    [props.goToPrevVisualization]
  );

  const onNext = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      event.stopPropagation();
      props.goToNextVisualization();
      showOverlay();
    },
    [props.goToNextVisualization]
  );

  const doNothing = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
  }, []);

  const onToggleArrowHover = useCallback((isHovered: boolean) => {
    setIsArrowHovered(isHovered);
  }, []);

  const { wantsToPlay, isPlaying } = props;

  return (
    <>
      {wantsToPlay && !isPlaying && <Loading />}
      <div
        id="overlay"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={recordTouchTimestamp}
        onTouchEnd={onTouchEnd}
        onMouseMove={showOverlay}
        className={classNames({ show: isOverlayShown })}
      >
        <h1 id="title">LTLY</h1>
        <div id="version">build {versionInfo.version}</div>
        {
          <div
            onTouchEnd={togglePlay}
            className={classNames({
              play: !wantsToPlay && !isPlaying,
              pause: wantsToPlay && isPlaying
            })}
          />
        }
        <div className="navigation">
          <div
            className="arrow-container"
            onClick={onPrev}
            onTouchStart={onPrev}
            onMouseUp={doNothing}
            onMouseEnter={() => onToggleArrowHover(true)}
            onMouseLeave={() => onToggleArrowHover(false)}
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
                points="
            45.63,75.8 0.375,38.087 45.63,0.375 "
              />
            </svg>
          </div>
          <div
            className="arrow-container"
            onClick={onNext}
            onTouchStart={onNext}
            onMouseUp={doNothing}
            onMouseEnter={() => onToggleArrowHover(true)}
            onMouseLeave={() => onToggleArrowHover(false)}
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
                points="
              0.375,0.375 45.63,38.087 0.375,75.8 "
              />
            </svg>
          </div>
        </div>
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
