'use strict';

var controllers = require('../controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
    require('./usuario/')(app);
    require('./funcionario')(app);


  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in cliente/scripts/cliente.js
  app.route('/partials/*')
    .get(controllers.partials);
};
