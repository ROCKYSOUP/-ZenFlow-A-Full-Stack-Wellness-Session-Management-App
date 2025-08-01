{/* This is for authentication of user for using protected routes*/}
const jwt=require("jsonwebtoken")

const auth=async (req,res,next)=>{
    try{
        const token=req.header("Authorization")
        if(!token){
            res.status(401).json({msg:"Token not found"})
        }
        const valid=await jwt.verify(token,process.env.SECRET)
        if(!valid){
            res.status(401).json({msg:"Token invalid"})
        }
        req.user=valid
        next()
        
    }catch(err){
        res.status(402).json(err.message)
    }
}

module.exports=auth