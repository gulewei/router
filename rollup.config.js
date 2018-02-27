import babel from "rollup-plugin-babel";
// import uglify from "rollup-plugin-uglify";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import sourcemaps from 'rollup-plugin-sourcemaps'

const config = {
  input: "src/index.js",
  output: {
    file: 'dist/index.js',
    format: 'umd',
    name: 'HoaRouter'
  },
  globals: {
    hyperapp: "hyperapp",
    history: "History"
  },
  external: ["hyperapp", "history"],
  plugins: [
    sourcemaps(),
    resolve(),
    commonjs({
      include: /node_modules/
    }),
    babel({
      exclude: "node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

// if (process.env.NODE_ENV === "production") {
//   config.plugins.push(uglify());
// }

export default config;
