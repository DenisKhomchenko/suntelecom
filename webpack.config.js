const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifierPlugin = require('html-beautifier-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const pathsMap = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  pages: path.join(__dirname, 'src/layout/pages'),
  assets: 'assets',
}

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
const styleLoader = mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader';

const initMultipleHtmlPlugin = () => {
  const pages = fs.readdirSync(pathsMap.pages);

  const pluginInstances = pages.map((page) => {
    const [pageName] = page.split('.');

    return new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      template: `${pathsMap.pages}/${page}`,
      minify: false,
    });
  });

  return pluginInstances;
};

const config = {
  target: 'browserslist',
  entry: {
    'main_style': `${pathsMap.src}/style.js`,
    'main_script': `${pathsMap.src}/script.js`,
  },
  output: {
    filename: `js/[name]/[name].js`,
    path: pathsMap.dist,
    clean: false,
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: pathsMap.src,
    },
    open: true,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@': pathsMap.src,
      '@fonts': `${pathsMap.src}/assets/fonts`,
      '@theme': `${pathsMap.src}/theme`,
      '@theme-mixins': `${pathsMap.src}/theme/mixins`,
      '@theme-pages': `${pathsMap.src}/theme/pages`,
      '@components': `${pathsMap.src}/components`,
    }
  },
  plugins: [    
    ...initMultipleHtmlPlugin(),

    new HtmlBeautifierPlugin(),

    new MiniCssExtractPlugin({
      filename: `css/[name]/[name].css`,
    }),

    new RemovePlugin({
      after: {
        root: './dist',
        test: [
          {
            folder: './js',
            method: (absoluteItemPath) => {
              return new RegExp(/style/, 'gim').test(absoluteItemPath);
            }
          },
        ]
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          styleLoader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          styleLoader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|gif|mp4|webp)$/i,
        type: 'asset/resource',
        generator: {
            // filename: `${pathsMap.assets}/media/[name][ext]`,
            filename: `[path]/[name][ext]`,
                filename: ({ filename }) => {
                    if (filename.includes('src\\')) {
                        return filename.replace('src\\', '');
                    }
                    return filename;
            },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${pathsMap.assets}/fonts/[name][ext]`,
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  "...",
                  {
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src',
                  },
                  {
                    tag: 'img',
                    attribute: "data-srcset",
                    type: 'srcset',
                  },
                  {
                    tag: 'div',
                    attribute: 'data-background-image',
                    type: 'src',
                  },
                  {
                    tag: 'span',
                    attribute: 'data-background-image',
                    type: 'src',
                  },
                ],
              },
              minimize: false,
            },
          },
          {
            loader: 'pug-html-loader',
            options: {
              basedir: pathsMap.src,
            },
          }
        ],
        exclude: /(node_modules)/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        }
      }
    },
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
        },
      }),
    ],
  },
};

module.exports = () => {
  config.mode = mode;

  return config;
};
