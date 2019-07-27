
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_IN6AV';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        rol: user.rol,
       
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix
    };

    return jwt.encode(payload, secret);
}