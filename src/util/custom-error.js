class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.isOperational = true;

    // capturing the stack trace keeps the reference to your error class
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
