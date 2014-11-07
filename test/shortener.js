var assert = require("assert-plus");

var shortstr = require("../index.js");

describe("shortstr", function() {
	"use strict";
	it("2 => 4", function() {
		var str = "1221",
			shortener = shortstr.create("12", "abcd", 4),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
	it("2 => 8", function() {
		var str = "1221",
			shortener = shortstr.create("12", "abcdefgh", 4),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
	it("2 => 16", function() {
		var str = "1221",
			shortener = shortstr.create("12", "abcdefghijklmnop", 4),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
	it("2 => 32", function() {
		var str = "1221",
			shortener = shortstr.create("12", "abcdefghijklmnopABCDEFGHIJKLMNOP", 4),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
	it("4 => 8", function() {
		var str = "12344321",
			shortener = shortstr.create("1234", "abcdefgh", 16),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
	it("4 => 16", function() {
		var str = "12344321",
			shortener = shortstr.create("1234", "abcdefghijklmnop", 16),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
	it("4 => 32", function() {
		var str = "12344321",
			shortener = shortstr.create("1234", "abcdefghijklmnopABCDEFGHIJKLMNOP", 16),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
	it("8 => 16", function() {
		var str = "1234567887654321",
			shortener = shortstr.create("12345678", "abcdefghijklmnop", 16),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
	it("8 => 32", function() {
		var str = "1234567887654321",
			shortener = shortstr.create("12345678", "abcdefghijklmnopABCDEFGHIJKLMNOP", 16),
			sho = shortener.shorten(str);
		console.log(str + " => " + sho);
		assert.ok(sho.length <= str.length);
		assert.equal(shortener.expand(sho), str);
	});
});
