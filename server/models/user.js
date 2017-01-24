/*jshint esversion: 6 */
const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		minLength: 1,
		required: true,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	name: {
		type: String,
		required: true
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject();
	return _.pick(userObject, ['id', 'email', 'name']);
}

UserSchema.methods.generateAuthToken = function () {
	let access = 'auth';
	let user = this;
	let token = jwt.sign({_id: user._id.toHexString(), access}, 'princeTg').toString();
	user.tokens.push({access, token});
	return user.save().then(() => {
		return token;
	});
}

const User = mongoose.model('user', UserSchema);

module.exports = {User};
