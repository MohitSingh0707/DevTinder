const express = require('express');

const { userAuth } = require("../middlewares/auth");
const requestRouter = express.Router();

// SendingConnectionRequest Router - POST
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user.firstName + " Sent Connection Request");
  } catch (error) {
    console.error("Error in sending connection request", error);
    return res
      .status(500)
      .json({ message: "Error in sending connection request" });
  }
});

module.exports = requestRouter;

