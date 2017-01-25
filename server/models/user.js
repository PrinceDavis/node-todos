/*jshint esversion: 6 */
const mongoose = require('mongoose');
const _ = require('lodash');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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

//instance methods
UserSchema.methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject();
	return _.pick(userObject, ['id', 'email', 'name']);
}

UserSchema.methods.generateAuthToken = function () {
	let access = 'auth';
	let user = this;
	let token = jwt.sign({_id: user._id.toHexString()}, process.env.JWT_SECRET).toString();
	user.tokens.push({access, token});
	return user.save().then(() => {
		return token;
	});
}

UserSchema.methods.removeToken = function (token) {
	var user = this;
	return user.update({
		$pull: {
			tokens: {token}
		}
	});
}

//model methods
UserSchema.statics.findByToken = function (token) {
	let User = this;
	let decoded = undefined;

	try {
		decoded = jwt.verify(token, process.env.JWT_SECRET);
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
}

UserSchema.statics.findByCredentials = function (email, password) {
	let user = this;
	return user.findOne({email}).then((user) => {
		if (!user) {
			return Promise.reject();
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					resolve(user);
				}else{
					reject();
				}
			})
		})
	})
}

UserSchema.pre('save', function (next) {
	let user = this;
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		})
	}else{
		next();
	}
})
const User = mongoose.model('user', UserSchema);

module.exports = {User};
