const {ifElse, apply, trim, either, isEmpty, pipe, prop, complement, then, curry, find, unless, isNil, always} = require('ramda');
const turf = require('@turf/turf');
const {getWards} = require("./wards.service");
const {findGeoWithAddress} = require("./geo.service");
const {getCouncillorByWardNumber} = require("./councillors.service");

const isIntersecting = complement(curry(turf.booleanDisjoint));

const pred = geo => pipe(
  prop('geometry'),
  turf.envelope,
  isIntersecting(turf.envelope(geo)),
);

exports.makeFinderWithGeo = ifElse(
  either(isNil, isEmpty),
  always(always(undefined)),  // return type is (ward[]) => ward
  pipe(
    pred,
    find,
  ),
);

exports.findWardNumberByGeo = (wards, geo) => pipe(
  exports.makeFinderWithGeo(geo),
  unless(either(isNil, isEmpty), prop('name')),
)(wards);

exports.getCouncillorByAddress = ifElse(
  either(isNil, pipe(trim, isEmpty)),
  getCouncillorByWardNumber,
  pipe(
    address => Promise.all([getWards(), findGeoWithAddress(address)]),
    then(pipe(
      apply(exports.findWardNumberByGeo),
      getCouncillorByWardNumber,
    )),
  ),
);
