module.exports = (function() {
  'use strict';

  var express = require('express');

  var nunjucks = require('nunjucks');
  var path = require('path');

  var app = express();

  /**
   * Intializes view engine for given app in given directory.
   *
   * @param app express app to intialize views for
   * @param viewDir location of the views
   */
  app.setUpViews = function(app, viewDir) {
    app.locals.views = viewDir;

    // add basic views for other apps
    if (app !== this) {
      app.locals.views = [this.locals.views,
        app.locals.views,
      ];
    }

    var viewLoader = new nunjucks.FileSystemLoader(app.locals.views);
    var viewEnv = new nunjucks.Environment(viewLoader, {autoescape: true});

    viewEnv.express(app);
  };

  ['css',
    'img',
  ].forEach(addAssetDirectory);

  app.setUpViews(app, path.join(__dirname, 'views'));
  app.use(fallbackHandler);
  app.use(require('./error-handler'));

  app.on('mount', function(parent) {
    parent.use = noMoreHandlers;
  });

  /**
   * Serves static files in given directory.
   *
   * @param dir location of static files
   */
  function addAssetDirectory(dir) {
    app.use('/' + dir, express.static(path.join(__dirname, dir)));
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
   * {@link fallbackHandler} must be the last.
   */
  function noMoreHandlers() {
    var config = require('./package.json');
    throw new Error(config.name + ' must be app.use()d last!');
  }

  return app;
})();
