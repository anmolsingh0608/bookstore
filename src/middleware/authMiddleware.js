const jwt = require("jsonwebtoken");
const CustomError = require("../util/custom-error");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    throw new CustomError("Token not present", 401);
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    throw new CustomError("Invalid Token", 401);
  }

  if (!decoded) {
    throw new CustomError("Not authenticated", 401);
  }
  req.user = decoded;
  next();
};

module.exports = authMiddleware;
