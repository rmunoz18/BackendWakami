
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    rol: String,
 
});

module.exports = mongoose.model('User', UserSchema);