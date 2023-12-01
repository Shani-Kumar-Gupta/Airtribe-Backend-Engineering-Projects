const { default: axios } = require('axios');

/* News API tto fetch News data using promises */
const fetchNews = (url) => {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err);
      });
  });
};

module.exports = {
  fetchNews,
};
