const webpack = require('webpack');
const path = require('path');

module.exports = env => ({
    mode: env && env.production ? 'production' : 'development',
    entry: './scriptuccino.lib.js',
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'scriptuccino.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: [
                        '@babel/plugin-transform-spread',
                        '@babel/plugin-proposal-object-rest-spread',
                        '@babel/plugin-transform-object-assign'
                    ]
                }
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('ScriptuccinoJS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License')
    ],
    devServer: {
        contentBase: path.join(__dirname, 'docs'),
        compress: true,
        port: 9000
    }
});
