// https://www.freecodecamp.org/news/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2/
const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const mongoose    = require('mongoose');
require('dotenv').config();
// we initialize our app as an instance of Express
const app = express();
const port = process.env.PORT || 8000;
// https://docs.mongodb.com/manual/reference/connection-string/#mongodb-uri
const uri = process.env.COMPASS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
// once mongodb connection is open, execute callback
db.once('open', () => {
  console.log("MongoDB database connection established successfully");
});
db.on('error', console.error.bind(console, 'connection error:'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
require('./app/routes')(app, db);
// run app with $ npm run dev or $ node server.js
app.listen(port, () => { console.log("We are listening on port: " + port); })
