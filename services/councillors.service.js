const {pick, head, ifElse, pipe, isNil, always, then} = require('ramda');
const requests = require('request-promise-native');

exports.mapCouncillor = c => ({
  name: `${c.first_name} ${c.last_name}`,
  photoUrl: c.photo_url,
  ...pick(['email', 'phone', 'url'], c),
});

const wardNumberToElectoralArea = ifElse(
  isNil,
  always('City-Wide'),
  w => `Ward ${w}`,
);

const getInfoByElectoralArea = eA => requests({
  url: 'https://data.edmonton.ca/resource/4jei-zkvn.json',
  json: true,
  qs: {
    electoral_area: eA,
    $select: ['first_name', 'last_name', 'photo_url', 'email', 'phone', 'url'].join(','),
    $$app_token: process.env.OPEN_DATA_TOKEN,
  },
});

exports.getCouncillorByWardNumber = pipe(
  wardNumberToElectoralArea,
  getInfoByElectoralArea,
  then(pipe(
    head,
    exports.mapCouncillor,
  )),
);
