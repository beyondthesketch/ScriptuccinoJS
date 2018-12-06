const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './scriptuccino.lib.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scriptuccino.lib.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'src')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {presets: ['@babel/preset-env']}
            }
        ]
    },
    plugins: [
      new webpack.BannerPlugin('ScriptuccinoJS | Copyright (c) Beyond The Sketch Ltd | Licensed under MIT License')
    ]
};
