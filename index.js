'use strict'

let config = require('./config/config'),
	logger = require('./utilities').logger;

logger.init(config);
let l = logger.root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

process.on('uncaughtException',  (err) => {
	l.error(err, 'Uncaught Exception');
});

process.on('uncaughtRejection', (err) => {
	l.error(err, 'Uncaught Rejection');
});

let initDB = () => {
	l.info('initiating connection with DB');
	mongoose.connect(config.mongo.url);
	mongoose.connection.on('disconnected', (err) => {
		l.error(err, 'mongoose db disconnected %j');
	});
}

initDB();


let koa = require('koa'),
	koaConfig = require('./../config/koa');

try{

	l.info('Initiating Koa');
	let app = module.exports = new koa();
	koaConfig(app);
	app.init = co.wrap(function* (){
		l.info('Initiating server with configurations %j', config);
		app.server = app.listen(config.app.port);
	});

	if(!module.parent){
		return app.init();
	}
} catch(err){
	l.error('File: Index, Server Error, Error: ', err);
}



