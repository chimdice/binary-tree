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


    insert (value) {
        let tempRoot = this.root;
        let valueInserted = false;

        while (! valueInserted) {
            const nodeValue = tempRoot.value;

            if (value > nodeValue) {
                if (tempRoot.right === null) {
                    const newNode = new Node();
                    newNode.value = value;
                    tempRoot.right = newNode;
                    valueInserted = true;
                } else {
                    tempRoot = tempRoot.right
                };
            } else {
                if (tempRoot.left === null) {
                    const newNode = new Node();
                    newNode.value = value;
                    tempRoot.left = newNode;
                    valueInserted = true;
                } else {
                    tempRoot = tempRoot.left
                };
            };
        };
    };

    delete (value) {
        const idx = this.array.indexOf(value);

        if (idx === -1) {
            return
        } else {

            let tempRoot = this.root;
            let parentNode = null;
            let valueFound = false;
            while (! valueFound) {
                const nodeValue = tempRoot.value;
                if (value === nodeValue) {
                    valueFound  = true;
                } else if (value > nodeValue) {
                    parentNode = tempRoot;
                    tempRoot = tempRoot.right;
                } else {
                    parentNode = tempRoot;
                    tempRoot = tempRoot.left
                };
            };
            
            const rightNode = tempRoot.right;
            const leftNode = tempRoot.left;

            if ((rightNode === null) && (leftNode === null)) {
                if (parentNode.left === null) {
                    parentNode.right = null;
                } else {
                    parentNode.left = null;
                };
            } else if (rightNode === null) {
                tempRoot.value = tempRoot.left.value;
                tempRoot.left = null;
            } else if (leftNode === null) {
                tempRoot.value = tempRoot.right.value;
                tempRoot.right = null;
            } else {
                let minNextRoot = tempRoot.right;
                let parentMinRoot = null;
                let foundNullLeft = false;

                while (! foundNullLeft) {
                    if (minNextRoot.left === null) {
                        tempRoot.value = minNextRoot.value;
                        foundNullLeft = true;
                    } else {
                        parentMinRoot = minNextRoot;
                        minNextRoot = minNextRoot.left;
                    }
                }

                if (parentMinRoot === null) {
                    tempRoot.right = null;
                } else {
                    parentMinRoot.left = null;
                }

            }

        };
    };

    find (value) {
        let tempRoot = this.root;
        let valueFound = false;
        while (! valueFound) {
            const nodeValue = tempRoot.value;
            if (value === nodeValue) {
                valueFound  = true;
            } else if (value > nodeValue) {
                tempRoot = tempRoot.right;
            } else {
                tempRoot = tempRoot.left
            };
        };

        return tempRoot;
    };

    levelOrder(callback=null) {
        let tempRoot = this.root;
        const queue = [tempRoot];
        const outArray = [];

        while (queue.length !== 0) {
            const currentNode = queue[0];
            if (currentNode.left !== null) {
                queue.push(currentNode.left);
            };
            if (currentNode.right !== null) {
                queue.push(currentNode.right);
            };
        
            queue.splice(0,1);
            outArray.push(currentNode)
        };
        
        if (callback === null) {
            return outArray;

        } else {
            const callBackOut = []
            outArray.forEach((node) =>{
                callBackOut.push(callback(node));
            });

            return callBackOut;
        }; 
    };

    preOrder(callback=null) {
        const outArray = [];
        const preOrderArray = [];

        function recursion (node) {
            if (node === null) {
                return
            } else {
                outArray.push(node);
                recursion(node.left);
                recursion(node.right);
            };
        };

        recursion(this.root)

        if (callback === null) {
            return outArray;
        } else {
            outArray.forEach((node)=>{
                preOrderArray.push(callback(node));
                });
        
            return preOrderArray;
        }
       
    };

    inOrder(callback=null) {
        const outArray = [];
        const inOrderArray = [];

        function recursion (node) {
            if (node === null) {
                return
            } else {
                recursion(node.left);
                outArray.push(node);
                recursion(node.right);
            };
        };

        recursion(this.root)

        if (callback === null) {
            return outArray;
        } else {
            outArray.forEach((node)=>{
                inOrderArray.push(callback(node));
                });
        
            return inOrderArray;
        }
       
    };

    postOrder(callback=null) {
        const outArray = [];
        const postOrderArray = [];

        function recursion (node) {
            if (node === null) {
                return
            } else {
                recursion(node.left);
                recursion(node.right);
                outArray.push(node);
            };
        };

        recursion(this.root)

        if (callback === null) {
            return outArray;
        } else {
            outArray.forEach((node)=>{
                postOrderArray.push(callback(node));
                });
        
            return postOrderArray;
        }
       
    };

    depth (node) {
        let height = 0;
        let value = node.value;

        let tempRoot = this.root;
        let valueFound = false;
        while (! valueFound) {
            const nodeValue = tempRoot.value;
            if (value === nodeValue) {
                valueFound  = true;
            } else if (value > nodeValue) {
                tempRoot = tempRoot.right;
                height += 1;
            } else {
                tempRoot = tempRoot.left;
                height += 1;
            };
        };

        return height;
    };

    height (node) {
        let value = node.value;

        let tempRoot = this.find(value);

        function recursion (node) {
            if (node === null) {
                return 0
            } else {
                return Math.max(recursion(node.left), recursion(node.right)) + 1;
            };
        };

        return recursion(tempRoot) - 1;
            
    };

};

const tree = new Tree([1, 2, 3, 4,]);

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

console.log(tree.height(tree.root.right)) 
