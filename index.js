var assert = require("assert-plus");
var BitString = require("bitstring");

function Shortener(from, to) {
	"use strict";
	this.fromCharacters = from;
	this.fromBitsNeeded = Math.ceil(Math.log(from.length)/Math.log(2));
	this.toCharacters = to;
	this.toBitsNeeded = Math.ceil(Math.log(to.length)/Math.log(2));
}
Shortener.prototype.shorten = function(from) {
	"use strict";
	assert.string(from, "from");
	var f = new BitString(), i, fromi, toi, to = "";
	for (i = 0; i < from.length; i += 1) {
		fromi = this.fromCharacters.indexOf(from[i]);
		if (fromi === -1) {
			throw new Error("out of from");
		}
		f.writebits(fromi, this.fromBitsNeeded);
	}
	f.flush(); f._pos = 0; // reset position to beginning
	for (i = 0; i < from.length*this.fromBitsNeeded; i+= this.toBitsNeeded) {
		toi = f.readbits(this.toBitsNeeded);
		to += this.toCharacters[toi];
	}
	return to;
};
Shortener.prototype.expand = function(to) {
	"use strict";
	assert.string(to, "to");
	var f = new BitString(), i, toi, fromi, from = "";
	for (i = 0; i < to.length; i += 1) {
		toi = this.toCharacters.indexOf(to[i]);
		if (toi === -1) {
			throw new Error("out of to");
		}
		f.writebits(toi, this.toBitsNeeded);
	}
	f.flush(); f._pos = 0; // reset position to beginning
	for (i = 0; i < to.length*this.toBitsNeeded; i+= this.fromBitsNeeded) {
		fromi = f.readbits(this.fromBitsNeeded);
		from += this.fromCharacters[fromi];
	}
	return from;
};
exports.create = function(from, to) {
	"use strict";
	assert.string(from, "from");
	assert.string(to, "to");
	if (from.length < 2) {
		throw new Error("from must have at least 2 characters");
	}
	if (from.length > to.length) {
		throw new Error("from has more chars than to");
	}
	return new Shortener(from, to);
};
