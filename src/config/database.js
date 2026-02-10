const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://twinklemahato90_db_user:K8Er6ff1SHiB4THM@cluster0.wbcuael.mongodb.net/devTinder",
  );
};

module.exports = {
  connectDB,
};
