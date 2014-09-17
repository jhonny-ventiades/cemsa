var db = require('../config/env/config_db');

/**
 *Funcion que permite registrar un nuevo funcionario en la Base de Datos
 **/
exports.crearFuncionario= function (req, res){

    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    var fechaActual = new Date();
    var dia = (fechaActual.getDate()<10) ? "0"+fechaActual.getDate() : fechaActual.getDate();
    var mes = (fechaActual.getMonth()+1<10) ? "0"+(fechaActual.getMonth()+1) : (fechaActual.getMonth()+1);
    var fechaConstruida = (fechaActual.getFullYear()+"/"+ mes + "/" + dia);

    db.Funcionario
        .build({ ci: req.body.ci, nombre: req.body.nombre, apellidoPaterno: req.body.apellidoPaterno, apellidoMaterno: req.body.apellidoMaterno,
                 telefono:req.body.telefono, celular:req.body.celular, fechaNacimiento:req.body.fechaNacimiento, lugarNacimiento:req.body.lugarNacimiento,
                 nacionalidad: req.body.nacionalidad, fechaIngreso:fechaConstruida, email:req.body.email, estadoFuncionario:true})
        .save()
        .success(function() {
            return res.json(200)
        }).error(function(err) {
            return res.json(400, err);
    })
};

/**
 *Funcion que permite obtener la lista de funcionario
 **/
exports.obtenerListaFuncionarios = function(req, res){

    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    db.Funcionario
        .all()
        .complete(function(err, funcionarios){
            if(err){
                return res.json(400,err);
            }
            else{
                return res.json(funcionarios);
            }
        })
}