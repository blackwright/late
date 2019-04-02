import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Loading from '../Loading';
import * as Actions from '../../store/actions';
import './Controls.scss';

type Props = ReturnType<typeof mapDispatchToProps> & {
  wantsToPlay: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
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
      Date.now() - this.lastTouchStartTimestamp < 250
    ) {
      this.props.onTogglePlay();
    }
  };

  onTouchStart = (event: React.TouchEvent) => {
    event.preventDefault();
    this.lastTouchStartTimestamp = Date.now();
  };

  onTouchEnd = (event: React.TouchEvent) => {
    event.preventDefault();
    if (
      this.lastTouchStartTimestamp &&
      Date.now() - this.lastTouchStartTimestamp < 250
    ) {
      this.props.onTogglePlay();
    }
  };

  onMouseMove = () => {
    window.clearTimeout(this.hideOverlayTimeoutId);

    this.setState({ showOverlay: true }, () => {
      this.hideOverlayTimeoutId = window.setTimeout(() => {
        if (!this.state.isArrowHovered) {
          this.setState({ showOverlay: false });
        }
      }, 2000);
    });
  };

  onPrev = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.goToPrevVisualization();
  };

  onNext = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    this.props.goToNextVisualization();
  };

  doNothing = (event: React.MouseEvent<HTMLDivElement>) => {
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
    const { wantsToPlay, isPlaying } = this.props;
    const { showOverlay } = this.state;

    return (
      <>
        {!wantsToPlay && <div id="play" />}
        {wantsToPlay && !isPlaying && <Loading />}
        <div
          id="overlay"
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          onTouchStart={this.onTouchStart}
          onTouchEnd={this.onTouchEnd}
          onMouseMove={this.onMouseMove}
          className={classNames({ show: showOverlay })}
        >
          <h1 id="title">LTLY</h1>
          <div className="navigation">
            <div
              className="arrow-container"
              onClick={this.onPrev}
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
