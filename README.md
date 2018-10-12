# mocklocal.js
[![Build Status](https://travis-ci.org/kemalelmizan/mocklocal.svg?branch=master)](https://travis-ci.org/kemalelmizan/mocklocal) [![Coverage Status](https://coveralls.io/repos/github/kemalelmizan/mocklocal/badge.svg?branch=master)](https://coveralls.io/github/kemalelmizan/mocklocal?branch=master)

mocking an API server with random delays in the response

## Installation
```
npm i -g mocklocal
mocklocal
```

## Configurations
All these options can be configured through environment variables
1. `PORT` - port to serve the mock server, default: 3000
1. `MIN_DELAY` - minimum delay for the mock server in seconds, default: 0
1. `MAX_DELAY` - maximum delay for the mock server in seconds, default: 10

Example usage with config:
```
PORT=5004 MIN_DELAY=0 MAX_DELAY=0 npm start
```

## Tests
Used nyc, mocha, chai for tests; and coveralls for test coverage
```
npm test
```