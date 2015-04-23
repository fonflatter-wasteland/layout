module.exports = (function() {
  'use strict';

  var express = require('express');

  var nunjucks = require('nunjucks');
  var path = require('path');

  var app = express();

  app.locals.views = path.join(__dirname, 'views');

  var viewLoader = new nunjucks.FileSystemLoader(app.locals.views);
  var viewEnv = new nunjucks.Environment(viewLoader, {autoescape: true});
  viewEnv.express(app);

  var ASSET_DIRECTORIES = ['css',
    'img',
  ];

  ASSET_DIRECTORIES.forEach(function(dir) {
    app.use('/' + dir, express.static(path.join(__dirname, dir)));
  });

  app.use(fallbackHandler);
  app.use(require('./error-handler'));

  app.on('mount', function(parent) {
    parent.use = noMoreHandlers;
  });

  /**
   * Handles every request which was not handled already by displaying
   * an error.
   */
  function fallbackHandler(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }

  /**
   * Prevents registering further request handlers because
   * {@link fallbackHandler} must be the last.
   */
  function noMoreHandlers() {
    var config = require('./package.json');
    throw new Error(config.name + ' must be app.use()d last!');
  }

  return app;
})();
