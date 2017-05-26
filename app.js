'use strict'

let config = require('./config/config'),
	logger = require('./utilities').logger();

let l = logger.root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});
