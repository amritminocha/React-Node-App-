const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const users = new Schema({
  Name:{    // const name =  req.body.name
      // const email = req.body.email
      type:String
  },
  Email:{
      type:String
  },
  id:{
      type:Number
  }
})

const Users = mongoose.model('users', users,'users');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());


app.get("/", (req, res) => {
  fs.readFile(path.resolve(__dirname, "./src/index.js"), "utf-8", (err, data) => {
    if (err) {
      return res.status(500).send("<h1>Internal server error</h1>");
    }
    res.send(data);
  });
});

app.listen(port, () => {
  console.log("server running on port 8080");
});
