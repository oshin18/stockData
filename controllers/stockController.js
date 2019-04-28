
/** ********************** Require Node modules ************************ */
const Excel = require('exceljs');
const Path = require('path');
const Boom = require('boom');

/** ********************** Require local modules ************************ */
const { logger } = require('../utils');
const {
  stockService,
  priceService,
} = require('../services');

const wb = new Excel.Workbook();

module.exports = {


  /** @function populateStocks
      * @desc This function is for populating stocks in DB
      */
  populateStocks: () => {
    const filePath = Path.join(__dirname, '../files/stocks.xlsx');
    wb.xlsx.readFile(filePath)
      .then(() => {
        const sh = wb.getWorksheet('Sheet1');
        const stocks = [];
        sh.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber > 1) {
            const stock = {
              symbol: row.values[1],
              name: row.values[2],
              market_cap: row.values[3],
              sector: row.values[4],
              industry: row.values[5],
            };
            stocks.push(stock);
          }
        });
        stockService.createMultiple(stocks)
          .then(() => {
            logger.info('Stocks registered');
          })
          .catch((err) => {
            logger.error('Error', err);
          });
      })
      .catch((err) => {
        logger.error('Error in controller', err);
      });
  },


  /** @function populatePrices
      * @desc This function is for populating prices in DB
      */
  populatePrices: () => {
    const filePath = Path.join(__dirname, '../files/prices.xlsx');
    wb.xlsx.readFile(filePath)
      .then(() => {
        const sh = wb.getWorksheet('prices');
        const prices = [];
        sh.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          if (rowNumber > 1) {
            const price = {
              date: new Date(row.values[1]),
              symbol: row.values[2],
              open: row.values[2],
              close: row.values[3],
              low: row.values[4],
              high: row.values[5],
              volume: row.values[6],
            };
            prices.push(price);
          }
        });
        priceService.createMultiple(prices)
          .then(() => {
            logger.info('Prices registered');
          })
          .catch((err) => {
            logger.error('Error', err);
          });
      })
      .catch((err) => {
        logger.error('Error in controller', err);
      });
  },

  /** @function companySearch
      * @desc This function is for searching company
      */
  companySearch: async (req, res, next) => {
    logger.info('Company search Request: ', req.params);

    try {
      const result = await stockService.getCompanyCode(req.params.name);
      if (result.symbol) {
        const priceResult = await priceService.getPricesBySymbol(result.symbol);
        res.data = priceResult;
        next();
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    } catch (err) {
      logger.error(err);
      if (err.message === 'Company does not exist') {
        next(Boom.notFound('Company does not exist'));
      } else if (err.message === 'Prices does not exist') {
        next(Boom.notFound('Prices does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  /** @function timeFrame
      * @desc This function is for time frame
      */
  timeFrame: async (req, res, next) => {
    logger.info('Time Frame Request: ', req.params);

    try {
      const priceResult = await priceService.getPricesBtwTimeRange(req.params);
      res.data = priceResult;
      next();
    } catch (err) {
      logger.error(err);
      if (err.message === 'Prices does not exist') {
        next(Boom.notFound('Prices does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  /** @function stocksInTime
      * @desc This function is for time frame
      */
  stocksInTime: async (req, res, next) => {
    logger.info('Stock in time Request: ', req.params);
    let symbols = [];
    symbols = req.params.symbol.split(',');
    logger.info('Stock in time Request: ', symbols);
    try {
      const priceResult = await priceService.getStocksPricesInTime(symbols, req.params);
      res.data = priceResult;
      next();
    } catch (err) {
      logger.error(err);
      if (err.message === 'Prices does not exist') {
        next(Boom.notFound('Prices does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

  /** @function tickerSearch
      * @desc This function is for searching ticker
      */
  tickerSearch: async (req, res, next) => {
    logger.info('Ticker search Request: ', req.params);

    try {
      const priceResult = await priceService.getPricesBySymbol(req.params.symbol);
      res.data = priceResult;
      next();
    } catch (err) {
      logger.error(err);
      if (err.message === 'Prices does not exist') {
        next(Boom.notFound('Prices does not exist'));
      } else {
        next(Boom.conflict('Something went wrong'));
      }
    }
  },

};
