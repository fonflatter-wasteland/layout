module.exports = (function() {
  'use strict';

  var express = require('express');

  var logger = require('morgan');
  var nunjucks = require('nunjucks');
  var path = require('path');
  var util = require('util');

  var app = express();

  app.use(logger('dev'));

  app.locals.views = path.join(__dirname, 'views');

  var viewLoader = new nunjucks.FileSystemLoader(app.locals.views);
  var viewEnv = new nunjucks.Environment(viewLoader, {autoescape: true});
  viewEnv.express(app);

  app.use('/css', express.static(path.join(__dirname, 'css')));
  app.use('/img', express.static(path.join(__dirname, 'img')));

  if (app.get('env') !== 'production') {
    var dummyText = require('lorem-ipsum');

    app.get('/dummy', function(req, res, next) {
      res.render('layout.html', {
        title: 'dummy page',
        content: dummyText({count: 10}),
      });
    });

    app.get('/error', function(req, res, next) {
      var err = new Error('Custom error');
      next(err);
    });

    app.get('/teapot-error', function(req, res, next) {
      var err = new Error('I’m a teapot');
      err.status = 418;
      next(err);
    });
  }

  // Catch 404 and forward to error handler
  app.use(function(req, res, _) {
    var err = new Error('Not Found');
    err.status = 404;
    throw err;
  });

  // Error handler
  app.use(function(err, req, res, next) {
    console.error(err.stack);

    if (err.status) {
      res.status(err.status);
    } else {
      res.status(500);
    }

    res.render('error.html', {
      message: err.message,
    });
  });

  return app;
})();
