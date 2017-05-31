'use strict'

let config = require('./config/config'),
	logger = require('./utilities/logger');

logger.init(config);
let l = logger.root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

process.on('uncaughtException',  (err) => {
	l.error(err, 'Uncaught Exception');
});

process.on('uncaughtRejection', (err) => {
	l.error(err, 'Uncaught Rejection');
});
	
let mongoose = require('mongoose'),
	co = require('./utilities').co;

let initDB = () => {
	l.info('Initiating connection with DB');
	mongoose.connect(config.mongo.url);
	mongoose.connection.on('disconnected', (err) => {
		l.fatal(err, 'mongoose db disconnected %j');
	});
}

initDB();


try{

	let koa = require('koa'),
		koaConfig = require('./config/koa');

	l.info('Initiating Koa');
	let app = module.exports = new koa();
	koaConfig(app);
	app.init = co.wrap(function* (){
		l.info('Initiating server');
		app.server = app.listen(config.app.port);
		l.info('Server Initiated on port', config.app.port);
	});

	if(!module.parent){
		return app.init();
	}
} catch(err){
	l.fatal('File: Index, Server Error, Error: ', err);
}



