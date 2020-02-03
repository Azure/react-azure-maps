'use strict'
exports.__esModule = true
var rollup_plugin_node_resolve_1 = require('rollup-plugin-node-resolve')
var rollup_plugin_commonjs_1 = require('rollup-plugin-commonjs')
var rollup_plugin_sourcemaps_1 = require('rollup-plugin-sourcemaps')
var lodash_camelcase_1 = require('lodash.camelcase')
var rollup_plugin_typescript2_1 = require('rollup-plugin-typescript2')
var rollup_plugin_json_1 = require('rollup-plugin-json')
var rollup_plugin_postcss_1 = require('rollup-plugin-postcss')
var pkg = require('./package.json')
exports['default'] = {
  input: 'src/' + pkg.name + '.ts',
  output: [
    {
      file: pkg.main,
      name: lodash_camelcase_1['default'](pkg.name),
      format: 'umd',
      sourcemap: true
    },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['react', 'react-dom'],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Allow json resolution
    rollup_plugin_json_1['default'](),
    rollup_plugin_postcss_1['default']({
      extensions: ['.css']
    }),
    // Compile TypeScript files
    rollup_plugin_typescript2_1['default']({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    rollup_plugin_commonjs_1['default'](),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    rollup_plugin_node_resolve_1['default'](),
    // Resolve source maps to the original source
    rollup_plugin_sourcemaps_1['default']()
  ]
}
