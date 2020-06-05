const path = require("path")
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: {
        // main: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
        main: './src/index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].js'
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
                    'css-loader',

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
        new HtmlWebPackPlugin({
            template: '!!raw-loader!src/html/index.ejs',
            filename: 'views/index.ejs'  // this line decide the extension of output file.
        }),
        new HtmlWebPackPlugin({
            template: '!!raw-loader!src/views/test.ejs',
            filename: 'views/test.ejs'  // this line decide the extension of output file.
        }),
        // new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}