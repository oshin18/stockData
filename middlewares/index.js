const validator = require('./validator');
const authenticator = require('./authenticator');
const errorHandler = require('./errorHandler');
const responseHandler = require('./responseHandler');

module.exports = {
  validator,
  authenticator,
  errorHandler,
  responseHandler,
};
