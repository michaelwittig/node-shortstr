var assert = require("assert-plus");

var shortstr = require("../index.js");

describe("shortstr", function() {
	"use strict";
	it("2 => 2", function() {
		var shortener = shortstr.create("12", "ab");
		assert.equal(shortener.expand(shortener.shorten("1221")), "1221");
	});
	it("2 => 4", function() {
		var shortener = shortstr.create("12", "abcd");
		assert.equal(shortener.expand(shortener.shorten("1221")), "1221");
	});
	it("2 => 8", function() {
		var shortener = shortstr.create("12", "abcdefgh");
		assert.equal(shortener.expand(shortener.shorten("1221")), "1221");
	});
	it("2 => 16", function() {
		var shortener = shortstr.create("12", "abcdefghijklmnop");
		assert.equal(shortener.expand(shortener.shorten("1221")), "1221");
	});
	it("4 => 16", function() {
		var shortener = shortstr.create("1234", "abcdefghijklmnop");
		assert.equal(shortener.expand(shortener.shorten("12344321")), "12344321");
	});
	it("8 => 16", function() {
		var shortener = shortstr.create("12345678", "abcdefghijklmnop");
		assert.equal(shortener.expand(shortener.shorten("1234567887654321")), "1234567887654321");
	});
});
