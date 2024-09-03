const successResponse = (statusCode, message, res, data = []) => {
  return res.status(statusCode).json({ message: message, data: data });
};

module.exports = {
  successResponse,
};
