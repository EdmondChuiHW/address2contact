const {pick, head, ifElse, prop, when, flip, has, pipe, either, isEmpty, isNil, always, then} = require('ramda');
const requests = require('request-promise-native');

const knownBrokenPhotoUrls = {
  "http://www.edmonton.ca/city_government/documents/Images/Mayor_Don_Iveson200X250.jpg": "https://www.edmonton.ca/city_government/documents/Mayor-Headshot_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Andrew_Knack200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-1-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Bev_Esslinger200X250(1).jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-2-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Dave_Loken200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-3-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Ed_Gibbons200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-4-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Michael_Oshry200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-5-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Scott_McKeen200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-6-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Tony_Caterina200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-7-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Ben_Henderson200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-8-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Bryan_Anderson200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-9-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Michael_Walters200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-10-councillor_800x494_rdax_500x309.jpg",
  "http://www.edmonton.ca/city_government/documents/Images/Councillor_Mike_Nickel200X250.jpg": "https://www.edmonton.ca/city_government/documents/Images/ward-11-councillor_800x494_rdax_500x309.jpg",
  "": "https://www.edmonton.ca/city_government/documents/Images/ward-12-councillor_800x494_rdax_500x309.jpg",
};

const isPropBrokenUrl = flip(has)(knownBrokenPhotoUrls);
const replaceBrokenUrl = flip(prop)(knownBrokenPhotoUrls);

exports.resolvePhotoUrl = pipe(
  prop('photo_url'),
  when(isPropBrokenUrl, replaceBrokenUrl),
);

exports.mapCouncillor = c => ({
  firstName: c.first_name,
  lastName: c.last_name,
  photoUrl: exports.resolvePhotoUrl(c),
  role: c.primary_role,
  ward: c.electoral_area,
  ...pick(['email', 'phone', 'url'], c),
});

const wardNumberToElectoralArea = ifElse(
  either(isNil, isEmpty),
  always('City-Wide'),
  w => `Ward ${w}`,
);

const getInfoByElectoralArea = eA => requests({
  url: 'https://data.edmonton.ca/resource/4jei-zkvn.json',
  json: true,
  qs: {
    electoral_area: eA,
    $select: ['first_name', 'last_name', 'photo_url', 'email', 'phone', 'url', 'primary_role', 'electoral_area'].join(','),
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
