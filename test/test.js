'use strict';

var assert = require('assert');
var path = require('..');
var os = require('os');
var contains = path.contains;
var within = path.within;
var inpath = path.inpath;
var isRelative = path.isRelative;
var isAbsolute = path.isAbsolute;
var unique = path.unique;

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

  it('should relative', function() {
    assert(isRelative('./a') === true);
    assert(isRelative('../a') === true);
    assert(isRelative('a') === true);
    assert(isRelative('.tmp') === true);

    if (os.platform === 'win32') {
      assert(isRelative('c:\\a') === false);
    } else {
      assert(isRelative('/a') === false);
    }
  });

  it('should absolute', function() {
    assert(isAbsolute('./a') === false);
    assert(isAbsolute('../a') === false);
    assert(isAbsolute('a') === false);
    assert(isAbsolute('.tmp') === false);

    if (os.platform === 'win32') {
      assert(isAbsolute('c:\\a') === true);
    } else {
      assert(isAbsolute('/a') === true);
    }
  });

  it('should unique', function() {
    var arr = unique(['/a/b', '/a', '/c']);
    assert(arr.length === 2);
    assert(arr.indexOf('/a') !== -1);
    assert(arr.indexOf('/a/b') === -1);
    assert(arr.indexOf('/c') !== -1);

    var arr2 = unique(['/a/b', '/a/c', '/b/c']);
    assert(arr2.length === 3);
    assert(arr2.indexOf('/a/b') !== -1);
    assert(arr2.indexOf('/a/c') !== -1);
    assert(arr2.indexOf('/b/c') !== -1);
  });
});
