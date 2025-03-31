const path = require('path');

module.exports = {
  entry: './extension/popup/popup.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'extension/popup/dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devtool: 'source-map',
};
