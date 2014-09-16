var db = require('../config/env/config_db');

/**
 *Function for save a new User
 **/
exports.saveUser= function (req, res){

    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    db.Usuario
        .build({ name: req.body.name, rol: req.body.rol, status: true})
        .save()
        .success(function() {
            return res.json(200)
        }).error(function(err) {
            return res.json(400, err);
        })
};

/**
 *  Function for show all endpoints
 */
exports.findAllUsers=function(req, res, next){

    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    db.Usuario
        .all()// Here is the method which take all the information in the table
        .complete(function(err, user) {
            if (err) {
                return next(err);
            }
            else
            if(!user){
                return res.json(404);
            }
            else {
                // We return all the endpoints that exists in the table in a JSON format
                return res.json(user)
            }
        });
};

/**
 *Funtion that allow us get a specific User by ID
 */
exports.findUserById=function(req, res, next){

    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");

    var idUser=req.params.id;//Here we receive the id_user of the user that we can get information
    db.Usuario
        .find({ where: { idUsuario: idUser } })//Here we check if the user exists in the database
        .complete(function(err, user) {
            if (err) {
                return next(err);
            } else if (!user) {
                return res.json(404);// If the user with the id_user that we have receive doesn't exist we can see here
            } else {
                // Here we return the information of the user which the id received.
                return res.json(user)
            }
        });
};