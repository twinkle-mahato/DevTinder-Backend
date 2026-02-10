// Import mongoose library (only loads code, does NOT connect to DB)
const mongoose = require("mongoose");

// Create a Schema (this is just a structure / blueprint)
const userSchema = mongoose.Schema({
  // firstName field → must be a String
  firstName: {
    type: String,
  },

  // lastName field → must be a String
  lastName: {
    type: String,
  },

  // emailId field → must be a String

  emaiId: {
    type: String,
  },

  // password field → must be a String
  password: {
    type: String,
  },

  // age field → must be a Number
  age: {
    type: Number,
  },

  // gender field → must be a String
  gender: {
    type: String,
  },
});

// ---------------- IMPORTANT PART ----------------

// Create a Model named "User" using the schema
// Model = tool that lets us talk to MongoDB
// It is used to: create, read, update, delete users

// const User = mongoose.model("User", userSchema);
// module.exports = User;

// MongoDB will automatically create a collection named "users"
module.exports = mongoose.model("User", userSchema);
