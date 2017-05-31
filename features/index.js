'use strict'

let utilities = require('./../utilities'),
	l = require('./../utilities/logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)});

module.exports = (router) => {
	try{

		l.info('Requiring features');
		
		let fs = utilities.fs;
		fs.readdirSync(__dirname).forEach((file) => {
			if(fs.lstatSync(__dirname + '/' + file).isDirectory()){
				l.info('Requiring Feature: ' + file);
				require(__dirname + '/' + file)(router);
			}
		});

	} catch(err){

		l.fatal('File: Features, Error requiring all features', err);
	}
}