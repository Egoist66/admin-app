const HtmlWebpackPlugin = require("html-webpack-plugin");
// @ts-ignore
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require("path");

module.exports = {
    entry: "./app/src/index.tsx",
    mode: "production",
    output: {
        filename: "bundle.min.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./app/src/index.html",
        }),
        new CleanWebpackPlugin(),

    ],
    resolve: {
        modules: [__dirname, "src", "node_modules"],
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                exclude: /node_modules/,
                use: ["file-loader"]
            },

            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript"
                        ]
                    }
                },
            },

        ],
    },
};