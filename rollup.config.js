const pluginGlobImport = require('rollup-plugin-glob-import')
const babel = require('@rollup/plugin-babel')
const styles = require('rollup-plugin-styles')
const nodeExternals = require('rollup-plugin-node-externals')

module.exports = {
  input: 'src/server.js',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    nodeExternals(),
    styles(),
    babel({
      babelHelpers: 'bundled',
    }),
    pluginGlobImport(),
  ],
}
