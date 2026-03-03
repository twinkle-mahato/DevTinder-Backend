const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware to handle authorization for all /user requests
const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    //extarct the token from cookis
    const { token } = cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    //validate the cookie
    const decodedData = await jwt.verify(token, "Dev#Tinder@123");

    //from the decodedData extract the userId
    const { _id } = decodedData;

    // it will give you the all information about the user
    const user = await User.findById(_id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found. Please log in again.",
      });
    }

    req.user = user; // so whatever the user i found on the database i will just attach with the request and i call the next()
    next();
  } catch (err) {
    res.status(400).send("Error : " + err.message);
  }
};

module.exports = {
  userAuth,
};
