const checkValidationErrors = require("./validation-errors");

function tryCatchWrapperAsync(controller) {
  return async (req, res, next) => {
    try {
      if (checkValidationErrors(req, res)) {
        return;
      }
      await controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
}

function tryCatchWrapperSync(controller) {
  return (req, res, next) => {
    try {
      if (checkValidationErrors(req, res)) {
        return;
      }
      controller(req, res);
    } catch (error) {
      return next(error);
    }
  };
}

module.exports = { tryCatchWrapperAsync, tryCatchWrapperSync };
