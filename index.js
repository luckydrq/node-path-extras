'use strict';

var assert = require('assert');
var path = require('path');
var resolvePath = path.resolve;
var slice = [].slice;

exports.contains = function contains(mainPath, subPath) {
  assert(typeof mainPath === 'string', 'mainPath required');
  assert(typeof subPath === 'string', 'subPath required');

  mainPath = resolvePath(mainPath);
  subPath = resolvePath(subPath);
  return subPath.indexOf(mainPath) === 0
    && subPath.slice(mainPath.length)[0] === '/';
};

exports.within = function within(subPath, mainPath) {
  return exports.contains(mainPath, subPath);
};

exports.inpath = function inpath(a, b /*...*/) {
  assert(arguments.length >= 2, 'args should be no less than 2');

  var args = slice.call(arguments);
  args.forEach(function(arg) {
    assert(typeof arg === 'string', 'arg should be string');
  });

  var len = args.length;
  for (var i = len - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      var p1 = args[j];
      var p2 = args[j + 1];
      if (!(exports.contains(p1, p2) || exports.within(p1, p2))) {
        return false;
      }
    }
  }

  return true;
};
