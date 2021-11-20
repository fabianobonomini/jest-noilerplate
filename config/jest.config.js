'use strict';
module.exports = {
  rootDir: '../',
  verbose: true,
  bail:0,
  testEnvironment: "node",
  setupFilesAfterEnv: [
    "<rootDir>/config/jest.setup.js"
  ],
  watchPathIgnorePatterns:[
    '(.*).log',
    '(.*).json',
    '(.*).txt',
  ],
};