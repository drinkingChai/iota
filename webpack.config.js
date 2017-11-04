const path = require('path')

module.exports = {
  entry: path.join(__dirname, 'client', 'index.js'),
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /jsx?$/,
        exclude: /node_modules/,
        query: {
          presets: [ 'env', 'react', 'stage-2' ]
        }
      }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
}
