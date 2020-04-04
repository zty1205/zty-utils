import plugins from './plugins'
import {getFormat, getBanner} from '../utils/index'

export default {
	input: 'src/main.js',
	output: {
		file: 'lib/zty_utils.js',
		format: getFormat(),
		name: 'zty_utils',
		banner: getBanner(),
		sourcemap: false
	},
	plugins
}