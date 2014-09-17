var db = require('../config/env/config_db');
var btoa = require('btoa');

/**
 *Funcion para registrar un nuevo usuario en la base de datos
 **/
exports.crearUsuario= function (req, res){

    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    var passwordEncriptado = btoa(req.body.passwordUsuario);
    console.log(passwordEncriptado);
    db.Usuario
        .build({ loginUsuario: req.body.loginUsuario, passwordUsuario:passwordEncriptado, estadoUsuario:true, funcionarioId:req.body.idFuncionario})
        .save()
        .success(function() {
            return res.json(200)
        }).error(function(err) {
            return res.json(400, err);
        })
};

/**
 *  Funcion para verificar y autenticar un usuario en el sistema
 */
exports.verificarUsuario = function(req, res){

    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    var passwordEncriptado = btoa(req.params.password);
    var accesoUsuario = {};
    db.Usuario
        .find({where:{ loginUsuario: req.params.user, passwordUsuario:passwordEncriptado },include:[{model: db.Funcionario, required:true}]})
        .complete(function(err, usuario){
            if(err){
                return res.json(400,err);
            }
            else
            if(!usuario){
                return res.json(404,{error:"Usuario no encontrado"});
            }
            else{
                accesoUsuario = {idUsuario: usuario.idUsuario, loginUsuario: usuario.loginUsuario, estadoUsuario:usuario.estadoUsuario,
                    idFuncionario: usuario.funcionario.idFuncionario, nombre: usuario.funcionario.nombre, apellidoPaterno: usuario.funcionario.apellidoPaterno,
                    apellidoMaterno:usuario.funcionario.apellidoMaterno, estadoFuncionario:usuario.funcionario.estadoFuncionario, cargo: usuario.funcionario.cargo};
                return res.json(accesoUsuario);
            }
        })
};