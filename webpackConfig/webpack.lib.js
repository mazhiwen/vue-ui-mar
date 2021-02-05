
// 该文件好像是参考eleui 的编译

const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const commonOptions = require('./commonOptions');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// const config = require('./config');



module.exports = {
  mode: 'production',
  entry: {
    menu: ['./src/packages/menu/index.js'],
    edit: ['./src/packages/edit/index.js'],
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name]/index.js',
    // publicPath: '/dist/',
    // filename: 'mar-ui.common.js',
    // chunkFilename: '[id].js',
    // libraryExport: 'default',
    // library: 'MARUI',
    // libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      utils: path.resolve(__dirname, '../src/utils'),
      configs: path.resolve(__dirname, '../src/configs'),
      router: path.resolve(__dirname, '../src/router'),
      views: path.resolve(__dirname, '../src/views'),
      styles: path.resolve(__dirname, '../src/styles'),
      images: path.resolve(__dirname, '../src/images'),
      components: path.resolve(__dirname, '../src/components'),
      filters: path.resolve(__dirname, '../src/filters'),
      request: path.resolve(__dirname, '../src/request'),
      static: path.resolve(__dirname, '../src/static'),
    },
    // alias: config.alias,
    modules: ['node_modules'],
  },
  // externals: config.externals,
  externals: {
    vue: 'vue',
  },
  performance: {
    hints: false,
  },
  stats: {
    children: false,
  },
  optimization: {
    minimize: false,

  },
  module: {
    rules: [{
      test: /\.(jsx?|babel|es6)$/,
      // include: process.cwd(),
      // exclude: config.jsexclude,
      loader: 'babel-loader',
    },
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        compilerOptions: {
          preserveWhitespace: false,
        },
      },
    },
    // {
    //   test: /\.css$/,
    //   loaders: ['style-loader', 'css-loader'],
    // },
    // 编译less为css以下都需要配置
    {
      test: /\.(le|c)ss$/,
      use: [
        // 提取css到单独文件的loader
        // MiniCssExtractPlugin 需要在plugin再声明plugin
        MiniCssExtractPlugin.loader,
        ...commonOptions.commonCssLoader,
      ],
    },
    {
      test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        name: path.posix.join('static', '[name].[hash:7].[ext]'),
      },
    },
    ],
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    // 提取css到单独文件的插件
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]/style.css',
      chunkFilename: '[id]/style.css',
    }),
    new webpack.optimize.SplitChunksPlugin({
      // ************************默认
      // chunks: 'all', // 默认async
      // minSize: 30000,
      // minChunks: 1,
      // maxAsyncRequests: 6,
      maxInitialRequests: 30,
      // name: 'vendors',
      cacheGroups: {
        common: {
          chunks: 'initial',
          // test(module, chunks) {
          //   console.log(module.context.includes('src/packages'));
          //   return !module.context.includes('src/packages');
          // },
          test:  /[\\/](utils|node_modules)[\\/]/,
          // priority: -10,
          // filename: 'lib/[name]/bundle.js',
          name: 'common',
          enforce: true,
        },
      },
    }),
  ],
};
