const {ifElse, apply, pipe, prop, complement, then, curry, find, when, isNil, always} = require('ramda');
const turf = require('@turf/turf');
const {getWards} = require("./wards.service");
const {findGeoWithAddress} = require("./google-maps.service");
const {getCouncillorByWardNumber} = require("./councillors.service");

const isIntersecting = complement(curry(turf.booleanDisjoint));

const pred = geo => pipe(
  prop('geometry'),
  turf.envelope,
  isIntersecting(turf.envelope(geo)),
);

exports.makeFinderWithGeo = ifElse(
  isNil,
  always(always(undefined)),  // return type is (ward[]) => ward
  pipe(
    pred,
    find,
  ),
);

exports.findWardNumberByGeo = (wards, geo) => pipe(
  exports.makeFinderWithGeo(geo),
  when(isNil, always({name: undefined})),
  prop('name'),
)(wards);

exports.getCouncillorByAddress = pipe(
  address => Promise.all([getWards(), findGeoWithAddress(address)]),
  then(pipe(
    apply(exports.findWardNumberByGeo),
    getCouncillorByWardNumber,
  )),
);
