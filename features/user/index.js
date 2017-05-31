'use strict'

let l = require('./../../utilities/logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

module.exports = (router) => {
	try{

		l.info('Registering User related models');
		require('./model');

		l.info('Registering User APIS')
		require('./api')(router);
	} catch(err){

		l.error('File: User Index, Error: ', err);
		throw(err);
	}
}