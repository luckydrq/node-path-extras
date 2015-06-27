'use strict';

var assert = require('assert');
var path = require('..');
var contains = path.contains;
var within = path.within;
var inpath = path.inpath;

describe('path extra test', function() {
  it('should contains', function() {
    assert(contains('/a', '/a/b') === true);
  });

  it('should not contains', function() {
    assert(contains('/a', '/ab') === false);
    assert(contains('/a', '/b/c') === false);
  });

  it('should within', function() {
    assert(within('/a/b', '/a') === true);
  });

  it('should not within', function() {
    assert(within('/ab', '/a') === false);
  });

  it('should inpath', function() {
    assert(inpath('/a', '/a/b', '/a/b/c') === true);
    assert(inpath('/a/b/c', '/a', '/a/b') === true);
  });

  it('should not inpath', function() {
    assert(inpath('/a', '/a/b', '/ab/c') === false);
    assert(inpath('/a/b', '/a', '/ab/c') === false);
    assert(inpath('/ab/c', '/a', '/a/c') === false);
    assert(inpath('/c', '/a', '/a/c') === false);
  });

});
