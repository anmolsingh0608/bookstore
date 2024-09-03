const validator = require("validator");

const isValidEmail = (email) => {
  return validator.isEmail(email);
};

const isValidPassword = (password) => {
  if (password.trim() < 8) {
    return false;
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?])[A-Za-z\d!@#$%^&*()?]+$/;

  return validator.matches(password, passwordPattern);
};

const isValidName = (name) => {
  const isValid = !validator.isEmpty(name);

  return isValid;
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isValidName,
};
