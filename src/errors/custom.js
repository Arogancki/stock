// every error should have seperate definition

module.exports = class CustomError extends Error {
  constructor(message, code) {
    super();
    this.name = 'CustomError';
    this.message = message;
    this.code = code;
  }
};
