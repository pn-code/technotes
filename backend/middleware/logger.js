const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
<<<<<<< HEAD
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message, logFileName) => {
    const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        const logsDirectory = path.join(__dirname, "..", "logs");
        const logDirectory = path.join(logsDirectory, logFileName)

        if (!fs.existsSync(logsDirectory)) {
            await fsPromises.mkdir(logsDirectory);
        }

        await fsPromises.appendFile(logDirectory, logItem);
    } catch (error) {
        console.log(error);
    }
};

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
    console.log(`${req.method} ${req.path}`);
    next();
};

module.exports = { logger, logEvents };
=======
const fsPromises = require("fs/promises");
const path = require("path");

const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    const logsDirectory = path.join(__dirname, "..", "logs");
    const logDirectory = path.join(logsDirectory, logFileName);

    if (!fs.existsSync(logsDirectory)) {
      await fsPromises.mkdir(logsDirectory);
    }
    await fsPromises.appendFile(logDirectory, logItem);
  } catch (error) {
    console.error(error.message);
  }
};

const logger = async (req, res, next) => {
  const logMessage = `${req.path}\t${req.method}\t${req.url}\t${req.headers.origin}`;
  const logFileName = "reqLog.log";

  await logEvents(logMessage, logFileName);
  console.log(req.method, req.path);
  next();
};

module.exports = { logEvents, logger };
>>>>>>> 2ede7e6ed864939e8cdad6904e86be0afdb8828a
