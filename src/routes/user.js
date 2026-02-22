const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequestModel = require("../models/connectionRequest");

// get all the pending connection request for the loggedIn user
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", ["firstName", "lastName","phtoUrl","gender","skills"]);

    res.json({
      message: "Data fetched successfully!!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

module.exports = userRouter;
