'use strict';


const REQUEST_PRE_PROCESSOR = 100;
const REQUEST_POST_PROCESSOR = 200;
const PROCESSOR = 300;
const RESULT_PRE_PROCESSOR = 400;
const RESULT_POST_PROCESSOR = 500;


module.exports = class Chain {
	
	constructor() {
		this._chain = {};
	}

		
	/**
	 * @param {Promise} initialPromise
	 * @param {number} key
	 * @returns {Promise}
	 * @private
	 */
	_reduceChainByKey(initialPromise, key) {
		return Chain._reduceChainPart(initialPromise, this._chain[key])
	}
	
	/**
	 * @param {Promise} initialPromise
	 * @param {[function(Promise): Promise]} chainPart
	 * @returns {Promise}
	 * @private
	 */
	static _reduceChainPart(initialPromise, chainPart) {
		return chainPart.reduce(
			(prevPromise, method) => method(prevPromise),
			initialPromise);
	}
	
	
	/**
	 * @param {Number} key
	 * @param {function(Promise): Promise} method
	 * @returns {Chain}
	 */
	register(key, method) {
		if (typeof this._chain.key === 'undefined') {
			this._chain[key] = [];
		}
		
		this._chain[key].push(method);
		return this;
	}	

	/**
	 * @param {function(Promise): Promise} method
	 */
	requestPreProcessor(method) {
		return this.register(REQUEST_PRE_PROCESSOR, method);
	}
	
	/**
	 * @param {function(Promise): Promise} method
	 */
	requestPostProcessor(method) {
		return this.register(REQUEST_POST_PROCESSOR, method);
	}
	
	/**
	 * @param {function(Promise): Promise} method
	 */
	processor(method) {
		return this.register(PROCESSOR, method);
	}
	
	/**
	 * @param {function(Promise): Promise} method
	 */
	resultPreProcessor(method) {
		return this.register(RESULT_PRE_PROCESSOR, method);
	}
	
	/**
	 * @param {function(Promise): Promise} method
	 */
	resultPostProcessor(method) {
		return this.register(RESULT_POST_PROCESSOR, method);
	}
	
	
	/**
	 * @param args
	 * @returns {Promise.<*>}
	 */
	execute(args) {
		Object.keys(this._chain)
			.sort()
			.reduce(
				this._reduceChainByKey.bind(this),
				new Promise((resolve) => resolve(args))
			);
	}
};