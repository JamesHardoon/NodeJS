/**
 * !!! readFile 时，是从根目录读取文件的
 */
var fs = require('fs');
var http = require('http');

var server = http.createServer();
server.on('request', function (req, res) {
  var url = req.url;
  if (url === '/index') {
    fs.readFile('./01.node/10.index.html', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain, charset=utf-8');
        res.end('ERROR: cannot read index');
      } else {
        res.setHeader('Content-Type', 'text/html, charset=utf-8');
        res.end(data);
      }
    })
  } else if (url === '/pic') {
    fs.readFile('./01.node/89.jpg', function (err, data) {
      if (err) {
        res.setHeader('Content-Type', 'text/plain, charset=utf-8');
        res.end('ERROR: cannot read pic');
      } else {
        res.setHeader('Content-Type', 'image/jpg');
        res.end(data);
      }
    })
  } else {
    res.setHeader('Content-Type', 'text/plain, charset=utf-8');
    res.end('Page Not Found');
  }
});

server.listen(9000, function () {
  console.log('server is running...');
});

