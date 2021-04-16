// Archivo de configuración de Webpack

const path = require("path");

// Exportamos las configuraciones

// Entry: punto de entrada
// Output: dónde se encuentran los archivos de salida
// Resolve --> extensions: le decimos los tipos de archivos que debe 'compilar'
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
};
