const express = require("express");
const profileRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

//create profile API

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user; // here i will just find the user from userAuth beause we attach the user with req

    //so the server send response back as a user
    res.send(user);
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    //if the profile data is not valid
    if (!validateEditProfileData(req)) {
      throw new Error("Profile update request is not valid.");
    }

    const loggedInUser = req.user;
    //console.log(loggedInUser); //before edit

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    //console.log(loggedInUser); //after eedit

    //after updating save the user
    await loggedInUser.save();

    res.json({
      message: `${loggedInUser.firstName}, Your Profile Updated Successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("An unexpected error occurred.");
  }
});

module.exports = profileRouter;
