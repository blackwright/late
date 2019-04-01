import React from 'react';
import * as VisualizationHOC from './VisualizationHOC';
import './MobileDisabled.scss';

const MobileDisabled: React.FunctionComponent<
  VisualizationHOC.WrappedProps
> = ({ style }) => {
  return (
    <div className="visualization mobile-disabled" style={style}>
      <div className="content">
        <img
          id="desktop-icon"
          src={process.env.PUBLIC_URL + '/assets/images/desktop.png'}
        />
        <div id="message">
          Sorry, this visualization cannot be viewed on a mobile device.
        </div>
      </div>
    </div>
  );
};

export default VisualizationHOC.wrap(MobileDisabled);
