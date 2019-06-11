import React from 'react';
import classNames from 'classnames';
import './LoadingAudio.scss';

type Props = {
  isShown?: boolean;
};

const LoadingAudio: React.FC<Props> = ({ isShown = true }) => (
  <div className={classNames('loading-audio', { show: isShown })}>
    <span className="loading-dot" />
    <span className="loading-dot" />
    <span className="loading-dot" />
  </div>
);

export default LoadingAudio;
