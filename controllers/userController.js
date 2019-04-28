
/* ********************************* Import node Modules ********************************* */
const Boom = require('boom');

/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { userService } = require('../services');

module.exports = {

  /** @function register
   * @description this function is used to register a user
   * @param req includes the user details for registration
   * @param res includes the status and message
   * @param next callback
   */
  register: async (req, res, next) => {
    logger.info('Register Request: ', req.body);

    try {
      const userResult = await userService.register(req.body);
      if (userResult) {
        res.message = 'User registered successfully';
        next();
      } else {
        next(Boom.conflict(new Error('Something went wrong')));
      }
    } catch (error) {
      logger.error('Register User', error);
      next(Boom.conflict(new Error('Something went wrong')));
    }
  },

  /** @function login
   * @description this function is used to login a user
   * @param req includes the user email and password
   * @param res includes the status and data
   * @param next callback
   */
  login: async (req, res, next) => {
    logger.info('Login Request: ', req.body);

    try {
      const loginResult = await userService.login(req.body);
      if (loginResult.email) {
        res.data = loginResult;
        next();
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'Invalid password') {
        next(Boom.unauthorized('Invalid Password'));
      } else if (err.message === 'User does not exist') {
        next(Boom.notFound('User does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },


};
