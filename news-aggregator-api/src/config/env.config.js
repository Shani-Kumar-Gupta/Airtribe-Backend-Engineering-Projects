require('dotenv').config();

const {
  PORT,
  JWT_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  NEWS_AGGREGATOR_API_KEY,
} = process.env;

module.exports = {
  PORT,
  JWT_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  NEWS_AGGREGATOR_API_KEY,
};