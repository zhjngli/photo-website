const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');
const TerserPlugin = require("terser-webpack-plugin");

// const metaImage = require('src/assets/photos/metatag-1,91-1.jpg');

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
      meta: {
        'viewport': 'width=device-width, initial-scale=1',
        'description': "Zhijiang's photos",
      }
    }),
    new HtmlWebpackTagsPlugin({
      metas: [
        {
          attributes: {
            property: 'og:type',
            content: 'website'
          }
        },
        {
          attributes: {
            property: 'og:title',
            content: 'zhjng.li'
          }
        },
        {
          attributes: {
            property: 'og:description',
            content: "Zhijiang's photography"
          }
        },
        {
          path: path.resolve('src/assets/photos/metatag-1,91-1.jpg'),
          attributes: {
              property: 'og:image'
          }
        },
        {
          attributes: {
              property: 'og:image:type',
              content: "image/jpeg"
          }
        },
        // {
        //   attributes: {
        //       property: 'og:image:width',
        //       content: "200"
        //   }
        // },
        // {
        //   attributes: {
        //       property: 'og:image:height',
        //       content: "200"
        //   }
        // }
      ]
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
    // consider: https://www.npmjs.com/package/common-config-webpack-plugin
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
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
  optimization: {
    minimizer: [new TerserPlugin()],
    splitChunks: { // https://medium.com/@Yoriiis/the-real-power-of-webpack-4-splitchunks-plugin-fad097c45ba0
      chunks: 'all',
      name: !isProd,
    }
  },
  output: {
    chunkFilename: '[id].[hash].js',
    filename: '[hash].js',
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
