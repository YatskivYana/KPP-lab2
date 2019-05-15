const http = require('http');
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const ObjectID = require('mongodb').ObjectID;

const hostname = '127.0.0.1';
const port = 3000;
const app = express();

var db = require('./db/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const staticPath = path.normalize(__dirname + "/public");
app.use(express.static(staticPath));

const routes = require("./routes/api/routes")(app);

db.connect('mongodb://localhost:27017/users', function(err){
    if(err){
      return console.log(err);
    }
    app.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`);
    });
});
