const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');

const isProd = process.env.NODE_ENV === 'production';
const outputDir = 'dist';

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].min.css',
      chunkFilename: '[id].[hash].min.css'
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: 'index.html',
      favicon: 'src/assets/icons/favicon.ico',
    }),
    new RobotstxtPlugin({
      options: {
        policy: [
            {
              userAgent: "*",
              disallow: "",
            }
        ]
      }
    }),
    new WebpackPwaManifest({
      short_name: "zhijiang li photos",
      name: "zhijiang li photos",
      icons: [
        {
          src: path.resolve('src/assets/icons/favicon.ico'),
          sizes: [16, 24, 32, 64],
          type: "image/x-icon"
        },
        {
          src: path.resolve('src/assets/icons/apple-touch-icon.png'),
          type: "image/png",
          sizes: [180],
          destination: path.join('icons', 'ios'),
          ios: true
        },
        {
          src: path.resolve('src/assets/icons/android-chrome-192x192.png'),
          type: "image/png",
          sizes: [192],
          destination: path.join('icons', 'android')
        },
        {
          src: path.resolve('src/assets/icons/android-chrome-512x512.png'),
          type: "image/png",
          sizes: [512],
          destination: path.join('icons', 'android')
        }
      ],
      start_url: ".",
      display: "standalone",
      theme_color: "#000000",
      background_color: "#ffffff"
    })
  ],
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png)|(jpe?g)$/,
        use: 'file-loader'
      },
      {
        test: /\.txt$/i,
        use: 'raw-loader',
      },
      {
        test: /\.module\.scss$/,
        use: [
          // Creates `style` nodes from JS strings. Style loader allows hot loading in dev builds
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !isProd,
            }
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd,
            }
          },
        ],
      }
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    chunkFilename: '[id].js',
    filename: 'bundle.js',
    path: path.resolve(__dirname, `${outputDir}`),
    publicPath: process.env.ASSET_PATH || '/',
  },
  devServer: {
    contentBase: path.join(__dirname, `${outputDir}`),
    compress: true,
    port: 3000,
    https: true,
    overlay: true,
    open: true,
    progress: true,
    historyApiFallback: true,
    index: 'index.html',
  }
};
