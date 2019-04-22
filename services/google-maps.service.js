const {pipe, ifElse, isEmpty, always, juxt, either, complement, isNil, prop, head, then, path, propSatisfies} = require("ramda");
const turf = require('@turf/turf');

// Apr 21 2019 https://googlemaps.github.io/google-maps-services-js/docs/GoogleMapsClient.html#.geocode
const edmontonBounds = {
  south: 53.414896,
  west: -113.709007,
  north: 53.676185,
  east: -113.296081,
};

const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_MAPS_API_KEY,
  Promise: Promise,
});

const googleGeoWithAddress = (address = '', bounds = edmontonBounds) => (
  googleMapsClient.geocode({
    address,
    bounds,
  }).asPromise()
);

const parseGooglePoint = pipe(
  juxt([prop('lng'), prop('lat')]),
  turf.point,
);
const parseGoogleBounds = pipe(
  juxt([
    pipe(prop('northeast'), parseGooglePoint),
    pipe(prop('southwest'), parseGooglePoint),
  ]),
  turf.featureCollection,
  turf.envelope,
);

const isBounds = propSatisfies(complement(isNil), 'northeast');
const mapGoogleGeoToGeoJson = ifElse(
  isBounds,
  parseGoogleBounds,
  parseGooglePoint,
);

exports.mapResultsToGeo = ifElse(
  isEmpty,
  always(undefined),
  pipe(
    head,
    prop('geometry'),
    either(prop('bounds'), prop('location')),
    mapGoogleGeoToGeoJson,
  ),
);

exports.findGeoWithAddress = pipe(
  googleGeoWithAddress,
  then(pipe(
    path(['json', 'results']),
    exports.mapResultsToGeo,
  )),
);
