const {
  findWardNumberByGeo,
  makeFinderWithGeo,
  mapGeoToMultiPolygon,
} = require("./address2councillor.service");

describe('address2councillor service', () => {
  describe('findWardNumberByGeo', () => {
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
      expect(findWardNumberByGeo(wards, point)).toEqual("1");
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
      expect(findWardNumberByGeo(wards, box)).toEqual("1");
    });

    it('should find undefined ward given a polygon', () => {
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
      const point = {
        type: "Point",
        coordinates: [-1, 50],
      };
      expect(findWardNumberByGeo(wards, point)).toEqual(undefined);
    });
  });

  describe('makeFinderWithGeo', () => {
    it('should makeFinderWithGeo when geo is nil', () => {
      expect(!!makeFinderWithGeo(undefined)).toEqual(true);
    });

    it('should makeFinderWithGeo when geo is not nil', () => {
      expect(!!makeFinderWithGeo({type: "Point", coordinates: [0, 0]})).toEqual(true);
    });
  });

  describe('mapGeoToMultiPolygon', () => {
    it('should map a point to multi polygon', () => {
      const point = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0, 1],
        },
        properties: {},
      };
      const expected = {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: [[[
            [0, 1], [0, 1], [0, 1], [0, 1], [0, 1],
          ]]],
        },
        properties: {},
      };
      const actual = mapGeoToMultiPolygon(point);
      expect(actual).toEqual(expected);
    });

    it('should map a polygon to multi polygon', () => {
      const point = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [[
            [0, 1], [0, 1], [0, 1], [0, 1], [0, 1],
          ]],
        },
        properties: {},
      };
      const expected = {
        type: "Feature",
        geometry: {
          type: "MultiPolygon",
          coordinates: [[[
            [0, 1], [0, 1], [0, 1], [0, 1], [0, 1],
          ]]],
        },
        properties: {},
      };
      const actual = mapGeoToMultiPolygon(point);
      expect(actual).toEqual(expected);
    });
  });
});
