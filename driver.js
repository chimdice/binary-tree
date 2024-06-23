import { Tree } from "./tree.js";

function randomArray (size) {
    const valueTrees = [];
    const maxValue = 100;

    for (let i=0;i<size;i++) {
        const num = Math.floor(Math.random()*maxValue);
        valueTrees.push(num);
    };

    return valueTrees;
};

const treeArray = randomArray(15);
const tree = new Tree(treeArray);
console.log("Before Insertions")
console.log(tree.isBalanced())
console.log(tree.preOrder((node) => node.value))
console.log(tree.inOrder((node) => node.value))
console.log(tree.postOrder((node) => node.value))

tree.insert(2393)
tree.insert(193)
tree.insert(452)
tree.insert(110)

console.log("After Insertions")
console.log(tree.isBalanced())
tree.reBalance()
console.log(tree.isBalanced())
console.log(tree.preOrder((node) => node.value))
console.log(tree.inOrder((node) => node.value))
console.log(tree.postOrder((node) => node.value))

