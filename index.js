'use strict';

var assert = require('assert');
var path = require('path');
var os = require('os');
var resolvePath = path.resolve;
var normalizePath = path.normalize;
var sep = path.sep;
var slice = [].slice;

exports.contains = function contains(mainPath, subPath) {
  assert(typeof mainPath === 'string', 'mainPath required');
  assert(typeof subPath === 'string', 'subPath required');

  mainPath = resolvePath(mainPath);
  subPath = resolvePath(subPath);
  return subPath.indexOf(mainPath) === 0
    && subPath.slice(mainPath.length)[0] === sep;
};

exports.within = function within(subPath, mainPath) {
  return exports.contains(mainPath, subPath);
};

exports.along =
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

var RE_RELATIVE = /^\.{1,2}[\\\/]/;
var RE_WIN_ABSOLUTE = /^[a-zA-Z]:\\/;
var RE_ABSOLUTE = /^\/[^\/]/;

exports.isRelative = function isRelative(p) {
  if (os.platform === 'win32') {
    return !RE_WIN_ABSOLUTE.test(p) || RE_RELATIVE.test(p);
  } else {
    return !RE_ABSOLUTE.test(p) || RE_RELATIVE.test(p);
  }
};

exports.isAbsolute = path.isAbsolute || function isAbsolute(p) {
  return !exports.isRelative(p);
};

exports.unique = function unique(arr) {
  assert(typeof arr === 'object' && arr.hasOwnProperty('length'), 'array required');

  var len = arr.length, resultArr = arr.slice(0);
  for (var i = len - 1; i > 0; i--) {
    for (var j = 0; j < i; j++) {
      var p1 = arr[j];
      var p2 = arr[j + 1];
      if (exports.contains(p1, p2)) {
        resultArr = resultArr.filter(function(p) {
          return p !== p2;
        });
      } else if (exports.contains(p2, p1)) {
        resultArr = resultArr.filter(function(p) {
          return p !== p1;
        });
      }
    }
  }

  return resultArr;
};

exports.common = function common(arr) {
  assert(typeof arr === 'object' && arr.hasOwnProperty('length'), 'array required');

  if (arr.length === 1) {
    return null;
  }

  var commonParts = [];
  arr = arr.map(function(p) {
    return normalizePath(p).split(sep);
  });

  var iterate = true, i = 0, len = arr.length;
  while(iterate) {
    for (var j = 0; j < len - 1; j++) {
      if (arr[j][i] !== arr[j + 1][i]) {
        iterate = false;
        break;
      }
    }
    if (iterate) {
      commonParts.push(arr[0][i]);
      i++;
    }
  }

  if (commonParts.length > 0) {
    return commonParts.join(sep);
  } else {
    return null;
  }
};
