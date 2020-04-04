import resolve from 'rollup-plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';//热更新;
import { terser } from "rollup-plugin-terser";
import {isDev, isWatch} from '../utils/index'

const dev = isDev()
const watch = isWatch()

const plugins = [
	resolve(),
	commonjs(),
	babel({
		exclude: 'node_modules/**' // 只编译我们的源代码
	}),

]
if (!dev) {
	plugins.push(terser(
		{
			output: {
				comments: function(node, comment) {
					let text = comment.value;
					let type = comment.type;
					if (type == "comment2") {
						// multiline comment
						return /name|author|version/i.test(text);
					}
				}
			}
		}
	))
}
if (watch) {
	plugins.push(
		serve({
			open: true, // 是否打开浏览器
			contentBase: './', // 入口html的文件位置 会自动查找HTML文件
			historyApiFallback: true, // Set to true to return index.html instead of 404
			host: 'localhost',
			port: 10001
		})
	)
	plugins.push(
		livereload({
			watch: 'dist/'     //监听文件夹;
		})
	)
}

export default plugins
