const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildPath = `${__dirname}/build`;

module.exports = {
	"mode": "production",
	"entry": "./src/js/index.js",
	"output": {
		"path": buildPath,
		"filename": "[name].[chunkhash:8].js",
	},
	"module": {
		"rules": [
			{
				"enforce": "pre",
				"test": /\.(js|jsx)$/,
				"exclude": /node_modules/,
				"use": "eslint-loader"
			},
			{
				"test": /\.js$/,
				"exclude": /node_modules/,
				"use": {
					"loader": "babel-loader",
					"options": {
						"presets": ['@babel/preset-env']
					}
				}
			},
			{
				"test": /\.scss$/,
				"use": [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(html|css)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							context: 'build'
						},
					},
				],
			},
		]
	},
	"plugins": [new MiniCssExtractPlugin({ filename: "[name]-[contenthash:8].css" })]
};
