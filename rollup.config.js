import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import scss from 'rollup-plugin-scss'

const dist = 'dist';
const bundle = 'bundle';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/index.js',
    external: ['react'],
    output: [
        {
            file: `${dist}/${bundle}.cjs.js`,
            format: 'cjs'
        },
        {
            name: 'toggle',
            file: `${dist}/${bundle}.umd.js`,
            globals: {
                react: 'React'
            },
            format: 'umd'
        },
        {
            file: `${dist}/${bundle}.esm.js`,
            format: 'esm'
        }
    ],
    plugins: [
        resolve(),
        scss({
            output: true,
            output: `${dist}/styles.css`,
            processor: css =>
                postcss([autoprefixer])
                    .process(css, { from: undefined })
                    .then(styles => styles.css)
        }),
        babel({
            exclude: 'node_modules/**'
        }),
        production && terser()
    ]
};
