const {pipe, ifElse, isEmpty, always, either, prop, head, then, path} = require("ramda");

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise,
});

const googleGeoWithAddress = address => googleMapsClient.geocode({address}).asPromise();

exports.mapResultsToLatLng = ifElse(
  isEmpty,
  always(undefined),
  pipe(
    head,
    prop('geometry'),
    either(prop('bounds'), prop('location')),
  ),
);

exports.findGeoWithAddress = pipe(
  googleGeoWithAddress,
  then(pipe(
    path(['json', 'results']),
    exports.mapResultsToLatLng,
  )),
);
