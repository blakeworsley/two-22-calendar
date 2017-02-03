const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
    ]
  },
  // plugins: [new HtmlWebpackPlugin()],  
  resolve: {
    extensions: ['', '.js', '.json', '.scss', '.css']
  },
}



// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var webpackConfig = {
//   entry: 'index.js',
//   output: {
//     path: 'dist',
//     filename: 'index_bundle.js'
//   },
//   plugins: [new HtmlWebpackPlugin()]
// };

  // plugins: [    
  //   new HtmlWebpackPlugin ({
  //     inject: true,
  //     template: "index.html"
  //   })
  // ]