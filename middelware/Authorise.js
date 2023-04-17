function checkfoRole(role="User"){
    return{
    function(req,res,next){
     if(req.role==role){
        next()
     }else{
        res.status(400).send({"msg":"Unauthorized"})
     }
     }
    }
}

module.exports={checkfoRole}