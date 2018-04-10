const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, '../app/index.js'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'statement.js',
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, '../app/components'),
      "@data": path.resolve(__dirname, '../app/data'),
      "@config": path.resolve(__dirname, '../app/config'),
      "@pages": path.resolve(__dirname, '../app/pages'),
      "@styles": path.resolve(__dirname, '../app/styles/index.scss'),
      "@assets": path.resolve(__dirname, '../app/assets'),
    },
    extensions: ['.js', '.scss', '.jsx', '.png', '.svg', '.jpg'],
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, "../build"),
    index: 'statement.html',
    overlay: true,
    compress: true,
    hotOnly: true,
    progress: true,
    inline: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../app'),
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../app/styles/variables.scss'),
              ],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|svg|png|jpe?g)$/,
        use: 'file-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.ejs'),
      filename: 'statement.html',
    })
  ],
}
