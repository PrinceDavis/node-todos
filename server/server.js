/*jshint esversion: 6 */
require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

app.post('/todos', (req, res) =>{
	const todo = new Todo({
		text: req.body.text
	});
	todo.save().then((doc) => {
		res.send(doc);
	}, (err) =>{
		res.status(400).send(err);
	});
});

//get all to do
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}).catch((err) => {
		res.status(400).send(err);
	});
});

//get each todo
app.get('/todos/:id', (req, res) => {
	let id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(400).send({errorMessage: 'the given id is invalid'});
	}
	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(400).send({errorMessage: 'todo not found'});
		}
		return res.send({todo});
	}).catch((err) => res.status(400).send({errorMessage: 'todo not found'}));
});

//deleting todo
app.delete('/todos/:id', (req, res) => {
	let id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(400).send({errorMessage: 'the given id is invalid'});
	}
	Todo.findByIdAndRemove(id).then((todo) => {
		if (!todo) {
			return res.status(400).send({errorMessage: 'todo not found'});
		}
		return res.send({todo});
	}).catch((error) => res.status(400).send({errorMessage: 'todo not found '}));
});

//updating todo
app.patch('/todos/:id', (req, res) => {
	let id = req.params.id;
	let body = _.pick(req.body, ['text', 'completed']);
	if (!ObjectID.isValid(id)) {
		return res.status(400).send({errorMessage: 'the given id is invalid'});
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	}else {
		body.completed = false;
		body.completedAt = null;
	}
	Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
	.then((todo) => {
		if (!todo) {
			return res.status(400).send({errorMessage: 'Todo was not updated'});
		}
		return res.send({todo});
	}).catch((err) => res.status(400).send({errorMessage: 'Todo was not found'}));
});

//create new user
app.post('/users', (req, res) => {
	let body = _.pick(req.body, ['email', 'password', 'name']);
	let user = new User(body);
	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);
	}).catch((err) => res.status(400).send(err));
});


//get all users
app.get('/users', (req, res) => {
	User.find().then((users) => {
		res.send(users);
	}).catch((err) => res.status(400).send(err));
})


//get a users things
app.get('/users/me', authenticate, (req, res) => {
	res.send(req.user);
});

//starting app
app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

module.exports = {app};
