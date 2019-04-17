const http = require("http");
const express = require("express");
const fields = require('./fields.json');
const app = express();
const index = require('./src/index.html');

app.get("/fields", function(req, res) {
  res.send(fields);
});

app.get('/', function(req, res){
  res.sendfile(index);
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));