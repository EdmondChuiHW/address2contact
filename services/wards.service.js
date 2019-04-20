const requests = require('request-promise-native');

exports.getWards = () => requests({
  url: 'https://data.edmonton.ca/resource/aket-j2ar.json',
  json: true,
  qs: {
    $$app_token: process.env.OPEN_DATA_TOKEN,
  },
});
