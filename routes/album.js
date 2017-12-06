'use strict';

var express = require('express');
var AlbumController = require('../controllers/album');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

api.get('/album/:id', md_auth.ensureAuth, AlbumController.getAlbum);

module.exports = api;
