/*jshint esversion: 6 */
const expect = require('expect');
const request = require('supertest');
const {ObjectID}  = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);
describe('Post /todos', () => {
	it('Should create a new todo record', (done) => {
		let text = "Hello from my head";
		request(app)
			.post('/todos')
			.send({text})
			.expect(200)
			.expect((result) => {
				expect(result.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.find({text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((err) => done(err));
			});
	});

	it('should not create a todo on wrong argument', (done) => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err)return done(err);
				Todo.find().then((todos) =>{
					expect(todos.length).toBe(2);
					done();
				}).catch((err) => done(err));
			});
	});
});

describe('get /todos', () => {
	it('should get all to todos in the db', (done) => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done());
	});
});


describe('get /todos/:id', () => {
	it('should return a todo', (done) => {
		request(app)
			.get(`/todo/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect((res) => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done());
	});

	it('should return a 404 on wrong id', (done) => {
		request(app)
			.get(`/todos/${new ObjectID().toHexString()}`)
			.expect(400)
			.end(done());
	});
});
