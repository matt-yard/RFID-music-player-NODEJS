const db = require("./db");
const Song = require("./models/Song");

module.exports = {
  db,
  models: {
    Song,
  },
};
