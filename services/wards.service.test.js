const {mapWard} = require("./wards.service");

describe('wards service', () => {
  it('should mapWard', () => {
    const sample = {
      "area_km_2": "80.8478295853042",
      "name": "1",
      "the_geom": {
        "type": "MultiPolygon",
        "coordinates": [[[[-113.67473675235932, 53.59756357281086], [-113.67471347285063, 53.597572879842076]]]],
      },
    };

    const expected = {
      name: "1",
      geometry: {
        type: "MultiPolygon",
        coordinates: [[[[-113.67473675235932, 53.59756357281086], [-113.67471347285063, 53.597572879842076]]]],
      },
    };

    expect(mapWard(sample)).toEqual(expected);
  });
});
