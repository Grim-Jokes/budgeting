module.exports = {
    "roots": [
      "<rootDir>/src"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    mapCoverage: true,
  }