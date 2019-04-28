
/** ********************** Require node modules ************************ */
const mongoose = require('mongoose');
const config = require('config');

/** ********************** Require local modules ************************ */
const { logger } = require('./utils');

/** ********************** Variable Listing ************************ */
const dbConfig = config.get('General.dbConfig');


/** Database Connection */
module.exports = mongoose.createConnection(dbConfig,
  { useNewUrlParser: true }, (err) => {
    if (err) {
      logger.error(err);
    } else {
      logger.info('Database Connection established');
    }
  });
