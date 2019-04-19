import React from 'react';
import * as VisualizationHOC from '../VisualizationHOC';
import './MobileDisabled.scss';

const MobileDisabled: React.FC<VisualizationHOC.WrappedProps> = () => {
  return (
    <div className="mobile-disabled">
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
