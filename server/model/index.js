const config = require('../config');
const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize(
    config.db.datebase,
    config.db.username,
    config.db.password,
    config.db.options
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db