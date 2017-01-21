/*jshint esversion: 6 */

const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {Tser} = require('./models/user');

const app = express();
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

app.listen(8000, () => {
	console.log('Server started on port 8000');
});

module.exports = {app}