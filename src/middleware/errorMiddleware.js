const logger = require("../util/logger");

const errorHandler = (error, req, res, next) => {
  // verify if it works for throw error or not
  const status = error.status || 500;
  const message = error.message || "Something went wrong.";
  res.status(status).json({ message: message });

  if (error.isOperational) {
    return;
  }

  logger.error(error.stack);
};

module.exports = errorHandler;
