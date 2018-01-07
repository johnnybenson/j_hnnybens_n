const CopyWebpackPlugin = require('copy-webpack-plugin');

const entryJs = './src/js/index.js';
const buildPath = __dirname + '/build';

module.exports = {
	entry: entryJs,
	output: {
		path: buildPath,
		filename: '[name].js'
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: './src/assets',
				to: buildPath + '/assets',
			}
		]),
	],
};