const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Someshwar Jani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather App",
    name: "Someshwar Jani",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "For quick support mail us on:",
    title: "Weather App",
    name: "Someshwar Jani",
  });
});

app.get("/Weather", (req, res) => {
  if (!req.query.address) {
    return res.render("index", {
      title: "Weather App",
      name: "Someshwar Jani",
    });
  }

  geocode(
    req.query.address,
    (error, { summary, temperature, precip, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(summary, temperature, precip, (error, forecastData) => {
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      errorMessage: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Someshwar Jani",
    errorMessage: "Help article not found.",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Someshwar Jani",
    errorMessage: "Page not found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
