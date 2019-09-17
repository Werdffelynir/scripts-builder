const path = require("path");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';
  const sourceMapType = 0 ? '#eval-source-map' : 'inline-source-map';

  return ({
    entry: {
      main: './src/index.ts',
      drawer: './src/Drawer/index.ts',
    },
    output: {
      filename: '[name].js',
      sourceMapFilename: '[file].map',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: argv.mode,
    devtool: isDevelopment ? sourceMapType : 'source-map',
    devServer: {
      stats: {
        children: false,
        maxModules: 0
      },
      port: 3002,
    },
    module: {
      rules: [
        {
          loader: "ts-loader",
          test: /\.tsx?$/,
          exclude: /node_modules/,
        },
        {
          test: /\.scss|sass|css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
          loader: 'url-loader',
          options: {
            emitFile: true,
            limit: 8192,
          },
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
      new CleanWebpackPlugin({}),
      new HTMLWebpackPlugin({
        title: 'WP/TS Script Builder',
        template: "./index.html"
      })
    ]
  })
};

