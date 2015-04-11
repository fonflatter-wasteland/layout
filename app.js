module.exports = (function() {
  'use strict';

  var express = require('express');

  var logger = require('morgan');
  var nunjucks = require('nunjucks');
  var path = require('path');

  var app = express();

  if (app.get('env') === 'production') {
    app.use(logger('short'));
  } else {
    app.use(logger('dev'));
  }

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
  app.use(errorHandler);

  app.on('mount', function(parent) {
    parent.use = noMoreHandlers;
  });

  /**
   * Handles all occurring errors by displaying error page and dumping stack
   * trace to log.
   */
  function errorHandler(err, req, res, next) {
    console.error(err.stack);

    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }

    res.render('error.html', {
      message: err.message,
    });
  }

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
   * {@link fallbackHandler} and {@link errorHandler} must be the last.
   */
  function noMoreHandlers() {
    var config = require('./package.json');
    throw new Error(config.name + ' must be app.use()d last!');
  }

  return app;
})();
