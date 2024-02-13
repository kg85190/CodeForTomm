const express = require("express");
const { registration, login, resetpassword, forgetpassword } = require("../controller/usercontroller");


let userroutes = express.Router();

userroutes.post('/registeruser',registration)
userroutes.post('/login',login)
userroutes.post('/resetpassword',resetpassword)
userroutes.post('/forgetpassword',forgetpassword)

   

module.exports ={userroutes}