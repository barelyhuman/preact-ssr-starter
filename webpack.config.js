const path = require('path')
const WebpackShell = require('webpack-shell-plugin-next')
const nodeExternals = require('webpack-node-externals')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  entry: [
    './src/server.js',
  ],
  mode: isDev ? 'development' : 'production',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          publicPath: '/static',
          outputPath: 'static',
        },
      },
    ],
  },
  watchOptions: {
    poll: true,
    ignored: /node_modules/,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.mjs'],
  },
  plugins: [
    new WebpackShell({
      onBuildEnd: isDev && {
        scripts: ['yarn run:dev'],
        blocking: false,
        parallel: true,
      },
    }),
    new LiveReloadPlugin({
      // Wait for nodemon to start again
      delay: 350,
    }),
  ],
}
