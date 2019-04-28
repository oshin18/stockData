
/** ********************** Require local modules ************************ */
const { logger } = require('./utils');
const { stockController } = require('./controllers');
const Stocks = require('./models/Stocks');
const Prices = require('./models/Prices');


Stocks.find().count().then((result) => {
  logger.info('stocks count in DB', result);
  if (result === 0) {
    stockController.populateStocks();
  } else {
    logger.info('Stocks already registered');
  }
}).catch((error) => {
  logger.error('Error while fetching stocks count', error);
});


Prices.find().count().then((result) => {
  logger.info('prices count in DB', result);
  if (result === 0) {
    stockController.populatePrices();
  } else {
    logger.info('Prices already registered');
  }
}).catch((error) => {
  logger.error('Error while fetching prices count', error);
});
