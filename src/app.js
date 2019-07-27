'use strict'

const express = require("express");
const app = express();
const bodyparser = require("body-parser");

//CARGAR RUTAS
var user_routes = require('./routes/userRoutes');

//MIDDELWARES
app.use(bodyparser.urlencoded({ extended: false}));
app.use(bodyparser.json());

//CABEZERAS
app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

    next();
});

//RUTAS
app.use('/api', user_routes);

//EXPORTAR
module.exports = app;