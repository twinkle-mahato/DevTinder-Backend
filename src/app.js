const express = require("express");

const app = express();

const { adminAuth, userAuth } = require("./utils/auth");

// Apply authorization middleware to all routes that start with "/admin"
app.use("/admin", adminAuth);

//if you want to apply authorization to all "/user" routes
//app.use("/user", userAuth);

app.get("/user/login", (req, res, next) => {
  res.send("User logged in successfully");
});

// If we want to apply authorization to a specific route (not for all routes),
// we can pass the auth middleware only to that route.
// The request will first go through `userAuth`, and only if authorization succeeds will it reach this route handler.

app.get("/user", userAuth, (req, res, next) => {
  res.send("User data send");
});

app.get("/admin/getAllData", (req, res, next) => {
  res.send("All data send");
});

app.get("/admin/deleteUser", (req, res, next) => {
  res.send("Deleted a user");
});

app.listen(7777, () => {
  console.log("Server Listening on port 7777");
});
