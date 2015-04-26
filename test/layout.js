suite('layout', function() {
  'use strict';

  var express = require('express');

  var expect = require('chai').expect;
  var logger = require('morgan');
  var request = require('supertest');

  var dummy = require('../dummy');
  var layout = require('../app');

  var app = express();
  app.use(logger('dev'));
  app.use(dummy);
  app.use(layout);

  test('dummy content', function(next) {
    request(app)
      .get('/dummy')
      .expect(200)
      .expect(/Dummy Page/)
      .expect(/Dummy Content/)
      .end(next);
  });

  test('error with status', function(next) {
    request(app)
      .get('/teapot-error')
      .expect(418)
      .expect(/I’m a teapot/)
      .end(next);
  });

  test('error without status', function(next) {
    request(app)
      .get('/error')
      .expect(500)
      .expect(/Custom error/)
      .end(next);
  });

  test('non-existent page', function(next) {
    request(app)
      .get('/non-existent')
      .expect(404)
      .expect(/Not Found/)
      .end(next);
  });

  test('reqistering app after layout', function() {
    expect(function() {
      app.use(dummy);
    }).to.throw(/must be app.use\(\)d last/);
  });
});
