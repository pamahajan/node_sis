'use strict'
let b = require('bunyan');

let logger = (() => {
    try {

        let retObj = {};

        b.prototype.close = function(f) {
            if (!this._isSimpleChild) {
                this.streams.forEach(function(s) {
                    if (s.closeOnExit) {
                        console.log('closing stream s:', s);
                        s.stream.end(f);
                        s.closeOnExit = false;
                    }
                });
            }
        }

        retObj.init = (config) => {

        	let loggerObj = {
        		name: 'sis logs',
        		streams: []
        	};

        	for(let i=0; i<config.log.length; i++){
        		loggerObj.streams.push({
        			level: config.log[i].level,
        			stream: process.stdout
        		}, {
        			type: 'rotating-file',
        			path: config.log[i].path,
        			count: config.log[i].duration,
        			period: '1d',
        			level: config.log[i].level
        		});
        	}

            retObj.root = b.createLogger(loggerObj);
        }


        return retObj;
    } catch (err) {

        console.log('File: Logger, Error: ', err);
    }
})();


module.exports.logger = logger;