
/* ********************************* Import Local Modules ********************************* */
const { logger } = require('../utils');
const Prices = require('../models/Prices');


module.exports = {

  /** @function createMultiple
     * @description this function is used populate prices
     * @param priceDetails includes the user details for registration
     */
  createMultiple: async (priceDetails) => {
    try {
      const prices = await Prices.insertMany(priceDetails);
      return prices;
    } catch (error) {
      logger.error('Error', error);
      throw new Error(error);
    }
  },

  /** @function getPricesBySymbol
     * @desc This function is for fetching prices for company
     * @param {String} symbol includes company symbol
     */
  getPricesBySymbol: async (symbol) => {
    const response = await Prices.find({ symbol });
    if (response.length !== 0) {
      logger.info('DB get Prices for company', response);
      return response;
    }
    logger.error('DB get prices for comapny error: Prices does not exist');
    throw new Error('Prices does not exist');
  },

  /** @function getPricesBtwTimeRange
     * @desc This function is for fetching prices btw time range
     * @param {JSON Object} timeRange includes time range
     */
  getPricesBtwTimeRange: async (timeRange) => {
    const response = await Prices.find({
      date: {
        $gt: new Date(timeRange.fromDate),
        $lt: new Date(timeRange.toDate),
      },
    });
    if (response.length !== 0) {
      logger.info('DB get Prices', response);
      return response;
    }
    logger.error('DB get prices for time range error: Prices does not exist');
    throw new Error('Prices does not exist');
  },

  /** @function getStocksPricesInTime
     * @desc This function is for fetching prices for stocks btw time range
     * @param {String} symbols includes symbols
     * @param {JSON Object} timeRange includes time range
     */
  getStocksPricesInTime: async (symbols, timeRange) => {
    const response = await Prices.find({
      symbol: { $in: symbols },
      date: {
        $gt: new Date(timeRange.fromDate),
        $lt: new Date(timeRange.toDate),
      },
    });
    if (response.length !== 0) {
      logger.info('DB get Prices', response);
      return response;
    }
    logger.error('DB get prices for time range error: Prices does not exist');
    throw new Error('Prices does not exist');
  },

};
