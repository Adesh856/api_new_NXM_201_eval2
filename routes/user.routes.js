const express=require("express")
require("dotenv").config()
const userRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {UserModel}=require("../model/user.model")
const {BlacklistModel}=require("../model/blacklist")



userRouter.post("/register",async(req,res)=>{
  const {email,password}=req.body
  try {
    bcrypt.hash(password, 5,async function(err, hash) {
        const user=new UserModel({
            email,
            password:hash
        })
        await user.save()
        res.status(200).send({msg:"User has been added"})
    });
  } catch (error) {
    res.status(400).send({msg:error.message})
  }  
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
  try {
    const User= await UserModel.findOne({email})
     
  
     if(!User){
        res.status(400).send({"msg":"Invalid Credential"})
     }
     const compairedPass=bcrypt.compareSync(password, email.password)
      
      
    if(compairedPass){
        const normaltoken=  jwt.sign({ userid:User._id}, process.env.Normal_token_SecretKey,{expiresIn:"1m"});
        const refreshtoken=  jwt.sign({ userid:User._id}, process.env.Refersh_token_SecretKey,{expiresIn:"3m"});
        res.status(200).send({"msg":"Login Successfully",normaltoken,refreshtoken})
    }
  } catch (error) {
    res.status(400).send({msg:error.message})
  }
})

userRouter.get("/logout",async(req,res)=>{
    const token=req.headers?.authorization?.split(" ")[1]
    try {
        const blacklist=new BlacklistModel({token})
        new blacklist.save()
        res.status(200).send({"msg":"Logout Successfully"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
   
})
userRouter.get("/getnewtoken",async(req,res)=>{
    const refreshToken=req.headers?.authorization?.split(" ")[1]
     try {
        const decoded=jwt.verify(refreshToken,process.env.Refersh_token_SecretKey)
        if(decoded){
            const newtoken=jwt.sign({userid:decoded.userid},process.env.Normal_token_SecretKey,{expiresIn:"3m"})
            res.status(200).send({"msg":newtoken})
        }
     } catch (error) {
        res.status(400).send({msg:error.message})
     } 
})
module.exports={userRouter}