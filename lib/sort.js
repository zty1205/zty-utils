/**
 * 快速排序算法
 * 平均复杂度 O(nlog2n) 最差 O(n^2) 不稳定的排序算法
 * 概述：取一个基准， 将比基准值小的放在他的前面，大的值放在后面。 在对两边分别做快速排序，直到递归结束
 * 思想：分治法
 * 优化：(1) 三平均分区法 - 选用待排数组最左边、最右边和最中间的三个元素的中间值作为中轴 减少最坏情况的概率， 不需要哨兵
 *      (2) 在分区过小时使用其他高效的排序算法； 优先递归排序分区小的
 *      (3) 三分区: 小的在左边 相等的在中间 大的在右边
 */

export function quickSort(arr = []) {
  if (arr.length <= 1) { // 如果数组长度小于等于1无需判断直接返回即可 
    return arr;
  }
  let pivot_Index = Math.floor(arr.length / 2); // 取基准点 
  let pivot = arr.splice(pivot_Index, 1)[0]; // 取基准点的值,splice(index,1)函数可以返回数组中被删除的那个数
  let left = [];//存放比基准点小的数组
  let right = [];//存放比基准点大的数组 
  for (let i = 0; i < arr.length; i++) { // 遍历数组，进行判断分配 
    if (arr[i] < pivot) {
      left.push(arr[i]);// 比基准点小的放在左边数组 
    } else {
      right.push(arr[i]);// 比基准点大的放在右边数组 
    }
  }
  // 递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1； 
  return quickSort(left).concat([pivot], quickSort(right));
}

/**
 * 堆排序算法
 * 平均复杂度 O(nlog2n) 不稳定的排序算法
 * 概述：将数组看成一个完全二叉树， 将树构造成一个大根堆，将堆顶（最大值）和数组最后一个树交换，然后排除最后一个元素，继续对前面的元素进行重复的操作
 * 思想：利用堆 - 子结点的键值或索引总是小于（或者大于）它的父节点的性质
 */
function buildBigRootHeap(array) {
  for (let i = array.length / 2; i >= 0; i--) {  //构建打顶堆
    adjustBigRootHeap(array, i, array.length);
  }
}
function adjustBigRootHeap(arr, pos, len) {
  let swap = arr[pos];      //保存当前节点
  let child = pos * 2 + 1;  //定位到当前节点的左边的子节点
  while (child < len) {       //递归遍历所有的子节点
    //判断当前节点是否有右节点，若右节点较大，就采用右节点和当前节点进行比较
    if (child + 1 < len && arr[child] < arr[child + 1]) {
      child += 1;
    }
    //比较当前节点和最大的子节点，小于就交换，交换后将当前节点定位到子节点上
    if (arr[pos] < arr[child]) {
      arr[pos] = arr[child];
      pos = child;
      child = pos * 2 + 1;
    }
    else {
      break;
    }
    arr[pos] = swap;
  }
}
export function heapSort(arr = []) {
  if (!arr.length || arr.length < 1) {
    return arr
  }
  buildBigRootHeap(arr); //构建堆
  for (let i = arr.length - 1; i > 0; i--) {   //从数组的尾部进行调整
    let swap = arr[i];  //堆顶永远是最大的元素,将堆顶和尾部元素交换，最大元素就保存在尾部，并且不参与后面的调整
    arr[i] = arr[0];
    arr[0] = swap;
    adjustBigRootHeap(arr, 0, i); //将最大的元素进行调整，将最大的元素调整到堆顶
  }
}


/**
 * 归并排序
 * 平均复杂度 O(nlog2n) 空间复杂度 O(n) 比较占用内存，但却是一种效率高且稳定的算法
 * 概述：二路归并， 每次递归排序相邻的两个元素(元素组) 即 先将数组分成两部分，直到一部分只有一块，然后向上每相邻两块进行排序
 * 思想：分治法
 * 优化：TimSort 预先检测序列中的天然有序子段 将时间复杂度降至O(n)
 */
function merge(left, right) {
  let tmp = [];
  while (left.length && right.length) {
    if (left[0] < right[0])
      tmp.push(left.shift());
    else
      tmp.push(right.shift());
  }
  return tmp.concat(left, right);
}

export function mergeSort(arr) {
  if (arr.length === 1)
    return a;
  let mid = ~~(arr.length / 2)
    , left = arr.slice(0, mid)
    , right = arr.slice(mid);
  return merge(mergeSort(left), mergeSort(right));
}
