const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')

const CompressionWebpackPlugin = require('compression-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const commonConfig = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue: 'vue/dist/vue.js',
      '@': resolve('src'),
      'assets': resolve('src/assets')
    }
  },
  output: {
    path: resolve('dist/')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules|vue\/dist/,
      loader: 'babel-loader'
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
          js: 'babel-loader!eslint-loader'
        }
      }
    },
    {
      test: /\.css$/,
      loader: 'style!less!css'
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000
      }
    }]
  },
  externals: {
    vue: 'vue'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin( {
      minimize : true,
      sourceMap : false,
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$'
      ),
      threshold: 1024,
      minRatio: 0.8
    })
  ]
}
module.exports = [
  merge(commonConfig, {
    entry: resolve('src/index.js'),
    output: {
      filename: 'vue-h-carousel.min.js',
      libraryTarget: 'window',
      library: 'VueHCarousel',
    }
  }),
  merge(commonConfig, {
    entry: resolve('src/libs/VueHCarousel.vue'),
    output: {
      filename: 'vue-h-carousel.js',
      libraryTarget: 'umd',
      library: 'vue-h-carousel',
      umdNamedDefine: true
    }
  })
]
