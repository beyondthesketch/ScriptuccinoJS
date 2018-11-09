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
                include: [path.resolve(__dirname, 'src/events')],
                exclude: [path.resolve(__dirname, 'node_modules')],
                loader: 'babel-loader',
                options: {presets: ['@babel/preset-env']}
            }
        ]
    }
};