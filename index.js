#!/usr/bin/env node

(function() {
  'use strict';

  var express = require('express');
  var logger = require('morgan');
  var app = express();

  app.use(logger('dev'));

  var dummy = require('./dummy');
  app.use(dummy);

  var layout = require('./app');
  app.use(layout);

  var port = parseInt(process.env.PORT);

  if (port) {
    console.log('Running at port ' + port + ' ...');
    app.listen(port);
  } else {
    var config = require('./package.json');
    var hostname = config.name + '.node.js';
    port = 62000;
    console.log('Running at http://' + hostname + ':' + port + ' ...');
    app.listen(port, hostname);
  }

})();
