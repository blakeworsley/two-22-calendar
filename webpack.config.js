const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: "./lib/index.js",
  },
  output: {
    path: __dirname,
    filename: "[name]2.bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject:true,
    }),
  ],  
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css']
  },
}
