const jwt = require('jsonwebtoken');
const config = require('../config');
function tokenVerify(token){
    try {
        jwt.verify(token,config.token.secretOrPrivateKey);
        return true
    } catch (error) {
        return false
    }
}
module.exports = {
    isValidToken(req,res,next){
        let bearerToken = req.headers.authorization;
        try {
            let token = bearerToken.split(' ')[1] 
            if(tokenVerify(token)){
                next()
            }else{
                res.status(403).send({
                    code:403,
                    error:'登录凭证无效请重新登录'
                })
            }
        } catch (error) {
            res.status(401).send({
                code:401,
                error:'请登录后在访问'
            })
        }
    }
}