# [late](https://blackwright.github.io/late/)

[For night owls.](https://blackwright.github.io/late/)

Late is a collection of audio visual experiments using a real-time audio stream.

Each scene has elements that animate in response to the changing beat and intensity of the music on the fly.

Tap the arrow buttons to switch to a different visualization.

Modify the quality setting to change the level of detail.

## Visualizations

<img src="https://github.com/blackwright/late/blob/master/docs/rain.gif" alt="Rain" width="100%">
<img src="https://github.com/blackwright/late/blob/master/docs/stars.gif" alt="Stars" width="100%">
<img src="https://github.com/blackwright/late/blob/master/docs/waveform.gif" alt="Waveform" width="100%">
<img src="https://github.com/blackwright/late/blob/master/docs/drummer.gif" alt="Drummer" width="100%">
<img src="https://github.com/blackwright/late/blob/master/docs/halpern.gif" alt="Halpern" width="100%">

## Installation

Node.js is required to run the project locally.

Install the dependencies and start both the audio server and front end client.

```sh
$ yarn install
$ yarn start
```

By default, the audio server is configured to run on port 3002 and the client on port 3000.

## Tech

- React 16.8 + TypeScript
- Web Audio API
- three.js
- Canvas API
- react-spring
- Node.js/Express
- ytdl-core/FFmpeg
- SCSS

## Else

Late is configured to not run on Safari and mobile iOS devices, where webkitAudioContext does not work well with a streaming audio source.
