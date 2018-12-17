// 1.简单的冒泡排序
function bubbleSort(arr) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    for (var j = 0; j < len; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr
}

// 2.双向冒泡排序
function bothwayBubbleSort(arr) {
  var len = arr.length - 1;
  var isSwap = false;
  for (var i = 0; i < len; len--) {
    for (var j = len; j > i; j--) {
      arr[j - 1] > arr[j] && (isSwap = true) && ([arr[j], arr[j - 1]] = [arr[j - 1], arr[j]])
    }
    i++
    for (j = i; j < len; j++) {
      arr[j] > arr[j + 1] && (isSwap = true) && ([arr[j], arr[j + 1]] = [arr[j + 1], arr[j]])
    }
  }
  return arr
}

// es6快速排序 使用了filter高阶函数 拓展符 递归

const qsort = fn => ([x, ...xn]) => x == null ? [] :
  [...qsort(fn)(xn.filter(a => fn(a, x))), x, ...qsort(fn)(xn.filter(a => !fn(a, x)))]





// 二叉树查找 删除
class BinaryNode {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}
class BinaryTree {
  constructor() {
    this.root = null;
    this.values = new Array();
  }

  insert() { }
  remove() { }
  search() { }

  min() { }
  max() { }
  isEmpty() { }

  //中序
  inOrderTraverse() { }
  //先序
  preOrderTraverse() { }
  //后序
  postOrderTraverse() { }

  //广度优先
  breadthFirstSearch() { }
  //深度优先
  deepFirstSearch() { }
  // 插入
  __insertNode(node, newNode) {
    if (node.value > newNode.value) {
      if (node.left) {
        this.__insertNode(node.left, newNode)
      } else {
        node.left = newNode;
      }
    } else {
      if (node.right) {
        this.__insertNode(node.right, newNode)
      } else {
        node.right = newNode;
      }
    }
  }
  __removeNode(node, val) {
    if (node === null) {
      return node
    }
    if (val < node.val) {
      this.__removeNode(node.left, val);
      return node;
    }
    if (val > node.val) {
      this.__removeNode(node.right, val);
      return node;
    }

    if (val === node.val) {

    }
  }
  __findMinNode() { }
  __inOrderTraverseNode() { }
  __preOrderTraverseNode() { }
  __postOrderTraverseNode() { }
}