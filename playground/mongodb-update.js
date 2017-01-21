const {MongoClient, ObjectID} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if (err) {
    return console.log('Unable to connect to mongodb server');
  }
  console.log('Connect to MongoDB server');
  	db.collection("Todos").findOneAndUpdate(
  		{_id: new ObjectID("587f8058f93c38224c01f9a8")},
  		{$set: {completed: true}},
  		{returnOriginal: false}
  		).then((result) => {
  			console.log(result);
  		});
  // db.clos();
})
