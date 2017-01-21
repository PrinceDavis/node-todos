/*jshint esversion: 6 */

const mongoose = require('mongoose');
const User = mongoose.model('user', {
	email: {
		type: String,
		minLength: 1,
		required: true,
		trim: true
	},
	name: {
		type: String
	}
});

module.exports = {User};