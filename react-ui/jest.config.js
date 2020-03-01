module.exports = {
  // where jest looks for imported files
  "moduleDirectories": ["node_modules", "src"],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
  // where jest looks for tests
  "roots": [
    "<rootDir>/src"
  ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
}
