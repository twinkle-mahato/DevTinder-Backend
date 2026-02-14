const validator = require("validator");

const validateSignupdata = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    console.log("Name field is required");
  }
  //you can skip this beacuse you alreday write check validation for name
  else if (firstName.length < 4 || firstName.length > 30) {
    console.log("Name length should be 4-30 characters");
  } else if (!validator.isEmail(emailId)) {
    console.log("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    console.log("Please enter a strong password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "about",
    "age",
    "gender",
    "skills",
    "photoUrl",
  ];

  //i will loop through this request body
  const isAllowed = Object.keys(req.body).every(
    (field) => allowedEditFields.includes(field), // for every field i will check if my allowedEditFields includes that particular filed and if it is valid then only edit allowed.
  );
  return isAllowed;
};

module.exports = { validateSignupdata, validateEditProfileData };
