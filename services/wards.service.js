const requests = require('request-promise-native');
const {pipe, then, map} = require('ramda');

exports.mapWard = w => ({
  name: w.name,
  geometry: w.the_geom,
});

const getServerWards = () => requests({
  url: 'https://data.edmonton.ca/resource/aket-j2ar.json',
  json: true,
  qs: {
    $$app_token: process.env.OPEN_DATA_TOKEN,
  },
});

exports.getWards = pipe(
  getServerWards,
  then(map(exports.mapWard)),
);
