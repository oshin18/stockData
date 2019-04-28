
/* ********************************* Import Local Modules ********************************* */
const { userController, stockController } = require('./controllers');
const { validator, authenticator } = require('./middlewares');

module.exports = (app) => {
  // app.get('/', (req, res) => {
  //   res.send({ status: true, message: req.csrfToken() });
  // });

  app.post('/check', (req, res) => {
    res.send({ status: true, message: 'Ok' });
  });

  /* ********************************* User APIs ********************************* */
  app.post('/registerUser', validator, userController.register);

  app.post('/login', validator, userController.login);

  app.get('/user/:id/company/:name', authenticator, validator, stockController.companySearch);

  app.get('/user/:id/price/:fromDate/:toDate', authenticator, validator, stockController.timeFrame);

  app.get('/user/:id/stock/:symbol/price/:fromDate/:toDate', authenticator, validator, stockController.stocksInTime);

  app.get('/user/:id/ticker/:symbol', authenticator, validator, stockController.tickerSearch);
};
