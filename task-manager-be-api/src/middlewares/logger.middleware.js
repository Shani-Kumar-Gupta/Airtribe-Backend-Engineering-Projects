const requestLoggerData = require('../resource/logs.json');
const fs = require('fs');

function logger(req, res, next) {
  let currentdate = new Date();
  let datetime =
    currentdate.getDay() +
    '/' +
    currentdate.getMonth() +
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
  let logReport = requestLoggerData.requestLogs;
  logReport.push(logObj);
  try {
    fs.writeFileSync(
      '../resource/logs.json',
      JSON.parse(JSON.stringify(logReport)),
      { encoding: 'utf8', flag: 'w' }
    );
  } catch (error) {
    console.log(`Encountered error while writing log: ${error}`);
  }
}

module.exports = logger;
