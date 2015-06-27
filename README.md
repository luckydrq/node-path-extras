# node-path-extras
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

alias for `path.inpath`

```javascript
  var path = require('node-path-extras');
  console.log('/a/b/c', '/a/b', '/a/b/c/d'); // true
```
