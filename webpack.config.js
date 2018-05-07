var webpack = require('webpack');
module.exports = {
    // 配置调试
    devtool: 'eval-source-map',
    watch: true,
    devServer: {
        contentBase: __dirname + "/output", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
    },
    entry: {
        // 指定入口文件
        index: [__dirname + '/source/index.js']
    },
    output: {
        //  输出目录
        path: __dirname + '/output',
        // 输出文件
        filename: 'res.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                compact: false,
                presets: ['env', 'react']
            }
        }, {
            test: /\.$/,
            loader: "style-loader!css-loader"
        }, {　　　　　　
            test: /\.(png|jpg)$/,
            　　　　　　loader: 'url-loader?limit=8192'　　　　
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: 'style-loader!css-loader!less-loader'
        }, ],
    }
};
