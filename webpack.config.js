var path = require("path");
var package = require("./package.json");

module.exports = {
    mode: "production",
    entry: {
        main: "./src/main.js",
    },
    output: {
        path: path.resolve(__dirname, "release", package.version),
        filename: "hop.js",
        environment: {
          arrowFunction: false,
          bigIntLiteral: false,
          const: false,
          destructuring: false,
          dynamicImport: false,
          forOf: false,
          module: false,
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    watch: true
}