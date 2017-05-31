'use strict'

let requireAllFeatures = require('./../features'),
	logger = require('./../utilities/logger'),
	l = require('./../utilities/logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

module.exports = (app) => {

	requireAllFeatures();
}