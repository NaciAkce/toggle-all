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
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                loaders: ['file-loader'],
                include: path.resolve(__dirname, '../')
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
