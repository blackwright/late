import React from 'react';
import './NoWebAudioApi.scss';

const NoWebAudioApi = () => (
  <div id="no-web-audio">
    <p>Your device doesn't fully support the Web Audio API.</p>
    <p>This site should be viewed on a non-mobile or Android device.</p>
  </div>
);

export default NoWebAudioApi;
