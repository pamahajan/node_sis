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


