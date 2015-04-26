module.exports = (function() {
  'use strict';

  var express = require('express');

  var nunjucks = require('nunjucks');
  var path = require('path');

  var layout = require('./app');

  var app = express();

  layout.setUpViews(app, path.join(__dirname, 'dummyViews'));

  app.get('/dummy', dummyPage);
  app.get('/error', dummyErrorPage);
  app.get('/teapot-error', teapotErrorPage);
  app.use(require('./error-handler'));

  /**
   * Request handler throwing an error for testing.
   * @see teapotErrorPage
   */
  function dummyErrorPage(req, res, next) {
    var err = new Error('Custom error');
    next(err);
  }

  /**
   * Request handler retuning layout template with dummy text for testing.
   */
  function dummyPage(req, res, next) {
    var dummyText = require('lorem-ipsum');
    res.render('dummy.html', {
      title: 'Dummy Page',
      content: dummyText({count: 10}),
    });
  }

  /**
   * Request handler throwing an error with HTTP status for testing.
   * @see dummyErrorPage
   */
  function teapotErrorPage(req, res, next) {
    var err = new Error('I’m a teapot');
    err.status = 418;
    next(err);
  }

  return app;
})();
