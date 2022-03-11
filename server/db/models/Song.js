const db = require("../db");
const Sequelize = require("sequelize");

const Song = db.define("song", {
  uid: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  spotifyId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  type: {
    type: Sequelize.STRING,
    validate: {
      isIn: [["track", "album"]],
    },
  },
});

module.exports = Song;
