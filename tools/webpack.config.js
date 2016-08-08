import { resolve as resolvePath } from 'path';
import webpack from 'webpack';
import { DEBUG, VERBOSE } from './flags';

const SRC = resolvePath(__dirname, '../src');
const DIST = resolvePath(__dirname, '../dist');

export default {

  target: 'node',

  context: SRC,

  entry: [
    './app.js',
  ],

  output: {
    path: DIST,
    libraryTarget: 'commonjs2',
    filename: './main.js',
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolvePath(__dirname, '../src'),
        ],
        query: {
          cacheDirectory: DEBUG,
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0',
          ],
          plugins: [
            'transform-runtime',
          ],
        },
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.scss$/,
        loaders: [
          'style-loader',
          `css-loader?${JSON.stringify({
            sourceMap: DEBUG,
            modules: true,
            localIdentName: `lastpass_${
              DEBUG ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]'
            }`,
            minimize: !DEBUG,
          })}`,
          'sass-loader',
        ],
      },
    ],
  },

  resolve: {
    root: SRC,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },

  cache: DEBUG,
  debug: DEBUG,

  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },

  plugins: DEBUG ? [] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
      __DEV__: DEBUG,
      'process.env.BROWSER': true,
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { screw_ie8: true, warnings: false },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
    setImmediate: false,
    crypto: false,
    fs: false,
  },

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
};
