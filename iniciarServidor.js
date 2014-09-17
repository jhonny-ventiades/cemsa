'use strict';

var express = require('express'),
    path = require('path'),
    http = require('http'),
    db = require('./servidor/config/env/config_db'),
    app = express();
    require('./servidor/config/express')(app);
    require('./servidor/routes')(app);
var finaPort = 9000;

db
    .sequelize
    .sync({ force: false })
    .complete(function(err) {
        if (err) {
            console.log("***Error starting the Service***");
        } else {
            http.createServer(app).listen(finaPort, function(){
                console.log('Express server listening on port '+finaPort);
            })
        }
    });
