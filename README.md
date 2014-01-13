# selfie

Take selfies with your webcam.

    npm install selfie -g
    selfie > selfie.jpg
    selfie --out selfie.jpg
    selfie --timer 2 --out selfie.jpg

Currently works (for me) on OS X. [Patches welcome](https://github.com/zaach/node-webcam-capture).

## photoshoot

Have a photoshoot:

    selfie --total 4 --out photoshoot.jpg

This will take a sequence of 4 photos, `photoshoot1.jpg`, ..., `photoshoot4.jpg`.

Combine that with the timer for webcam time-lapse photography:

    selfie --timer 10 --total 200 --out timelapse.jpg

## cli

```
Usage: selfie [--timer N] [--total N] [--out FILE]

    --timer, -t    The number of seconds to wait before a capture.    
    --total, -n    Total number of shots to take in sequence.         
    --out, -o      The file to write the image to.                    
    --help, -h     Display this help message.  
```

## node module

    var selfie = require('selfie');

    selfie({ out: 'smexy.jpg' });

Leave out the file name if you want to handle the streams yourself. selfie returns an `EventEmitter`.

    var fs = require('fs');
    var selfie = require('selfie');

    // equivalent to `selfie -n 3 -o example.jpg`
    selfie({ total: 3 })
      .on('capture', function(camera, number) {
        var output_file = fs.createWriteStream('example' + number +'.jpg', {encoding: 'binary'});
        camera.stdout.pipe(output_file);
      });

## License

MIT
