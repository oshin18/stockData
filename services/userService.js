
/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const { encryption, authentication } = require('../helpers');
const Users = require('../models/Users');


module.exports = {

  /** @function register
   * @description this function is used to register a user
   * @param userDetails includes the user details for registration
   */
  register: async (userDetails) => {
    try {
      const encryptedPassword = await encryption.encryptPassword(userDetails.password);
      userDetails.password = encryptedPassword; // eslint-disable-line no-param-reassign
      logger.info('DB register user', userDetails);
      const user = await Users.create(userDetails);
      logger.info('DB register user response', user);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },

  /** @function login
     * @desc This function is for user login
     * @param {JSON Object} userDetails includes the user email and password
     */
  login: async (userDetails) => {
    const projections = {
      password: true,
      email: true,
      status: true,
      f_name: true,
      l_name: true,
    };
    const result = {};

    const dbLoginResponse = await Users.findOne({ email: userDetails.email }, projections);
    if (dbLoginResponse) {
      logger.info('DB User login response: ', dbLoginResponse);
      const validPassword = await encryption.comparePassword(userDetails.password, dbLoginResponse);
      if (!validPassword) {
        logger.error('DB User login error: Invalid password!');
        throw new Error('Invalid password!');
      } else {
        const token = await authentication.createToken(dbLoginResponse);
        result.token = token;
        result.message = 'Successful login';
        result.email = dbLoginResponse.email;
        result.id = dbLoginResponse.id;
        result.status = dbLoginResponse.status;
        result.name = `${dbLoginResponse.f_name} ${dbLoginResponse.l_name}`;
        logger.info('DB login response: ', result);
        return result;
      }
    } else {
      logger.error('DB User login error: User does not exist');
      throw new Error('User does not exist');
    }
  },

};
