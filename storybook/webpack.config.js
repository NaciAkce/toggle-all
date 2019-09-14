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
                    {
                        loader: 'sass-loader'
                    }
                ],
                include: path.resolve(__dirname, '../src')
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
