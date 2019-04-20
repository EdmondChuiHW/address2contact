const {pipe, then, otherwise, bind} = require("ramda");

const {getWards} = require('../services/wards.service');

exports.getWards = (req, res, next) => {
  pipe(
    getWards,
    otherwise(next),
    then(
      bind(res.json, res),
    ),
  )(req);
};
