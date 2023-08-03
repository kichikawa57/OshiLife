module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    "react-native-reanimated/plugin",
    ["@babel/plugin-transform-private-property-in-object", { loose: true }],
    ["@babel/plugin-transform-private-methods", { loose: true }],
    ["@babel/plugin-transform-class-properties", { loose: true }],
  ],
  overrides: [
    {
      include: ["./node_modules/@rneui", "./node_modules/@react-native"],
      presets: ["module:metro-react-native-babel-preset"],
    },
  ],
};
