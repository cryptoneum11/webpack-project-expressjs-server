const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const eol = require('os').EOL;
const fs = require('fs');
let stream = fs.createWriteStream( './data.txt', {'flags':'a'} );

server.use(express.static(__dirname + '/dist'));

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
