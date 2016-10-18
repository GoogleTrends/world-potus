import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const PROD = (process.env.NODE_ENV === 'production')

const entryDevelopment = [
  "webpack-dev-server/client?/", // Inlines auto-refresh code
  "webpack/hot/dev-server",                           // Hot Module Replacement
]

export default {
  entry: {
    app:      ["./main.js"].concat(PROD ? [] : entryDevelopment),
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  devtool: PROD ? undefined : '#eval-source-map',
  devServer: {
    hot: true,
    contentBase: path.resolve('./static'),
    host: "0.0.0.0",
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ].concat(PROD ? [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('style.css', { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        pure_funcs: ['console.log', 'console.info'],
        unused: true,
      },
      mangle: {
        except: ['DevTools'],
      },
    }),
  ] : [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]),
  resolve: {
    root: [path.resolve('./components')],
    moduleDirectories: [path.resolve('./node_modules')],
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: PROD ? ['babel'] : ['react-hot', 'babel'],
        exclude: [path.resolve('./node_modules')],
        include: [path.resolve('./')],
      },
      {
        test: /\.css$/,
        loaders: PROD ? undefined : [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[path][local]',
          'postcss-loader',
        ],
        loader: PROD ? ExtractTextPlugin.extract(
          'style-loader',
          [
            'css-loader?modules&importLoaders=1&localIdentName=[hash:base64:5]',
            'postcss-loader',
          ]
        ) : undefined,
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=static/fonts/[name].[ext]',
      },
      {
        test: /\.json$/,
        loaders: ['json'],
      },
      { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
      { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ },
    ],
  },
  postcss: [
    require('postcss-cssnext'),
  ],
}
