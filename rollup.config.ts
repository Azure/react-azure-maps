import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
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
      name: 'azure-maps-react',
      format: 'umd'
    },
    {
      file: pkg.module,
      format: 'es',
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
    resolve()
  ]
}
