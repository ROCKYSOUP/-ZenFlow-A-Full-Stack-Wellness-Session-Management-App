const express=require("express")
const router=express.Router()
const User=require("../models/User")
const auth=require("../middleware/auth")

router.get("/get-user",auth,async(req,res)=>{
    try{    
        const id=req.user.id
        const user= await User.findOne({_id:id})
        res.status(200).json(user)
    }catch(err){
        res.status(404).json({msg:"Something wrong"})
    }
    
})
router.get("/get-all-user",async(req,res)=>{
    try{    
        const user= await User.find()
        res.status(200).json(user)
    }catch(err){
        res.status(404).json({msg:"Something wrong"})
    }
    
})
module.exports=router