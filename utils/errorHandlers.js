class ErrorHandlers extends Error {
  constructor(message, statusCode) {
    super(message);
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandlers;