import { TreeNode } from "./node";

/**
 * 广度优先遍历
 * 借助队列结构实现
 * @param root
 */
function BFS(root: TreeNode) {
    const queue: TreeNode[] = [root];

    while (queue.length) {
        const item = queue.shift();
        console.log(item.value);

        item.left && queue.push(item.left);
        item.right && queue.push(item.right);
    }
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

BFS(test);