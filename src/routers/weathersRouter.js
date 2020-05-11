const express = require("express");
const DarkSky = require("dark-sky");
const weathersRouter = express.Router();
const darksky = new DarkSky(process.env.DARK_SKY);
weathersRouter.get("/", async (req, res) => {
  var weatherForecast;
  await darksky
    .coordinates({ lat: 13.0827, lng: 80.2707 })
    .units("ca")
    .language("en")
    .exclude("minutes,hourly,alerts,flags")
    .get()
    .then(response => {
      weatherForecast = response.daily.data;
    })
    .catch(console.log);

  res.render("weather", {
    layout: "navigation",
    mode: "weather",
    weatherForecast
  });
});
module.exports = weathersRouter;
