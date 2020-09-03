import buble from "@rollup/plugin-buble";
import {uglify} from "rollup-plugin-uglify"
import {version} from "./package.json";

const banner =
    "/*!\n" +
    " * vue-authenticate v" + version + "\n" +
    " * https://github.com/mdornian/vue-authenticate\n" +
    " * @license Released under the MIT License.\n" +
    " */\n";

const uglifyComments = {
  output: {
    comments: function(node, comment) {
      if (comment.type === "comment2") {
        // multiline comment
        return /@preserve|@license|@cc_on/i.test(comment.value);
      }
      return false;
    }
  }
}

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
      format: 'iife',
      name: 'VueAuthenticate',
      plugins: [uglify(uglifyComments)]
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