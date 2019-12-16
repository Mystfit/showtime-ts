module.exports = {
  roots: [
  	//"./src",
    "./tests"
  ],
  collectCoverageFrom: [
    "src/**/{!(schemas),}.js"
  ],
  modulePaths: ["./src"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true
}
