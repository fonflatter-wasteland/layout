#!/usr/bin/env node

(function() {
  'use strict';

  var port = parseInt(process.env.PORT);

  if (!port) {
    var random = require('random-js')();
    port = random.integer(62000, 62999);
  }

  var app = require('./app-dev');
  console.log('Running at http://localhost:' + port + '...');
  app.listen(port);
})();
