const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

//sent connection request
requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res, next) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["interested", "ignored"];

      if (!allowedStatus.includes(status)) {
        return res.status(400).json({
          message: "Invalid Status Type:" + status,
        });
      }

      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(400).json({
          message: "User not found!!",
        });
      }

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
        message: req.user.firstName + " is " + status + " in " + toUser.firstName + " profile ",
        data,
      });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  },
);

module.exports = requestRouter;
