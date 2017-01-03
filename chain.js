'use strict';


const REQUEST_PRE_PROCESSOR = 0;
const REQUEST_POST_PROCESSOR = 1;
const PROCESSOR = 2;
const RESULT_PRE_PROCESSOR = 3;
const RESULT_POST_PROCESSOR = 4;


export default class Chain {
	
	/**
	 * @private
	 */
	_chain = [
		[], // REQUEST_PRE_PROCESSOR
		[], // REQUEST_POST_PROCESSOR
		[], // PROCESSOR
		[], // RESULT_PRE_PROCESSOR
		[]  // RESULT_POST_PROCESSOR
	];


	/**
	 * @param {Promise} initialPromise
	 * @param {[function(Promise): Promise]} chainPart
	 * @returns {Promise}
	 * @private
	 */
	static _reduceChainPart(initialPromise, chainPart) {
		return chainPart.reduce(
			(prevPromise, method) => method(prevPromise), 
			initialPromise)
	}
	
	/**
	 * @param {Number} key
	 * @param {function(Promise): Promise} value
	 * @returns {Chain}
	 * @private
	 */
	_add(key, value) {
		this._chain[key].push(value);
		return this;
	}
		

	/**
	 * @param {function(Promise): Promise} method
	 */
	requestPreProcessor(method) {
		return this._add(REQUEST_PRE_PROCESSOR, method);
	}
	
	/**
	 * @param {function(Promise): Promise} method
	 */
	requestPostProcessor(method) {
		return this._add(REQUEST_POST_PROCESSOR, method);
	}
	
	/**
	 * @param {function(Promise): Promise} method
	 */
	processor(method) {
		return this._add(PROCESSOR, method);
	}
	
	/**
	 * @param {function(Promise): Promise} method
	 */
	resultPreProcessor(method) {
		return this._add(RESULT_PRE_PROCESSOR, method);
	}
	
	/**
	 * @param {function(Promise): Promise} method
	 */
	resultPostProcessor(method) {
		return this._add(RESULT_POST_PROCESSOR, method);
	}
	
	
	/**
	 * @param args
	 * @returns {Promise.<*>}
	 */
	execute(args) {
		let initialPromise = new Promise((resolve) => resolve(args));
		return this._chain.reduce(this._reduceChainPart, initialPromise);
	}
}