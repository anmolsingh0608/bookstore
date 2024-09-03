const { signup, login } = require("../controllers/authController");
const {
  signupValidation,
  authValidation,
} = require("../middleware/validationMiddleware");
const { tryCatchWrapperAsync } = require("../util/try-catch-wrapper");

const router = require("express").Router();

router.post("/signup", signupValidation, tryCatchWrapperAsync(signup));

router.post("/login", authValidation, tryCatchWrapperAsync(login));

module.exports = router;
