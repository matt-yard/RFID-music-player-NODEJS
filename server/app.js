const express = require("express");
const volleyball = require("volleyball");
const app = express("");
const path = require("path");
const { spotifyApi, scopes } = require("../util/Spotify");

app.use(volleyball);

app.use(express.json());
app.use(express.urlencoded());

app.use("/api", require("./api"));
app.get("/login", (req, res, next) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get("/callback", async (req, res, next) => {
  const { error, code, state } = req.query;

  if (error) {
    console.error(error);
    res.send(error);
  }
  try {
    const data = await spotifyApi.authorizationCodeGrant(code);
    const access_token = data.body["access_token"];
    const refresh_token = data.body["refresh_token"];
    const expires_in = data.body["expires_in"];

    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);

    console.log("access_token:", access_token);
    console.log("refresh_token:", refresh_token);

    console.log(
      `Sucessfully retreived access token. Expires in ${expires_in} s.`
    );
    res.send("Success! You can now close the window.");
    setInterval(async () => {
      const data = await spotifyApi.refreshAccessToken();
      const access_token = data.body["access_token"];

      console.log("The access token has been refreshed!");
      console.log("access_token:", access_token);
      spotifyApi.setAccessToken(access_token);
    }, (expires_in / 2) * 1000);
  } catch (error) {
    next(error);
  }
});

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
