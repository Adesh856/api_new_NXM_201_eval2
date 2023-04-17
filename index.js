const express=require("express")
const {connection}=require("./db.js")
const app=express()
const {userRouter}=require("./routes/user.routes")
const {blogsRouter}=require("./routes/blogs.routes")
const {auth}=require("./middelware/auth.middelware")
app.use(express.json())

app.use("/user",userRouter)
app.use(auth)
app.use("/blogs",blogsRouter)

app.listen(process.env.port,async()=>{
    try {
       await connection
       console.log("MongoDB is connected with Server") 
    } catch (error) {
        console.log("MongoDb is not connected with Server")
    }
    console.log(`Server is connected on port ${process.env.port}`)
})