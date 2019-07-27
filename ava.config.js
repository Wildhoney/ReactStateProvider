export default {
    files: ['./src/tests/index.js'],
    require: [
        '@babel/register',
        '@babel/polyfill',
        './helpers/enzyme.js',
        './helpers/browser-env.js',
    ],
};
