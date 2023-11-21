const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const { loggerMiddleware } = require('./middlewares');
const { taskManagerRouter } = require('./routes');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

/* Middlewares */
app.use(bodyParser.json());
app.use(loggerMiddleware);
app.use(routes);

/* Routers */
routes.get('/', (req, res) => {
  return res
    .status(200)
    .send(`<h1>Welcome To Task Manager Application Backend API</h1>`);
});

routes.use('/taskManager', taskManagerRouter);

/* CREATE and LISTEN Server */
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server listening on PORT: ${PORT}`);
  } else {
    console.log(`Some Error Enconuntered to run the Server: ${err}`);
  }
});
