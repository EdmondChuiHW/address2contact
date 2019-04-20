const {mapCouncillor} = require("./councillors.service");

describe('councillors service', () => {
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
        email: "mayorsoffice@edmonton.ca",
        name: "Don Iveson",
        phone: "7804968100",
        photoUrl: "http://www.edmonton.ca/city_government/documents/Images/Mayor_Don_Iveson200X250.jpg",
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
        email: "andrew.knack@edmonton.ca",
        name: "Andrew Knack",
        phone: "7804968122",
        photoUrl: "http://www.edmonton.ca/city_government/documents/Images/Councillor_Andrew_Knack200X250.jpg",
        url: "http://www.edmonton.ca/city_government/city_organization/ward-1-councillor.aspx",
      };
      expect(mapCouncillor(sample)).toEqual(expected);
    });
  });
});
