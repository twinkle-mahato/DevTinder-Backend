const express = require("express");

const app = express();

app.use("/hello/2", (req, res) => {
  res.send("Abra Ka Dabra");
});

app.use("/hello", (req, res) => {
  res.send("Hello Hello Hello!!!");
});

// "/hello" over write the "/hello/2" that is why we go to this path it alwasy showing hello hello hello!! so we need to write this route "/hello/2" before "/hello" so it wont overwrite

// app.use("/hello/2", (req, res) => {
//   res.send("Abra Ka Dabra");
// });

app.use("/test", (req, res) => {
  res.send("Hello from server!!!");
});

app.use("/", (req, res) => {
  res.send("Namaste Akshay!!!");
});


app.listen(7777, () => {
  console.log("Server Listening on port 7777");
});

