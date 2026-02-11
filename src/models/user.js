const mongoose = require("mongoose");
const validator = require("validator")

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
      }
    },
    age: {
      type: Number,
      min: 18,
      max: 30,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "This is the default value",
    },
    photoUrl: {
      type: String,
      default:
        "https://st2.depositphotos.com/9998432/48297/v/1600/depositphotos_482974552-stock-illustration-default-avatar-photo-placeholder-grey.jpg",
          validate(value) {
        if ( value && !validator.isURL(value)) {
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

// const User = mongoose.model("User", userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema);
