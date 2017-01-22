/*jshint esversion: 6 */

const mongoose = require('mongoose');
const dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp';
mongoose.Promise = global.Promise;
mongoose.connect(dbUri);

module.exports = {mongoose};