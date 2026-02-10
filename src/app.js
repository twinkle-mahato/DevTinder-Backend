const express = require("express");
const { connectDB } = require("./config/database");

const app = express();
const User = require("./models/user");

//our middleware now be activated for all the routes
app.use(express.json());

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

app.post("/signup", async (req, res) => {
  //creating a new instance of user model
  console.log(req.body);
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
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
