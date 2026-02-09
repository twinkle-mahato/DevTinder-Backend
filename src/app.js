const express = require("express");

const app = express();


app.use("/", (err, req, res, next) => {
  if(err){
    //log your error
    res.status(500).send("Something went wrong");
  }
});


app.get("/getUserData", (req, res) => {
  //try{
  //Logic of Db call and get user data
  throw new error("cdxbnkjzxc");
  res.send("User data sent");
  //}
  //catch(err){
    //res.status(500).send("Write the error message here");
 // }
});

app.use("/", (err, req, res, next) => {
  if(err){
    //log your error
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server Listening on port 7777");
});
