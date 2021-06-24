import { TreeNode } from "./node";

/**
 * 先序遍历，递归实现
 * @param root
 * @returns
 */
function preOrder(root: TreeNode) {
    if (!root) {
        return;
    }

    console.log(root.value);
    root.left && preOrder(root.left);
    root.right && preOrder(root.right);
}

/**
 * 先序遍历，迭代实现
 * 借助栈结构实现
 * @param root
 */
function preOrderTranverse(root: TreeNode) {
    const stack: TreeNode[] = [root];

    while (stack.length) {
        const item = stack.pop();
        console.log(item.value);
        item.right && stack.push(item.right);
        item.left && stack.push(item.left);
    }
}

/**
 * 中序遍历，递归实现
 * @param root 
 * @returns 
 */
function midOrder(root: TreeNode) {
    if (!root) {
        return;
    }

    root.left && midOrder(root.left);
    console.log(root.value);
    root.right && midOrder(root.right);
}

function rearOrder(root: TreeNode) {
    if (!root) {
        return;
    }

    root.left && rearOrder(root.left);
    root.right && rearOrder(root.right);
    console.log(root.value);
}

let test: TreeNode = {
    value: 6,
    left: {
        value: 5,
        left: {
            value: 4,
        },
        right: {
            value: 3,
        },
    },
    right: {
        value: 2,
        right: {
            value: 1,
        },
    },
};

// console.log("===============preOrder");
// preOrder(test);
// console.log("===============preOrderTranverse");
// preOrderTranverse(test);
console.log("===============midOrder");
midOrder(test);
// console.log("===============rearOrder");
// rearOrder(test);
