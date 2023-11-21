const { logEvents } = require("./logger");

const errorHandler = (err, req, res, next) => {
  const errorMessage = `${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  const errorLogFileName = "errLog.log";

  logEvents(errorMessage, errorLogFileName);
  console.log(err.stack);

  const status = req.statusCode ? res.statusCode : 500; // Server Error

  res.status(status);
  res.json({ message: err.message });
};

module.exports = errorHandler;
