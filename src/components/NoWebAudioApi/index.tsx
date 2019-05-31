import React from 'react';
import './NoWebAudioApi.scss';

const NoWebAudioApi = () => (
  <div id="no-web-audio">
    <p>Your device doesn't fully support the Web Audio API.</p>
    <p>This site can be viewed on a desktop or Android device.</p>
  </div>
);

export default NoWebAudioApi;
