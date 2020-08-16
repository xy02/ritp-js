const path = require('path');

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    mode: "production",

    // devtool: 'inline-source-map',

    resolve: {
        extensions: [".ts", ".js"]
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ]
    },


    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             uglifyOptions: {
    //                 output: {
    //                     comments: false,
    //                 },
    //             },
    //         })
    //     ]
    // },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: 'ritp_js',
        libraryTarget: 'umd',
        globalObject: 'this',
    }
};