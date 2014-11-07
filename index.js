var assert = require("assert-plus");
var bb = require("bit-buffer");

function createZeroBuffer(size) {
	"use strict";
	var buffer = new Buffer(size);
	buffer.fill(0);
	return buffer;
}
function bits2bytes(bits) {
	"use strict";
	return Math.ceil(bits/8);
}

function Shortener(from, to, fromMaxLength) {
	"use strict";
	this.fromCharacters = from;
	this.fromBitsNeeded = Math.ceil(Math.log(from.length)/Math.log(2));
	this.fromMaxLength = fromMaxLength;
	this.fromMaxLengthBits = 1 + Math.ceil(Math.log(fromMaxLength)/Math.log(2));
	this.toCharacters = to;
	this.toBitsNeeded = Math.floor(Math.log(to.length)/Math.log(2));
}
Shortener.prototype.shorten = function(from) {
	"use strict";
	assert.string(from, "from");
	if (from.length > this.fromMaxLength) {
		throw new Error("violates fromMaxLength");
	}
	var fromBits = this.fromMaxLengthBits + (from.length*this.fromBitsNeeded),
		toBitsToRead = fromBits,
		buffer = createZeroBuffer(bits2bytes(fromBits)),
		bv = new bb.BitView(buffer),
		bs = new bb.BitStream(bv), i, fromi, toi, to = "";
	bs.writeBits(from.length, this.fromMaxLengthBits);
	for (i = 0; i < from.length; i += 1) {
		fromi = this.fromCharacters.indexOf(from[i]);
		if (fromi === -1) {
			throw new Error("out of from");
		}
		bs.writeBits(fromi, this.fromBitsNeeded);
	}
	bs = new bb.BitStream(bv);
	for (i = 0; i < fromBits; i+= this.toBitsNeeded) {
		toi = bs.readBits(Math.min(this.toBitsNeeded, toBitsToRead), false);
		to += this.toCharacters[toi];
		toBitsToRead -= this.toBitsNeeded;
	}
	return to;
};
Shortener.prototype.expand = function(to) {
	"use strict";
	assert.string(to, "to");
	var toBits = this.fromMaxLengthBits + (to.length*this.toBitsNeeded),
		fromBitsToRead = toBits,
		buffer = createZeroBuffer(toBits),// how long?
		bv = new bb.BitView(buffer),
		bs = new bb.BitStream(bv), i, toi, fromi, from = "", fromLength;
	for (i = 0; i < to.length; i += 1) {
		toi = this.toCharacters.indexOf(to[i]);
		if (toi === -1) {
			throw new Error("out of to");
		}
		bs.writeBits(toi, this.toBitsNeeded);
	}
	bs = new bb.BitStream(bv);
	fromLength = bs.readBits(this.fromMaxLengthBits, false);
	for (i = 0; i < fromLength*this.fromBitsNeeded; i+= this.fromBitsNeeded) {
		fromi = bs.readBits(Math.min(this.fromBitsNeeded, fromBitsToRead), false);
		from += this.fromCharacters[fromi];
		fromBitsToRead -= this.fromBitsNeeded;
	}
	return from;
};
exports.create = function(from, to, fromMaxLength) {
	"use strict";
	assert.string(from, "from");
	assert.string(to, "to");
	assert.optionalNumber(fromMaxLength, "fromMaxLength");
	fromMaxLength = fromMaxLength || 64;
	if (from.length < 2) {
		throw new Error("from must have at least 2 characters");
	}
	if (from.length === to.length) {
		throw new Error("from and to have same amount of chars");
	}
	if (from.length > to.length) {
		throw new Error("from has more chars than to");
	}
	return new Shortener(from, to, fromMaxLength);
};
