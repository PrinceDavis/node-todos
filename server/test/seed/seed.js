const {ObjectID} = require('mongodb');
const jw = require('jsonwebtoken');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  _id: userOneId,
  email: 'john@example.com',
  password: 'userOnePassword',
  name: 'john doe',
  tokens: [{
    access: 'auth',
    token: jw.sign({_id: userOneId, access: 'auth'}, process.env.JWT_SECRET).toString(),
  }]
}, {
  _id: userTwoId,
  email: 'jane@example.com',
  password: 'userTwoPassword',
  name: 'jane doe',
  tokens: [{
    access: 'auth',
    token: jw.sign({_id: userTwoId, access: 'auth'}, process.env.JWT_SECRET).toString(),
  }]
}];

const todos = [{
	_id: new ObjectID(),
	text: 'first test todo',
  _creator: userOneId
}, {
	_id: new ObjectID(),
	text: 'Second test todo',
  _creator: userTwoId
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

module.exports = {todos, users, populateTodos, populateUsers}
