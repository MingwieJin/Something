const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 用来自动生成html 文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 用来再打包之前 清除dist目录

module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js',
		sub: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name]_[hash].[ext]',
					outputPath: 'images/',
					limit: 10240
				}
			} 
		},{
			test: /\.css$/,
			use: [
				'style-loader', 
				{
					loader: 'css-loader',
					options: {
						importLoaders: 2, // 这个指loader之后loader的数量   因为从下到上加载，先加载postcss-loader和sass-loader之后，还要用css-loader去加载
						modules: true  // 模块化css
					}
				},
				'postcss-loader'
			]
		}]
	},
	plugins: [
	new CleanWebpackPlugin(),
	new HtmlWebpackPlugin({ template: 'src/index.html' })
	],
	output: {
//		publicPath: 'https://cdn.com.cn/', //用于cdn路径的打包输出
		filename: '[name].js', // 默认是main.js, []占位符里面可以是name, hash等等
		path: path.resolve(__dirname, 'dist')
	}
}