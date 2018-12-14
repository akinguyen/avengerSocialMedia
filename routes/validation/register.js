const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = data => {
  let errors = {};
  var name = typeof data.name === "string" ? data.name : "";
  var email = typeof data.email === "string" ? data.email : "";
  var password = typeof data.password === "string" ? data.password : "";

  if (!Validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (Validator.isEmpty(name)) {
    errors.name = "Name is required";
  }
  if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(password)) {
    errors.password = "Password is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
