const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

var htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js', // 打包的入口
    output: {
        path: path.join(__dirname, './dist'),  // 将打包结果放到 dist 目录中
        filename: 'index.js' // 自定打包结果的文件名
    },
    mode: 'development',
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.less$/, use: ['style-loader', 'css-loader','less-loader']},
            {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=9100&name=[hash:8]-[name].[ext]'},
            {test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",},
            {test: /\.vue$/, use: 'vue-loader'}
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: path.join(__dirname,'./src/index.html'),
            filename: "index.html"
        }),
        new VueLoaderPlugin()
    ],
    // resolve:{
    //     alias:{
    //         "vue$":"vue.dist/vue.js"
    //     }
    // }


}
