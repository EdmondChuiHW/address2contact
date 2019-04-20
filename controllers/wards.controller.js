const {pipe, then, otherwise, bind} = require("ramda");

const {getAllWards} = require('../services/wards.service');

exports.getWards = (req, res, next) => {
  pipe(
    getAllWards,
    otherwise(next),
    then(
      bind(res.json, res),
    ),
  )(req);
};
