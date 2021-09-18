import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import gzipPlugin from 'rollup-plugin-gzip';

const dist = 'dist';
const bundle = 'bundle';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/index.js',
  external: ['react'],
  output: [
    {
      file: `${dist}/${bundle}.cjs.js`,
      format: 'cjs',
    },
    {
      name: 'toggle',
      file: `${dist}/${bundle}.umd.js`,
      globals: {
        react: 'React',
      },
      format: 'umd',
    },
    {
      file: `${dist}/${bundle}.esm.js`,
      format: 'esm',
    },
  ],
  plugins: [
    resolve(),

    babel({
      exclude: 'node_modules/**',
    }),
    production && terser({}),
    production && gzipPlugin(),
  ],
};
