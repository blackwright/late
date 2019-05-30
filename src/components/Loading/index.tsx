import React from 'react';
import classNames from 'classnames';
import './Loading.scss';

type Props = {
  isShown?: boolean;
};

const Loading: React.FC<Props> = ({ isShown = true }) => (
  <div className={classNames('loading', { show: isShown })}>
    <span className="loading-dot" />
    <span className="loading-dot" />
    <span className="loading-dot" />
  </div>
);

export default Loading;
