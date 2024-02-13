const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: { type:String,require:true},
    lastname: { type:String,require:true},
    email: { type:String,require:true},
    password: {type:String,require:true},
},    {timestamps:true})
   
const usermodel = new mongoose.model("usermodel",userSchema)
module.exports ={usermodel}