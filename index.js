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

    // Add basic views for other apps
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

  /**
   * Serves static files in given directory.
   *
   * @param dir location of static files
   */
  function addAssetDirectory(dir) {
    app.use('/' + dir, express.static(path.join(__dirname, dir)));
  }

  return app;
})();
