/**
 * 二分查找
 * 平均复杂度 O(log2n)
 * 概述：首先，假设表中元素是按升序排列，将表中间位置记录的关键字与查找关键字比较，如果两者相等，则查找成功；否则查找左右两个子表，直到查找结束
 */
export function binarySearch(arr, key, start, end) {
	let _end = (end != null) ? end : (arr.length - 1); // end可以为0
	let _start = start || 0;
	if (_start > _end) {
		return false;
	}
	let m = Math.floor((_start + _end) / 2);
	if (key === arr[m]) {
		return m;
	} else if (key < arr[m]) {
		return binarySearch(arr, key, _start, m - 1)
	} else {
		return binarySearch(arr, key, m + 1, _end);
	}
}