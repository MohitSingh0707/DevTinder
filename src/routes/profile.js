const express = require('express');
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();


//Profile Router - GET
profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    // step-5 ==> fetch the user profile from the database
    const user = req.user;
    res.send("Profile Route is working" + user);
  } catch (error) {
    console.error("Error fetching profile", error);
    return res.status(500).json({ message: "Erroe in getting profile" });
  }
});

module.exports = profileRouter;