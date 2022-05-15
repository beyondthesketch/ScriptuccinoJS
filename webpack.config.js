const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const alias = {
    'whenPageReady.js': path.resolve(__dirname, 'src/events/page/whenPageReady.js'),
    'whenPageLoaded.js': path.resolve(__dirname, 'src/events/page/whenPageLoaded.js'),
    'whenScrollEnds.js': path.resolve(__dirname, 'src/events/scroll/whenScrollEnds.js'),
    'applyTransition.js': path.resolve(__dirname, 'src/fx/applyTransition.js'),
    'simpleDebounce.js': path.resolve(__dirname, 'src/utils/simpleDebounce.js')
}

module.exports = env => (
        {
            mode: env && env.production ? 'production' : 'development',
            resolve: {
                alias,
            },
            entry: path.resolve(__dirname, 'src/index.js'),
            output: {
                path: path.resolve(__dirname, 'umd'),
                filename: 'scriptuccino.min.js',
                library: 'scriptuccino',
                libraryTarget: 'umd'
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
        }
);
