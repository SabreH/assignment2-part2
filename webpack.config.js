//common js for finding out path
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');


//module with all of our settings
module.exports = {
    //entry point for our project
    entry: './src/index.js',
    plugins: [
        new CopyPlugin([
            { from: 'src/assets/data.json', to: 'data.json' },
            { from: 'src/assets/style.css', to: 'style.css' }
        ]),
        new HtmlWebpackPlugin({
            template: 'src/assets/index.html'
        }),
        new CleanWebpackPlugin(),
    ],
    //output for our files
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    //server settings
    devServer:{
        port:3100,
        contentBase: path.join(__dirname, 'dist')
    },
    watch: true,
    devtool: 'source-map',
    module: {
        //rules for conversion
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}