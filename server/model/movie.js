const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Model extends Sequelize.Model {}
    Model.init(
        {
            // 属性
            name: {
                type: DataTypes.STRING
            },
            post: {
                type: DataTypes.STRING
            }
        }, 
        {
        sequelize,
        modelName: 'movie'
        }
    )
    return Model
}