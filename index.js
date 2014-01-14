#!/usr/bin/env node

const path = require('path');
const EventEmitter = require('events').EventEmitter;
const nopt = require('nopt');
const usage = require('nopt-usage');
const capture = require('webcam-capture');

const knownOpts = { 'timer' : Number
                  , 'total' : Number
                  , 'out' : path
                  , 'help' : Boolean
                  };
const shortHands = { 't' : ['--timer']
                   , 'n' : ['--total']
                   , 'o' : ['--out']
                   , 'h' : ['--help']
                   };
const descriptions = { 'timer' : 'The number of seconds to wait before a capture.'
                     , 'total' : 'Total number of shots to take in sequence.'
                     , 'out' : 'The file to write the image to.'
                     , 'help' : 'Display this help message.'
                     };

function selfie(options) {
  if (!options) options = {};

  const emitter = new EventEmitter();
  const delay = (options.timer || 0) * 1000;
  var i = 0;
  var out;

  if (options.help) {
    console.log('Usage: selfie [--timer N] [--amount N] [--out FILE]\n');
    console.log(usage(knownOpts, shortHands, descriptions));
    return;
  }

  if (options.total) {
    if (options.out) out = options.out.split('.');

    setTimeout(function shoot() {
      process.stderr.write('Taking photo ' + ++i + '\n');
      if (out) options.out = out[0] + i + (out[1] ? '.' + out[1] : '');
      var spawned = capture(options);
      emitter.emit('capture', spawned, i);
      spawned.on('exit', function() {
        if (i < options.total) {
          setTimeout(shoot, delay);
        }
      });
    }, delay);

  } else {
    setTimeout(function() {
      var spawned = capture(options);
      emitter.emit('capture', spawned);
    }, delay);
  }

  return emitter;
}

module.exports = selfie;

// CLI mode
if (require.main === module) {
  var parsed = nopt(knownOpts, shortHands);

  // Add defaults to make the CLI (possibly) more sane
  if (!parsed.out && parsed.total) {
    // ensure we save to a file when taking multiple shots
    parsed.out = 'selfie.jpg';
  } else if (!parsed.out) {
    parsed.stdio = [null, process.stdout, process.stderr];
  }

  selfie(parsed);
}
