'use strict';

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function pruebas(req, res){
  res.status(200).send({
    message: 'prueba'
  });
}

function saveUser(req, res){
  var user = new User();

  var params = req.body;

  console.log(params);

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;

  //Me huele que esto se puede hacer con promises y queda mejor
  if(params.password){
    bcrypt.hash(params.password, null, null, (err, hash) => {
      user.password = hash;
      if(user.name !== null && user.surname !== null && user.email !== null) {
        user.save((err, userStored) => {
          if(err){
            res.status(500).send({message: 'Error al guardar el usuario'});
          }else{
            if(!userStored){
              res.status(404).send({message:'No se ha registrado el usuario'});
            }else{
              res.status(200).send({user: userStored});
            }
          }
        });
      }else{
        res.status(500).send({message:'Faltan datos'});
      }
    });
  }else{
    res.status(500).send({message: 'Te falta la contraseña, capo'});
  }
}

module.exports = {
  pruebas, saveUser
};