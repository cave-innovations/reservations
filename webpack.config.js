const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {

  resolve: { extensions: ['.js', '.jsx'] },
  entry: path.join(__dirname, '/client/src/index.jsx'),
  // entry: path.join(__dirname, '/client/src/Components/App.jsx'),
  mode: 'production',
  optimization: {
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true,
    })],
  },
  module: {
    rules: [
      {
        test: [/\.(js|jsx)$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public'),

    libraryTarget: 'var',
    library: 'Reservations',
  },
  // plugins: [
  //   new CompressionPlugin({
  //     cache: true,
  //     algorithm: 'gzip',
  //   }),
  // ],
};
