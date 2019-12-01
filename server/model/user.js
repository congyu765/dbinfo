const Sequelize = require('sequelize');
const MD5 = require('crypto-js/md5');
function hassPassword(user,options){
    if(user.changed('password')){
        user.password = MD5(user.password).toString();
    }
}
module.exports = (sequelize, DataTypes) => {
    class Model extends Sequelize.Model {
        comparePassword(password){
            return this.password === MD5(password).toString();
        }
    }
    Model.init(
        {
            // 属性
            email: {
                type: DataTypes.STRING,
                unique:true,
                allowNull:false,
                validate:{
                    isEmail:true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull:false,
                validate:{
                    len:[8,40]
                }
            }
        }, 
        {
            hooks:{
                afterValidate:hassPassword
            },
            sequelize,
            modelName: 'user'
        }
    )
    return Model
}