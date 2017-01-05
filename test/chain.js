'use strict';


const assert = require('chai').assert;
const Chain = require('../src/chain');


describe('Chain', function() {
	
	describe('Chain Functions', function() {
		
		it('requestPreProcessor should return self', function () {
			let chain = new Chain();
			
			assert.equal(
				chain,
				chain.requestPreProcessor(function (p) { return p; } )
			);
		});
		
		it('requestPreProcessor should return self', function () {
			let chain = new Chain();
			
			assert.equal(
				chain,
				chain.requestPostProcessor(function (p) { return p; } )
			);
		});
		
		it('resultPreProcessor should return self', function () {
			let chain = new Chain();
			
			assert.equal(
				chain,
				chain.resultPreProcessor(function (p) { return p; } )
			);
		});
		
		it('resultPostProcessor should return self', function () {
			let chain = new Chain();
			
			assert.equal(
				chain,
				chain.resultPostProcessor(function (p) { return p; } )
			);
		});
		
		it('register should return self', function () {
			let chain = new Chain();
			
			assert.equal(
				chain,
				chain.register(1, function (p) { return p; } )
			);
		});
	});
	
});