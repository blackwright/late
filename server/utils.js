const net = require('net');

function isPortInUse(port) {
  return new Promise(resolve => {
    const server = net.createServer();

    server.once('error', err => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
        resolve(true);
      }
    });

    server.once('listening', () => {
      server.close();
      resolve(false);
    });

    server.listen(port);
  });
}

module.exports = {
  isPortInUse
};
