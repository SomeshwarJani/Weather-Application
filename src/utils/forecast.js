const request = require("request");

const forecast = (summary, temperature, precipProbability, callback) => {
  callback(
    undefined,
    summary +
      ". It is currently " +
      temperature +
      " degress out. There is a " +
      precipProbability +
      "% chance of rain."
  );
};

module.exports = forecast;
