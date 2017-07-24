'use strict';

var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res){
    res.status(200).send({message: 'Método getArtist'});
}

function saveArtist(req, res) {
    var artist = new Artist();

    var params = req.params;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save()
        .then((artistStored) => res.status(200).send({artist:artistStored}))
        .catch((err) => res.status(500).send({message: 'Error al guardar el artista'}));
}

module.exports = {
    getArtist, saveArtist
};