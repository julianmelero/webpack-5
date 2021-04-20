// Archivo de configuración de Webpack

const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const copyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const dotEnv = require("dotenv-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

// Exportamos las configuraciones

// Entry: punto de entrada
// Output: dónde se encuentran los archivos de salida
// Resolve --> extensions: le decimos los tipos de archivos que debe 'compilar'
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    // Con cada versión le damos un hash a los archivos
    filename: "[name][contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      // Los ALIAS son nombres que le damos a los path, para evitar poner ../../
      // Usamos @ para decir que es un Alias
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts/"),
    },
  },
  optimization: {
    minimize: true,
  },
  /*
Loaders
Fuera de contexto, webpack solamente entiende JavaScript y JSON. Los loaders nos permite procesar archivos de otros tipos para convertirnos en módulos válidos que serán consumidos por nuestras aplicaciones y agregadas como dependencias.

En alto nivel, los loaders poseen 2 configuraciones principales:

test - propiedad que identifica cuáles archivos deberán ser transformados
use - propiedad que identifica el loader que será usado para transformar a dichos archivos
Plugins
Mientras los loaders transforman ciertos tipos de módulos, los plugins _son utilizados para extender tareas específicas, como la optimización de paquetes, la gestión de activos y la inyección de variables de entorno.

Una vez importado el plugin, podemos desear el personalizarlos a través de opciones.
  */
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css|.styl$/i,
        use: [miniCssExtractPlugin.loader, "css-loader", "stylus-loader"],
      },
      {
        test: /\.png/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            mimetype: "application/font-woff",
            name: "[name].[contenthash].[ext]",
            outputPath: "./assets/fonts/",
            publicPath: "../assets/fonts/",
            esModule: false,
          },
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new miniCssExtractPlugin({
      filename: "assets/[name][contenthash].css",
    }),
    new copyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images",
        },
      ],
    }),
    new dotEnv(),
    new CleanWebpackPlugin(),
  ],
  // Desde webpack 5 ya está incluido Terser
  optimization: {
    minimize: true,
    // Terser es para minimizar JS
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
