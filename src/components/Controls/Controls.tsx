import React, { Component } from 'react';
import classNames from 'classnames';
import Loading from '../Loading/Loading';
import './Controls.scss';

type Props = {
  wantsToPlay: boolean;
  isPlaying: boolean;
  onTogglePlay: () => void;
};

type State = {
  showOverlay: boolean;
};

export default class Controls extends Component<Props, State> {
  state: State = { showOverlay: false };

  private lastTouchStartTimestamp?: number;
  private hideOverlayTimeoutId?: number;
  private removeEventListeners?: () => void;

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
        this.setState({ showOverlay: false });
      }, 2000);
    });
  };

  onPrev = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  onNext = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  doNothing = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
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
          <div className="navigation">
            <div
              className="arrow-container"
              onClick={this.onPrev}
              onMouseUp={this.doNothing}
            >
              <div id="prev" className="arrow" />
            </div>
            <div
              className="arrow-container"
              onClick={this.onNext}
              onMouseUp={this.doNothing}
            >
              <div id="next" className="arrow" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
