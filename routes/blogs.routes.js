const express=require("express")
const {checkfoRole}=require("../middelware/Authorise")
const blogsRouter=express.Router()
const {blogsmodel}=require("../model/blog.model")

blogsRouter.post("/createblog",checkfoRole,async(req,res)=>{
    const payload=req.body
    try {
        const blogs=new blogsmodel({...payload,userid:req.body.userid})
        await blogs.save()
        req.status(200).send({msg:"Blog has been added"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})
blogsRouter.get("/",checkfoRole,async(req,res)=>{
    try {
        const blogs=await blogsmodel.find({userid:req.body.userid})
        req.status(200).send(blogs)
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})
blogsRouter.patch("/updateBlog/:id",checkfoRole,async(req,res)=>{
    
    const {id}=req.params
    try {
        const blogs=await blogsmodel.findByIdAndUpdate({_id:id,userid:req.body.userid},payload)
       
        req.status(200).send({msg:"Blog has been updated"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})
blogsRouter.delete("/Deleteblog/:id",checkfoRole,async(req,res)=>{

    const {id}=req.params
    try {
        const blogs=await blogsmodel.findByIdAndDelete({_id:id,userid:req.body.userid})
        req.status(200).send({msg:"Blog has been deleted"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})

blogsRouter.delete("/DeleteModerator/:id",checkfoRole("Moderator"),async(req,res)=>{

    const {id}=req.params
    try {
        const blogs=await blogsmodel.findByIdAndDelete({_id:id})
        req.status(200).send({msg:"Blog has been deleted"})
    } catch (error) {
        res.status(400).send({msg:error.message})
    }
})



module.exports={blogsRouter}