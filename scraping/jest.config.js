module.exports = {
    "roots": [
      "<rootDir>"
    ],
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    },
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.ts"]
  }