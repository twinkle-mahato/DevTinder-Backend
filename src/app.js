// Load Express framework code into memory
const express = require("express");

// Import connectDB function from database config file
// (this does NOT connect yet)
const { connectDB } = require("./config/database");

// Create an Express application object
const app = express();

// Import User model (schema + model logic)
const User = require("./models/user");

// This function will run ONLY when a POST request hits /signup
//Route is registered, not executed,async allows use of await inside

app.post("/signup", async (req, res) => {
  //   const userObj = {
  //     firstName: "Twinkle",
  //     lastName: "Mahato",
  //     emailId: "twinkle@mahato.com",
  //     password: "Twinkle@123",
  //   };
  //creating a new instance  of the user model
  //   const user = new User(userObj);

  //or you can write like this
  //A JavaScript object is created,It matches your User schema,This is NOT saved yet

  const user = new User({
    firstName: "Akshay",
    lastName: "Saini",
    emailId: "akshay@saini.com",
    password: "Akshay@123",
  });
  try {
    // Mongoose sends this data to MongoDB, node waits here until DB responds, saving user to database
    await user.save();
    //Client (Postman) receives response
    res.send("User added Successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

//DB connection starts,This .then() runs ONLY after DB is connected, so here listen is inside promise , so the after consolo log it will created the server. always create a database connection then create a server.Because server DEPENDS on database to do its work
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
