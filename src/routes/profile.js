const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

//create profile API

profileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // here i will just find the user from userAuth beause we attach the user with req

    //so the server send response back as a user
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = profileRouter;
