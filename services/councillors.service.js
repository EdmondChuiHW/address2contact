const {pick, bind, ifElse, find, propEq, prop, when, flip, has, pipe, either, isEmpty, isNil, always} = require('ramda');

const hardCoded2019Councillors = [{
  'first_name': 'Don',
  'last_name': 'Iveson',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Mayor-Headshot_800x494_rdax_500x309.jpg',
  'email': 'mayorsoffice@edmonton.ca',
  'phone': '7804968100',
  'primary_role': 'Mayor',
  'electoral_area': 'City-Wide',
}, {
  'first_name': 'Andrew',
  'last_name': 'Knack',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-1-councillor_800x494_rdax_500x309.jpg',
  'email': 'andrew.knack@edmonton.ca',
  'phone': '7804968122',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 1',
}, {
  'first_name': 'Bev',
  'last_name': 'Esslinger',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-2-councillor_800x494_rdax_500x309.jpg',
  'email': 'bev.esslinger@edmonton.ca',
  'phone': '7804968136',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 2',
}, {
  'first_name': 'Jon',
  'last_name': 'Dziadyk',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-3-councillor_800x494_rdax_500x309.jpg',
  'email': 'jon.dziadyk@edmonton.ca',
  'phone': '7804968128',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 3',
}, {
  'first_name': 'Aaron',
  'last_name': 'Paquette',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-4-councillor_800x494_rdax_500x309.jpg',
  'email': 'aaron.paquette@edmonton.ca',
  'phone': '7804968138',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 4',
}, {
  'first_name': 'Sarah',
  'last_name': 'Hamilton',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-5-councillor_800x494_rdax_500x309.jpg',
  'email': 'sarah.hamilton@edmonton.ca',
  'phone': '7804968120',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 5',
}, {
  'first_name': 'Scott',
  'last_name': 'Mckeen',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-6-councillor_800x494_rdax_500x309.jpg',
  'email': 'scott.mckeen@edmonton.ca',
  'phone': '7804968140',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 6',
}, {
  'first_name': 'Tony',
  'last_name': 'Caterina',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-7-councillor_800x494_rdax_500x309.jpg',
  'email': 'tony.caterina@edmonton.ca',
  'phone': '7804968333',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 7',
}, {
  'first_name': 'Ben',
  'last_name': 'Henderson',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-8-councillor_800x494_rdax_500x309.jpg',
  'email': 'ben.henderson@edmonton.ca',
  'phone': '7804968146',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 8',
}, {
  'first_name': 'Tim',
  'last_name': 'Cartmell',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-9-councillor_800x494_rdax_500x309.jpg',
  'email': 'tim.cartmell@edmonton.ca',
  'phone': '7804968130',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 9',
}, {
  'first_name': 'Michael',
  'last_name': 'Walters',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-10-councillor_800x494_rdax_500x309.jpg',
  'email': 'michael.walters@edmonton.ca',
  'phone': '7804968132',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 10',
}, {
  'first_name': 'Mike',
  'last_name': 'Nickel',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-11-councillor_800x494_rdax_500x309.jpg',
  'email': 'mike.nickel@edmonton.ca',
  'phone': '7804968142',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 11',
}, {
  'first_name': 'Mohinder',
  'last_name': 'Banga',
  'photo_url': 'https://www.edmonton.ca/city_government/documents/Images/ward-12-councillor_800x494_rdax_500x309.jpg',
  'email': 'mohinder.banga@edmonton.ca',
  'phone': '7804968148',
  'primary_role': 'Councillor',
  'electoral_area': 'Ward 12',
}];

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

const findByElectoralArea = eA => find(propEq('electoral_area', eA));

exports.getCouncillorByWardNumber = pipe(
  wardNumberToElectoralArea,
  findByElectoralArea,
  finder => finder(hardCoded2019Councillors),
  exports.mapCouncillor,
  bind(Promise.resolve, Promise),
);
