import buble from "@rollup/plugin-buble";
import {version} from "./package.json";

const banner =
    "/*!\n" +
    " * vue-authenticate v" + version + "\n" +
    " * https://github.com/mdornian/vue-authenticate\n" +
    " * Released under the MIT License.\n" +
    " */\n";

export default {
  input: 'src/index.js',
  output: [
    {
      banner: banner,
      file: 'dist/vue-authenticate.js',
      format: 'umd',
      name: 'VueAuthenticate'
    },
    {
      banner: banner,
      file: 'dist/vue-authenticate.min.js',
      format: 'iife'
    },
    {
      banner: banner,
      file: 'dist/vue-authenticate.es2015.js',
      footer: 'export { VueAuthenticate };',
      format: 'es',
    },
    {
      banner: banner,
      exports: 'auto',
      file: 'dist/vue-authenticate.common.js',
      format: 'cjs'
    }
  ],
  plugins: [ buble() ]
};