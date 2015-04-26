module.exports = (function() {
  'use strict';

  var express = require('express');

  var logger = require('morgan');
  var path = require('path');

  var errorHandler = require('fonflatter-error-handler/app');
  var layout = require('..');

  var app = express();

  layout.setUpViews(app, path.join(__dirname, 'views'));
  app.use(logger('dev'));
  app.use(layout);
  app.get('/dummy', dummyPage);
  app.use(errorHandler);

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

  return app;
})();
