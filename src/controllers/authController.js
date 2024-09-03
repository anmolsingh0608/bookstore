const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { successResponse } = require("../util/response");
const jwt = require("jsonwebtoken");
const checkValidationErrors = require("../util/validation-errors");
const CustomError = require("../util/custom-error");
const UserService = require("../services/UserService");
const userService = new UserService(User);

const signup = async (req, res) => {
  const { email, password, name } = req.body;
  const username = email.split("@")[0];
  const hashedPassword = await bcrypt.hash(password, 8);

  await userService.createUser({
    email: email,
    password: hashedPassword,
    name: name,
    username: username,
  });

  return successResponse(200, "User created", res);
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userService.findOne({ email: email });

  if (!user) {
    throw new CustomError("Invalid email", 404);
  }

  const accountPassword = user.password;
  const isAuth = await bcrypt.compare(password, accountPassword);

  if (!isAuth) {
    throw new CustomError("Invalid password", 403);
  }

  const secretKey = process.env.SECRET_KEY;
  const payload = {
    email: user.email,
    id: user.id,
    name: user.name,
    username: user.username,
  };
  const accessToken = jwt.sign(payload, secretKey, {
    expiresIn: "24h",
  });

  return successResponse(200, "success", res, { accessToken, user: payload });
};

module.exports = {
  signup,
  login,
};
