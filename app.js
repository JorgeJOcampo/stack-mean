'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/pruebas', (res, req) => {
    req.status(200).send({message:'Bienvenido al curso MEAN'});
});

module.exports = app;