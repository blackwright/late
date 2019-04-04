import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Loading from '../Loading';
import * as Actions from '../../store/actions';
import './Controls.scss';

const CONTROLS_FADE_OUT_DELAY = 1500;
const TOUCH_WAS_CLICK_THRESHOLD = 250;

type Props = ReturnType<typeof mapDispatchToProps> & {
  wantsToPlay: boolean;
  isPlaying: boolean;
  togglePlay: () => void;
};

type State = {
  showOverlay: boolean;
  isArrowHovered: boolean;
};

class Controls extends Component<Props, State> {
  state: State = { showOverlay: false, isArrowHovered: false };

  private lastTouchStartTimestamp?: number;
  private hideOverlayTimeoutId?: number;

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    this.showOverlay();
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
  }

  onMouseDown = (event: React.MouseEvent) => {
    if (event.nativeEvent.which === 1) {
      this.lastTouchStartTimestamp = Date.now();
    }
  };

  onMouseUp = (event: React.MouseEvent) => {
    if (
      event.nativeEvent.which === 1 &&
      this.lastTouchStartTimestamp &&
      Date.now() - this.lastTouchStartTimestamp < TOUCH_WAS_CLICK_THRESHOLD
    ) {
      this.props.togglePlay();
    }
  };

  recordTouchTimestamp = (event: React.TouchEvent) => {
    event.preventDefault();
    this.lastTouchStartTimestamp = Date.now();
  };

  onTouchEnd = (event: React.TouchEvent) => {
    event.preventDefault();
    if (
      this.lastTouchStartTimestamp &&
      Date.now() - this.lastTouchStartTimestamp < TOUCH_WAS_CLICK_THRESHOLD
    ) {
      this.showOverlay();
    }
  };

  showOverlay = () => {
    window.clearTimeout(this.hideOverlayTimeoutId);

    this.setState({ showOverlay: true }, () => {
      this.hideOverlayTimeoutId = window.setTimeout(() => {
        if (!this.state.isArrowHovered) {
          this.setState({ showOverlay: false });
        }
      }, CONTROLS_FADE_OUT_DELAY);
    });
  };

  onPrev = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    this.props.goToPrevVisualization();
    this.showOverlay();
  };

  onNext = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation();
    this.props.goToNextVisualization();
    this.showOverlay();
  };

  doNothing = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  onKeyDown = (event: KeyboardEvent) => {
    switch (event.which) {
      case 37:
      case 38: {
        this.props.goToPrevVisualization();
        break;
      }
      case 39:
      case 40: {
        this.props.goToNextVisualization();
        break;
      }
    }
  };

  onToggleArrowHover = (isHovered: boolean) => {
    this.setState({ isArrowHovered: isHovered });
  };

  render() {
    const { wantsToPlay, isPlaying, togglePlay } = this.props;
    const { showOverlay } = this.state;

    return (
      <>
        {wantsToPlay && !isPlaying && <Loading />}
        <div
          id="overlay"
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.recordTouchTimestamp}
          onTouchEnd={this.onTouchEnd}
          onMouseMove={this.showOverlay}
          className={classNames({ show: showOverlay })}
        >
          <h1 id="title">LTLY</h1>
          {
            <div
              onTouchStart={togglePlay}
              className={classNames({
                play: !wantsToPlay && !isPlaying,
                pause: wantsToPlay && isPlaying
              })}
            />
          }
          <div className="navigation">
            <div
              className="arrow-container"
              onClick={this.onPrev}
              onTouchStart={this.onPrev}
              onMouseUp={this.doNothing}
              onMouseEnter={() => this.onToggleArrowHover(true)}
              onMouseLeave={() => this.onToggleArrowHover(false)}
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
              onClick={this.onNext}
              onTouchStart={this.onNext}
              onMouseUp={this.doNothing}
              onMouseEnter={() => this.onToggleArrowHover(true)}
              onMouseLeave={() => this.onToggleArrowHover(false)}
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
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  goToNextVisualization: () => dispatch(Actions.goToNextVisualization()),
  goToPrevVisualization: () => dispatch(Actions.goToPrevVisualization())
});

export default connect(
  null,
  mapDispatchToProps
)(Controls);
