[![Build Status](https://secure.travis-ci.org/michaelwittig/node-shortstr.png)](http://travis-ci.org/michaelwittig/node-shortstr)
[![NPM version](https://badge.fury.io/js/shortstr.png)](http://badge.fury.io/js/shortstr)
[![NPM dependencies](https://david-dm.org/michaelwittig/node-shortstr.png)](https://david-dm.org/michaelwittig/node-shortstr)

# shortstr

Imagine you have a string `"00011011"` containing only the chars `"0"` and `"1"`. You want to reduce the length of the string without losing information. You could map this string to `"abcd"` which is 50% smaller than before by using this transformation table.

	"00" => "a"
	"01" => "b"
	"10" => "c"
	"11" => "d"

And you can also apply this transformation twice and map `"abcd"` back to `"00011011"`. So whenever you have a limited set of input characters you can reduce the length of the string by using this `shortstr` module.

**Real world example**

Your String contains chars of `"0123456789,.-"` and you want to transform to `"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-+"`
		
`"-122343.45,94323443,6343.08,934762.3,-8275234,221302234322,-53490269003"` becomes 

`"7Nx83dblqizc4dGdQI0GVgD9XEcan93Fy438Ogz8an3Bwo903"` which is 30% shorter!

## Installation

```
npm install shortstr
```

## Usage

```javascript
var shortstr = require("shortstr");
```

Create ashortener that maps from `"01"` to `"abcd"` with a maximum input length of `8` chars.

```javascript
var shortener = shortstr.create("01", "abcd", 8); // create shortener

shortener.shorten("00011011"); // shorten the original String
// => "acacbd" or similar

shortener.expand("acacbd"); // expand the shortened String to the original String
// => "00011011"
```

## API

### create(from, to, fromMaxLength)

* `from`: `String` of chars that are allowed to be shortened (optimal length is something like 2, 4, 8, 16, 32, 64, ...)
* `to`: `String` of chars used to shorten (to.length > from.length, optimal length is something like 2, 4, 8, 16, 32, 64, ...)
* `fromMaxLength`: Maximum length `Number` of String that can be shortened (optimal fromMaxLength is something like 2, 4, 8, 16, 32, 64, ...)

## Contribution

If you want to create a Pull-Request please make sure that `make test` runs without failures.

### Code Style

	make jslint

### Unit Tests

	make mocha

### Circular depdendencies

	make circular
