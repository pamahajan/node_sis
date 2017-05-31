'use strict'

let path = require('path');

let environmentConfig = {
	development: {
		database: 'mongodb://127.0.0.1:27017/sis_dev',
		log: [{
			level: 20,
			path: path.join(__dirname, './../logs/dev/sis.debug.log'),
			duration: 2 
		}, {
			level: 'info',
			path: path.join(__dirname, './../logs/dev/sis.info.log'),
			duration: 10 
		}, {
			level: 'error',
			path: path.join(__dirname, './../logs/dev/sis.error.log'),
			duration: 10
		}, {
			level: 'fatal',
			path: path.join(__dirname, './../logs/dev/sis.fatal.log'),
			duration: 10
		}]		
	}, 
	production: {
		database: 'mongodb://127.0.0.1:27017/sis_prod',
		log: [{
			level: 'info',
			path: path.join(__dirname, './../logs/prod/sis.info.log'),
			duration: 15
		}, {
			level: 'error',
			path: path.join(__dirname, './../logs/prod/sis.error.log'),
			duration: 30
		}, {
			level: 'fatal',
			path: path.join(__dirname, './../logs/prod/sis.fatal.log'),
			duration: 30
		}]
	}

}[process.env.NODE_ENV || 'development'];

let platformConfig = {

	log: environmentConfig.log,
	mongo: {
		url: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || environmentConfig.database
	}, 

	app: {
		port: 3000
	}
}

module.exports = platformConfig;