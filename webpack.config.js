const path = require('path');

module.exports = {

  resolve: { extensions: ['.js', '.jsx'] },
  entry: path.join(__dirname, '/client/src/index.jsx'),
  // entry: path.join(__dirname, '/client/src/Components/App.jsx'),
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
};
