'use strict';

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var fs = require('fs');
var path = require('path');

function pruebas(req, res){
  res.status(200).send({
    message: 'prueba'
  });
}

function saveUser(req, res){
  var user = new User();

  var params = req.body;

  user.name = params.name;
  user.surname = params.surname;
  user.email = params.email;

  if(params.password){
    bcrypt.hash(params.password, null, null, (err, hash) => {
      user.password = hash;
      if(user.email) {
        user.save()
        .then(userStored => {
          res.status(200).send({user: userStored});
        })
        .catch(error => {
          res.status(500).send({message: 'Error al guardar el usuario'});
        });
      }else{
        res.status(500).send({message:'Faltan datos'});
      }
    });
  }else{
    res.status(500).send({message: 'Te falta la contraseña, capo'});
  }
}

function loginUser(req, res){
  var params = req.body;

  var email = params.email;
  var password = params.password;

  User.findOne({email: email.toLowerCase()}, (err, user) => {
    if(err){
      res.status(500).send({message: 'Error en la peticion'});
    } else{
      if(!user){
        res.status(404).send({message: 'El usuario no existe'});
      } else{
        if(bcrypt.compare(password, user.password, (err, check) => {
          if(check){
            if(params.getHash){
              res.status(200).send({
                  token: jwt.createToken(user)
              })
            } else{
              res.status(200).send({user});
            }
          } else{
            res.status(404).send({message: 'El usuario no ha podido loggearse'});
          }
            }));
      }
    }
  })
}

function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    User.findByIdAndUpdate(userId, update).then( user => {
      res.status(200).send({user: user});
    }).catch(
      error => {
        res.status(500).send({message: 'Error al actualizar el usuario'});
      }
    )
}

function uploadImage(req, res){
  var userId = req.params.id;
  var file_name = 'No subido...';

  if(req.files){
    var file_path = req.files.image.path;
    var file_split = file_path.split('/');
    var file_name = file_split[2];
      console.log(file_name);
    var ext_split = file_name.split('.');
    var file_ext = ext_split[1];

    if(file_ext === 'png' || file_ext === 'jpg' || file_ext === 'gif'){
      User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) => {
          if(!userUpdated){
              res.status(404).send({message: 'No se pudo actualizar el usuario'});
          }else{
              res.status(200).send({user: userUpdated});
          }
      });
    } else{
        res.status(400).send({message: 'Extension no valida'});
    }
    console.log(file_path);
  }else{
    res.status(500).send({message: 'No ha subido ninguna imagen'});
  }
}

function getImageFile(req, res){
  var imageFile = req.params.imageFile;

  let pathFile = './uploads/users/'+imageFile;
    fs.exists(pathFile, (exists) => {
      if(exists){
        res.sendFile(path.resolve(pathFile));

    }else{
      res.status(404).send({message: 'No existe el archivo'});
    }
  })
}

module.exports = {
  pruebas, saveUser, loginUser, updateUser, uploadImage, getImageFile
};
