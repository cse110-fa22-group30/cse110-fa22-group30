# Testing process
## Creating tests
- For each script `<filename>.js`, we will create a test file `<filename>.test.js`
- On a PR, all test suites will be run with `npm run coverage`

## Running tests
Tests are run with NodeJS. Test a single file locally with `npm test -- <pattern>`, where `<pattern>` is a regex matching `<filename>`
  - If we have the file `add.js`, someone will create a test file `add.test.js`
  - You can run the test yourself with `npm test -- add`

To run all tests locally, do `npm run test`. To view code coverage, do `npm run coverage`