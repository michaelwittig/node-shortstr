[![Build Status](https://secure.travis-ci.org/michaelwittig/node-shortstr.png)](http://travis-ci.org/michaelwittig/node-shortstr)
[![NPM version](https://badge.fury.io/js/shortstr.png)](http://badge.fury.io/js/shortstr)
[![NPM dependencies](https://david-dm.org/michaelwittig/node-shortstr.png)](https://david-dm.org/michaelwittig/node-shortstr)

# shortstr

Imagine you have a string `"00011011"` and want to reduce the length of the string without losing information. You could map this string to `"abcd"` which is 50% smaller than before. But you can also apply this transformation twice and map `"abcd"` back to `"00011011"`. So whenever you have a limited set of inpiut characters you can reduce the length of the string by using `shortstr` module.

## Installation

```
npm install shortstr
```

## Usage

```javascript
var shortstr = require("shortstr");

var shortener = shortstr.create("01", "abcd"); // create shortener

shortener.shorten("00011011");
// => "abcd"

shortener.expand("abcd");
// => "00011011"
```

## API

### create(from, to)

* `from`: String
* `to`: String

## Contribution

If you want to create a Pull-Request please make sure that `make test` runs without failures.

### Code Style

	make jslint

### Unit Tests

	make mocha

### Circular depdendencies

	make circular