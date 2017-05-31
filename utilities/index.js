'use strict'

let l = require('./logger').root.child({'module': __filename.substring(__dirname.length + 1, __filename.length - 3)}),
    co = require('co'),
    fs = require('fs');

let custom_co = (() => {
    try{
    
        return co 
    } catch(err){

        l.error('File Utilities, Error while implementing custom co', err);
    }
})();

let custom_fs = (() => {
    try{

        return {
            readdirSync: fs.readdirSync,
            lstatSync: fs.lstatSync
        }
    } catch(err){

        l.error('File Utilities, Error while implementing custom fs', err);
    }
})();

module.exports.co = custom_co;
module.exports.fs = custom_fs;