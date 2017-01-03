'use strict';


class ChainSetup {
	/**
	 * @param {[function(Chain)]} clone
	 */
	constructor(clone = []) {
		this._decorators = [...clone];
	}
	
	
	/**
	 * @param {function(Chain)|[function(Chain)]} decorator
	 * @returns {ChainSetup}
	 */
	decorate(decorator) {
		this._decorators = this._decorators.concat(decorator);
		return this;
	}

	/**
	 * @returns {ChainSetup}
	 */
	clone() {
		return new ChainSetup(this._decorators);
	}
}


module.export = ChainSetup;