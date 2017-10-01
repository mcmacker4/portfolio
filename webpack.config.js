const webpack = require('webpack');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
        filename: "portfolio.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    },
    devtool: "source-map"
}