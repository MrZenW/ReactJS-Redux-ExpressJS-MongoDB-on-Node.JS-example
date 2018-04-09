const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, '../react-src/index.js'),
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'app/[name]_[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015','react']
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
　　 plugins: [
　　 　　new HtmlWebpackPlugin({
　　　　 　　template: path.resolve(__dirname, '../react-src/index.template.html'),
　　　　　　 inject: true
　　　　 })
　　 ]
}