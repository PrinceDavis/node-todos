const {MongoClient, ObjectID}  = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if (err) {
    return console.log('Unable to conect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  // db.collection('Todos').find({
  //     _id:  new ObjectID('587f8058f93c38224c01f9a8')
  //   }).toArray().then((docs) =>{
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) =>{
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Todos').find().count().then((count) => {
    console.log(`Todo Count: ${count}`);
  }, (err) => {
    console.log('Unable to get Todos', err);
  })

  // db.close();
})
