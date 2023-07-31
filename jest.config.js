module.exports = {
  preset: "react-native",
  moduleFileExtensions: ["tsx", "ts", "js"],
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(@rneui|react-native|@react-native))"],
  verbose: true,
};
