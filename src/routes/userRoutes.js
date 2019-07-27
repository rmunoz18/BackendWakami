'use strict'

var express = require("express");
var UserController = require("../controllers/userController");
var md_auth = require('../middleware/aunthenticated');

 
var api = express.Router();

api.post('/registrar', UserController.registrar);
api.post('/login', UserController.login);
api.put('/editar-usuario/:id', md_auth.ensureAuth, UserController.editarUsuario)
module.exports = api;