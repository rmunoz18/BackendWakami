'use strict'

var bcrypt = require("bcrypt-nodejs");
var User = require('../models/user');
var jwt = require('../services/jwt');
var path = require('path');
var fs = require('fs');

function registrar(req, res) {
    var user = new User();
    var params = req.body;
    
    if(params.nombre && params.nick && params.email && params.password ){
        user.nombre = params.nombre;
        user.apellido = params.apellido;
        user.email = params.email;
        user.password = params.password;
        user.rol = 'ROL_USARIO';
   
        User.find({$or: [
            {email: user.email.toLowerCase()},
            {nick: user.nick.toLowerCase()}
        ]}).exec((err, users)=>{
            if(err) return res.status(500).send({message: 'Error en la peticion de usuario'})
            
            if(users && users.length >= 1){
                return res.status(500).send({message: 'el usuario ya existe'});
            }else{
                bcrypt.hash(params.password, null, null, (err, hash)=>{
                    user.password = hash;

                    user.save((err, userGuardado)=>{
                        if(err) return res.status(500).send({message: 'Error a la hora de guardar el usuario'}) 
                        
                        if(userGuardado){
                            res.status(200).send({user: userGuardado})
                        }else{
                            res.status(404).send({message: 'no se a podido registrar al usuario'})
                        }
                    })
                })
            }
        })
    }else{
        res.status(200).send({
            message: 'rellene los datos necesarios'
        })
    }
}

function login(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email}, (err, user)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'})
        
        if (user) {
            bcrypt.compare(password, user.password, (err, check)=>{
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });
                    }else{
                        user.password = undefined;
                        return res.status(200).send({user})
                    }
                }else{
                    return res.status(404).send({message: 'el usuario no a podido identificarse'})
                }   
            })
        }else{
            return res.status(404).send({message: 'el usuario no a podido logearse'})
        }
    
    });

    

}


function editarUsuario(req, res) {
    var userId = req.params.id;
    var params = req.body;

    //BORRAR LA PROPIEDAD DE PASSWORD
    delete params.password;

    if(userId != req.user.sub){
        return res.status(500).send({message: 'no tiene los permisos para editar este usuario'});
    }

    User.findByIdAndUpdate(userId , params, {new:true},(err, usuarioActualizado)=>{
        if(err) return res.status(500).send({message: 'error en la peticion'});

        if(!usuarioActualizado) return res.status(404).send({message: 'no se a podido actualizar al usuario'});

        return res.status(200).send({user: usuarioActualizado});
    })
}


module.exports = {
    ejemplo,
    registrar,
    login,
    editarUsuario
}