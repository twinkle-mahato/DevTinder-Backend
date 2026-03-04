const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 30,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid:" + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password :" + value);
        }
      },
    },
    age: {
      type: Number,
      trim: true,
      min: 18,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not a valid gender type",
      },
    },
    // gender: {
    //   type: String,
    //   validate(value) {
    //     if (!["male", "female", "others"].includes(value)) {
    //       throw new Error("Gender data is not valid");
    //     }
    //   },
    // },

    about: {
      type: String,
      default: "This is the default value",
    },
    photoUrl: {
      type: String,
      default:
        "https://img.freepik.com/premium-photo/simplistic-avatar-design-featuring-flatstyle-profile-icon-user-representation-perfect_1283595-13136.jpg?w=360",
      validate(value) {
        if (value && !validator.isURL(value)) {
          throw new Error("Photo URL is not valid:" + value);
        }
      },
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, "Dev#Tinder@123", {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password; //this password stored in db which is encrypted

  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );
  return isPasswordValid;
};

// const User = mongoose.model("User", userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema);
