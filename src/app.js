const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    //Route Handler
    console.log("handling the route user 1 !!");
    //res.send("Response");
    next();
  },
  (req, res, next) => {
    //route handler
    console.log("handling the route user 2 !!");
    //res.send("Response 2");
    next();
  },
  (req, res, next) => {
    //route handler
    console.log("handling the route user 2 !!");
    //res.send("Response 3");
    next();
  },
  (req, res, next) => {
    //route handler
    console.log("handling the route user 2 !!");
    res.send("Response 4");
  },
);

app.listen(7777, () => {
  console.log("Server Listening on port 7777");
});
