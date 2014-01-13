var fs = require('fs');
var http = require('http');
var url = require('url');
var selfie = require('../');


http.createServer(function(req, res){
  console.log('again???', req.url);

  if (req.url === '/' && !req.headers.referer) {
    console.log(req.headers);
    selfie()
      .on('capture', function(camera) {
        console.log('pipe it!');
        res.writeHead(200, {'Content-Type': 'image/jpeg' });
        camera.stdout.pipe(res);
        camera.stdout.on('exit', function() {
          res.end();
        });
      });
  }
}).listen(8080);
