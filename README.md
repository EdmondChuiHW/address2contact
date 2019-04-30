[![Build Status](https://dev.azure.com/chuihinwai/address2councillor/_apis/build/status/chuihinwai.address2contact?branchName=master)](https://dev.azure.com/chuihinwai/address2councillor/_build/latest?definitionId=1&branchName=master)
![David](https://img.shields.io/david/chuihinwai/address2contact.svg)
![David](https://img.shields.io/david/dev/chuihinwai/address2contact.svg)
[![Known Vulnerabilities](https://snyk.io/test/github/chuihinwai/address2contact/badge.svg)](https://snyk.io/test/github/chuihinwai/address2contact)

Express App that resolves councillor info from an address or lat/long. Backend for [email-contact](https://github.com/chuihinwai/email-contact)

## λ
Uses [Ramda](https://ramdajs.com/) heavily for functional programming where applicable.

## Scripts
### `start`
Starts server at port `process.env.PORT` or 5000.

### `start:ssl`
Starts server at port `process.env.PORT` or 5000 with SSL. Expects `server.key` and `server.cert` files in root directory.  
Generate them with `openssl req -nodes -new -x509 -keyout server.key -out server.cert`

### `test:units`
Runs [relevant](https://jestjs.io/docs/en/cli#watch) unit tests in watch mode. Does not require backend to be running.

### `test`
Runs [relevant](https://jestjs.io/docs/en/cli#watch) unit and E2E tests in watch mode. Does not require backend to be running.

### `test:ci`
Runs all unit and E2E tests and saves results in JUnit format.

## Continuous Integration (CI)
Project is automatically deployed by Heroku if all tests pass.  
View the Azure Pipeline project: https://dev.azure.com/chuihinwai/address2councillor

## Todo
- [ ] Add API token mechanism
- [ ] Revert to Open Data councillors table from hard coded hot fix
- [ ] Add caching of ward boundaries and councillor info

