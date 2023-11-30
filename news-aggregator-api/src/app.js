const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser');
const { authRouter, newsAggregatorRouter } = require('./routes');
const { PORT } = require('./config/env.config');
const { requestLoggerMiddleware } = require('./middlewares');

const PORT = PORT || 3000;

/* Middlewares */
app.use(requestLoggerMiddleware);
app.use(bodyParser.json());
app.use(routes);

/* Routers */
routes.get('/', (req, res) => {
  return res
    .status(200)
    .send(`<h1>Welcome To News Aggregator Backend API Application</h1>`);
});

/* Auth Router */
routes.use('/auth', authRouter);

/* News Aggregator Router */
routes.use('/newsAggregator', newsAggregatorRouter);

/* CREATE and LISTEN Server */
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server listening on PORT: ${PORT}`);
  } else {
    console.log(`Some Error Enconuntered to run the Server: ${err}`);
  }
});
