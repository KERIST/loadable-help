const path = require("path");
// const nodeExternals = require("webpack-node-externals");
const LoadablePlugin = require("@loadable/webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("react-dev-utils/InterpolateHtmlPlugin");
const nodeExternals = require("webpack-node-externals");

const isEnvProduction = process.env.NODE_ENV === "production";
const BUILD_PATH = path.resolve(__dirname, "build");

const getConfig = (target) => ({
  entry: {
    main: target === "node" ? "./server/index.js" : "./src/index.js",
  },
  target,
  output: {
    path: path.join(BUILD_PATH, target),
    filename: isEnvProduction ? "[name]-bundle-[chunkhash:8].js" : "[name].js",
    libraryTarget: target === "node" ? "commonjs2" : undefined,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          caller: { target },
        },
      },
      {
        test: /\.(css|scss)?$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new LoadablePlugin(),
    new MiniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public"),
          to: path.resolve(__dirname, `build`),
          globOptions: {
            ignore: [path.resolve(__dirname, "public/index.html")],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, "public/index.html"),
      filename: "template.html",
      ...(isEnvProduction
        ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true,
            },
          }
        : undefined),
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
      NODE_ENV: process.env.NODE_ENV,
      PUBLIC_URL: "",
    }),
  ],
  externals:
    target === "node" ? ["@loadable/component", nodeExternals()] : undefined,
  optimization: {
    minimize: isEnvProduction,
    moduleIds: "named",
    chunkIds: "named",
  },
  resolve: {
    extensions: [".js", ".jsx", ".scss", ".css"],
  },
});

module.exports = [getConfig("web"), getConfig("node")];
