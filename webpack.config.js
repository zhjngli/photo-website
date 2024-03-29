const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const safeParser = require('postcss-safe-parser');

const analyze = process.env.BUNDLE_ANALYZE === 'true';
const isProd = process.env.NODE_ENV === 'production';
const outputDir = 'dist';

const baseUrl = 'https://zhjngli.com';
const metaTitle = 'zhijiang li';
const metaDescription = 'Photo gallery of selected works.';
const metaImageName = 'me.jpg';
const metaImage = baseUrl + '/' + metaImageName;

const plugins = [
  new CopyPlugin({
    // webpack won't bundle any content not being used in src. copy it instead
    patterns: [
      {
        // metatag
        from: 'src/assets/meta/metatag-1-1,5.jpg',
        transformPath(targetPath, absolutePath) {
          return metaImageName;
        }
      },
      {
        // favicons
        from: '*',
        context: path.resolve(__dirname, 'src', 'assets', 'favicons')
      },
      {
        // self-hosted resume
        from: 'resume.pdf',
        context: path.resolve(__dirname, 'src', 'assets', 'self-hosted'),
        to: 'i/resume.pdf'
      },
      {
        // self-hosted images
        from: '**/*.{jpg,jpeg,png,gif}',
        context: path.resolve(__dirname, 'src', 'assets', 'self-hosted'),
        to: 'i/[path]/[contenthash].[ext]'
      }
    ]
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[fullhash].min.css',
    chunkFilename: '[id].[chunkhash].min.css'
  }),
  new HtmlWebpackPlugin({
    template: 'public/index.html',
    filename: 'index.html',
    favicon: 'src/assets/favicons/favicon.ico',
    meta: {
      viewport: 'width=device-width, initial-scale=1',
      description: metaDescription
    }
  }),
  new HtmlWebpackTagsPlugin({
    metas: [
      {
        attributes: {
          property: 'og:url',
          content: baseUrl
        }
      },
      {
        attributes: {
          property: 'og:type',
          content: 'website'
        }
      },
      {
        attributes: {
          property: 'og:title',
          content: metaTitle
        }
      },
      {
        attributes: {
          property: 'og:description',
          content: metaDescription
        }
      },
      {
        attributes: {
          property: 'og:image',
          content: metaImage
        }
      },
      {
        attributes: {
          property: 'og:image:type',
          content: 'image/jpeg'
        }
      },
      {
        attributes: {
          property: 'og:image:width',
          content: '1080'
        }
      },
      {
        attributes: {
          property: 'og:image:height',
          content: '1618'
        }
      },
      {
        attributes: {
          name: 'twitter:card',
          content: 'summary'
        }
      },
      {
        attributes: {
          name: 'twitter:site',
          content: '@zhjngli'
        }
      },
      {
        attributes: {
          name: 'twitter:title',
          content: metaTitle
        }
      },
      {
        attributes: {
          name: 'twitter:description',
          content: metaDescription
        }
      },
      {
        attributes: {
          name: 'twitter:image',
          content: metaImage
        }
      }
    ]
  }),
  new PreloadWebpackPlugin({
    rel: 'preload',
    as: 'font',
    include: 'allAssets',
    fileWhitelist: [/\.(woff2?|ttf|otf)(\?.*)?$/i]
  }),
  new WorkboxPlugin.GenerateSW({
    // these options encourage the ServiceWorkers to get in there fast
    // and not allow any straggling "old" SWs to hang around
    clientsClaim: true,
    skipWaiting: true
  }),
  new RobotstxtPlugin({
    options: {
      policy: [
        {
          userAgent: '*',
          disallow: ''
        }
      ]
    }
  })
];
if (analyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  plugins: plugins,
  entry: './src/index.tsx',
  module: {
    // consider: https://www.npmjs.com/package/common-config-webpack-plugin
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png)|(jpe?g)|(webp)$/,
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
        test: /\.module\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: !isProd
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  require('postcss-flexbugs-fixes'),
                  require('postcss-preset-env')({
                    autoprefixer: {
                      flexbox: 'no-2009'
                    }
                  })
                ]
              },
              sourceMap: !isProd
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProd
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          parser: safeParser
        }
      })
    ],
    splitChunks: {
      chunks: 'all',
      name: false
    }
  },
  output: {
    chunkFilename: '[id].[chunkhash].js',
    filename: '[id].[fullhash].js',
    path: path.resolve(__dirname, `${outputDir}`),
    publicPath: process.env.ASSET_PATH || '/'
  },
  devServer: {
    compress: true,
    port: 3000,
    server: 'https',
    open: true,
    historyApiFallback: true
  }
};
