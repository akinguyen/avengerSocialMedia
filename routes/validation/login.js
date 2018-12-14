const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = data => {
  let errors = {};
  var email = typeof data.email === "string" ? data.email : "";
  var password = typeof data.password === "string" ? data.password : "";

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
