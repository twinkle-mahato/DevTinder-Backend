// Import mongoose library
// This only loads mongoose code into memory
// It does NOT connect to the database yet
const mongoose = require("mongoose");

// Create an async function to connect to MongoDB
// async is used because mongoose.connect() takes time
const connectDB = async () => {
  // This line actually starts the DB connection
  // It returns a Promise
  // await means: "wait here until MongoDB connects or fails"
  await mongoose.connect(
    "mongodb+srv://twinklemahato90_db_user:K8Er6ff1SHiB4THM@cluster0.wbcuael.mongodb.net/devTinder",
  );
};

// Export the function so other files (like app.js) can use it
module.exports = {
  connectDB,
};
