var babel = require('rollup-plugin-babel')
var resolve = require('rollup-plugin-node-resolve')

const config = {
  input: "src/index.js",
  output: {
    file: 'dist/hoa-router.js',
    format: 'umd',
    name: 'HoaRouter',
    globals: {
      hyperapp: "hyperapp",
      history: "History"
    },
  },
  external: ["hyperapp", "history"],
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**"
    })
  ]
};


module.exports = config
