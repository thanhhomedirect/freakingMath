module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    curly: 0,
    'react-hooks/exhaustive-deps': 'warn'
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['assets', './src/assets/index.js'],
          ['app-redux', './src/app-redux/index.js'],
          ['utils', './src/utils/index.js'],
          ['api', './src/api/index.js'],
          ['components', './src/components/index.js']
        ],
        extensions: ['.ts', '.js', '.jsx', '.json']
      },
      node: {
        paths: ["./src"],
        extensions: ['.ts', '.js', '.jsx', '.json']
      }
    }
  }
};
