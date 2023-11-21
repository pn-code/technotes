const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

const PORT = process.env.PORT | 3500;
const corsOptions = require("./config/corsOptions");

// Initiate express app
const app = express();

// MIDDLEWARES
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

// ROUTES
app.use("/", require("./routes/root"));
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
