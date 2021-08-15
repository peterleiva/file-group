const path = require("path");
const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");
const ESLintPlugin = require("eslint-webpack-plugin");

/**
 * Webpack configuration file
 * @param {object} env environment options
 * @param {"production" | "development"} env.mode webpack mode
 * @return {import('webpack').Configuration}
 */
module.exports = ({ mode }) => ({
  target: "node",
  mode,
  entry: "index.js",
  context: path.resolve(__dirname, "src"),
  module: {
    rules: [
      {
        exclude: [/node_modules/],
        use: "babel-loader",
        test: /\.js$/,
      },
    ],
  },
  resolve: {
    modules: ["node_modules", path.resolve(__dirname, "src")],
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
  plugins: [
    new ESLintPlugin(),
    new webpack.BannerPlugin({
      banner: "#!/usr/bin/env node",
      entryOnly: true,
      raw: true,
    }),
  ],
  output: {
    filename: "cli.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  optimization: {
    chunkIds: "named",
  },
});
