const http = require("http");
const express = require("express");
const fields = require('./fields.json');
const app = express();

app.get("/fields", function(req, res) {
  res.send(fields);
});

app.get('/',function(req,res) {
  res.sendFile('index.html', { root: __dirname + '/src/' });
});

app.get('/scripts',function(req,res) {
  res.sendFile('script.js', { root: __dirname + '/src/assets/js/' });
});

app.get('/styles',function(req,res) {
  res.sendFile('style.css', { root: __dirname + '/src/assets/css/' });
});

http.createServer(app).listen(3000, () => console.log("Servidor rodando local na porta 3000"));