const mongoose=require("mongoose")

const UserSchema=mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"User",enum:["User","Moderator"],required:true},
    userid:String
})

const UserModel=mongoose.model("User",UserSchema)

module.exports={UserModel}