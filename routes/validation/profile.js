const Validator = require("validator");
const isEmpty = require("./is-empty");

const validateEduInput = data => {
  const errors = {};
  const school = typeof data.school === "string" ? data.school : "";
  const degree = typeof data.degree === "string" ? data.degree : "";
  const major = typeof data.major === "string" ? data.major : "";

  if (Validator.isEmpty(school)) {
    errors.school = "School is required";
  }
  if (Validator.isEmpty(degree)) {
    errors.degree = "Degree is required";
  }
  if (Validator.isEmpty(major)) {
    errors.major = "Major is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

const validateProfileInput = data => {
  const errors = {};
  const handle = typeof data.handle === "string" ? data.handle : "";
  const skills = typeof data.skills === "string" ? data.skills : "";
  data.youtube = typeof data.youtube === "string" ? data.youtube : "";
  data.facebook = typeof data.facebook === "string" ? data.facebook : "";
  if (!Validator.isLength(handle, { min: 5, max: 30 })) {
    errors.handle = "Handle has to be between 5 and 30";
  }
  if (Validator.isEmpty(handle)) {
    errors.handle = "Handle is required";
  }
  if (Validator.isEmpty(skills)) {
    errors.skills = "Skill List is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
const validateExpInput = data => {
  const errors = {};
  const title = typeof data.title === "string" ? data.title : "";
  const company = typeof data.company === "string" ? data.company : "";
  const years = typeof data.years === "string" ? data.years : "";
  if (Validator.isEmpty(title)) {
    errors.title = "Title is required";
  }
  if (Validator.isEmpty(company)) {
    errors.company = "Company is required";
  }
  if (Validator.isEmpty(years)) {
    errors.years = "Years is/are required";
  }
  return { errors, isValid: isEmpty(errors) };
};
module.exports = { validateProfileInput, validateExpInput, validateEduInput };
