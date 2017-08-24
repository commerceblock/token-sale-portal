const utils = require('./utils');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  loaders: utils.cssLoaders({
    // sourceMap: isProduction
    //   ? config.build.productionSourceMap
    //   : config.dev.cssSourceMap,
    sourceMap: !!isProduction,
    extract: isProduction,
  }),
  transformToRequire: {
    video: 'frontend/src',
    source: 'frontend/src',
    img: 'frontend/src',
    image: 'xlink:href',
  },
};
