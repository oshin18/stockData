
/** ********************** Require Node modules ********************* */
const JOI = require('joi');
const Boom = require('boom');

/** ********************** Require Local modules ********************* */
const { logger } = require('../utils');

const schema = {
  '/login': {
    body: JOI.object().keys({
      email: JOI.string().email().required(),
      password: JOI.string().required(),
    }),
    params: null,
  },
  '/registerUser': {
    body: JOI.object().keys({
      email: JOI.string().email().required(),
      f_name: JOI.string().required(),
      l_name: JOI.string().required(),
      m_name: JOI.string().optional(),
      password: JOI.string().regex(/^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$/).required(),
    }),
    params: null,
  },
  '/user/:id/company/:name': {
    body: null,
    params: JOI.object().keys({
      name: JOI.string().required(),
      id: JOI.string().required(),
    }),
  },
  '/user/:id/ticker/:symbol': {
    body: null,
    params: JOI.object().keys({
      symbol: JOI.string().required(),
      id: JOI.string().required(),
    }),
  },
  '/user/:id/price/:fromDate/:toDate': {
    body: null,
    params: JOI.object().keys({
      fromDate: JOI.date().required(),
      toDate: JOI.date().required(),
      id: JOI.string().required(),
    }),
  },
  '/user/:id/stock/:symbol/price/:fromDate/:toDate': {
    body: null,
    params: JOI.object().keys({
      fromDate: JOI.date().required(),
      toDate: JOI.date().required(),
      symbol: JOI.string().required(),
      id: JOI.string().required(),
    }),
  },
};

module.exports = async (req, res, next) => {
  try {
    if (schema[req.route.path].body) {
      // Body validation
      await JOI.validate(req.body, schema[req.route.path].body);
    }
    if (schema[req.route.path].params) {
      // Param validation
      await JOI.validate(req.params, schema[req.route.path].params);
    }
    next();
  } catch (err) {
    logger.error('Error in API validation', err.details[0].message);
    next(Boom.badData(err.details[0].message));
  }
};
