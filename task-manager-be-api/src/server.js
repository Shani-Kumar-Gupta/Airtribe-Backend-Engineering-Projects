/* Imported the express module to create and listen the server */
const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const startServer = () => {
  /* CREATE and LISTEN Server */
  app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`);
  });
};

module.exports = startServer;
