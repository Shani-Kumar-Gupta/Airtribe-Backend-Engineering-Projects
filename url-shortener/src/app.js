/* Importing Required Packages */
const express = require('express');
const { PORT_NUMBER } = require('./config/app.env');

/* Initializing APP using express */
const app = express();

const PORT = PORT_NUMBER || 3000;

/* Creating and Running a Server */
app
  .listen(PORT, (err, data) => {
    if (!err) console.log(`Server listening at ${PORT}`);
  })
  .on('error', (err) => {
    console.error(err);
  });
