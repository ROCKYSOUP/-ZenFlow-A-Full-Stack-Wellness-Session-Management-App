const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();
const Session=require("../models/Session")

{
  /* This is for getting all published session*/
}
router.get("/all-session", auth, async (req, res) => {
  try {
    const sessions = await Session.find({ status: "Published" });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

{
  /* This is for getting session published by logged user*/
}
router.get("/my-published-session", auth, async (req, res) => {
  try {
    const id = req.user.id;
    const sessions = await Session.find({ status: "Published", user_id: id });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ msg: "Server Error", error: err.message });
  }
});

module.exports = router;
