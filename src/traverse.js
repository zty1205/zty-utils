import {isUndef, isPlainObject} from './utils'
/**
 * 深度优先遍历
 * @param {*} root 
 * @param {*} config 
 */
export function DFS (root, config = {}) {
	if (isUndef(root) || !isPlainObject(root)) return root
	let nodeList = []
	function _dfs(node, nodeList) {
		if (node) {
			nodeList.push(node);
			config.handler && config.handler(node)
			let children = node.children || [];
			children.map(n => _dfs(n, nodeList))
		}
		return;
	}
	_dfs(root, nodeList)
	return nodeList
}

export function BFS (root, config = {}) {
	if (isUndef(root) || !isPlainObject(root)) return root
	let nodeList = []
	let queue = [root] 
	while (queue.length != 0) {  
		let _node = queue.shift();
		config.handler && config.handler.call(null, _node)  
		nodeList.push(_node);  
		let children = _node.children || [];
		children.map(n => queue.push(n))
	}  
	return nodeList
}

