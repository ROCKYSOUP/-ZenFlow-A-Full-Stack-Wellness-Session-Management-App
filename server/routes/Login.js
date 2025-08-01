const express = require("express");
const jwt = require("jsonwebtoken");
const Session = require("../models/Session");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const auth=require("../middleware/auth")

const router = express.Router();


{/* This is user login */}
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET, {
      expiresIn: "1d",
    });
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    msg:"Logged in succesfully"});
  } catch (err) {
    return res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

{/* This is for deleting a user */}
router.delete('/delete-account',auth,async(req,res)=>{
  try{
    const id=req.user.id
    await User.findByIdAndDelete(id)
    await Session.deleteMany({user_id:id})
    res.status(200).json({msg:"User removed"})
  }catch(err){
    res.status(401).json({msg:"User Not Found", error:err.message})
  }
  
})

module.exports = router;
