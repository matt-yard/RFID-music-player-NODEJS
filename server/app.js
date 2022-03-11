const express = require("express");
const volleyball = require("volleyball");
const app = express("");
const path = require("path");

app.use(volleyball);

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", require("./api"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "..", "public")));

app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "internal server error");
});

module.exports = app;
