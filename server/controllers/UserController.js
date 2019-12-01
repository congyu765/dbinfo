const {User} = require('../model');
const config = require('../config');
const jwt = require('jsonwebtoken');
function tokenSign({id,email}){
    try {
        return jwt.sign({id,email},config.token.secretOrPrivateKey,config.token.options)
    } catch (error) {
        throw(error)  
    }
}
module.exports = {
    async register(req,res){
        try {
            const user = await User.create(req.body);
            res.status(201).send({
                user,
                token:tokenSign(user)
            });
        } catch (error) {
            // console.log(error);
            res.status(400).send({
                code:400,
                error:'该邮箱已经注册'
            });
        }
    },
    async getUserById(req,res){
        try {
            const user =await User.findByPk(req.params.id);
            if(user){
                res.status(200).send({
                    user
                });
            }else{
                res.status(400).send({
                    error:'没有找到对应的数据'
                }); 
            }
            
        } catch (error) {
            res.status(500).send({
                code:500,
                error:'数据查询失败'
            });
        }
    },
    async updata(req,res){
        try {
            await User.update(
                req.body,
                {
                    where:{
                        id:req.params.id
                    }
                }
            );
            res.status(203).send({
                msssage:'数据更新成功'
            });
        } catch (error) {
            res.status(500).send({
                code:500,
                error:'数据修改失败'
            });
        }
    },
    async delete(req,res){
        try {
            await User.destroy(
                {
                    where:{
                        id:req.params.id
                    }
                }
            );
            res.status(204).send({
                msssage:'数据删除成功'
            });
        } catch (error) {
            // console.log(error);
            res.status(500).send({
                code:500,
                error:'数据删除失败'
            });
        }
    },
    async login(req,res){
        try {
           const user =await User.findOne({
               where:{
                   email:req.body.email
               }
           })
           let isVaildPassword = user.comparePassword(req.body.password)
           if(isVaildPassword){
               res.send({
                   user:user.toJSON(),
                   token:tokenSign(user)
               })
           }else{
                res.status(403).send({
                    code:403,
                    error:'用户名或密码错误'
                });  
           }
        } catch (error) {
            res.status(500).send({
                code:500,
                error:'登录失败'
            });
        }
    }
}