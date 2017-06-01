'use strict'

let mongoose = require('mongoose'),
	Schema = mongoose.Schema;

let userSchema = new Schema({
	name: {
		first: {type: String},
		last: {type: String},
		middle: {type: String}
	}, 
	contactInfo: {
		email: {type: String, unique: true},
		phoneNumber: {type: Number},
		address: {type: String}
	}, 
	rollNumber: {type: Number, unique: true}
});

mongoose.model('User', userSchema);