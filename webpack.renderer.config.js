const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
    test: /\.s[ac]ss$/i,
    use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
        { loader: 'sass-loader' },
    ],
});

module.exports = {
    module: {
        rules,
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.ttf'],
        alias: {
            'react' : '../node_modules/preact/compat',
            'react-dom/test-utils' : '../node_modules/preact/test-utils',
            'react-dom' : '../node_modules/preact/compat'
          }
    },
};
