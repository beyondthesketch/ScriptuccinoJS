const path = require('path');
const scriptuccinoWebpack = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    const config = scriptuccinoWebpack(env);

    config.plugins.push(
        new HtmlWebpackPlugin(
            {
                filename: `index.html`,
                title: `ScriptuccinoJS - Beyond The Sketch`,
                template: `./docs/index.html`,
                inject: 'head',
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    minifyCSS: true
                  }
            }
        )
    );
    
    config.devServer = {
        contentBase: path.join(__dirname, 'docs'),
        compress: true,
        port: 9000,
        open: true
    }

    return config;
}