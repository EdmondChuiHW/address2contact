const {resolvePhotoUrl} = require("./councillors.service");
const {mapCouncillor} = require("./councillors.service");

describe('councillors service', () => {
  describe('resolvePhotoUrl', () => {
    it('should replace Mayor', () => {
      const actual = resolvePhotoUrl({photo_url: "http://www.edmonton.ca/city_government/documents/Images/Mayor_Don_Iveson200X250.jpg"});
      const expected = "https://www.edmonton.ca/city_government/documents/Mayor-Headshot_800x494_rdax_500x309.jpg";
      expect(actual).toEqual(expected);
    });

    it('should replace Councillor', () => {
      const actual = resolvePhotoUrl({photo_url: "http://www.edmonton.ca/city_government/documents/Images/Councillor_Bev_Esslinger200X250(1).jpg"});
      const expected = "https://www.edmonton.ca/city_government/documents/Images/ward-2-councillor_800x494_rdax_500x309.jpg";
      expect(actual).toEqual(expected);
    });

    it('should let others pass thru', () => {
      const actual = resolvePhotoUrl({photo_url: "http://www.edmonton.ca/"});
      const expected = "http://www.edmonton.ca/";
      expect(actual).toEqual(expected);
    });
  });
  describe('mapCouncillor', () => {
    it('should map mayor', () => {
      const sample = {
        "address_line_1": "2nd Floor, City Hall ",
        "address_line_2": "1 Sir Winston Churchill Square",
        "electoral_area": "City-Wide",
        "email": "mayorsoffice@edmonton.ca",
        "fax": "7804968292",
        "first_name": "Don",
        "last_name": "Iveson",
        "locality": "Edmonton",
        "phone": "7804968100",
        "photo_url": "http://www.edmonton.ca/city_government/documents/Images/Mayor_Don_Iveson200X250.jpg",
        "postal_code": "T5J 2R7",
        "primary_role": "Mayor",
        "province": "Alberta",
        "url": "http://www.edmonton.ca/city_government/city_organization/mayor/more-about-the-mayor.aspx",
      };
      const expected = {
        ward: "City-Wide",
        role: "Mayor",
        email: "mayorsoffice@edmonton.ca",
        firstName: "Don",
        lastName: "Iveson",
        phone: "7804968100",
        photoUrl: "https://www.edmonton.ca/city_government/documents/Mayor-Headshot_800x494_rdax_500x309.jpg",
        url: "http://www.edmonton.ca/city_government/city_organization/mayor/more-about-the-mayor.aspx",
      };
      expect(mapCouncillor(sample)).toEqual(expected);
    });

    it('should map councillor', () => {
      const sample = {
        "address_line_1": "2nd Floor, City Hall ",
        "address_line_2": "1 Sir Winston Churchill Square",
        "electoral_area": "Ward 1",
        "email": "andrew.knack@edmonton.ca",
        "fax": "7804968113",
        "first_name": "Andrew",
        "last_name": "Knack",
        "locality": "Edmonton",
        "phone": "7804968122",
        "photo_url": "http://www.edmonton.ca/city_government/documents/Images/Councillor_Andrew_Knack200X250.jpg",
        "postal_code": "T5J 2R7",
        "primary_role": "Councillor",
        "province": "Alberta",
        "url": "http://www.edmonton.ca/city_government/city_organization/ward-1-councillor.aspx",
      };
      const expected = {
        ward: "Ward 1",
        role: "Councillor",
        email: "andrew.knack@edmonton.ca",
        firstName: "Andrew",
        lastName: "Knack",
        phone: "7804968122",
        photoUrl: "https://www.edmonton.ca/city_government/documents/Images/ward-1-councillor_800x494_rdax_500x309.jpg",
        url: "http://www.edmonton.ca/city_government/city_organization/ward-1-councillor.aspx",
      };
      expect(mapCouncillor(sample)).toEqual(expected);
    });
  });
});
