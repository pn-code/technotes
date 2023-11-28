require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");

const { logger, logEvents } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT || 3500;

// Initiate express app
const app = express();

connectDB();

// MIDDLEWARES
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

// ROUTES
app.use("/", require("./routes/root"));
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/notes", require("./routes/noteRoutes"))
app.all("*", (req, res) => {
    const notFoundHtmlPage = path.join(__dirname, "views", "404.html");

    res.status(404);

    if (req.accepts("html")) {
        res.sendFile(notFoundHtmlPage);
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
});

mongoose.connection.on("error", (error) => {
  const mongoErrorMessage = `${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`;
  const mongoErrorFileName = "mongoErrLog.log";
  console.log(error);

  logEvents(mongoErrorMessage, mongoErrorFileName);
});
