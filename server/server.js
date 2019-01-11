const express = require('express');
const server = express();
const port = process.env.PORT || 8080;
const eol = require('os').EOL;
const fs = require('fs');
let stream = fs.createWriteStream( './data.txt', {'flags':'a'} );

// MongoDB connection credentials
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://crypto:crypto@cluster0-9dxfg.mongodb.net/db1?retryWrites=true';
const dbName = 'db1';

// Get result from 'find()' in MongoDB cluster
function findDocs(res){
  MongoClient.connect(uri, {useNewUrlParser:true}, (err,client)=>{
    console.log('connected..');
    const db = client.db(dbName);
    get_documents(db, res, ()=>{
      console.log('received mongoDB contents!');
      client.close(); // closing the client connection after query is done, within the anonymous callback method
    });
  });
}
function get_documents(db, res, callback){
  db.collection('col1').find({}).toArray((err,docs)=>{
    console.log('querying mongoDB server..');
    res.send(docs);
    callback(); // we always need to set functions up with 'async' in mind
  });
}
// Insert document into MongoDB
function insertDoc(res){
  MongoClient.connect(uri, {useNewUrlParser:true}, (err,client)=>{
    console.log('connected..');
    const db = client.db(dbName);
    insert_document(db, res, ()=>{
      console.log('new entry added to the db collection.');
      client.close();
    });
  });
}
function insert_document(db, res, callback){
  db.collection('col1').insertOne({name:"Hans", age:23, occupation:"JS Master"}, err=>{
    console.log('inserting document...');
    if(!err)
      callback();
  });
}
// Find specific MongoDB data from collection "col1"
function findSpecific(res, search){
  MongoClient.connect(uri, {useNewUrlParser:true}, (err,client)=>{
    console.log('connected');
    const db = client.db(dbName);
    find_specific_data(db, res, search, ()=>{
      console.log('received specific mongoDB content!');
      client.close();
    });
  });
}
function find_specific_data(db, res, search, cb){ // 'search' param is a js object, key:value pair
  db.collection('col1').find( { "age" : { $gt: 20 } } ).toArray( (err,docs)=>{
    if(err)
      return;
    console.log('querying database..');
    res.send(docs);
    cb();
  });
}


server.use(express.static(__dirname + '/dist'));

// define a route for mongoDB requests
server.get('/mongo', (req,res)=>{
  findDocs(res);
});

server.get('/mongo-find-specific/', (req,res)=>{
  let query = req.query;
  console.log( query );
  let key = req.query.key;
  let value = req.query.value;
  // value = parseInt( value );
  let search = { key : parseInt( value ) };
  findSpecific(res, search);
});

server.post('/mongo-submit-data', (req,res)=>{
  insertDoc(res);
});
//

server.get('/', (req,res) => {
  res.send('Hello World!')
});

server.get('/home/', (req,res)=>{
  res.send( 'Home page here.' );
});

server.post('/home/:myvar', (req,res)=>{
  res.send(`Yo, I got your "${req.params.myvar}" yo!`);
});

server.get('/test/:myvar', (req,res) => {
  stream.write( `${req.params.myvar}${eol}` );
  res.send( 'Your variable was written to data.txt!' );
});

server.listen(port, ()=>{ console.log(`Example app listening on port ${port}`); });
