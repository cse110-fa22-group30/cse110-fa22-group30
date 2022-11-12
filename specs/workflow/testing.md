# Testing process
## Creating tests
For each script `<filename>.js`, we will create a test file `<filename>.test.js`. On a PR, all test suites will be run through 

```bash
npm run coverage
```

## Running tests
Tests are run with NodeJS. Test a single file locally with

```bash
npm test -- <pattern>
```

where `<pattern>` is a regex matching `<filename>`.

If you want code coverage included, run

```bash
npm test -- <pattern> --coverage
```

You can run *all* tests locally, with coverage with the following:

```bash
npm run test
... test output
npm run coverage
... test output with coverage
```