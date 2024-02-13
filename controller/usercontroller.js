const { usermodel } = require("../model/usermodel")
const validator =  require("validator")
const bcrypt = require("bcrypt")
const { hashPass, comparepassword } = require("../helper/bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")



const registration = async(req,res)=>{
    let {email} = req.body
    if(!validator.isEmail(email)){return res.status(400).send({success:false,message:"Email validation failed"})}
    let user = await usermodel.findOne({email:req.body.email})
    if(user){return res.status(400).send({success:false,message:"Email already exit"})}
    const hasspassword = await hashPass(req.body.password)
    let newuser = await usermodel.create({...req.body})
    return res.status(200).send({success:false,message:"Register Successfull",data:newuser})
}

let login = async (req,res)=>{
    let {email,password} = req.body;
    try {
    let user = await usermodel.findOne({email:email})
    if (!user){return res.status(404).send({success:false,message:'Email not exit'})}
    // const matchedpassword = await comparepassword(password,user.password)
    // if(!matchedpassword){return res.status(409).send({success:false,message:'Wrong Password'})}
    var token = jwt.sign({user:user},"ritikmogra",{expiresIn:"300sec"})
    res.setHeader("token",token)
    res.status(200).send({success:true,message:'Login Successfully',data:user,token:token})
    } catch (error) {
        res.status(409).send({success:false,message:'Server Crashed',error:error.message})
    }
}

let resetpassword = async(req,res)=>{
    try {
         let user = await usermodel.findOne({email:req.body.email})
         if(!user){return res.status(400).send({success:false,message:"invalid email"})}
         if (req.body.newpassword != req.body.confirmpassword){return res.status(400).send({success:false,message:"passsword not matched"})}
         let newHashpassword = await hashPass(req.body.newpassword);
         let newdataupdate = new usermodel(user)
         newdataupdate.password = newHashpassword;
         newdataupdate.save();
         res.status(200).send({success:true,message:"Reset password successfully" })
    } catch (error) {
        res.status(500).send({success:false,message:"server crashed",error:error.message})
}
}
let forgetpassword = async(req,res)=>{
    try {
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:"ritikmogra123@gmail.com",
                pass:"mykd itap byur zbvf",
  },
        });
        let details ={
            from:"ritikmogra123@gmail.com",
            to: req.body.email,
            subject:"paste a link ",
            text:"paste a link",
        };
        transporter.sendMail(details,async(err)=>{
            if (err){
                res.status(400).send({success:false,message:err.message});
            }else {
                res.status(200).send({success:false,message:"Email send"});
            }
        })
        
    } catch (error){
        res.status(500).send({status:false,message:'Server Crashed'});
}
}

module.exports ={registration,login,resetpassword,forgetpassword}