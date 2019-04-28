const request = require('supertest');
const app = require('../app');

const requestWithAddress = address => request(app)
  .get('/address2councillor')
  .query({address})
  .expect('Content-Type', /json/)
  .expect(200);

const extendedTimeout = 20 * 1000;

describe('End to end', () => {
  it('returns mayor given no query params', () => {
    return request(app)
      .get('/address2councillor')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(res => {
        expect(res.body.ward).toEqual('City-Wide');
        expect(res.body.role).toEqual('Mayor');
      });
  }, extendedTimeout);

  it('returns mayor given empty address query', () => {
    return requestWithAddress('').then(res => {
      expect(res.body.ward).toEqual('City-Wide');
      expect(res.body.role).toEqual('Mayor');
    });
  }, extendedTimeout);

  // previously, all ward boundaries were promoted to rectangles, which is incorrect
  // following is selected based on points that could be clipped by nearby boundaries
  test.each`
  ward  | postal
  ${1}  | ${'T5N 0G1'}
  ${2}  | ${'T5V 1J5'}
  ${3}  | ${'T5X 0B1'}
  ${4}  | ${'T5A 0E8'} 
  ${5}  | ${'T5R 5N1'} 
  ${6}  | ${'T5N 2R8'} 
  ${7}  | ${'T5H 1L9'} 
  ${8}  | ${'T6E 4Z8'} 
  ${8}  | ${'T6E 2G1'} 
  ${9}  | ${'T6W 1K3'} 
  ${10} | ${'T6W 1A8'}
  ${11} | ${'T6L 6Z5'}
  ${12} | ${'T6L 3R8'}
`('returns 2019 ward $ward councillor given $postal', ({ward, postal}) => {
    return requestWithAddress(postal).then(res => {
      expect(res.body.ward).toEqual(`Ward ${ward}`);
      expect(res.body.role).toEqual('Councillor');
    });
  }, extendedTimeout);

  // previously, all ward boundaries were promoted to rectangles, which is incorrect
  // following is selected based on points that could be clipped by nearby boundaries
  test.each`
  ward  | coords
  ${1}  | ${'geo: lng: -113.563056, lat: 53.536595'}
  ${2}  | ${'geo: lng: -113.604620, lat: 53.591472'}
  ${3}  | ${'geo: lng: -113.526879, lat: 53.630543'}
  ${4}  | ${'geo: lng: -113.381295, lat: 53.577589'} 
  ${5}  | ${'geo: lng: -113.575081, lat: 53.509145'} 
  ${6}  | ${'geo: lng: -113.567034, lat: 53.542020'} 
  ${7}  | ${'geo: lng: -113.467694, lat: 53.558773'} 
  ${8}  | ${'geo: lng: -113.495897, lat: 53.512991'} 
  ${8}  | ${'geo: lng: -113.484919, lat: 53.519719'} 
  ${9}  | ${'geo: lng: -113.521991, lat: 53.429015'} 
  ${10} | ${'geo: lng: -113.528301, lat: 53.398682'}
  ${11} | ${'geo: lng: -113.404426, lat: 53.472449'}
  ${12} | ${'geo: lng: -113.407412, lat: 53.466921'}
`('returns 2019 ward $ward councillor given $coords', ({ward, coords}) => {
    return requestWithAddress(coords).then(res => {
      expect(res.body.ward).toEqual(`Ward ${ward}`);
      expect(res.body.role).toEqual('Councillor');
    });
  }, extendedTimeout);
});
