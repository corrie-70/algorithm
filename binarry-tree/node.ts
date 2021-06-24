export class TreeNode {
    value: number;
    left?: TreeNode;
    right?: TreeNode;

    constructor(value: number, left?: TreeNode, right?: TreeNode) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}
