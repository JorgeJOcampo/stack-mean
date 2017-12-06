'use strict';

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec()
        .then((album) => res.status(200).send({album:album}))
        .catch((err) => res.status(500).send({message: 'Error buscando album'}));;
}

function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;
    album.save()
        .then((albumStored) => res.status(200).send({album:albumStored}))
        .catch((err) => res.status(500).send({message: 'Error al guardar el artista'}));;
}

module.exports = {
    getAlbum, saveAlbum
};