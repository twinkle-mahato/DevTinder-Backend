const express = require("express");
const authRouter = express.Router();

const { validateSignupdata } = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    validateSignupdata(req);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //creating a new instance of user model
    console.log(req.body);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    //user valid or not so find first
    const user = await User.findOne({ emailId: emailId });

    //if user not present
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password); // when user enter the password that password

    if (isPasswordValid) {
      //get JWt token
      const token = await user.getJWT();

      // add the token to cookie and send the response back to the user

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      }); // here we pass the cookie name as a token and then pass the token
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  await res.cookie("token", null, {
    expires: new Date(Date.now()), //i am setting the expiry time as the current time
  });
  res.send("Logged out successfully");
});

module.exports = authRouter;
