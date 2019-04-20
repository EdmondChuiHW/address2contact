const {mapResultsToLatLng} = require("./google-maps.service");

describe('mapResultsToLatLng', () => {
  it('returns bounds if present', () => {
    const sample = [{
      "geometry": {
        "bounds": {
          northeast: {"lat": 37.4253904, "lng": -122.0844873},
          southwest: {"lat": 55.4253904, "lng": -525.0844873},
        },
      },
    }];
    const expected = {
      northeast: {"lat": 37.4253904, "lng": -122.0844873},
      southwest: {"lat": 55.4253904, "lng": -525.0844873},
    };
    expect(mapResultsToLatLng(sample)).toEqual(expected);
  });

  it('returns location if bounds is missing', () => {
    const sample = [{
      "geometry": {
        "location": {"lat": 37.4253904, "lng": -122.0844873},
      },
    }];
    const expected = {"lat": 37.4253904, "lng": -122.0844873};
    expect(mapResultsToLatLng(sample)).toEqual(expected);
  });

  it('returns undefined if result is empty', () => {
    expect(mapResultsToLatLng([])).toEqual(undefined);
  });
});
