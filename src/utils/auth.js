// Middleware to handle authorization for all /admin requests
const adminAuth = (req, res, next) => {
  // Logic to check if the admin request is authorized
  console.log("Admin authorization is being checked");

  const token = "xyz"; // dummy token (for learning)
  const isAdminAuthorised = token === "xyz";

  if (!isAdminAuthorised) {
    return res.status(401).send("Unauthorized admin request");
  }

  next();
};

// Middleware to handle authorization for all /user requests
const userAuth = (req, res, next) => {
  // Logic to check if the user request is authorized
  console.log("User authorization is being checked");

  const token = "xyzabc"; // dummy token (for learning)
  const isUserAuthorised = token === "xyzabc";

  if (!isUserAuthorised) {
    return res.status(401).send("Unauthorized user request");
  }

  next();
};

module.exports = {
  adminAuth,
  userAuth,
};
