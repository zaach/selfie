var fs = require('fs');
var selfie = require('../');

// equivalent to `selfie -n 3 -o example.jpg`
selfie({ total: 3 })
  .on('capture', function(camera, number) {
    var output_file = fs.createWriteStream('example' + number +'.jpg', {encoding: 'binary'});
    camera.stdout.pipe(output_file);
  });
