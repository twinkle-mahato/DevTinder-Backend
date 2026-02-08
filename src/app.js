const express = require("express");

const app = express();

// This will only  handle GET call  to /user
app.get("/user", (req, res) => {
  res.send({
    firstname: "Twinkle",
    lastName: "Mahato",
  });
});

app.post("/user", (req, res) => {
  // data save successfully
  res.send("Data successfully send to the database !!");
});

app.delete("/user", (req, res) => {
  res.send("Deleted Successfully");
})

// This Match all the HTTP methods API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from server!!!");
});

app.listen(7777, () => {
  console.log("Server Listening on port 7777");
});
