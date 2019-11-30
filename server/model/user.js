const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Model extends Sequelize.Model {}
    Model.init(
        {
            // 属性
            email: {
                type: DataTypes.STRING,
                unique:true,
                validate:{
                    isEmail:true
                }
            },
            password: {
                type: DataTypes.STRING,
                validate:{
                    len:[8,40]
                }
            }
        }, 
        {
        sequelize,
        modelName: 'user'
        }
    )
    return Model
}