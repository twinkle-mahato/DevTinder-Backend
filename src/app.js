const express = require("express");
const { connectDB } = require("./config/database");
const { validateSignupdata } = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
const User = require("./models/user");

//our middleware now be activated for all the routes
app.use(express.json());

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
    if(!user){
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(isPasswordValid){
      res.send("User Logged In Successfully");
    }
    else{
      throw new Error ("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

//Feed API -> GET/feed -get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//GET more than one user have same email and we want to find only one user
app.get("/user", async (req, res) => {
  const userEmail = req?.body?.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User Not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//GET user by email
app.get("/user", async (req, res) => {
  const userEmail = req?.body?.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User Not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// delete user
app.delete("/delete", async (req, res) => {
  const userId = req?.body?.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// Update data of the user
app.patch("/update/:userId", async (req, res) => {
  const userId = req?.params?.userId;
  //after find the id then we update some data that is in the json request body
  const data = req?.body;
  try {
    const ALLOWED_UPDATES = ["photoUrl", "skilss", "about", "age", "gender"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k),
    );
    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }
    if (data?.skills && data?.skills.length > 10) {
      throw new Error("Skills Can not be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before", // it will return me the document before update , 3rd parameter as a options for this method, if use after then give the after update data
      runValidators: true,
    });
    console.log(user);
    res.send("User updated Successfully");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
  }
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
