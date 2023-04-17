
const jwt=require("jsonwebtoken")
const { BlacklistModel } = require("../model/blacklist")
const {UserModel}=require("../model/user.model")
const { model } = require("mongoose")
const auth=async(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    const user= await BlacklistModel.findOne({token})
    if(user){
        res.status(400).send({"msg":"Unauthorized"})
    }
    if(token){
        const decoded=jwt.verify(token,process.env.Normal_token_SecretKey)
        if(decoded){
            console.log(decoded)
            req.body.userid=decoded.userid
            const User= await UserModel.findOne({_id:decoded.userid})
            const {role}=User
            req.role=role
            next()
        }else{
            res.status(400).send({"msg":"Invalid Password"}) 
        }
    }else{
        res.status(400).send({"msg":"Unauthorized"})
    }

}



module.exports={auth}