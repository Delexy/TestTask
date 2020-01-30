const path = require('path');

module.exports = {
  mode: "development",
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'scripts'),
    publicPath: '/scripts'
},
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 8080
  }
};