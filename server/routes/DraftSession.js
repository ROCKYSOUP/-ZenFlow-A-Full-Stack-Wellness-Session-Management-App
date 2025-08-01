const auth = require("../middleware/auth");
const Session = require("../models/Session");
const express = require("express");
const router = express.Router();


{/* This is getting logged user's draft session*/}
router.get("/my-draft-session",auth,async(req,res)=>{
    try{
        const id=req.user.id
        const sessions=await Session.find({status:"Draft",user_id:id})
        res.status(200).json(sessions);
        } catch (err) {
            res.status(500).json({ msg: "Server Error", error: err.message });
    }
})

{/* This is for publishing a draft session*/}
router.put("/change-status/:id",auth,async(req,res)=>{
    try{
        const id=req.user.id
        const updatedSession=await Session.findOneAndUpdate({_id:req.params.id, user_id: id},{status:"Published"},{new:true})   
        res.status(201).json({msg:"Session Published",session:updatedSession});
        } catch (err) {
            res.status(500).json({ msg: "Server Error", error: err.message });
    }
})

module.exports = router;
