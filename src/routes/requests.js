const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

//sent connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth, // middleware to check if user is logged in
  async (req, res, next) => {
    try {
      // logged-in user ID (sender)
      const fromUserId = req.user._id;

      // user ID to whom request is being sent
      const toUserId = req.params.toUserId;

      // status from params (interested / ignored)
      const status = req.params.status;

      // only these status values are allowed
      const allowedStatus = ["interested", "ignored"];

      // check if status is valid

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status Type:" + status,
        });
      }
      // check if the user we are sending request to actually exists
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User not found!!",
        });
      }
      // check if a connection request already exists
      // either from A → B OR B → A
      const existingConnectionRequest = await connectionRequestModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res.status(400).send({
          message: "Connection Request Alreday Exist!!",
        });
      }

      //creating a instance of connectionRequestModel
      const connectionRequest = new connectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      //save the connectionRequest into the Database
      const data = await connectionRequest.save();

      //now send the respose back
      res.json({
        message:
          req.user.firstName +
          " is " +
          status +
          " in " +
          toUser.firstName +
          " profile ",
        data,
      });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  },
);

// REVIEW CONNECTION REQUEST

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res, next) => {
    try {
      const loggedInUser = req.user;
      const { status, requestId } = req.params;

      // Only allow accepted or rejected
      const allowedStatus = ["accepted", "rejected"];

      //validate the status
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Status not allowed!!",
        });
      }
      // Find the connection request
      // Conditions:
      // 1. Request ID must match
      // 2. Logged-in user must be the receiver (toUserId)
      // 3. Current status must be 'interested'
      const connectionRequest =  await connectionRequestModel.findOne({
        _id: requestId,
         toUserId : loggedInUser._id,
        status: "interested",
      });

      // if i do not find any such kind of connection request then return error message
      if (!connectionRequest) {
        return res.status(404).json({
          message: "Connection request not found",
        });
      }

      // here we push the status into the connectionRequest which is accepted or rejected that is coming from my api params
      // Update status (accepted / rejected)
      connectionRequest.status = status;

      // Save updated document
      const data = await connectionRequest.save();

      //return response after save
      res.json({
        message: "Connection request" + " " + status ,
        data,
      });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  },
);

module.exports = requestRouter;
