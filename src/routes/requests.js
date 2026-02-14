const express = require("express");
const requestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

//sent connection request
requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //sending a connection request
  const user = req.user;
  console.log("Sending a connection request");
  res.send(` ${user.firstName} sent the connection request!!`);
});

module.exports = requestRouter;
