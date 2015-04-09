#!/usr/bin/env node

(function() {
  'use strict';

  var app = require('./app-dev');
  app.listen(parseInt(process.env.PORT) || 62003);
})();
