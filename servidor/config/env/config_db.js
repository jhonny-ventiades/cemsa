
'use strict';

var fs = require('fs')
    , path  = require('path')
    , Sequelize = require('sequelize')
    , lodash = require('lodash');

var sequelize = new Sequelize('DB_EMSA', 'username', 'password', {
    dialect: 'sqlite', //dialec -> sqlite,myqlite,postgres, dbmaria
    storage: './servidor/db/DB_EMSA.sqlite' // the root where is our database
});

var db = {};

fs
    .readdirSync('./servidor/models')
    .filter(function(file) {
        return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join('../../../servidor/models',file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].options.hasOwnProperty('associate')) {
        db[modelName].options.associate(db)
    }
});

module.exports = lodash.extend({
    sequelize: sequelize,
    Sequelize: Sequelize
}, db);
