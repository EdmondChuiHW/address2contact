const googleMapsClient = require('../services/google-maps.service');
const asyncHandler = require('express-async-handler');

exports.getLatLngFromAddress = asyncHandler(async (req, res) => {
  const response = await googleMapsClient
    .geocode({address: '1600 Amphitheatre Parkway, Mountain View, CA'})
    .asPromise();
  res.send(response.json.results);
});
