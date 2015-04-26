suite('layout', function() {
  'use strict';

  var express = require('express');

  var expect = require('chai').expect;
  var logger = require('morgan');
  var request = require('supertest');

  var app = require('../dummy');

  test('any image', function(next) {
    request(app)
      .get('/img/header_over.jpg')
      .expect(200)
      .end(next);
  });

  test('any stylesheet', function(next) {
    request(app)
      .get('/css/style.css')
      .expect(200)
      .end(next);
  });

  test('dummy content', function(next) {
    request(app)
      .get('/dummy')
      .expect(200)
      .expect(/Dummy Page/)
      .expect(/Dummy Content/)
      .end(next);
  });

});
