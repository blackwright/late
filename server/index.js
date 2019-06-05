const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const ytdl = require('ytdl-core');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const URL = 'https://www.youtube.com/watch?v=hHW1oY26kxQ';

const options = {
  quality: [128, 127, 120, 96, 95, 94, 93]
};

app.use('/', (req, res) => {
  res.setHeader('Content-type', 'audio/mpeg');

  const stream = ytdl(URL, options);

  ffmpeg(stream)
    .noVideo()
    .format('mp3')
    .on('end', () => {
      console.log('Stream has ended.');
      res.end();
    })
    .on('error', err => {
      console.error(err.message ? err.message : err);
      res.end();
    })
    .stream(res, { end: true });
});

app.listen(process.env.PORT || 3002);
