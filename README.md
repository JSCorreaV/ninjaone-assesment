# ninjaone-assesment

This project showcase a base automation project for ninjaone automation assesment

## Package Structure

### Explanation of Package Structure:

- **`api/`**: Contains methods (`Devices.js`) to call API endpoints.
- **`models/`**: Contains base model objects (`Device.js`).
- **`pageObjects/`**: Implements the Page Object Model (POM) pattern, e.g., `DeviceListPage.js`.
- **`test/`**: Directory for test files (`TestRunner.js`).
- **`utils/`**: Contains utility methods (`RandomGenerator.js`).

## Install Project

To install the project you just need to run:

```bash
$ npm install
```

And it will download all required dependencies required (testcafe, dotenv, and short-uuid)

## Running Tests

To run e2e tests, use:
```bash
$ npm run test
```
Make sure to check the scripts defined in package.json for details.

## Code Style
I adhere to the [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html) for maintaining code style consistency.

## Manual Testing
For manual testing, use manual-test.http with the VS Code REST Client extension. 
This file includes manual test cases and requests for testing API endpoints or specific functionalities.