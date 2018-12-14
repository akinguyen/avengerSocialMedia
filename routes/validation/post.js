const Validator = require("validator");
const isEmpty = require("./is-empty");
module.exports = data => {
  let errors = {};
  const text = typeof data.text === "string" ? data.text : "";

  if (!Validator.isLength(text, { min: 10 })) {
    errors.text = "Post must be at least 10";
  }
  if (Validator.isEmpty(text)) {
    errors.text = "Text is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
