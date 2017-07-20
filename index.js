'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.connect('mongodb://localhost:27017/curso_mean2', (err, res) =>{
    if(err){
        console.log("Hay un problema con la base de datos: " +err);
        throw err;
    }else{
        console.log("La base de datos está OK");
        app.listen(port, () => console.log("Iniciado en http://localhost:"+port));
    }
});
