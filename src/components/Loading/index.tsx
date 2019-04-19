import React from 'react';
import classNames from 'classnames';
import './Loading.scss';

type Props = {
  show?: boolean;
};

const Loading: React.FC<Props> = ({ show }) => (
  <div
    className={classNames('loading', { show: show === false ? false : true })}
  >
    <span className="loading-dot" />
    <span className="loading-dot" />
    <span className="loading-dot" />
  </div>
);

export default Loading;
