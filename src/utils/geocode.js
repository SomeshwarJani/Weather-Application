const request = require("request");

const geocode = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=fc063c8700509b646b2c018ff1629714&query=${address}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.success === false) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        summary: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        precip: body.current.precip,
        location: body.request.query,
      });
    }
  });
};

module.exports = geocode;
