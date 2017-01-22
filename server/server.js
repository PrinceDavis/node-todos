/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {Tser} = require('./models/user');

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

app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get('/todos/:id', (req, res) => {
	let id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(400).send({errorMessage: 'the given id is invalid'});
	}
	Todo.findById(id).then((todo) => {
		if (!todo) {
			return res.status(400).send({errorMessage: 'todo not found'});
		}
		return res.send({doc});
	}).catch((err) => res.status(400).send(err));
});

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});

module.exports = {app};