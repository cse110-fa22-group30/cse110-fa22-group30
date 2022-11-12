# Testing process
- For each script, we will create a test file `<filename>.test.js`
- Test locally with `npm test -- <pattern>`, where `<pattern>` is a regex matching of `<filename>`
  - If we have the file `add.js`, someone will create a test file `add.test.js`
  - You can run the test yourself with `npm test -- add`
- On a PR, all test suites will be run