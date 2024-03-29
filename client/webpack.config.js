const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader"
      },
      {
        test: /\.s?css$/,
        loader: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000"
      }
    ]
  },
  resolve: { extensions: [".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "bundle.js"
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    proxy: {
      "/api/*": {
        target: "http://localhost:3000/",
        secure: "true"
      }
    },
    port: 4000,
    publicPath: "http://localhost:4000/dist/",
    hotOnly: true,
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html"
    }),
    new CopyWebpackPlugin([{ from: "public/images", to: "images" }])
  ]
};
