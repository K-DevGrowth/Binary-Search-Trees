class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(root) {
        this.root = root;
    }

    buildTree(array) {
        this.root = this.balanceTree(array, 0, array.length - 1);
    }

    balanceTree(array, start, end) {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);

        let root = new Node(array[mid]);

        root.left = this.balanceTree(array, start, mid - 1);

        root.right = this.balanceTree(array, mid + 1, end);

        return root;
    }

    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    insert(root = this.root, value) {
        if (root === null) return new Node(value);
        if (root.data === value) {
            return root;
        }

        if (root.data > value) {
            root.left = this.insert(root.left, value);
        }

        if (root.data < value) {
            root.right = this.insert(root.right, value);
        }

        return root;
    }

    deleteItem(root = this.root, value) {
        // check
        if (root === null) return root;

        // find
        if (value < root.data) {
            root.left = this.deleteItem(root.left, value);
        } else if (value > root.data) {
            root.right = this.deleteItem(root.right, value);
        } else {
            // case 1, 2:
            if (root.left === null) {
                return root.right;
            }

            if (root.right === null) {
                return root.left;
            }

            // case 3:
            let currNode = root.right;
            while (currNode !== null && currNode.left !== null) {
                currNode = currNode.left;
            }
            root.data = currNode.data;
            root.right = this.deleteItem(root.right, currNode.data);
        }

        // return 
        return root;
    }

    find(root = this.root, value) {
        if (root === null) return;

        if (value < root.data) {
            return this.find(root.left, value);
        }
        else if (value > root.data) {
            return this.find(root.right, value);
        }
        else {
            return root;
        }
    }

    levelOrder(root) {
        const res = [];
        this.levelOrderRec(root, 0, res);
        return res;
    }

    levelOrderRec(root, level, res) {
        if (root === null) return;

        if (res.length <= level) {
            res.push([]);
        }

        res[level].push(root.data);

        this.levelOrderRec(root.left, level + 1, res);
        this.levelOrderRec(root.right, level + 1, res);
    }

    inOrder(root) {
        if (root === null) return;
        this.inOrder(root.left);
        console.log(`${root.data} `);
        this.inOrder(root.right);
    }

    preorder(root) {
        if (root === null) return;
        console.log(`${root.data}`);
        this.preorder(root.left);
        this.preorder(root.right);
    }


    postOrder(root) {
        if (root === null) return;
        this.postOrder(root.left);
        this.postOrder(root.right);
        console.log(`${root.data}`);
    }

    height(root = this.root, value, h) {
        if (!root) return -1;

        let hl = this.height(root.left, value, h);
        let hr = this.height(root.right, value, h);
        let ans = Math.max(hl, hr) + 1;

        if (root.data === value) h.value = ans;

        return ans;
    }

    findHeight(root, x) {
        let height = { value: -1 };

        this.height(root, x, height);
        return height.value;
    }

    depth(root, value) {
        if (!root) return -1;

        let dist = -1;
        if (root.data === value ||
            (dist = this.depth(root.left, value)) >= 0 ||
            (dist = this.depth(root.right, value)) >= 0) {
            return dist + 1;
        }

        return dist;
    }

    isBalancedRec(root) {
        if (!root) return 0;

        let hl = this.isBalancedRec(root.left);
        let hr = this.isBalancedRec(root.right);

        if (Math.abs(hl - hr) > 1 || hl === -1 || hr === -1) {
            return -1;
        }

        return Math.max(hl, hr) + 1;
    }

    isBalanced(root) {
        return this.isBalancedRec(root) > 0;
    }

    rebalance() {

    }
}

const tree = new Tree();
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const uniqueArray = array
    .filter((value, index) => array.indexOf(value) === index)
    .sort((a, b) => a - b);

tree.buildTree(uniqueArray);
tree.prettyPrint(tree.root);

console.log(tree.levelOrder(tree.root));
// tree.inOrder(tree.root);
// tree.preorder(tree.root);
// tree.postOrder(tree.root);

// console.log(`=========================`);
// console.log(`After insert value: `);
// tree.insert(tree.root, 40);
// tree.prettyPrint(tree.root);

//console.log(tree.find(tree.root, 9));

// console.log(`=========================`);
// console.log(`After delete value: `);
// tree.deleteItem(tree.root, 8);
// tree.prettyPrint(tree.root);

//console.log(tree.findHeight(tree.root, 5)); // 1
//console.log(tree.depth(tree.root, 4));
//console.log(tree.isBalanced(tree.root));