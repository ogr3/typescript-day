const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    // Här anger vi att huvudmodulen som skall inkluderas är src/Main.ts.
    // Denna skall sedan importera (direkt eller indirekt) resten av applikationen
    "main": "./src/Main.ts"
  },
  resolve: {
    // Webpack skall följande filändelser för att lösa upp moduler
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        // Ange att awesome-typescript-loader skall användas för att ladda typescriptfiler
        // vid undling. Den kommer då att kompilera coh skapa source-maps m.m
        test: /\.ts$/,
        loader: "awesome-typescript-loader"
      },
      {
        // Ange loader för html-filer
        test: /\.html$/,
        loader: 'html'
      }
    ]
  },
  plugins: [
    // Definiera att html-webpack-plugin skall processa index.html, m.a.p filnamn
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
