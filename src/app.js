const express = require("express");
const { connectDB } = require("./config/database");
const { validateSignupdata } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();
const User = require("./models/user");

//our middleware now be activated for all the routes
app.use(express.json());
app.use(cookieparser());

app.post("/signup", async (req, res) => {
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
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.post("/login", async (req, res) => {
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
      res.send("User Logged In Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

//create profile API

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // here i will just find the user from userAuth beause we attach the user with req

    //so the profile api just send back my user
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

//sent connection request
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //sending a connection request
  const user = req.user;
  console.log("Sending a connection request");
  res.send(` ${user.firstName} sent the connection request!!`);
});

connectDB()
  .then(() => {
    console.log("connected to database");
    // start the server only after database connection is successful
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777");
    });
  })
  .catch((err) => {
    console.error("Database can't be connected:", err);
  });
