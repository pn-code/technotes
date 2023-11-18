const express = require("express");

const PORT = process.env.PORT | 3500;
const path = require("path");

const app = express();

// Allow server to look into public folder for assets
app.use("/", express.static(path.join(__dirname, "/public")));

// Set up root routes with the root route handler
app.use("/", require("./routes/root"));

// Serve 404 page if no route was hit
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

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
