module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      unitPrecision: 5,
      propList: ['*'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 6,
    },
    autoprefixer: {},
  },
}
