const path = require('path');
module.exports = {
    db:{
        datebase:process.env.DATEBASE || 'movie',
        username:'root',
        password:'qiaokeli',
        options:{
            host:'localhost',
            dialect:'mysql',
            define:{
                underscored:true,
                paranoid:true,
            }
        }
    },
    token:{
        secretOrPrivateKey:'movie',
        options:{
            expiresIn:'24h'
        }
    }
}