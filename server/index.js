const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const ytdl = require('ytdl-core');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const URL = 'https://www.youtube.com/watch?v=hHW1oY26kxQ';

const options = { quality: [91, 92, 93, 94, 95] };
const stream = ytdl(URL, options);

app.use('/', (req, res) => {
  res.setHeader('Content-type', 'audio/mpeg');

  ffmpeg(stream)
    .noVideo()
    .format('mp3')
    .on('end', () => console.log('end of stream'))
    .on('error', err => {
      console.error('Ending response:', err);
      res.end();
    })
    .pipe(
      res,
      { end: true }
    );
});

app.listen(3001);
