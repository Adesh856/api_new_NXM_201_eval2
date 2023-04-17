const mongoose=require("mongoose")

const blogSchema=mongoose.Schema({
    title:String,
    author:String,
    content:String
})

const blogsmodel=mongoose.model(
    "blogsCollection", blogSchema
)

module.exports={blogsmodel}