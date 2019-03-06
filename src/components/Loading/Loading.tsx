import React from 'react';
import classNames from 'classnames';
import './Loading.scss';

type Props = {
  show: boolean;
};

const Loading: React.FunctionComponent<Props> = ({ show }) => (
  <div className={classNames('loading', { show })}>
    <span className="loading-dot" />
    <span className="loading-dot" />
    <span className="loading-dot" />
  </div>
);

export default Loading;
