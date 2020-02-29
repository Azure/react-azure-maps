import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'

const pkg = require('./package.json')

const outputGlobals = {
  react: 'React',
  'react-dom/server': 'server'
}

export default {
  input: `src/${pkg.name}.ts`,
  output: [
    {
      file: pkg.main,
      name: camelCase(pkg.name),
      format: 'umd',
      sourcemap: true,
      globals: outputGlobals
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      globals: outputGlobals
    }
  ],
  watch: {
    include: 'src/**'
  },
  external: ['react', 'react-dom', 'react-dom/server'],
  plugins: [
    json(),
    postcss({
      extensions: ['.css']
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    commonjs(),
    resolve(),
    sourceMaps()
  ]
}
