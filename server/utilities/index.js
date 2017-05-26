'use strict'
let b = require('bunyan');

let logger = function(opts) {
    try {

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

        let lm = module.exports = {};

        lm.init = (config) => {
            lm.root = b.createLogger({
                name: 'root',
                streams: [{
                    level: config.log.level,
                    stream: process.stdout
                }, {
                    type: 'rotating-file',
                    path: config.log.path,
                    count: 30,
                    period: '1d',
                    level: config.log.level
                }]
            });
        }

    } catch (err) {

        console.log('File: Logger, Error: ', err);
    }
}
