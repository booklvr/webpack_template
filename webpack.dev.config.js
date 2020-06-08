const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
        main: './src/index.js',
        test: './src/js/test/controller.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name].js'
    },
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "eslint-loader",
                options: {
                    emitWarning: true,
                    failOnError: false,
                    failOnWarning: false
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
            },
            {
            // Loads the javacript into html template provided.
            // Entry point is set below in HtmlWebPackPlugin in Plugins 
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        //options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    'style-loader',
                    {
                      loader: 'css-loader',
                      options: {
                        importLoaders: 1
                      }
                    },
                    'postcss-loader',
                    'sass-loader',
                  ]
            },
            // {
            //     test: /\.css$/,
            //     use: [ 'style-loader', 'css-loader' ]
            // },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        // *** pages ***
        new HtmlWebPackPlugin({
            template: '!!raw-loader!src/views/pages/index.ejs',
            filename: 'views/pages/index.ejs',  // this line decide the extension of output file.
            chunks: ['main'],
        }),
        new HtmlWebPackPlugin({
            template: '!!raw-loader!src/views/pages/test.ejs',
            filename: 'views/pages/test.ejs',  // this line decide the extension of output file.
            chunks: ['main', 'test']
        }),
        // *** partials *** 
        new HtmlWebPackPlugin({
            template: '!!raw-loader!src/views/partials/head.ejs',
            filename: 'views/partials/head.ejs',
            chunks: [],
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}