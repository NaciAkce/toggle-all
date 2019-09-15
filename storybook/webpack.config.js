const path = require('path');
const rootPath = path.resolve(__dirname, '../src');

module.exports = {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loaders: [
                    'style-loader',
                    'css-loader',
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader'
                    }
                ],
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../dist')]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loaders: ['file-loader'],
                include: path.resolve(__dirname, '../src')
            }
        ]
    },
    resolve: {
        alias: {
            ['@']: rootPath
        }
    },
    devServer: {
        inline: false,
        hotOnly: true,
        hot: false
    }
};
