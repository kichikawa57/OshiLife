// eslint-disable-next-line no-undef
module.exports = {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recess-order",
    "stylelint-config-prettier",
  ],
  overrides: [
    {
      files: ["**/*.{js,jsx,ts,tsx}"],
      customSyntax: "@stylelint/postcss-css-in-js",
      rules: {
        "function-name-case": null,
        "function-no-unknown": null,
        "value-keyword-case": null,
        "declaration-block-no-duplicate-properties": true,
        "color-hex-case": "lower",
        indentation: 2,
        "string-quotes": "double",
        "declaration-block-trailing-semicolon": "always",
      },
    },
  ],
};
