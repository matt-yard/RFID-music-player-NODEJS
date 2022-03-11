const songsRouter = require("express").Router();
const {
  models: { Song },
} = require("../db");

const axios = require("axios");

songsRouter.get("/", async (req, res, next) => {
  try {
    const songs = await Song.findAll();
    res.json(songs);
  } catch (error) {
    next(error);
  }
});

songsRouter.post("/", async (req, res, next) => {
  try {
    const { spotifyId, type } = req.body;
    const { data } = await axios.get("http://192.168.5.141:5000/api/new-uid");
    const uid = data["uid"];
    const newSong = await Song.create({ uid, spotifyId, type });
    res.send(newSong);
  } catch (error) {
    next(error);
  }
});

songsRouter.get("/:uid", async (req, res, next) => {
  try {
    const song = await Song.findOne({ where: { uid: req.params.uid } });
    res.send(song);
  } catch (error) {
    next(error);
  }
});

module.exports = songsRouter;
