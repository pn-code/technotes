const express = require("express");
const router = express.Router();
const path = require("path");

// Serve index html if we hit the base API link or base API + index.html
router.get("^/$|/index(.html)", (req, res) => {
  const baseHtmlPage = path.join(__dirname, "..", "views", "index.html");
  return res.sendFile(baseHtmlPage);
});

module.exports = router;