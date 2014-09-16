'use strict';

var usuario = require('../../controllers/usuario');
/**
 * Application routes
 */
module.exports = function(app) {
    app.route('/api/users')
        .post(usuario.saveUser)
        .get(usuario.findAllUsers);
    app.route('/api/users/:id')
        .get(usuario.findUserById)
};
