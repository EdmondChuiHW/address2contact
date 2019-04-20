const {pipe, then, otherwise, bind, path} = require("ramda");

const {getCouncillorByAddress} = require('../services/address2councillor.service');

exports.getCouncillorByAddress = (req, res, next) => {
  pipe(
    path(['query', 'address']),
    getCouncillorByAddress,
    otherwise(next),
    then(
      bind(res.json, res),
    ),
  )(req);
};
