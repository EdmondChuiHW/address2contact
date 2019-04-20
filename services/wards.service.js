const requests = require('request-promise-native');

const options = {
  url: 'https://data.edmonton.ca/resource/aket-j2ar.json',
  headers: {
    'X-App-Token': process.env.OPEN_DATA_TOKEN,
  },
};

exports.getAllWards = () => requests(options);
