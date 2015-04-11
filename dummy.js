module.exports = (function() {
  'use strict';

  var express = require('express');

  var nunjucks = require('nunjucks');
  var path = require('path');

  var layout = require('./app');

  var app = express();

  app.locals.views = [layout.locals.views,
    path.join(__dirname, 'views'),
  ];

  var viewLoader = new nunjucks.FileSystemLoader(app.locals.views);
  var viewEnv = new nunjucks.Environment(viewLoader, {autoescape: true});
  viewEnv.express(app);

  app.get('/dummy', dummyResponse);
  app.get('/error', dummyError);
  app.get('/teapot-error', teapotError);

  /**
   * Request handler throwing an error for testing.
   * @see teapotError
   */
  function dummyError(req, res, next) {
    var err = new Error('Custom error');
    next(err);
  }

  /**
   * Request handler retuning layout template with dummy text for testing.
   */
  function dummyResponse(req, res, next) {
    var dummyText = require('lorem-ipsum');
    res.render('layout.html', {
      title: 'dummy page',
      content: dummyText({count: 10}),
    });
  }

  /**
   * Request handler throwing an error with HTTP status for testing.
   * @see dummyError
   */
  function teapotError(req, res, next) {
    var err = new Error('I’m a teapot');
    err.status = 418;
    next(err);
  }

  return app;
})();
