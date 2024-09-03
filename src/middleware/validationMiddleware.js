const { body } = require("express-validator");

const signupValidation = [
  body("email").trim().isEmail(),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()?])[A-Za-z\d!@#$%^&*()?]+$/
    )
    .withMessage(
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  body("name").trim().notEmpty(),
];

const authValidation = [
  body("email").trim().isEmail(),
  body("password").trim().notEmpty(),
];

module.exports = {
  signupValidation,
  authValidation,
};
