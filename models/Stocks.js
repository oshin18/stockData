
/** ********************** Require Node modules ********************* */
const mongoose = require('mongoose');

/** ********************** Require Local modules ********************* */
const DB = require('../dbConnection');

const stockSchema = mongoose.Schema({

  name: { type: String },
  symbol: {
    type: String, required: true, index: { unique: true }, upprcase: true,
  },
  market_cap: { type: Number },
  sector: { type: String },
  industry: { type: String },

});

module.exports = DB.model('Stocks', stockSchema);
