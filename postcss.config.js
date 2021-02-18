// const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  // parser: "sugarss",
  map: false,
  plugins: {
    "postcss-preset-env": {
      autoprefixer: { grid: true },
    },
  },
};
