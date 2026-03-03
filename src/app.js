const express = require("express");
const { connectDB } = require("./config/database");

const app = express();
const cookieparser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
//our middleware now be activated for all the routes
app.use(cookieparser()); // to read and parse cookies from incoming requests.
app.use(express.json()); //parse incoming JSON request bodies and make the data accessible

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const request = require("./routes/requests");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
