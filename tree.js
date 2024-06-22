class Node {
    constructor () {
        this.value = null;
        this.left = null;
        this.right = null;
    };
};

class Tree {
    constructor (array) {
        this.array = [... new Set(array.sort((a, b) => a - b))];
        
        this.root = this.buildTree(this.array);
    };

    buildTree (array) {
        let start = 0;
        let end = array.length;
        let mid = Math.floor((start+end)/2);


        if (end === 0){
            return null;
        } else {
            const rootNode = new Node();
            rootNode.value = array[mid];
            const root = rootNode;

            if (end === 1) {
                return root;
            } else {
                const leftNode = this.buildTree(array.slice(start, mid));
                const rightNode = this.buildTree(array.slice(mid+1, end));

                root.right = rightNode;
                root.left = leftNode;
                return root
            };

        };
    };


    
};

const tree = new Tree([1, 9, 0]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
 
prettyPrint(tree.root)