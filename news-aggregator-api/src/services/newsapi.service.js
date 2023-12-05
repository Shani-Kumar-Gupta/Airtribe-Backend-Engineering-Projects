const { default: axios } = require('axios');

/* News API tto fetch News data using promises */
function fetchNews(url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(resp => {
      return resolve(resp);
    }).catch(err => {
      return reject(err);
    });
  });
}

module.exports = {
  fetchNews,
};
