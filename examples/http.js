var fs = require('fs');
var http = require('http');
var url = require('url');
var selfie = require('../');

http.createServer(function(req, res){
  if (req.url === '/' && !req.headers.referer) {
    selfie()
      .on('capture', function(camera) {
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        camera.stdout.pipe(res);
      });
  }
}).listen(8080);
