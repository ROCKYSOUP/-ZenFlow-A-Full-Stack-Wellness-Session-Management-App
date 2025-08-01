const auth = require("../middleware/auth");
const Session = require("../models/Session");
const express = require("express");
const router = express.Router();


{/* This is for adding a new session*/}
router.post("/add-new-session",auth,async(req,res)=>{
    try{
        const {title,tags,json_file_url,status}=req.body
        const session= new Session({user_id:req.user.id,title:title,tags:tags,json_file_url:json_file_url,status:status})
        if (!session) {
            return res.status(404).json({ msg: "Something went wrong" });
        }   
        await session.save()
        res.status(201).json(session);
        } catch (err) {
            res.status(500).json({ msg: "Server Error", error: err.message });
    }
})

{/* This is for updating a session*/}
router.put("/update-session/:id",auth,async(req,res)=>{
    try{
        const {title,tags,json_file_url,status}=req.body
        const session=  await Session.findOneAndUpdate({_id:req.params.id,user_id:req.user.id},{title,tags,json_file_url,status},{new : true})  
        if(!session){
            res.status(401).json({msg:"Session can not be found"})
        } 
        res.status(200).json(session);
        } catch (err) {
            res.status(500).json({ msg: "Server Error", error: err.message });
    }
})

{/* This is for deleting a session*/}
router.delete("/delete-session/:id",auth,async(req,res)=>{
    try{
        const id=req.params.id
        await Session.findByIdAndDelete(id)
        res.status(200).json({msg:"Session Deleted"});
        } catch (err) {
            res.status(500).json({ msg: "Server Error", error: err.message });
    }
})


module.exports = router;