const http = require('http');

const myServer = http.createServer((req, res) => {
  const clientIp = req.socket.remoteAddress;
  console.log(`${req.method} request made from ${clientIp} to: ${req.url}`);
  res.statusCode = 207;
  res.setHeader('content-type', 'text/tarek');
  res.end(
    'Tarek Monowar server working and see by rafee in his Room. and i set it  my room...wow Amazing'
  );
});

const port = 80;
const hostName = '192.168.0.108';

myServer.listen(port, hostName, () => {
  console.log(`server run at https//${hostName}:${port}`);
});
