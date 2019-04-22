const {mapResultsToGeo} = require("./geo.service");

describe('mapResultsToGeo', () => {
  it('returns bounds if present', () => {
    const sample = [{
      "geometry": {
        "bounds": {
          northeast: {"lat": 37.4253904, "lng": -122.0844873},
          southwest: {"lat": 35.4253904, "lng": -125.0844873},
        },
      },
    }];
    const expected = {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[
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
        ]]],
      },
      "properties": {},
    };
    expect(mapResultsToGeo(sample)).toEqual(expected);
  });

  it('returns location if bounds is missing', () => {
    const sample = [{
      "geometry": {
        "location": {"lat": 37.4253904, "lng": -122.0844873},
      },
    }];
    const expected = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [-122.0844873, 37.4253904],
      },
      "properties": {},
    };
    expect(mapResultsToGeo(sample)).toEqual(expected);
  });

  it('returns {} if result is empty', () => {
    expect(mapResultsToGeo([])).toEqual({});
  });
});
