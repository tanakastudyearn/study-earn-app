const { getDefaultConfig } = require('@react-native/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = {
  ...config,
  transformer: {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...config.resolver,
    assetExts: [...config.resolver.assetExts.filter(ext => ext !== 'svg'), 'db', 'mp4', 'ttf', 'otf'],
    sourceExts: [...config.resolver.sourceExts, 'svg'],
  },
};
