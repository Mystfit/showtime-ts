module.exports = {
  roots: [
  	"./src",
    "./tests"
  ],
  modulePaths: ["./src"],
  moduleDirectories: ["node_modules"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true
}
