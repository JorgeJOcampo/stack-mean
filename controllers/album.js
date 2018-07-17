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

function getAlbums(req, res){
    let find;
    var artistId = req.params.artist;

    if(!artistId){
        find = Album.find({}).sort('title');
    } else{
        find = Album.find({artist:artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec()
        .then((albums) => res.status(200).send({albums: albums}))
        .catch((err) => res.status(500).send({message: 'No hay albums'}));
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

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update)
        .then((albumUpdated) => res.status(200).send({album:albumUpdated}))
        .catch((err) => res.status(500).send({message: 'No se pudo actualizar'}));
}

module.exports = {
    getAlbum, getAlbums, saveAlbum, updateAlbum
};