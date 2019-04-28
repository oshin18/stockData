
/** ********************** Require Node modules ********************* */
const mongoose = require('mongoose');

/** ********************** Require Local modules ********************* */
const DB = require('../dbConnection');

const userSchema = mongoose.Schema({

  f_name: { type: String },
  m_name: { type: String },
  l_name: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  email: {
    type: String, required: true, index: { unique: true }, match: /.+@.+\..+/, lowercase: true,
  },
  password: { type: String, required: true, select: false },

});

module.exports = DB.model('Users', userSchema);
