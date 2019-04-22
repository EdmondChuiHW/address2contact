const {pipe, then, path, otherwise, when, isNil, bind} = require("ramda");

const {findGeoWithAddress} = require('../services/geo.service');

exports.getLatLngFromAddress = (req, res, next) => {
  const handleEmptyAddress = () => {
    res.status(400);
    res.send('Missing address in query param');
  };
  pipe(
    path(['query', 'address']),
    when(isNil, handleEmptyAddress),
    findGeoWithAddress,
    otherwise(next),
    then(
      bind(res.json, res),
    ),
  )(req);
};
