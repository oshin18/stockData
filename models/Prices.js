
/** ********************** Require Node modules ********************* */
const mongoose = require('mongoose');

/** ********************** Require Local modules ********************* */
const DB = require('../dbConnection');

const priceSchema = mongoose.Schema({

  date: { type: Date, required: true },
  symbol: { type: String, required: true, upprcase: true },
  open: { type: Number },
  close: { type: Number },
  low: { type: Number },
  high: { type: Number },
  volume: { type: Number },

});

module.exports = DB.model('Prices', priceSchema);
