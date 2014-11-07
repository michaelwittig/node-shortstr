var assert = require("assert-plus");

var shortstr = require("../index.js");

describe("shortstr", function() {
	"use strict";
	describe("unexpected input", function() {
		it("zero length input", function() {
			var str = "",
				shortener = shortstr.create("12", "abcd", 4),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.equal(shortener.expand(sho), str);
		});
		it("3 => 4", function() {
			var str = "123321",
				shortener = shortstr.create("123", "abcd", 8),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.equal(shortener.expand(sho), str);
		});
		it("4 => 5", function() {
			var str = "12344321",
				shortener = shortstr.create("1234", "abcde", 8),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.equal(shortener.expand(sho), str);
		});
		it("5 => 6", function() {
			var str = "1234554321",
				shortener = shortstr.create("12345", "abcded", 16),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.equal(shortener.expand(sho), str);
		});
		it("2 => 4 with broken max length", function() {
			var str = "12212",
				shortener = shortstr.create("12", "abcd", 5),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
	});
	describe("2", function() {
		it("4", function() {
			var str = "1221",
				shortener = shortstr.create("12", "abcd", 4),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
		it("8", function() {
			var str = "1221",
				shortener = shortstr.create("12", "abcdefgh", 4),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
		it("16", function() {
			var str = "1221",
				shortener = shortstr.create("12", "abcdefghijklmnop", 4),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
		it("32", function() {
			var str = "1221",
				shortener = shortstr.create("12", "abcdefghijklmnopABCDEFGHIJKLMNOP", 4),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
	});
	describe("4", function() {
		it("8", function() {
			var str = "12344321",
				shortener = shortstr.create("1234", "abcdefgh", 16),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
		it("16", function() {
			var str = "12344321",
				shortener = shortstr.create("1234", "abcdefghijklmnop", 16),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
		it("32", function() {
			var str = "12344321",
				shortener = shortstr.create("1234", "abcdefghijklmnopABCDEFGHIJKLMNOP", 16),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
	});
	describe("8", function() {
		it("16", function() {
			var str = "1234567887654321",
				shortener = shortstr.create("12345678", "abcdefghijklmnop", 16),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
		it("32", function() {
			var str = "1234567887654321",
				shortener = shortstr.create("12345678", "abcdefghijklmnopABCDEFGHIJKLMNOP", 16),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
	});
	describe("real world", function() {
		it("numbers and separator", function() {
			var str = "-123.45,2343,2343.08,934762.3,-8275234",
				shortener = shortstr.create("0123456789,.-", "0123456789abcdefghijklmnopqrstuv", 64),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
		it("numbers and separator 2", function() {
			var str = "-122343.45,94323443,6343.08,934762.3,-8275234,221302234322,-53490269003",
				shortener = shortstr.create("0123456789,.-", "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-+", 128),
				sho = shortener.shorten(str);
			console.log(str + " => " + sho);
			assert.ok(sho.length <= str.length);
			assert.equal(shortener.expand(sho), str);
		});
	});
});
