const express = require("express");
const bodyparser = require("body-parser");
const expressHbs = require("express-handlebars");
const path = require("path");
const studentRouter = require("./routers/studentRouter");
const weathersRouter = require("./routers/weathersRouter");
const formatDate = require("./views/helpers/formatDate");
const ifEquality = require("./views/helpers/ifEquality");
const app = express();
const hbs = expressHbs.create({
  extname: ".hbs",
  helpers: {
    formatDate,
    ifEquality
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home", {
    layout: "hero"
  });
});
app.use("/students", studentRouter);
app.use("/weather", weathersRouter);

const server = app.listen("8080", (req, res) => {
  console.log(`Server is running on port ${server.address().port}.`);
});
