const {pipe, then, otherwise, bind, path} = require("ramda");

const {getCouncillorByWardNumber} = require('../services/address2councillor.service');

exports.getCouncillorByWardNumber = (req, res, next) => {
  pipe(
    path(['query', 'ward']),
    getCouncillorByWardNumber,
    otherwise(next),
    then(
      bind(res.json, res),
    ),
  )(req);
};
