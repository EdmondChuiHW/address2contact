const {tap, pipe, prop, complement, curry, find} = require('ramda');
require('request-promise-native');
const {findGeoWithAddress} = require("./google-maps.service");
const turf = require('@turf/turf');

const isIntersecting = complement(curry(turf.booleanDisjoint));

const pred = geo => pipe(
  prop('geometry'),
  turf.envelope,
  tap(x => console.log(x.geometry.coordinates)),
  isIntersecting(turf.envelope(geo)),
);

exports.findWardByGeo = curry((wards, geo) => find(pred(geo), wards));

exports.getCouncillorByAddress = pipe(
  findGeoWithAddress,
);
