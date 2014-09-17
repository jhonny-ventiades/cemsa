'use strict';

var usuario = require('../../controllers/usuario');
/**
 * Application routes
 */
module.exports = function(app) {
    app.route('/api/usuario')
        .post(usuario.crearUsuario);
    app.route('/api/usuario/:user/:password')
        .get(usuario.verificarUsuario)
};
