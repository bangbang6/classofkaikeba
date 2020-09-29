const config = require('./webpack.config')

const Webpack = require('./lib/webpack')


let compiler = new Webpack(config).run()