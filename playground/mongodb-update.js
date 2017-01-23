const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connect to MongoDB server');

  // db.clos();
})
