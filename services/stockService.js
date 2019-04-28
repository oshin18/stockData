
/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const Stocks = require('../models/Stocks');


module.exports = {

  /** @function createMultiple
     * @description this function is used populate stocks
     * @param stockDetails includes the user details for registration
     */
  createMultiple: async (stockDetails) => {
    try {
      const stocks = await Stocks.insertMany(stockDetails);
      return stocks;
    } catch (error) {
      logger.error('Error', error);
      throw new Error(error);
    }
  },

  /** @function getCompanyCode
     * @desc This function is for fetching comapny code
     * @param {String} name includes company name
     */
  getCompanyCode: async (name) => {
    const response = await Stocks.findOne({ name });
    if (response) {
      logger.info('DB get Comapny code', response);
      return response;
    }
    logger.error('DB get company code error: Company does not exist');
    throw new Error('Company does not exist');
  },


};
