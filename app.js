const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('app-module-path').addPath(__dirname);
const debug = require('debug')('charactersCrud:server');

const account = require('src/routes/account');
const character = require('src/routes/character');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('swagger.json');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// declare routes
app.use('/v1/account', account);
app.use('/v1/character', character);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  debug(err.stack);

  // render the error page
  res.status(err.status || 500);
    res.json({
        result: false,
        data: res.locals.message
    });
});

module.exports = app;
