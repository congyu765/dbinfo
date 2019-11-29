const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const {sequelize} = require('./model')
app.use(bodyParser.json());
app.use(morgan('combined'));
app.post('/user',(req,res)=>{
    res.send({
        code:200,
        data:req.body
    })
})
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(3000,()=>{console.log('服务器已经开启');})
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

