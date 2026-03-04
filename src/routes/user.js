const express = require("express");
const { userAuth } = require("../middlewares/auth");
const userRouter = express.Router();
const connectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

// get all the pending connection request for the loggedIn user received

// This API returns all connection requests
// where the logged-in user is the receiver
// and the status is still "interested" (pending)

const USER_SAFE_DATA = "firstName lastName photoUrl about gender skills";

userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await connectionRequestModel
      .find({
        toUserId: loggedInUser._id,
        status: "interested",
      })
      .populate("fromUserId", USER_SAFE_DATA);
    //Send response back to client
    res.json({
      message: "Data fetched successfully!!",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//Get all the connection which is accepted
userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    //get logged in user
    const loggedInUser = req.user;
    //Find accepted connections where user is sender or receiver
    const connectionRequests = await connectionRequestModel
      .find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    console.log(connectionRequests);

    // Extract only the connected user's profile from each accepted connection.
    // If the logged-in user is the sender (fromUserId),
    // return the receiver (toUserId).
    // Otherwise, return the sender (fromUserId).
    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    //send response
    res.json({
      data,
    });
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

//feed
userRouter.get("/user/feed", userAuth, async (req, res) => {
  try {
    // User should see all the user cards expect
    // 0. His own Cards
    // 1. his connections
    // 2. ignored people
    // 3. already sent the connection request

    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    // find out all the connection request (sent + received) for a user who is logged in
    const connectionRequests = await connectionRequestModel
      .find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      })
      .select("fromUserId toUserId");

    const hideUsersFromFeed = new Set();

    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    // console.log(hideUsersFromFeed);

    // this is data which show in the feed
    //  Fetch users who:
    // - Are NOT in hideUsersFromFeed list
    // - Are NOT the logged-in user
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } }, //here we make db call and finding all the people whose id not present in my hideUsersFrommFeed Array and thatid we show in the feed

        { _id: { $ne: loggedInUser._id } }, // and i also do not want the loggedIn user card
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
