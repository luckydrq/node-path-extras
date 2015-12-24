# node-path-extras
[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]

extra utilities for `path` module of nodejs

# API

## path.contains(mainPath, subPath)

```javascript
  var path = require('node-path-extras');
  console.log(path.contains('/a', '/a/b')); // true
```

## path.within(subPath, mainPath)

opposite to `path.contains`

```javascript
  var path = require('node-path-extras');
  console.log(path.within('/a/b', '/a')); // true
```

## path.along(aPath, bPath /*...*/)

alias `path.inpath`

```javascript
  var path = require('node-path-extras');
  console.log(path.along('/a/b/c', '/a/b', '/a/b/c/d')); // true
```

## path.isRelative(aPath)

```javascript
  var path = require('node-path-extras');
  console.log(path.isRelative('../a')); // true
  console.log(path.isRelative('/a'));   // false
```

## path.isAbsolute(aPath)

```javascript
  var path = require('node-path-extras');
  console.log(path.isAbsolute('../a')); // false
  console.log(path.isAbsolute('/a'));   // true

  // for windows
  console.log(path.isAbsolute('c:\a')); // true
```
## path.unique(arr)

remove paths in the same route in an array

```javascript
  var path = require('node-path-extras');
  console.log(path.unique(['/a/b', '/a', '/c'])); // ['/a', '/c']
```

## Lisence
MIT

[npm-image]: https://img.shields.io/npm/v/node-path-extras.svg?style=flat-square
[npm-url]: https://npmjs.org/package/node-path-extras
[travis-image]: https://img.shields.io/travis/luckydrq/node-path-extras/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/luckydrq/node-path-extras
[coveralls-image]: https://img.shields.io/coveralls/luckydrq/node-path-extras/master.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/luckydrq/node-path-extras?branch=master
