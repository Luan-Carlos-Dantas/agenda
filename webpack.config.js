const path = require ('path') //CommonJS

module.exports = {
    //    'development' || 'production'
    mode: 'production',
    // modulo de entrada
    entry: './frontend/main.js',
    // modulo de saida
    output: {
        path: path.resolve(__dirname, 'public','assets','js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node-modules/,
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options:{
                    presets: ['@babel/env']
                }
            },
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }]
    },
    devtool: 'source-map'
}