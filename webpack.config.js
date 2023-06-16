const mode = process.env.NODE_ENV;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
	entry: [path.resolve(__dirname, 'src/script/App.js'), path.resolve(__dirname, 'src/assets/style/app.scss')],
	output: {
		filename: '[name].bundle.js',
		path: path.join(__dirname, 'build'),
	},
	mode: mode,
	devServer: {
		static: {
			directory: path.join(__dirname, 'build'),
		},
		compress: true,
		port: 8000,
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src/index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: 'style/[name].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.(scss|css)$/,
				use: [
					(mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
				generator: {
					filename: path.join('fonts', '[name][ext]'),
				},
			},
			{
				test: /\.(png|jpg|jpeg|svg)$/i,
				type: 'asset/resource',
					generator: {
						filename: path.join('img', '[name][ext]'),
					},
			},
		],
	},
	devtool: (mode === 'development') ? 'inline-source-map' : 'source-map',
};
