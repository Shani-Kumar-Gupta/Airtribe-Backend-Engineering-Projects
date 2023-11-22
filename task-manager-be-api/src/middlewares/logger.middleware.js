const requestLoggerData = require('../resource/logs.json');
const fs = require('fs');

function logger(req, res, next) {
  let currentdate = new Date();
  let datetime =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();
  let logObj = {
    requestURL: req.url,
    requestMethod: req.method,
    requestTime: datetime,
  };
  let logsData = JSON.parse(JSON.stringify(requestLoggerData));
  logsData.requestLogs.push(logObj);
  try {
    let data = JSON.stringify(logsData);
    console.log(data);
    fs.writeFileSync('./src/resource/logs.json', data, {
      encoding: 'utf8',
      flag: 'w',
    });
  } catch (error) {
    console.log(`Encountered error while writing log: ${error}`);
  }
  next();
}

module.exports = logger;
