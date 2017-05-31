'use strict'

let l = require('./../../../utilities/logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

module.exports = (router) => {
	try{

		// Define APIs
	} catch(err){

		throw(err);
		l.error('File: User Controller, Error: ', err);
	}
}