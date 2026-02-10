const express = require("express");
const { connectDB } = require("./config/database");

const app = express();
const User = require("./models/user");

//our middleware now be activated for all the routes
app.use(express.json());

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
