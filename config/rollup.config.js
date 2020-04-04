import plugins from './plugins'
import {getFormat, getBanner, getFooter} from '../utils/index'

export default {
	input: 'lib/main.js',
	output: {
		file: 'dist/zty_utils.js',
		format: getFormat(),
		name: 'zty_utils',
		banner: getBanner(),
		footer: getFooter(),
		sourcemap: false
	},
	plugins
}