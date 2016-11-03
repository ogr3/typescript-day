const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    "main": "./src/Main.ts"
  },
  output: {
    path: 'dist',
    publicPath: '/',
    filename: "[name].[hash].js"
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};