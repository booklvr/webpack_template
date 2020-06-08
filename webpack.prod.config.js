const path = require("path");
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
    target: 'web',
    devtool: 'source-map',
    // Webpack 4 does not have a CSS minifier
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCssAssetsPlugin({})
        ]
    },
    module: {
        rules: [
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
                        options: { minimize: true }
                    }
                ]
            },
            {
                // LOads images into css and javascript files
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    { loader: "url-loader" }
                ]
            },
            {
                test: /\.(sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader, 
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
        ]
    },
    plugins: [
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
        // new webpack.NoEmitOnErrorsPlugin()
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
          }),
    ]
}