require('dotenv').config();

const { PORT_NUMBER, NODE_ENVIRONMENT } = process.env;

module.exports = {
  PORT_NUMBER,
  NODE_ENV: NODE_ENVIRONMENT
}