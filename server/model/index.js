const config = require('../config');
const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize(
    config.db.datebase,
    config.db.username,
    config.db.password,
    config.db.options
);
const User = sequelize.import(__dirname + "/user.js");
const Movie = sequelize.import(__dirname + "/movie.js")
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User;
db.Movie = Movie;
module.exports = db