const {findWardByGeo} = require("./address2councillor.service");

describe('address2councillor service', () => {
  describe('findWardByGeo', () => {
    it('should find ward given a point', () => {
      const wards = [{
        name: "1",
        geometry: {
          type: "MultiPolygon",
          coordinates: [[[[
            -125,
            35,
          ], [
            -122,
            35,
          ], [
            -122,
            37,
          ], [
            -125,
            37,
          ], [
            -125,
            35,
          ]]]],
        },
      }];
      const point = {
        type: "Point",
        coordinates: [-123, 36],
      };
      expect(findWardByGeo(wards, point)).toEqual(wards[0]);
    });

    it('should find ward given a polygon', () => {
      const wards = [{
        name: "1",
        geometry: {
          type: "MultiPolygon",
          coordinates: [[[[
            -125.0844873,
            35.4253904,
          ], [
            -122.0844873,
            35.4253904,
          ], [
            -122.0844873,
            37.4253904,
          ], [
            -125.0844873,
            37.4253904,
          ], [
            -125.0844873,
            35.4253904,
          ]]]],
        },
      }];
      const box = {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[
            -126,
            34,
          ], [
            -121,
            34,
          ], [
            -121,
            36,
          ], [
            -126,
            36,
          ], [
            -126,
            34,
          ]]],
        },
        "properties": {},
      };
      expect(findWardByGeo(wards, box)).toEqual(wards[0]);
    });
  });
});
