const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Hello From Server!!!");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello!!!");
});


app.listen(7777, () => {
  console.log("Server Listening on port 7777");
});
