const express = require('express');
const app = express();
const routes = express.Router();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;

/* Middlewares */
app.use(bodyParser.json());

/* Routers */
routes.get('/', (req, res) => {
  return res
    .status(200)
    .send(`<h1>Welcome To News Aggregator Backend API Application</h1>`);
});

/* CREATE and LISTEN Server */
app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server listening on PORT: ${PORT}`);
  } else {
    console.log(`Some Error Enconuntered to run the Server: ${err}`);
  }
});
