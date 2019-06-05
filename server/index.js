const cluster = require('cluster');
const { isPortInUse } = require('./utils');

const port = process.env.PORT || 3002;

async function startServer() {
  if (await isPortInUse(port)) {
    process.exit();
  }

  // Spawn worker processes for audio server
  if (cluster.isMaster) {
    const cpuCount = require('os').cpus().length;

    for (let i = 0; i < cpuCount; i++) {
      cluster.fork();
    }

    cluster.on('online', worker => {
      console.log(
        `Worker process ${worker.process.pid} listening on port ${port}...`
      );
    });

    cluster.on('exit', (worker, code, signal) => {
      console.log(
        `Spawning worker to replace worker process ${
          worker.process.pid
        } exited with code ${code} and signal ${signal}`
      );
      cluster.fork();
    });
  } else {
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
      res.writeHead(200, {
        'Content-Type': 'audio/mpeg'
      });

      if (req.header('Range') == null) {
        return res.end();
      }

      const stream = ytdl(URL, options);

      ffmpeg(stream)
        .format('mp3')
        .on('end', () => {
          console.log('stream has ended');
          return res.end();
        })
        .on('error', err => {
          console.error('transcode error: ' + err.message ? err.message : err);
          return res.end();
        })
        .on('stderr', err => {
          console.log('stderr: ' + err);
          if (err.trim() === '') {
            return res.end();
          }
        })
        .pipe(
          res,
          { end: true }
        );
    });

    app.listen(port);
  }
}

startServer();
