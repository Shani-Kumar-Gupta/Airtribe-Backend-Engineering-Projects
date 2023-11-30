const fs = require('fs');
const requestLoggerData = require('../db/requestLogger.json');
// const path = require('path');

/* Request details logger middleware */
const requestLoggerMiddleware = (req, res, next) => {
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
  let requestLoggerObj = {
    requestURL: req.url,
    requestMethod: req.method,
    requestTime: datetime,
  };
  let reqLogsData = JSON.parse(JSON.stringify(requestLoggerData));
  reqLogsData.requestLogs.push(requestLoggerObj);
  try {
    let finalReqLogs = JSON.stringify(reqLogsData);
    fs.writeFileSync('./src/db/requestLogger.json', finalReqLogs, {
      encoding: 'utf8',
      flag: 'w',
    });
  } catch (error) {
    console.log(`Encountered error while writing log: ${error}`);
  }
};

module.exports = requestLoggerMiddleware;
