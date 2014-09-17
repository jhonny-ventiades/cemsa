'use strict';

var funcionario = require('../../controllers/funcionario');
/**
 * Rutas para Funcionario
 */
module.exports = function(app) {
    app.route('/api/funcionario')
        .post(funcionario.crearFuncionario)
        .get(funcionario.obtenerListaFuncionarios);
};


