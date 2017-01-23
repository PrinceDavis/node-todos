const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
  if (err) {
    console.log('Unable to connect to mongodb serer');
  }
  console.log('Connected to mongodb server');
  // db.collection('Todos').deleteMany({text: 'Something to do'}).then((result) => {
  //   console.log(result);
  // }, (err) => {
  //   console.log('Unable to delete record', err);
  // });
  // db.collection('Todos').deleteOne({text: 'hello you'}).then((result) =>{
  //   console.log(result);
  // }, (err) => { 
  //   console.log('Unable to delete record', err);
  // });

  db.collection('Todos').findOneAndDelete({text: 'hello you'}).then((result) => {
    console.log(result);
  }, (err) => {
    console.log(err);
  })
  // ?db.close();
})
