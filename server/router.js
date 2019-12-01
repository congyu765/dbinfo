const express = require('express');
const UserController = require('./controllers/UserController');
const authenticatePolicy = require('./policies/AuthenticatePolicy');
const router = express.Router();
router.get('/api',(req,res)=>{
    res.send({
        msg:"hello node"
    })
})
router.post('/user/register',UserController.register)
router.post('/user/login',UserController.login)
router.get('/user/:id',authenticatePolicy.isValidToken,UserController.getUserById)
router.put('/user/:id',UserController.updata)
router.delete('/user/:id',UserController.delete)
module.exports = router;