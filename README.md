# mocklocal.js
[![npm version](https://badge.fury.io/js/mocklocal.svg)](https://badge.fury.io/js/mocklocal) [![Build Status](https://travis-ci.org/kemalelmizan/mocklocal.svg?branch=master)](https://travis-ci.org/kemalelmizan/mocklocal) [![Coverage Status](https://coveralls.io/repos/github/kemalelmizan/mocklocal/badge.svg?branch=master)](https://coveralls.io/github/kemalelmizan/mocklocal?branch=master) [![Dependencies](https://david-dm.org/kemalelmizan/mocklocal.svg)](https://david-dm.org/kemalelmizan/mocklocal) [![Known Vulnerabilities](https://snyk.io/test/github/kemalelmizan/mocklocal/badge.svg?targetFile=package.json)](https://snyk.io/test/github/kemalelmizan/mocklocal?targetFile=package.json)

mocking an API server with random delays in the response

## Installation
```
npm i -g mocklocal
```

## Usage
To start your mock server:
```
mocklocal
```
In separate terminal, you can try this example request
```
curl localhost:3000/example/mock/ -d '{"test":"1"}' -H "Content-Type: application/json"
```

## Configurations
All these options can be configured through environment variables

| Property | Description | Default value |
|-|-|-|
| `PORT` | Port to serve the mock server | 3000 |
| `MIN_DELAY` | Minimum delay for the mock server in seconds | 0 |
| `MAX_DELAY` | Maximum delay for the mock server in seconds | 10 |
| `RESPONSE` | Default response body for all requests <br> use `req` to reply back with the request <br> dont forget to escape your string if you're responding with JSON | `req` |

Example usage with config:
```
PORT=5000 MIN_DELAY=0 MAX_DELAY=5 RESPONSE={\"status\":\"ok\"} mocklocal
```

## Tests
Used nyc, mocha, chai for tests; and coveralls for test coverage
```
npm test
```