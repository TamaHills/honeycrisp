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

rules.push({
    test: /\.(woff|woff2|eot|ttf|otf)$/,
    use: ['file-loader'],
});

module.exports = {
    module: {
        rules,
    },
    plugins: plugins,
    resolve: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.ttf'],
    },
};
